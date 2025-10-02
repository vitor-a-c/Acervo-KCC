import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { LoanDocument, BookDocument } from '@/types/database';
import { addDays, isOverdue } from '@/utils/dateUtils';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const JWT_SECRET = process.env.JWT_SECRET;

function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) return false;
  
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// GET - List all loans with optional filters
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'active', 'returned', 'overdue', 'all'
    const bookCodigo = searchParams.get('book_codigo');
    
    const db = await getDatabase();
    const loansCollection = db.collection<LoanDocument>('loans');
    const booksCollection = db.collection<BookDocument>('books');
    
    // Build query
    const query: Record<string, unknown> = {};
    
    if (bookCodigo) {
      query.book_codigo = bookCodigo;
    }
    
    if (status && status !== 'all') {
      if (status === 'overdue') {
        query.status = 'active';
        // We'll filter overdue in JavaScript after fetching
      } else {
        query.status = status;
      }
    }
    
    // Fetch loans
    let loans = await loansCollection.find(query).sort({ createdAt: -1 }).toArray();
    
    // Update status for overdue loans
    const now = new Date();
    const loansToUpdate: string[] = [];
    
    loans = loans.map(loan => {
      if (loan.status === 'active' && isOverdue(loan.current_return_date)) {
        loansToUpdate.push(loan._id!.toString());
        return { ...loan, status: 'overdue' as const };
      }
      return loan;
    });
    
    // Update overdue loans in database
    if (loansToUpdate.length > 0) {
      await loansCollection.updateMany(
        { _id: { $in: loansToUpdate.map(id => new ObjectId(id)) } },
        { $set: { status: 'overdue', updatedAt: now } }
      );
    }
    
    // Filter overdue if requested
    if (status === 'overdue') {
      loans = loans.filter(loan => loan.status === 'overdue');
    }
    
    // Enrich with book information
    const loansWithBooks = await Promise.all(
      loans.map(async (loan) => {
        const book = await booksCollection.findOne({ codigo: loan.book_codigo });
        return {
          loan: {
            ...loan,
            _id: loan._id!.toString(),
            loan_date: loan.loan_date.toISOString(),
            original_return_date: loan.original_return_date.toISOString(),
            current_return_date: loan.current_return_date.toISOString(),
            returned_date: loan.returned_date?.toISOString() || null,
            createdAt: loan.createdAt.toISOString(),
            updatedAt: loan.updatedAt.toISOString()
          },
          book: book ? {
            codigo: book.codigo,
            titulo: book.titulo,
            autor: book.autor,
            posicao: book.posicao
          } : null
        };
      })
    );
    
    return NextResponse.json({ loans: loansWithBooks });
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json(
      { message: 'Error fetching loans' },
      { status: 500 }
    );
  }
}

// POST - Create new loan
export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { book_codigo, borrower_name, borrower_email, borrower_phone, borrower_id, borrower_address, notes } = body;
    
    // Validate required fields
    if (!book_codigo || !borrower_name) {
      return NextResponse.json(
        { message: 'Missing required fields: book_codigo and borrower_name' },
        { status: 400 }
      );
    }
    
    const db = await getDatabase();
    const booksCollection = db.collection<BookDocument>('books');
    const loansCollection = db.collection<LoanDocument>('loans');
    
    // Check if book exists
    const book = await booksCollection.findOne({ codigo: book_codigo });
    if (!book) {
      return NextResponse.json(
        { message: 'Book not found' },
        { status: 404 }
      );
    }
    
    // Check if book is already borrowed
    if (book.emprestado || book.current_loan_id) {
      return NextResponse.json(
        { message: 'Book is already borrowed' },
        { status: 400 }
      );
    }
    
    // Calculate dates
    const loanDate = new Date();
    const returnDate = addDays(loanDate, 21);
    
    // Create loan document
    const loanDoc: LoanDocument = {
      book_codigo,
      borrower_name: borrower_name.trim(),
      borrower_email: borrower_email?.trim() || undefined,
      borrower_phone: borrower_phone?.trim() || undefined,
      borrower_id: borrower_id?.trim() || undefined,
      borrower_address: borrower_address?.trim() || undefined,
      loan_date: loanDate,
      original_return_date: returnDate,
      current_return_date: returnDate,
      returned_date: null,
      extensions: 0,
      status: 'active',
      notes: notes?.trim() || undefined,
      createdAt: loanDate,
      updatedAt: loanDate
    };
    
    // Insert loan
    const loanResult = await loansCollection.insertOne(loanDoc);
    const loanId = loanResult.insertedId.toString();
    
    // Update book status
    await booksCollection.updateOne(
      { codigo: book_codigo },
      {
        $set: {
          emprestado: true,
          data_retorno: returnDate.toISOString().split('T')[0],
          current_loan_id: loanId,
          updatedAt: loanDate
        },
        $inc: { total_loans: 1 }
      }
    );
    
    return NextResponse.json({
      message: 'Loan created successfully',
      loanId,
      loan: {
        ...loanDoc,
        _id: loanId,
        loan_date: loanDoc.loan_date.toISOString(),
        original_return_date: loanDoc.original_return_date.toISOString(),
        current_return_date: loanDoc.current_return_date.toISOString(),
        createdAt: loanDoc.createdAt.toISOString(),
        updatedAt: loanDoc.updatedAt.toISOString()
      }
    });
  } catch (error) {
    console.error('Error creating loan:', error);
    return NextResponse.json(
      { message: 'Error creating loan' },
      { status: 500 }
    );
  }
}