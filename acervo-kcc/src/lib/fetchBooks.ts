export async function fetchBooksCSV<T = unknown>(url: string): Promise<T[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  const text = await res.text();
  const parsed = Papa.parse<T>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data;
}
