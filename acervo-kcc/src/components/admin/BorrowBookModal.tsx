'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate, calculateLoanDates } from '@/utils/dateUtils';

interface BorrowBookModalProps {
  bookCode: string;
  bookTitle: string;
  token: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BorrowBookModal({
  bookCode,
  bookTitle,
  token,
  onClose,
  onSuccess
}: BorrowBookModalProps) {
  const { t } = useLanguage();
  const { loanDate, returnDate } = calculateLoanDates();
  
  const [formData, setFormData] = useState({
    borrower_name: '',
    borrower_email: '',
    borrower_phone: '',
    borrower_id: '',
    borrower_address: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          book_codigo: bookCode,
          ...formData
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || t.loans.errors.failedToCreate);
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.loans.errors.failedToCreate);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t.loans.borrowBook}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {bookTitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded">
              {error}
            </div>
          )}

          {/* Loan Dates Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-900">{t.loans.loanDate}:</span>
                <span className="ml-2 text-blue-700">{formatDate(loanDate)}</span>
              </div>
              <div>
                <span className="font-medium text-blue-900">{t.loans.returnDate}:</span>
                <span className="ml-2 text-blue-700">{formatDate(returnDate)}</span>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              {t.loans.canExtend}
            </p>
          </div>

          {/* Borrower Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.loans.borrowerInfo}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name - Required */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.loans.borrowerNameRequired} *
                </label>
                <input
                  type="text"
                  value={formData.borrower_name}
                  onChange={(e) => setFormData({ ...formData, borrower_name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.loans.borrowerEmail}
                </label>
                <input
                  type="email"
                  value={formData.borrower_email}
                  onChange={(e) => setFormData({ ...formData, borrower_email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.loans.borrowerPhone}
                </label>
                <input
                  type="tel"
                  value={formData.borrower_phone}
                  onChange={(e) => setFormData({ ...formData, borrower_phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ID - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.loans.borrowerId}
                </label>
                <input
                  type="text"
                  value={formData.borrower_id}
                  onChange={(e) => setFormData({ ...formData, borrower_id: e.target.value })}
                  placeholder="CPF, RG..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address - Optional */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.loans.borrowerAddress}
                </label>
                <input
                  type="text"
                  value={formData.borrower_address}
                  onChange={(e) => setFormData({ ...formData, borrower_address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Notes - Optional */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.loans.notes}
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t.loans.notesPlaceholder}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              {t.admin.bookManagement.actions.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? t.admin.bookManagement.status.processing : t.loans.borrow}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}