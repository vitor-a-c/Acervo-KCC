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

const validRecommendations = [
  '1A+', '1B+', '2A+', '2B+', '3A+', '3B+',
  '4A+', '4B+', '5A+', '5B+',
  'Português', 'Inglês (English)', 'Espanhol (Español)'
];

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
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📚 Biblioteca KCC</h1>

      {/* Filters */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-md border space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
      {/* Search input */}
      <div className="flex flex-col">
        <label htmlFor="search" className="text-sm font-medium mb-1">🔍 Buscar</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Título, autor ou código..."
          className="p-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Main category dropdown */}
      <div className="flex flex-col">
        <label htmlFor="main-category" className="text-sm font-medium mb-1">Tema principal</label>
        <select
          id="main-category"
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

      {/* Subcategory dropdown */}
      <div className="flex flex-col">
        <label htmlFor="sub-category" className="text-sm font-medium mb-1">Subtema</label>
        <select
          id="sub-category"
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

      {/* Availability checkbox */}
      <div className="flex items-center mt-6 md:mt-0">
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={handleAvailabilityToggle}
          id="available-only"
          className="mr-2"
        />
        <label htmlFor="available-only" className="text-sm">Mostrar apenas disponíveis</label>
      </div>
    </div>

      {/* Book cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBooks.map((book, index) => {
          const kdcCode = extractKdcCode(book['Código'] || '');
          const themeName =
            themes.find((t) => t.code === kdcCode)?.name ?? 'Tema desconhecido';

          return (
            <div
            key={index}
            className={`rounded-xl border shadow-md p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.01] space-y-2 ${
              book['Emprestado?'] === 'TRUE' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-gray-800">{book['Título']}</h2>
              <div className="flex flex-wrap gap-1 justify-end">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    book['Emprestado?'] === 'TRUE'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-green-200 text-green-800'
                  }`}
                >
                  {book['Emprestado?'] === 'TRUE' ? 'Emprestado' : 'Disponível'}
                </span>

                {validRecommendations.includes(book['Recomendação nível Sejong']) && (
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {book['Recomendação nível Sejong']}
                  </span>
                )}
              </div>
            </div>


            <p className="text-sm text-gray-700">
              <span className="font-medium">Autor:</span> {book['Autor'] || 'Desconhecido'}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-medium">Código:</span> {book['Código']}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-medium">Localização:</span> {book['Posição']}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-medium">Tema:</span> {themeName}
            </p>

            {book['Emprestado?'] === 'TRUE' && (
              <p className="text-sm text-red-600 font-medium">
                ⏳ Devolução: {book['Data prevista de retorno']}
              </p>
            )}
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