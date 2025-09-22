import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import Papa from 'papaparse';
import jwt from 'jsonwebtoken';
import { BookDocument, CSV_COLUMN_MAPPING, isBookBorrowed, extractKdcCode } from '@/types/database';
import { getDetailedTheme } from '@/utils/hybridKdcUtils';

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const JWT_SECRET = process.env.JWT_SECRET;

// Verify admin token
function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// Define the shape of CSV row data
interface CSVRow {
  [key: string]: string | number | undefined;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the uploaded file
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Read file content as UTF-8 text
    const text = await file.text();
    
    // Parse CSV synchronously
    const parseResult = Papa.parse<CSVRow>(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
    });

    if (parseResult.errors && parseResult.errors.length > 0) {
      // Only fail if there are critical errors
      const criticalErrors = parseResult.errors.filter(e => e.type === 'Quotes' || e.type === 'FieldMismatch');
      if (criticalErrors.length > 0) {
        return NextResponse.json(
          { message: 'CSV parsing failed', errors: criticalErrors },
          { status: 400 }
        );
      }
    }

    const csvData = parseResult.data;
    
    // Connect to MongoDB
    const db = await getDatabase();
    const collection = db.collection<BookDocument>('books');
    
    // Process upload statistics
    const stats = {
      total: csvData.length,
      processed: 0,
      added: 0,
      updated: 0,
      errors: [] as string[]
    };

    // Process each row
    for (let i = 0; i < csvData.length; i++) {
      const row = csvData[i];
      
      try {
        // Map CSV columns to database fields
        const bookData: Partial<BookDocument> = {
          updatedAt: new Date(),
          lastImportedAt: new Date()
        };

        // Map fields based on column mapping
        for (const [csvColumn, dbField] of Object.entries(CSV_COLUMN_MAPPING)) {
          if (row[csvColumn] !== undefined && row[csvColumn] !== '') {
            const value = row[csvColumn];
            
            // Type conversion based on field
            if (dbField === 'numero_sequencial' || dbField === 'ano_publicacao') {
              (bookData as Record<string, unknown>)[dbField] = parseInt(String(value)) || 0;
            } else if (dbField === 'preco') {
              (bookData as Record<string, unknown>)[dbField] = parseFloat(String(value)) || 0;
            } else {
              (bookData as Record<string, unknown>)[dbField] = value?.toString() || '';
            }
          }
        }

        // Ensure required fields have default values
        bookData.codigo = bookData.codigo || `TEMP_${Date.now()}_${i}`;
        bookData.titulo = bookData.titulo || 'Sem título';
        bookData.autor = bookData.autor || 'Desconhecido';
        bookData.posicao = bookData.posicao || 'Não especificado';
        bookData.numero_chamada = bookData.numero_chamada || '';
        bookData.categoria_livro = bookData.categoria_livro || '';
        bookData.data_registro = bookData.data_registro || new Date().toISOString().split('T')[0];
        
        // Determine if book is borrowed based on material status
        bookData.emprestado = isBookBorrowed(bookData.estado_material || '');
        
        // Extract theme from KDC code
        const kdcCode = extractKdcCode(bookData.numero_chamada);
        if (kdcCode) {
          bookData.tema = getDetailedTheme(kdcCode, 'pt');
        } else {
          bookData.tema = 'Tema desconhecido';
        }
        
        // Default values for fields not in CSV
        bookData.data_retorno = '';
        bookData.nivel_sejong = '';

        // Check if book exists (by codigo/registration number)
        const existingBook = await collection.findOne({ codigo: bookData.codigo });
        
        if (existingBook) {
          // Update existing book (preserve certain fields)
          const updateData = {
            ...bookData,
            emprestado: existingBook.emprestado, // Preserve rental status
            data_retorno: existingBook.data_retorno, // Preserve return date
            nivel_sejong: existingBook.nivel_sejong, // Preserve Sejong level
            createdAt: existingBook.createdAt // Preserve creation date
          };
          
          await collection.updateOne(
            { codigo: bookData.codigo },
            { $set: updateData }
          );
          stats.updated++;
        } else {
          // Add new book
          bookData.createdAt = new Date();
          await collection.insertOne(bookData as BookDocument);
          stats.added++;
        }
        
        stats.processed++;
      } catch (error) {
        const errorMsg = `Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        stats.errors.push(errorMsg);
      }
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}