import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { BookDocument } from '@/types/database';
import jwt from 'jsonwebtoken';

// Verify JWT token (reuse from above)
function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || !process.env.JWT_SECRET) return false;
  
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// PUT - Update book
export async function PUT(
  request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookData: Partial<BookDocument> = await request.json();
    const { codigo } = params;

    const db = await getDatabase();
    const collection = db.collection<BookDocument>('books');
    
    // Remove _id from update data if present
    delete bookData._id;
    
    // Update timestamps
    bookData.updatedAt = new Date();

    const result = await collection.updateOne(
      { codigo },
      { $set: bookData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json(
      { message: 'Error updating book' },
      { status: 500 }
    );
  }
}

// DELETE - Delete book
export async function DELETE(
  request: NextRequest,
  { params }: { params: { codigo: string } }
) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { codigo } = params;

    const db = await getDatabase();
    const collection = db.collection<BookDocument>('books');
    
    const result = await collection.deleteOne({ codigo });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json(
      { message: 'Error deleting book' },
      { status: 500 }
    );
  }
}