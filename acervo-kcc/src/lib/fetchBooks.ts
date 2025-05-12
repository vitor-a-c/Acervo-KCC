// src/lib/fetchBooks.ts

export async function fetchBooksCSV<T = any>(url: string): Promise<T[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  const text = await res.text();
  const rows = text.trim().split('\n').map(row => row.split(','));

  const headers = rows[0].map(header => header.trim());
  const data = rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((key, i) => {
      obj[key] = row[i]?.trim() || '';
    });
    return obj as T;
  });

  return data;
}
