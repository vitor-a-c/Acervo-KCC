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

  useEffect(() => {
    fetch('/books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks = books.filter((book) =>
  String(book.Título || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  String(book.Autor || '').toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Acervo KCC - Biblioteca</h1>

      <input
        type="text"
        placeholder="Buscar por título ou autor..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="space-y-2">
        {filteredBooks.map((book, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            <p><strong>Código:</strong> {book.Código}</p>
            <p><strong>Título:</strong> {book.Título}</p>
            <p><strong>Autor:</strong> {book.Autor}</p>
            <p><strong>Categoria:</strong> {book['Categoria do livro']}</p>
          </li>
        ))}
        {filteredBooks.length === 0 && (
          <p className="text-gray-500">Nenhum livro encontrado.</p>
        )}
      </ul>
    </main>
  );
}
