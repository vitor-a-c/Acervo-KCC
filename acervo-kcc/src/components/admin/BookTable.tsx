'use client';

import { useState, useEffect } from 'react';
import { BookDocument } from '@/types/database';
import BookEditModal from './BookEditModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import BulkActionsBar from './BulkActionsBar';
import BulkEditModal from './BulkEditModal';
import PasteCodesModal from './PasteCodesModal';
import { formatBookCodeShort } from '@/utils/bookCodeUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

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
  const { language } = useLanguage();
  const t = getTranslation(language);
  
  const [books, setBooks] = useState<BookDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0
  });
  
  // Modals
  const [editingBook, setEditingBook] = useState<BookDocument | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingBook, setDeletingBook] = useState<BookDocument | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Selection state
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [showPasteCodes, setShowPasteCodes] = useState(false);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

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
    let term = searchTerm.trim();
    // Handle short code format
    const codeMatch = term.match(/^([A-Z]{2})(\d{1,})$/i);
    if (codeMatch) {
      const prefix = codeMatch[1].toUpperCase();
      const num = codeMatch[2].padStart(10, '0');
      term = `${prefix}${num}`;
    } else {
      const singleCodeMatch = term.match(/^A(\d{1,11})$/i);
      if (singleCodeMatch) {
        const num = singleCodeMatch[1].padStart(11, '0');
        term = `A${num}`;
      }
    }
    fetchBooks(1, term);
  };

  // Handle selection
  const toggleSelection = (codigo: string) => {
    const newSelection = new Set(selectedBooks);
    if (newSelection.has(codigo)) {
      newSelection.delete(codigo);
    } else {
      newSelection.add(codigo);
    }
    setSelectedBooks(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedBooks.size === books.length) {
      setSelectedBooks(new Set());
    } else {
      setSelectedBooks(new Set(books.map(book => book.codigo)));
    }
  };

  // Handle paste codes
  const handlePasteCodes = (codes: string[]) => {
    const newSelection = new Set<string>();
    codes.forEach(code => {
      const book = books.find(b => b.codigo === code);
      if (book) {
        newSelection.add(book.codigo);
      }
    });
    setSelectedBooks(newSelection);
    setShowPasteCodes(false);
    setSuccessMessage(t.admin.bookManagement.messages.booksBulkSelected.replace('{count}', newSelection.size.toString()));
  };

  // Handle bulk edit
  const handleBulkEdit = async (field: string, value: string | boolean) => {
    setIsBulkProcessing(true);
    try {
      const response = await fetch('/api/admin/books/bulk', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          codes: Array.from(selectedBooks),
          field,
          value
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        fetchBooks(pagination.page, searchTerm);
        setSelectedBooks(new Set());
        setShowBulkEdit(false);
      } else {
        alert(t.admin.bookManagement.messages.failedToUpdate);
      }
    } catch (error) {
      console.error('Error updating books:', error);
      alert(t.admin.bookManagement.messages.errorUpdating);
    } finally {
      setIsBulkProcessing(false);
    }
  };

  // Handle bulk delete
  const handleBulkDeleteConfirm = async () => {
    setIsBulkProcessing(true);
    try {
      const response = await fetch('/api/admin/books/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          codes: Array.from(selectedBooks)
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        fetchBooks(pagination.page, searchTerm);
        setSelectedBooks(new Set());
        setShowBulkDelete(false);
      } else {
        alert(t.admin.bookManagement.messages.failedToDelete);
      }
    } catch (error) {
      console.error('Error deleting books:', error);
      alert(t.admin.bookManagement.messages.failedToDelete);
    } finally {
      setIsBulkProcessing(false);
    }
  };

  // Handle single delete
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
        setSuccessMessage(t.admin.bookManagement.messages.bookDeleted.replace('{title}', deletingBook.titulo));
        fetchBooks(pagination.page, searchTerm);
        setDeletingBook(null);
      } else {
        alert(t.admin.bookManagement.messages.failedToDelete);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert(t.admin.bookManagement.messages.failedToDelete);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle save
  const handleSave = () => {
    fetchBooks(pagination.page, searchTerm);
    setEditingBook(null);
    setIsAddModalOpen(false);
    setSuccessMessage(t.admin.bookManagement.messages.bookSaved);
  };

  if (loading && books.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-600">{t.admin.bookManagement.loadingBooks}</p>
      </div>
    );
  }

  const start = (pagination.page - 1) * pagination.limit + 1;
  const end = Math.min(pagination.page * pagination.limit, pagination.total);

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
          <h2 className="text-2xl font-bold text-gray-900">{t.admin.bookManagement.title}</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {t.admin.bookManagement.addNewBook}
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.admin.bookManagement.searchPlaceholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t.admin.bookManagement.searchButton}
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              fetchBooks(1, '');
            }}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            {t.admin.bookManagement.clearButton}
          </button>
        </form>
      </div>

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedBooks.size}
        onEdit={() => setShowBulkEdit(true)}
        onDelete={() => setShowBulkDelete(true)}
        onClear={() => setSelectedBooks(new Set())}
        onPasteCodes={() => setShowPasteCodes(true)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={books.length > 0 && selectedBooks.size === books.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t.admin.bookManagement.columns.code}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t.admin.bookManagement.columns.title}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t.admin.bookManagement.columns.author}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t.admin.bookManagement.columns.location}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t.admin.bookManagement.columns.status}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t.admin.bookManagement.columns.actions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.codigo} className={`hover:bg-gray-50 ${selectedBooks.has(book.codigo) ? 'bg-blue-50' : ''}`}>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedBooks.has(book.codigo)}
                    onChange={() => toggleSelection(book.codigo)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-mono" title={book.codigo}>
                  {formatBookCodeShort(book.codigo)}
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
                    {book.emprestado ? t.admin.bookManagement.status.borrowed : t.admin.bookManagement.status.available}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => setEditingBook(book)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    {t.admin.bookManagement.actions.edit}
                  </button>
                  <button
                    onClick={() => setDeletingBook(book)}
                    className="text-red-600 hover:text-red-800"
                  >
                    {t.admin.bookManagement.actions.delete}
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
            {t.admin.bookManagement.showingBooks
              .replace('{start}', start.toString())
              .replace('{end}', end.toString())
              .replace('{total}', pagination.total.toString())}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchBooks(pagination.page - 1, searchTerm)}
              disabled={pagination.page === 1}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {t.pagination.previous}
            </button>
            <span className="px-4 py-2">
              {t.pagination.page} {pagination.page} {t.pagination.of} {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchBooks(pagination.page + 1, searchTerm)}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {t.pagination.next}
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {editingBook && (
        <BookEditModal
          book={editingBook}
          token={token}
          onClose={() => setEditingBook(null)}
          onSave={handleSave}
        />
      )}

      {isAddModalOpen && (
        <BookEditModal
          book={null}
          token={token}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {deletingBook && (
        <DeleteConfirmModal
          bookCode={formatBookCodeShort(deletingBook.codigo)}
          bookTitle={deletingBook.titulo}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingBook(null)}
          isDeleting={isDeleting}
        />
      )}

      {showBulkEdit && (
        <BulkEditModal
          selectedCount={selectedBooks.size}
          onConfirm={handleBulkEdit}
          onCancel={() => setShowBulkEdit(false)}
          isUpdating={isBulkProcessing}
        />
      )}

      {showBulkDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.admin.modals.deleteConfirm.bulkTitle}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.admin.modals.deleteConfirm.bulkMessage.replace('{count}', selectedBooks.size.toString())}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBulkDelete(false)}
                disabled={isBulkProcessing}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                {t.admin.bookManagement.actions.cancel}
              </button>
              <button
                onClick={handleBulkDeleteConfirm}
                disabled={isBulkProcessing}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isBulkProcessing 
                  ? t.admin.bookManagement.status.deleting 
                  : t.admin.modals.deleteConfirm.bulkDeleteButton.replace('{count}', selectedBooks.size.toString())}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasteCodes && (
        <PasteCodesModal
          onConfirm={handlePasteCodes}
          onCancel={() => setShowPasteCodes(false)}
        />
      )}
    </div>
  );
}