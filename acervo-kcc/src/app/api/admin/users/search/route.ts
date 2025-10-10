import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { UserDocument, LoanDocument, calculateLoanStatus } from '@/types/database';
import { daysUntilReturn } from '@/utils/dateUtils';
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

// GET - Autocomplete search for users
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.length < 2) {
      return NextResponse.json({ users: [] });
    }

    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    const loansCollection = db.collection<LoanDocument>('loans');
    
    // Search users by name (case-insensitive, partial match)
    const users = await usersCollection
      .find({
        name: { $regex: query, $options: 'i' }
      })
      .limit(limit)
      .sort({ name: 1 })
      .toArray();
    
    // Enrich with overdue loan details
    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        const userIdStr = user._id?.toString();
        
        // Get active loans for this user
        const activeLoans = await loansCollection.find({
          user_id: userIdStr ? new ObjectId(userIdStr) : undefined,
          actual_return_date: null
        }).toArray();
        
        // Check for overdue loans
        const overdueLoans = activeLoans
          .map(loan => ({
            loan,
            status: calculateLoanStatus(loan)
          }))
          .filter(({ status }) => status === 'overdue')
          .map(({ loan }) => {
            const returnDate = loan.extended && loan.extended_return_date 
              ? loan.extended_return_date 
              : loan.initial_return_date;
            
            return {
              loan_id: loan._id?.toString() || '',
              return_date: returnDate.toISOString().split('T')[0],
              days_overdue: Math.abs(daysUntilReturn(returnDate))
            };
          });
        
        return {
          _id: userIdStr || '',
          name: user.name,
          email: user.email,
          phone: user.phone,
          government_id: user.government_id,
          government_id_secondary: user.government_id_secondary,
          address: user.address,
          active_loans: user.active_loans,
          has_overdue: overdueLoans.length > 0,
          overdue_details: overdueLoans
        };
      })
    );
    
    return NextResponse.json({ users: enrichedUsers });
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json(
      { message: 'Error searching users' },
      { status: 500 }
    );
  }
}