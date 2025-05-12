// src/lib/fetchBooksFromSheet.ts

export async function fetchBooksFromSheet() {
  const SHEET_ID = '1DDPFzfLvP-N3DZJrQYOrelHYOkuOp6l_FejuObvKdJM';
  const SHEET_NAME = 'Acervo / 도서 목록';
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY!;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}?key=${API_KEY}`;

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
