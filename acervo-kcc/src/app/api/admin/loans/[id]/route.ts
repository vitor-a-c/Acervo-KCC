import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { LoanDocument } from '@/types/database';
import { ObjectId } from 'mongodb';
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

// PUT - Update loan
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const updates = await request.json();

    const db = await getDatabase();
    const loansCollection = db.collection<LoanDocument>('loans');
    const booksCollection = db.collection('books');
    const usersCollection = db.collection('users');

    // Get current loan
    const currentLoan = await loansCollection.findOne({ _id: new ObjectId(id) });
    if (!currentLoan) {
      return NextResponse.json({ message: 'Loan not found' }, { status: 404 });
    }

    const updateData: Partial<LoanDocument> = {
      updatedAt: new Date()
    };

    // Handle extension
    if (updates.extended !== undefined) {
      updateData.extended = updates.extended;
      if (updates.extended && !currentLoan.extended) {
        const extendedDate = new Date(currentLoan.initial_return_date);
        extendedDate.setDate(extendedDate.getDate() + 21);
        updateData.extended_return_date = extendedDate;
      }
    }

    // Handle custom extended date
    if (updates.extended_return_date) {
      updateData.extended_return_date = new Date(updates.extended_return_date);
      updateData.extended = true;
    }

    // Handle return
    if (updates.actual_return_date) {
      updateData.actual_return_date = new Date(updates.actual_return_date);
      
      // Mark books as available
      const bookCodes = Array.isArray(currentLoan.book_codes) ? currentLoan.book_codes : [];
      if (bookCodes.length > 0) {
        await booksCollection.updateMany(
          { codigo: { $in: bookCodes } },
          {
            $set: {
              emprestado: false,
              data_retorno: '',
              updatedAt: new Date()
            }
          }
        );
      }

      // Update user statistics
      if (currentLoan.user_id) {
        await usersCollection.updateOne(
          { _id: currentLoan.user_id },
          {
            $inc: { active_loans: -1 },
            $set: { updatedAt: new Date() }
          }
        );
      }
    }

    // Handle other updates
    if (updates.borrower_name) updateData.borrower_name = updates.borrower_name;
    if (updates.borrower_email !== undefined) updateData.borrower_email = updates.borrower_email;
    if (updates.borrower_phone !== undefined) updateData.borrower_phone = updates.borrower_phone;
    if (updates.borrower_id !== undefined) updateData.borrower_id = updates.borrower_id;
    if (updates.borrower_address !== undefined) updateData.borrower_address = updates.borrower_address;
    if (updates.notes !== undefined) updateData.notes = updates.notes;

    // Update loan
    const result = await loansCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Loan updated successfully' });
  } catch (error) {
    console.error('Error updating loan:', error);
    return NextResponse.json(
      { message: 'Error updating loan', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete loan
export async function DELETE(
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
    const booksCollection = db.collection('books');
    const usersCollection = db.collection('users');

    // Get loan before deleting
    const loan = await loansCollection.findOne({ _id: new ObjectId(id) });
    if (!loan) {
      return NextResponse.json({ message: 'Loan not found' }, { status: 404 });
    }

    // If loan is active (not returned), mark books as available
    if (!loan.actual_return_date) {
      const bookCodes = Array.isArray(loan.book_codes) ? loan.book_codes : [];
      if (bookCodes.length > 0) {
        await booksCollection.updateMany(
          { codigo: { $in: bookCodes } },
          {
            $set: {
              emprestado: false,
              data_retorno: '',
              updatedAt: new Date()
            }
          }
        );
      }

      // Update user statistics
      if (loan.user_id) {
        await usersCollection.updateOne(
          { _id: loan.user_id },
          {
            $inc: { active_loans: -1 },
            $set: { updatedAt: new Date() }
          }
        );
      }
    }

    // Delete loan
    await loansCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    console.error('Error deleting loan:', error);
    return NextResponse.json(
      { message: 'Error deleting loan', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}