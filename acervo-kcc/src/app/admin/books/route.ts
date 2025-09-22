import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { BookDocument } from '@/types/database';
import jwt from 'jsonwebtoken';

// Verify JWT token
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

// GET all books (with optional search)
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const db = await getDatabase();
    const collection = db.collection<BookDocument>('books');
    
    // Build search query
    const query = search ? {
      $or: [
        { titulo: { $regex: search, $options: 'i' } },
        { autor: { $regex: search, $options: 'i' } },
        { codigo: { $regex: search, $options: 'i' } },
        { numero_chamada: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const [books, total] = await Promise.all([
      collection.find(query).skip(skip).limit(limit).toArray(),
      collection.countDocuments(query)
    ]);

    return NextResponse.json({
      books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { message: 'Error fetching books' },
      { status: 500 }
    );
  }
}

// POST - Add new book
export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookData: Partial<BookDocument> = await request.json();
    
    // Validate required fields
    if (!bookData.codigo || !bookData.titulo) {
      return NextResponse.json(
        { message: 'Missing required fields: codigo and titulo' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection<BookDocument>('books');
    
    // Check if book already exists
    const existing = await collection.findOne({ codigo: bookData.codigo });
    if (existing) {
      return NextResponse.json(
        { message: 'Book with this code already exists' },
        { status: 400 }
      );
    }

    // Add timestamps
    const newBook: BookDocument = {
      ...bookData as BookDocument,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newBook);
    
    return NextResponse.json({
      message: 'Book added successfully',
      bookId: result.insertedId
    });
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json(
      { message: 'Error adding book' },
      { status: 500 }
    );
  }
}
