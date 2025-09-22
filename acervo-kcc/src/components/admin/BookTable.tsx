'use client';

import { useState, useEffect } from 'react';
import { BookDocument } from '@/types/database';
import BookEditModal from './BookEditModal';

interface BookTableProps {
  token: string | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function BookTable({ token }: BookTableProps) {
  const [books, setBooks] = useState<BookDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0
  });
  const [editingBook, setEditingBook] = useState<BookDocument | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Fetch books
  const fetchBooks = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/books?page=${page}&search=${search}&limit=50`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBooks(data.books);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBooks(pagination.page, searchTerm);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(1, searchTerm);
  };

  // Handle delete
  const handleDelete = async (codigo: string) => {
    if (!deleteConfirm || deleteConfirm !== codigo) {
      setDeleteConfirm(codigo);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    try {
      const response = await fetch(`/api/admin/books/${encodeURIComponent(codigo)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchBooks(pagination.page, searchTerm);
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Handle save (from modal)
  const handleSave = () => {
    fetchBooks(pagination.page, searchTerm);
    setEditingBook(null);
    setIsAddModalOpen(false);
  };

  if (loading && books.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Book Management</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add New Book
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, code..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              fetchBooks(1, '');
            }}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Clear
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.codigo} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-mono">{book.codigo}</td>
                <td className="px-4 py-3 text-sm">{book.titulo}</td>
                <td className="px-4 py-3 text-sm">{book.autor}</td>
                <td className="px-4 py-3 text-sm">{book.posicao}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    book.emprestado 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {book.emprestado ? 'Borrowed' : 'Available'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => setEditingBook(book)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.codigo)}
                    className={`${
                      deleteConfirm === book.codigo 
                        ? 'text-red-600 font-bold' 
                        : 'text-red-600 hover:text-red-800'
                    }`}
                  >
                    {deleteConfirm === book.codigo ? 'Confirm?' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} books
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchBooks(pagination.page - 1, searchTerm)}
              disabled={pagination.page === 1}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchBooks(pagination.page + 1, searchTerm)}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingBook && (
        <BookEditModal
          book={editingBook}
          token={token}
          onClose={() => setEditingBook(null)}
          onSave={handleSave}
        />
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <BookEditModal
          book={null}
          token={token}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}