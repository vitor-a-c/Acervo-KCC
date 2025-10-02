import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { LoanDocument, BookDocument } from '@/types/database';
import { addDays } from '@/utils/dateUtils';
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

// GET - Get specific loan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    
    const db = await getDatabase();
    const loansCollection = db.collection<LoanDocument>('loans');
    const booksCollection = db.collection<BookDocument>('books');
    
    const loan = await loansCollection.findOne({ _id: new ObjectId(id) });
    
    if (!loan) {
      return NextResponse.json(
        { message: 'Loan not found' },
        { status: 404 }
      );
    }
    
    // Get book info
    const book = await booksCollection.findOne({ codigo: loan.book_codigo });
    
    return NextResponse.json({
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
    });
  } catch (error) {
    console.error('Error fetching loan:', error);
    return NextResponse.json(
      { message: 'Error fetching loan' },
      { status: 500 }
    );
  }
}

// PATCH - Extend loan or return book
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { action, return_date } = body; // action: 'extend' | 'return'
    
    const db = await getDatabase();
    const loansCollection = db.collection<LoanDocument>('loans');
    const booksCollection = db.collection<BookDocument>('books');
    
    const loan = await loansCollection.findOne({ _id: new ObjectId(id) });
    
    if (!loan) {
      return NextResponse.json(
        { message: 'Loan not found' },
        { status: 404 }
      );
    }
    
    const now = new Date();
    
    if (action === 'extend') {
      // Extend the loan by 21 days
      const newReturnDate = addDays(new Date(loan.current_return_date), 21);
      
      await loansCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            current_return_date: newReturnDate,
            status: 'active',
            updatedAt: now
          },
          $inc: { extensions: 1 }
        }
      );
      
      // Update book return date
      await booksCollection.updateOne(
        { codigo: loan.book_codigo },
        {
          $set: {
            data_retorno: newReturnDate.toISOString().split('T')[0],
            updatedAt: now
          }
        }
      );
      
      return NextResponse.json({
        message: 'Loan extended successfully',
        new_return_date: newReturnDate.toISOString()
      });
      
    } else if (action === 'return') {
      // Mark as returned
      const returnedDate = return_date ? new Date(return_date) : now;
      
      await loansCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            returned_date: returnedDate,
            status: 'returned',
            updatedAt: now
          }
        }
      );
      
      // Update book status
      await booksCollection.updateOne(
        { codigo: loan.book_codigo },
        {
          $set: {
            emprestado: false,
            data_retorno: '',
            current_loan_id: null,
            updatedAt: now
          }
        }
      );
      
      return NextResponse.json({
        message: 'Book returned successfully',
        returned_date: returnedDate.toISOString()
      });
      
    } else {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error('Error updating loan:', error);
    return NextResponse.json(
      { message: 'Error updating loan' },
      { status: 500 }
    );
  }
}

// PUT - Update loan details (borrower info, notes, dates)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    
    const db = await getDatabase();
    const loansCollection = db.collection<LoanDocument>('loans');
    const booksCollection = db.collection<BookDocument>('books');
    
    const loan = await loansCollection.findOne({ _id: new ObjectId(id) });
    
    if (!loan) {
      return NextResponse.json(
        { message: 'Loan not found' },
        { status: 404 }
      );
    }
    
    // Build update object
    const updateFields: Partial<LoanDocument> = {
      updatedAt: new Date()
    };
    
    // Update allowed fields
    if (body.borrower_name !== undefined) updateFields.borrower_name = body.borrower_name.trim();
    if (body.borrower_email !== undefined) updateFields.borrower_email = body.borrower_email?.trim() || undefined;
    if (body.borrower_phone !== undefined) updateFields.borrower_phone = body.borrower_phone?.trim() || undefined;
    if (body.borrower_id !== undefined) updateFields.borrower_id = body.borrower_id?.trim() || undefined;
    if (body.borrower_address !== undefined) updateFields.borrower_address = body.borrower_address?.trim() || undefined;
    if (body.notes !== undefined) updateFields.notes = body.notes?.trim() || undefined;
    
    // Admin can manually set dates
    if (body.current_return_date !== undefined) {
      updateFields.current_return_date = new Date(body.current_return_date);
      
      // Also update book's return date if loan is active
      if (loan.status === 'active') {
        await booksCollection.updateOne(
          { codigo: loan.book_codigo },
          {
            $set: {
              data_retorno: new Date(body.current_return_date).toISOString().split('T')[0],
              updatedAt: new Date()
            }
          }
        );
      }
    }
    
    await loansCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );
    
    return NextResponse.json({
      message: 'Loan updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating loan:', error);
    return NextResponse.json(
      { message: 'Error updating loan' },
      { status: 500 }
    );
  }
}