import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { UserDocument } from '@/types/database';
import Papa from 'papaparse';
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

// GET - Fetch users with search and pagination
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
    const collection = db.collection<UserDocument>('users');
    
    // Build search query
    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { government_id: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const [users, total] = await Promise.all([
      collection.find(query).skip(skip).limit(limit).sort({ name: 1 }).toArray(),
      collection.countDocuments(query)
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    );
  }
}

// POST - Create user or import from CSV
export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    
    // Handle CSV import
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      
      if (!file) {
        return NextResponse.json(
          { message: 'No file uploaded' },
          { status: 400 }
        );
      }
      
      // Read file as UTF-8 text (same as working book CSV upload)
      const text = await file.text();
      
      // Parse with same config as working upload
      const parseResult = Papa.parse<Record<string, string>>(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
      });
      
      if (parseResult.errors && parseResult.errors.length > 0) {
        // Only fail on critical errors
        const criticalErrors = parseResult.errors.filter(e => 
          e.type === 'Quotes' || e.type === 'FieldMismatch'
        );
        if (criticalErrors.length > 0) {
          return NextResponse.json(
            { message: 'CSV parsing failed', errors: criticalErrors },
            { status: 400 }
          );
        }
      }
      
      const csvData = parseResult.data;
      const db = await getDatabase();
      const collection = db.collection<UserDocument>('users');
      
      const stats = {
        total: csvData.length,
        processed: 0,
        imported: 0,
        skipped: 0,
        errors: [] as string[]
      };
      
      // Process each row
      for (let i = 0; i < csvData.length; i++) {
        const row = csvData[i];
        
        try {
          // Extract fields using flexible column matching
          const getField = (variations: string[]): string | undefined => {
            const headers = Object.keys(row);
            for (const variation of variations) {
              const match = headers.find(h => 
                h.toLowerCase().includes(variation.toLowerCase())
              );
              if (match && row[match] !== undefined && row[match] !== '') {
                return String(row[match]).trim();
              }
            }
            return undefined;
          };
          
          const name = getField(['nome', 'name', '이름']);
          
          // Skip rows without names
          if (!name || name.length === 0) {
            stats.skipped++;
            continue;
          }
          
          // Clean phone (remove formatting)
          const rawPhone = getField(['telefone', 'phone', 'celular', 'fone', '전화']);
          const phone = rawPhone ? rawPhone.replace(/[-().\s]/g, '') : undefined;
          
          // Clean address (remove line breaks)
          const rawAddress = getField(['endereço', 'endereco', 'address', 'rua', '주소']);
          const address = rawAddress ? rawAddress.replace(/[\r\n]+/g, ' ').trim() : undefined;
          
          const email = getField(['email', 'e-mail', 'correio', '이메일']);
          const government_id = getField(['cpf', 'rg', 'id', 'documento', 'identificação', '신분증']);
          
          // Check for duplicate by name (case-insensitive)
          const existing = await collection.findOne({
            name: { $regex: `^${name}$`, $options: 'i' }
          });
          
          if (existing) {
            stats.skipped++;
            continue;
          }
          
          const now = new Date();
          const userDoc: UserDocument = {
            name,
            email,
            phone,
            government_id,
            government_id_secondary: undefined,
            address,
            active_loans: 0,
            total_loans: 0,
            has_overdue: false,
            createdAt: now,
            updatedAt: now
          };
          
          await collection.insertOne(userDoc);
          stats.imported++;
          stats.processed++;
          
        } catch (err) {
          const errorMsg = `Row ${i + 1}: ${err instanceof Error ? err.message : 'Unknown error'}`;
          stats.errors.push(errorMsg);
        }
      }
      
      return NextResponse.json(stats);
    }
    
    // Handle single user creation (JSON)
    const body = await request.json();
    const { name, email, phone, government_id, government_id_secondary, address } = body;
    
    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }
    
    const db = await getDatabase();
    const collection = db.collection<UserDocument>('users');
    
    // Check for duplicate
    const existing = await collection.findOne({
      name: { $regex: `^${name.trim()}$`, $options: 'i' }
    });
    
    if (existing) {
      return NextResponse.json(
        { message: 'User with this name already exists' },
        { status: 400 }
      );
    }
    
    const now = new Date();
    const userDoc: UserDocument = {
      name: name.trim(),
      email: email?.trim(),
      phone: phone?.trim(),
      government_id: government_id?.trim(),
      government_id_secondary: government_id_secondary?.trim(),
      address: address?.trim(),
      active_loans: 0,
      total_loans: 0,
      has_overdue: false,
      createdAt: now,
      updatedAt: now
    };
    
    const result = await collection.insertOne(userDoc);
    
    return NextResponse.json({
      message: 'User created successfully',
      userId: result.insertedId.toString(),
      user: {
        ...userDoc,
        _id: result.insertedId.toString()
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
}