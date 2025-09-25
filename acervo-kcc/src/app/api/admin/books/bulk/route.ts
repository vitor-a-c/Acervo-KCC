import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
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

// DELETE - Bulk delete books
export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { codes } = await request.json();
    
    if (!codes || !Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json(
        { message: 'No book codes provided' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection('books');
    
    const result = await collection.deleteMany({
      codigo: { $in: codes }
    });

    return NextResponse.json({
      message: `${result.deletedCount} books deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error in bulk delete:', error);
    return NextResponse.json(
      { message: 'Error deleting books' },
      { status: 500 }
    );
  }
}

// PATCH - Bulk update books
export async function PATCH(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { codes, field, value } = await request.json();
    
    if (!codes || !Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json(
        { message: 'No book codes provided' },
        { status: 400 }
      );
    }

    if (!field || value === undefined) {
      return NextResponse.json(
        { message: 'Field and value are required' },
        { status: 400 }
      );
    }

    // Whitelist allowed fields for bulk update
    const allowedFields = ['posicao', 'categoria_livro', 'emprestado', 'nivel_sejong'];
    if (!allowedFields.includes(field)) {
      return NextResponse.json(
        { message: 'Field not allowed for bulk update' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection('books');
    
    const updateData = {
      [field]: value,
      updatedAt: new Date()
    };

    const result = await collection.updateMany(
      { codigo: { $in: codes } },
      { $set: updateData }
    );

    return NextResponse.json({
      message: `${result.modifiedCount} books updated successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error in bulk update:', error);
    return NextResponse.json(
      { message: 'Error updating books' },
      { status: 500 }
    );
  }
}