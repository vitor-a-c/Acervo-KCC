import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { BookDocument } from '@/types/database';
import { Book } from '@/types/book';

// Convert MongoDB document to frontend Book format
function documentToBook(doc: BookDocument): Book {
  return {
    'Código': doc.codigo,
    'Posição': doc.posicao,
    'Título': doc.titulo,
    'Autor': doc.autor,
    'Número chamada': doc.numero_chamada,
    'Categoria do livro': doc.categoria_livro,
    'Tema': doc.tema,
    'Data de registro': doc.data_registro,
    'Emprestado?': doc.emprestado ? 'TRUE' : 'FALSE',
    'Data prevista de retorno': doc.data_retorno || '',
    'Recomendação nível Sejong': doc.nivel_sejong || ''
  };
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const collection = db.collection<BookDocument>('books');
    
    // Fetch all books
    const documents = await collection.find({}).toArray();
    
    // Convert to frontend format
    const books = documents.map(documentToBook);
    
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { message: 'Error fetching books', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}