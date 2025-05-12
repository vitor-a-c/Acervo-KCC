'use client';

import { useEffect, useState } from 'react';

type Book = {
  Código: string;
  Posição: string;
  Título: string;
  Autor: string;
  'Número chamada': string;
  'Categoria do livro': string;
  Tema: string;
  'Data de registro': string;
  'Emprestado?': string;
  'Data prevista de retorno': string;
  'Recomendação nível Sejong': string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedTheme, setSelectedTheme] = useState<string>('Todos');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 10;

  useEffect(() => {
    fetch('/books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // Get unique categories + themes
  const categories = Array.from(new Set(books.map((b) => b['Categoria do livro']).filter(Boolean)));
  const themes = Array.from(new Set(books.map((b) => b.Tema).filter(Boolean)));

  const filteredBooks = books.filter((book) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    String(book.Código || '').toLowerCase().includes(search) ||
    String(book.Título || '').toLowerCase().includes(search) ||
    String(book.Autor || '').toLowerCase().includes(search) ||
    String(book['Categoria do livro'] || '').toLowerCase().includes(search) ||
    String(book.Tema || '').toLowerCase().includes(search);

  const isAvailable = String(book['Emprestado?'] || '').trim().toUpperCase() === 'FALSE';
  const matchesAvailable = onlyAvailable ? isAvailable : true;

  const matchesCategory =
    selectedCategory === 'Todos' || book['Categoria do livro'] === selectedCategory;

  const matchesTheme = selectedTheme === 'Todos' || book.Tema === selectedTheme;

  return matchesSearch && matchesAvailable && matchesCategory && matchesTheme;
});


  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, onlyAvailable, selectedCategory, selectedTheme]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Acervo KCC - Biblioteca</h1>

      <input
        type="text"
        placeholder="Buscar por título, autor, código..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          Mostrar apenas disponíveis
        </label>

        <select
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Todos">Todas as categorias</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          <option value="Todos">Todos os temas</option>
          {themes.map((theme, idx) => (
            <option key={idx} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-2 text-sm text-gray-700">
        {filteredBooks.length} livro(s) encontrado(s) - Página {currentPage} de {totalPages}
      </p>

      <ul className="space-y-2 mb-4">
        {paginatedBooks.map((book, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            <p><strong>Código:</strong> {book.Código}</p>
            <p><strong>Título:</strong> {book.Título}</p>
            <p><strong>Autor:</strong> {book.Autor}</p>
            <p><strong>Categoria:</strong> {book['Categoria do livro']}</p>
            <p><strong>Tema:</strong> {book.Tema}</p>
            <p><strong>Disponível:</strong> {book['Emprestado?'] === 'FALSE' ? 'Sim' : 'Não'}</p>
          </li>
        ))}
        {paginatedBooks.length === 0 && (
          <p className="text-gray-500">Nenhum livro encontrado.</p>
        )}
      </ul>

      <div className="flex gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Próximo
        </button>
      </div>
    </main>
  );
}