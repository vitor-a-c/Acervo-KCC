import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { LoanDocument, calculateLoanStatus } from '@/types/database';
import { ObjectId, Filter } from 'mongodb';
import jwt from 'jsonwebtoken';

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

// GET - Fetch loans with filters
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';

    const db = await getDatabase();
    const loansCollection = db.collection<LoanDocument>('loans');
    const booksCollection = db.collection('books');

    // Build query with proper typing
    const query: Filter<LoanDocument> = {};

    // Status filter
    if (status !== 'all') {
      if (status === 'returned') {
        query.actual_return_date = { $ne: null };
      } else if (status === 'overdue') {
        query.actual_return_date = null;
        query.$expr = {
          $lt: [
            { $ifNull: ['$extended_return_date', '$initial_return_date'] },
            new Date()
          ]
        };
      } else if (status === 'active') {
        query.actual_return_date = null;
      }
    }

    // Search by borrower name
    if (search) {
      query.borrower_name = { $regex: search, $options: 'i' };
    }

    const loans = await loansCollection
      .find(query)
      .sort({ loan_date: -1 })
      .toArray();

    // Enrich with book details and calculate status
    const enrichedLoans = await Promise.all(
      loans.map(async (loan) => {
        // CRITICAL FIX: Check if book_codes exists and is an array
        const bookCodes = Array.isArray(loan.book_codes) ? loan.book_codes : [];
        
        // Get book details
        const bookDetails = await Promise.all(
          bookCodes.map(async (code) => {
            try {
              const book = await booksCollection.findOne({ codigo: code });
              return {
                code,
                title: book?.titulo,
                author: book?.autor,
                found: !!book
              };
            } catch (error) {
              console.error(`Error fetching book ${code}:`, error);
              return {
                code,
                found: false
              };
            }
          })
        );

        // CRITICAL FIX: Handle missing dates from old/corrupt loans
        // If dates are missing, calculate them or use defaults
        let loanDate = loan.loan_date;
        if (!loanDate || !(loanDate instanceof Date)) {
          loanDate = loan.createdAt || new Date();
        }

        let initialReturnDate = loan.initial_return_date;
        if (!initialReturnDate || !(initialReturnDate instanceof Date)) {
          // Calculate default return date (21 days from loan date)
          initialReturnDate = new Date(loanDate);
          initialReturnDate.setDate(initialReturnDate.getDate() + 21);
        }

        // Calculate current status
        const status = calculateLoanStatus({
          ...loan,
          loan_date: loanDate,
          initial_return_date: initialReturnDate
        } as LoanDocument);

        return {
          _id: loan._id?.toString(),
          user_id: loan.user_id?.toString(),
          borrower_name: loan.borrower_name,
          borrower_email: loan.borrower_email,
          borrower_phone: loan.borrower_phone,
          borrower_id: loan.borrower_id,
          borrower_address: loan.borrower_address,
          book_codes: bookCodes,
          book_count: bookCodes.length,
          book_details: bookDetails,
          loan_date: loanDate.toISOString(),
          initial_return_date: initialReturnDate.toISOString(),
          extended: loan.extended || false,
          extended_return_date: loan.extended_return_date?.toISOString(),
          actual_return_date: loan.actual_return_date?.toISOString(),
          status,
          notes: loan.notes,
          createdAt: loan.createdAt?.toISOString(),
          updatedAt: loan.updatedAt?.toISOString()
        };
      })
    );

    return NextResponse.json({ loans: enrichedLoans });
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json(
      { message: 'Error fetching loans', error: error instanceof Error ? error.message : 'Unknown error' },
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
    const {
      user_id,
      borrower_name,
      borrower_email,
      borrower_phone,
      borrower_id,
      borrower_address,
      book_codes,
      loan_date,
      notes
    } = body;

    // Validate required fields
    if (!borrower_name || !book_codes || !Array.isArray(book_codes) || book_codes.length === 0) {
      return NextResponse.json(
        { message: 'Missing required fields: borrower_name and book_codes' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const loansCollection = db.collection<LoanDocument>('loans');
    const booksCollection = db.collection('books');
    const usersCollection = db.collection('users');

    // Calculate dates
    const loanDateObj = loan_date ? new Date(loan_date) : new Date();
    const initialReturnDate = new Date(loanDateObj);
    initialReturnDate.setDate(initialReturnDate.getDate() + 21);

    // Create loan document
    const newLoan: LoanDocument = {
      user_id: user_id ? new ObjectId(user_id) : undefined,
      borrower_name,
      borrower_email,
      borrower_phone,
      borrower_id,
      borrower_address,
      book_codes, // CRITICAL: Make sure this is saved
      book_count: book_codes.length,
      loan_date: loanDateObj,
      initial_return_date: initialReturnDate,
      extended: false,
      actual_return_date: null,
      status: 'active',
      notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert loan
    const result = await loansCollection.insertOne(newLoan);

    // Update books to mark as borrowed
    await booksCollection.updateMany(
      { codigo: { $in: book_codes } },
      {
        $set: {
          emprestado: true,
          data_retorno: initialReturnDate.toISOString(),
          updatedAt: new Date()
        }
      }
    );

    // Update user statistics if user_id exists
    if (user_id) {
      try {
        await usersCollection.updateOne(
          { _id: new ObjectId(user_id) },
          {
            $inc: { active_loans: 1, total_loans: 1 },
            $set: { updatedAt: new Date() }
          }
        );
      } catch (error) {
        console.error('Error updating user stats:', error);
        // Don't fail the loan creation if user update fails
      }
    }

    return NextResponse.json({
      message: 'Loan created successfully',
      loanId: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error creating loan:', error);
    return NextResponse.json(
      { message: 'Error creating loan', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}