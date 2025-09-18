import { Book } from '@/types/book';

// This function now fetches from MongoDB instead of Google Sheets
export async function fetchBooksFromSheet(): Promise<Book[]> {
  try {
    // First try to fetch from MongoDB API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/api/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for better performance
      next: { revalidate: 60 } // Cache for 1 minute
    });

    if (response.ok) {
      const books = await response.json();
      return books;
    }

    // Fallback to Google Sheets if MongoDB fails (for backward compatibility during migration)
    console.warn('MongoDB fetch failed, falling back to Google Sheets');
    return fetchFromGoogleSheets();
  } catch (error) {
    console.error('Error fetching books:', error);
    // Fallback to Google Sheets
    return fetchFromGoogleSheets();
  }
}

// Type-safe function to create a Book from row data
function createBookFromRow(headers: string[], row: string[]): Book {
  // Create a map for header to value mapping
  const headerValueMap = new Map<string, string>();
  
  headers.forEach((header, index) => {
    headerValueMap.set(header, row[index] || '');
  });
  
  // Helper function to get value with fallback
  const getValue = (key: keyof Book): string => {
    return headerValueMap.get(key) || '';
  };
  
  // Return a complete Book object with defaults for any missing fields
  return {
    'Código': getValue('Código'),
    'Posição': getValue('Posição'),
    'Título': getValue('Título'),
    'Autor': getValue('Autor'),
    'Número chamada': getValue('Número chamada'),
    'Categoria do livro': getValue('Categoria do livro'),
    'Tema': getValue('Tema'),
    'Data de registro': getValue('Data de registro'),
    'Emprestado?': getValue('Emprestado?') || 'FALSE',
    'Data prevista de retorno': getValue('Data prevista de retorno'),
    'Recomendação nível Sejong': getValue('Recomendação nível Sejong')
  };
}

// Keep the original Google Sheets function as fallback
async function fetchFromGoogleSheets(): Promise<Book[]> {
  const SHEET_ID = '1DDPFzfLvP-N3DZJrQYOrelHYOkuOp6l_FejuObvKdJM';
  const SHEET_NAME = 'Acervo / 도서 목록';
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

  if (!API_KEY) {
    throw new Error('Google Sheets API key not configured');
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}?key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch sheet data');
  }

  const data = await response.json();
  const [headers, ...rows] = data.values;

  // Use the type-safe createBookFromRow function
  return rows.map((row: string[]) => createBookFromRow(headers, row));
}