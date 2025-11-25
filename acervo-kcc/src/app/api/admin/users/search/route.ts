import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { UserDocument, LoanDocument, calculateLoanStatus } from '@/types/database';
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

// GET - Search users by name, email, phone, or government_id
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    if (query.length < 2) {
      return NextResponse.json({ users: [] });
    }

    const db = await getDatabase();
    const usersCollection = db.collection<UserDocument>('users');
    const loansCollection = db.collection<LoanDocument>('loans');

    // Search for users matching the query
    const users = await usersCollection
      .find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
          { phone: { $regex: query, $options: 'i' } },
          { government_id: { $regex: query, $options: 'i' } }
        ]
      })
      .limit(20)
      .sort({ name: 1 })
      .toArray();

    // Enrich users with overdue loan details
    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        const overdueDetails: { loan_id: string; return_date: string; days_overdue: number }[] = [];
        
        if (user.has_overdue) {
          // Get active loans for this user
          const activeLoans = await loansCollection
            .find({
              user_id: user._id,
              actual_return_date: null
            })
            .toArray();
          
          // Check each loan for overdue status
          for (const loan of activeLoans) {
            const status = calculateLoanStatus(loan);
            if (status === 'overdue') {
              const returnDate = loan.extended && loan.extended_return_date
                ? loan.extended_return_date
                : loan.initial_return_date;
              
              const now = new Date();
              const diffTime = now.getTime() - returnDate.getTime();
              const daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              overdueDetails.push({
                loan_id: loan._id?.toString() || '',
                return_date: returnDate.toISOString(),
                days_overdue: daysOverdue
              });
            }
          }
        }

        return {
          _id: user._id?.toString() || '',
          name: user.name,
          email: user.email,
          phone: user.phone,
          government_id: user.government_id,
          government_id_secondary: user.government_id_secondary,
          address: user.address,
          active_loans: user.active_loans,
          has_overdue: user.has_overdue,
          overdue_details: overdueDetails.length > 0 ? overdueDetails : undefined,
          banned: user.banned || false,
          suspensionEndDate: user.suspensionEndDate?.toISOString()
        };
      })
    );

    return NextResponse.json({ users: enrichedUsers });
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json(
      { message: 'Error searching users', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}