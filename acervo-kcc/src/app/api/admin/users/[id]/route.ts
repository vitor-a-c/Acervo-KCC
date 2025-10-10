import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { UserDocument } from '@/types/database';
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

// PUT - Update user
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
    const collection = db.collection<UserDocument>('users');

    const updateData: Partial<UserDocument> = {
      updatedAt: new Date()
    };

    // Only update provided fields
    if (updates.name) updateData.name = updates.name;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.government_id !== undefined) updateData.government_id = updates.government_id;
    if (updates.government_id_secondary !== undefined) updateData.government_id_secondary = updates.government_id_secondary;
    if (updates.address !== undefined) updateData.address = updates.address;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Error updating user', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
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
    const usersCollection = db.collection<UserDocument>('users');

    // Check if user has active loans
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.active_loans > 0) {
      return NextResponse.json(
        { message: 'Cannot delete user with active loans' },
        { status: 400 }
      );
    }

    // Delete user
    await usersCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Error deleting user', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}