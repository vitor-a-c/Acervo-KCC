// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchBooksCSV } from '@/lib/fetchBooks';
import { getKdcThemes, KdcTheme } from '@/lib/getKdcThemes';
import { getKdcCategories } from "@/utils/kdcUtils"; // ✅ new import
import { Book } from '@/types/book';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6HZnIZOlxHsFULlxKJ77c7tWwX07Voz5fqaVuTppaKSHUzDyIfnMRCshIULtOdIDs4GQEh2l2Ujv_/pub?gid=1081274334&single=true&output=csv';
const BOOKS_PER_PAGE = 20;

function extractKdcCode(bookCode: string): string | null {
  const match = bookCode.match(/(\d{3})/);
  return match ? match[1] : null;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [themes, setThemes] = useState<KdcTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const { mainCategories, subcategories } = getKdcCategories();


  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooksCSV<Book>(CSV_URL);
        setBooks(data);
        setThemes(getKdcThemes());
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const matchesCategory = (bookCode: string) => {
  const digitsMatch = bookCode.match(/\d{3}/);
  if (!digitsMatch) return false;
  const code = digitsMatch[0];

  if (subCategory) return code === subCategory;
  if (mainCategory) return code.startsWith(mainCategory[0]); // e.g., "1" for "100" matches "101", "102"...
  
  return true;
};

  const filteredBooks = books.filter((book) => {
  const searchMatch = [book['Título'], book['Autor'], book['Código']]
    .join(' ')
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const availableMatch = !onlyAvailable || book['Emprestado?'] !== 'TRUE';

  const categoryMatch = matchesCategory(book['Código'] || '');

  return searchMatch && availableMatch && categoryMatch;
});


  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(e.target.value);
    setCurrentPage(1);
  };

  const handleAvailabilityToggle = () => {
    setOnlyAvailable((prev) => !prev);
    setCurrentPage(1);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Biblioteca KCC</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="🔍 Buscar por título, autor ou código..."
          className="p-2 border rounded-md shadow-sm"
        />

        {/* Main Category Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Tema Principal</label>
          <select
            className="w-full border p-2 rounded"
            value={mainCategory}
            onChange={(e) => {
              setMainCategory(e.target.value);
              setSubCategory(""); // reset subcategory
            }}
          >
            <option value="">Todos os temas</option>
            {mainCategories.map((cat) => (
              <option key={cat.code} value={cat.code}>
                {cat.code} - {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div className="mb-4">
  <label className="block text-sm font-medium">Subtema</label>
  <select
    className="w-full border p-2 rounded bg-gray-100 disabled:opacity-50"
    value={subCategory}
    onChange={(e) => setSubCategory(e.target.value)}
    disabled={!mainCategory}
  >
    <option value="">Todos os subtemas</option>
    {mainCategory &&
      subcategories.get(mainCategory)?.map((sub) => (
        <option key={sub.code} value={sub.code}>
          {sub.code} - {sub.label}
        </option>
      ))}
  </select>
</div>


        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={handleAvailabilityToggle}
          />
          <span>Mostrar apenas disponíveis</span>
        </label>
      </div>

      {/* Book cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedBooks.map((book, index) => {
          const kdcCode = extractKdcCode(book['Código'] || '');
          const themeName =
            themes.find((t) => t.code === kdcCode)?.name ?? 'Tema desconhecido';

          return (
            <div
              key={index}
              className={`border p-4 rounded-xl shadow-md ${
                book['Emprestado?'] === 'TRUE'
                  ? 'bg-red-100'
                  : 'bg-green-100'
              }`}
            >
              <h2 className="text-xl font-semibold">{book['Título']}</h2>
              <p className="text-sm text-gray-700">{book['Autor']}</p>
              <p className="text-sm">📌 Local: {book['Posição']}</p>
              <p className="text-sm">🔖 Código: {book['Código']}</p>
              <p className="text-sm">🧠 Tema: {themeName}</p>
              <p className="text-sm">
                {book['Emprestado?'] === 'TRUE'
                  ? `⏳ Devolução: ${book['Data prevista de retorno']}`
                  : '✅ Disponível'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ← Anterior
        </button>
        <span className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Próxima →
        </button>
      </div>
    </main>
  );
}