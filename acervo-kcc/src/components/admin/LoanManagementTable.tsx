'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoanWithDetails } from '@/types/loan';
import { formatDate, daysUntilReturn, formatDateForInput, addDays } from '@/utils/dateUtils';
import { formatBookCodeShort } from '@/utils/bookCodeUtils';
import { shouldShowYellowWarning } from '@/types/database';

interface LoanManagementTableProps {
  token: string | null;
  onUpdate: () => void;
}

type StatusFilter = 'all' | 'active' | 'overdue' | 'returned';

export default function LoanManagementTable({ token, onUpdate }: LoanManagementTableProps) {
  const { t } = useLanguage();
  
  const [loans, setLoans] = useState<LoanWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active');
  const [editingLoanId, setEditingLoanId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<LoanWithDetails>>({});
  const [editingBookCodes, setEditingBookCodes] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/loans?status=${statusFilter}&search=${searchTerm}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLoans(data.loans || []);
      }
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchLoans();
    }
  }, [statusFilter, token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLoans();
  };

  const handleExtend = async (loan: LoanWithDetails) => {
    try {
      const response = await fetch(`/api/admin/loans/${loan._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          extended: true
        })
      });

      if (response.ok) {
        setSuccessMessage(t.admin.loanManagement.messages.extendSuccess);
        fetchLoans();
        onUpdate();
      }
    } catch (error) {
      console.error('Error extending loan:', error);
    }
  };

  const handleReturn = async (loan: LoanWithDetails) => {
    if (!confirm(t.admin.loanManagement.messages.confirmReturn.replace('{count}', loan.book_count.toString()))) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/loans/${loan._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          actual_return_date: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSuccessMessage(t.admin.loanManagement.messages.returnSuccess);
        fetchLoans();
        onUpdate();
      }
    } catch (error) {
      console.error('Error returning loan:', error);
    }
  };

  const handleStartEdit = (loan: LoanWithDetails) => {
    setEditingLoanId(loan._id);
    setEditingBookCodes(loan.book_codes.map(code => formatBookCodeShort(code)).join(', '));
    setEditForm({
      borrower_name: loan.borrower_name,
      borrower_email: loan.borrower_email,
      borrower_phone: loan.borrower_phone,
      borrower_id: loan.borrower_id,
      borrower_address: loan.borrower_address,
      extended: loan.extended,
      extended_return_date: loan.extended_return_date ? formatDateForInput(loan.extended_return_date) : undefined,
      notes: loan.notes,
      book_codes: loan.book_codes
    });
  };

  const handleCancelEdit = () => {
    setEditingLoanId(null);
    setEditForm({});
    setEditingBookCodes('');
  };

  const handleSaveEdit = async (loanId: string) => {
    try {
      // Parse book codes from the input
      const updatedBookCodes = editingBookCodes
        .split(',')
        .map(code => code.trim())
        .filter(code => code.length > 0)
        .map(code => {
          // Expand short codes to full format
          const match = code.match(/^([A-Z]{1,2})(\d+)$/i);
          if (match) {
            const [, prefix, number] = match;
            const paddingNeeded = 13 - prefix.length - number.length;
            return `${prefix.toUpperCase()}${'0'.repeat(paddingNeeded)}${number}`;
          }
          return code.toUpperCase();
        });

      const response = await fetch(`/api/admin/loans/${loanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...editForm,
          book_codes: updatedBookCodes
        })
      });

      if (response.ok) {
        setSuccessMessage(t.admin.loanManagement.messages.updateSuccess);
        setEditingLoanId(null);
        setEditForm({});
        setEditingBookCodes('');
        fetchLoans();
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating loan:', error);
    }
  };

  const handleDelete = async (loanId: string, bookCount: number) => {
    if (!confirm(t.admin.loanManagement.messages.confirmDelete.replace('{count}', bookCount.toString()))) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/loans/${loanId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccessMessage(t.admin.loanManagement.messages.deleteSuccess);
        fetchLoans();
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  const getRowColor = (loan: LoanWithDetails) => {
    if (loan.status === 'returned') return 'bg-white';
    if (loan.status === 'overdue') return 'bg-red-50';
    
    // Yellow if past initial date and not extended
    const loanData = {
      extended: loan.extended,
      actual_return_date: loan.actual_return_date ? new Date(loan.actual_return_date) : null,
      initial_return_date: new Date(loan.initial_return_date)
    };
    
    if (shouldShowYellowWarning(loanData as any)) {
      return 'bg-yellow-50';
    }
    
    return 'bg-white';
  };

  if (loading && loans.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-600">{t.admin.loanManagement.loading}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.admin.loanManagement.title}</h2>

        {/* Search and Filters */}
        <div className="space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.admin.loanManagement.searchPlaceholder}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t.admin.loanManagement.searchButton}
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                fetchLoans();
              }}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              {t.admin.loanManagement.clearButton}
            </button>
          </form>

          {/* Status Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 text-sm rounded ${
                statusFilter === 'all'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.admin.loanManagement.filters.all}
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 text-sm rounded ${
                statusFilter === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.admin.loanManagement.filters.active}
            </button>
            <button
              onClick={() => setStatusFilter('overdue')}
              className={`px-4 py-2 text-sm rounded ${
                statusFilter === 'overdue'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.admin.loanManagement.filters.overdue}
            </button>
            <button
              onClick={() => setStatusFilter('returned')}
              className={`px-4 py-2 text-sm rounded ${
                statusFilter === 'returned'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.admin.loanManagement.filters.returned}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.admin.loanManagement.columns.user}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.admin.loanManagement.columns.books}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.admin.loanManagement.columns.loanDate}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.admin.loanManagement.columns.returnDate}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.admin.loanManagement.columns.status}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.admin.loanManagement.columns.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => {
              const isEditing = editingLoanId === loan._id;
              const rowColor = getRowColor(loan);
              const returnDate = loan.extended && loan.extended_return_date 
                ? loan.extended_return_date 
                : loan.initial_return_date;
              const daysLeft = loan.status === 'active' || loan.status === 'overdue' 
                ? daysUntilReturn(returnDate)
                : null;

              return (
                <tr key={loan._id} className={`hover:bg-gray-50 ${rowColor}`}>
                  {/* User */}
                  <td className="px-4 py-3 text-sm">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.borrower_name || ''}
                        onChange={(e) => setEditForm({ ...editForm, borrower_name: e.target.value })}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    ) : (
                      <div>
                        <p className="font-medium">{loan.borrower_name}</p>
                        {loan.borrower_phone && (
                          <p className="text-xs text-gray-500">{loan.borrower_phone}</p>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Books */}
                  <td className="px-4 py-3 text-sm">
                    {isEditing ? (
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700">
                          Códigos dos Livros
                        </label>
                        <textarea
                          value={editingBookCodes}
                          onChange={(e) => setEditingBookCodes(e.target.value)}
                          placeholder="EM2112, A0001, ..."
                          rows={2}
                          className="w-full px-2 py-1 border rounded text-xs font-mono"
                        />
                        <p className="text-xs text-gray-500">
                          {editingBookCodes.split(',').filter(c => c.trim()).length} livro(s)
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {t.admin.loanManagement.details.bookCount.replace('{count}', loan.book_count.toString())}
                        </span>
                        <details className="inline">
                          <summary className="text-blue-600 cursor-pointer text-xs">
                            {t.admin.loanManagement.details.view}
                          </summary>
                          <div className="mt-2 p-2 bg-gray-50 rounded text-xs space-y-1">
                            {loan.book_details?.map((book, idx) => (
                              <div key={idx} className={book.found ? 'text-gray-700' : 'text-yellow-700'}>
                                {formatBookCodeShort(book.code)} - {book.title || t.admin.loanManagement.details.notFound}
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    )}
                  </td>

                  {/* Loan Date */}
                  <td className="px-4 py-3 text-sm">
                    {formatDate(loan.loan_date)}
                  </td>

                  {/* Return Date */}
                  <td className="px-4 py-3 text-sm">
                    {loan.status === 'returned' ? (
                      <span className="text-green-600">
                        {t.admin.loanManagement.details.returnedOn.replace('{date}', formatDate(loan.actual_return_date!))}
                      </span>
                    ) : isEditing ? (
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs">
                          <input
                            type="checkbox"
                            checked={editForm.extended || false}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setEditForm({ 
                                ...editForm, 
                                extended: checked,
                                extended_return_date: checked 
                                  ? formatDateForInput(addDays(new Date(loan.initial_return_date), 21))
                                  : undefined
                              });
                            }}
                            className="h-4 w-4"
                          />
                          {t.admin.loanManagement.status.extended}
                        </label>
                        {editForm.extended && (
                          <input
                            type="date"
                            value={editForm.extended_return_date || ''}
                            onChange={(e) => setEditForm({ ...editForm, extended_return_date: e.target.value })}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                        )}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Observações
                          </label>
                          <textarea
                            value={editForm.notes || ''}
                            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                            placeholder="Adicionar comentários..."
                            rows={2}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">{formatDate(returnDate)}</p>
                        {daysLeft !== null && (
                          <p className={`text-xs ${daysLeft < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                            {daysLeft < 0 
                              ? t.admin.loanManagement.details.daysOverdue.replace('{days}', Math.abs(daysLeft).toString())
                              : t.admin.loanManagement.details.daysLeft.replace('{days}', daysLeft.toString())
                            }
                          </p>
                        )}
                        {loan.extended && (
                          <span className="text-xs text-blue-600">{t.admin.loanManagement.status.extended}</span>
                        )}
                        {loan.notes && (
                          <p className="text-xs text-gray-600 mt-1 italic">💬 {loan.notes}</p>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      loan.status === 'returned'
                        ? 'bg-green-100 text-green-700'
                        : loan.status === 'overdue'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {loan.status === 'returned' 
                        ? t.admin.loanManagement.status.returned 
                        : loan.status === 'overdue' 
                        ? t.admin.loanManagement.status.overdue 
                        : t.admin.loanManagement.status.active}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-sm">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(loan._id)}
                          className="text-green-600 hover:text-green-800 text-xs"
                        >
                          {t.admin.loanManagement.actions.save}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-800 text-xs"
                        >
                          {t.admin.loanManagement.actions.cancel}
                        </button>
                      </div>
                    ) : loan.status !== 'returned' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleExtend(loan)}
                          disabled={loan.extended}
                          className="text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                          title={loan.extended ? t.admin.loanManagement.status.alreadyExtended : undefined}
                        >
                          {t.admin.loanManagement.actions.extend}
                        </button>
                        <button
                          onClick={() => handleReturn(loan)}
                          className="text-green-600 hover:text-green-800 text-xs"
                        >
                          {t.admin.loanManagement.actions.return}
                        </button>
                        <button
                          onClick={() => handleStartEdit(loan)}
                          className="text-gray-600 hover:text-gray-800 text-xs"
                        >
                          {t.admin.loanManagement.actions.edit}
                        </button>
                        <button
                          onClick={() => handleDelete(loan._id, loan.book_count)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          {t.admin.loanManagement.actions.delete}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDelete(loan._id, loan.book_count)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        {t.admin.loanManagement.actions.delete}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {loans.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {t.admin.loanManagement.noLoans}
          </div>
        )}
      </div>
    </div>
  );
}