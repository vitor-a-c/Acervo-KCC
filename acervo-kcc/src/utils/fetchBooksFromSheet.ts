// src/lib/fetchBooksFromSheet.ts
import { Book } from '@/types/book';

export async function fetchBooksFromSheet(sheetId: string, sheetName: string): Promise<Book[]> {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY!;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch sheet data');
  }

  const data = await response.json();
  const [headers, ...rows] = data.values;

  return rows.map((row: string[]) => {
  const book: Record<string, string> = {};
  headers.forEach((header: string, index: number) => {
    book[header] = row[index] || '';
  });
  return book;
});
}
