'use client';

import { useState, useEffect } from 'react';
import { BookDocument } from '@/types/database';
import BookEditModal from './BookEditModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { formatBookCode } from '@/utils/bookUtils';

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
  const [deletingBook, setDeletingBook] = useState<BookDocument | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  // Auto-hide success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(1, searchTerm);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!deletingBook) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/books/${encodeURIComponent(deletingBook.codigo)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccessMessage(`Book "${deletingBook.titulo}" deleted successfully`);
        fetchBooks(pagination.page, searchTerm);
        setDeletingBook(null);
      } else {
        alert('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle save (from modal)
  const handleSave = () => {
    fetchBooks(pagination.page, searchTerm);
    setEditingBook(null);
    setIsAddModalOpen(false);
    setSuccessMessage('Book saved successfully');
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
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}

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
                <td className="px-4 py-3 text-sm font-mono" title={book.codigo}>
                  {formatBookCode(book.codigo)}
                </td>
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
                    onClick={() => setDeletingBook(book)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
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

      {/* Delete Confirmation Modal */}
      {deletingBook && (
        <DeleteConfirmModal
          bookCode={formatBookCode(deletingBook.codigo)}
          bookTitle={deletingBook.titulo}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingBook(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}