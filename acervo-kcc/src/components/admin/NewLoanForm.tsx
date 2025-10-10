'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import UserSearchInput from './UserSearchInput';
import BookCodesInput from './BookCodesInput';
import { UserSearchResult } from '@/types/user';
import { BookValidationResult } from '@/types/loan';
import { formatDateForInput, addDays, formatDate } from '@/utils/dateUtils';

interface NewLoanFormProps {
  token: string | null;
  onSuccess: () => void;
}

export default function NewLoanForm({ token, onSuccess }: NewLoanFormProps) {
  const { t } = useLanguage();
  
  const [selectedUser, setSelectedUser] = useState<UserSearchResult | null>(null);
  const [bookCodes, setBookCodes] = useState<string[]>([]);
  const [validatedBooks, setValidatedBooks] = useState<BookValidationResult[]>([]);
  
  const [formData, setFormData] = useState({
    borrower_email: '',
    borrower_phone: '',
    borrower_id: '',
    borrower_address: '',
    loan_date: formatDateForInput(new Date()),
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUserSelect = (user: UserSearchResult | null) => {
    setSelectedUser(user);
    
    if (user) {
      // Auto-fill form with user data if available
      setFormData({
        borrower_email: user.email || '',
        borrower_phone: user.phone || '',
        borrower_id: user.government_id || '',
        borrower_address: user.address || '',
        loan_date: formData.loan_date,
        notes: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!selectedUser) {
      setError(t.admin.newLoan.messages.selectUser);
      return;
    }
    
    if (bookCodes.length === 0) {
      setError(t.admin.newLoan.messages.addBooks);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: selectedUser._id || undefined,
          borrower_name: selectedUser.name,
          borrower_email: formData.borrower_email,
          borrower_phone: formData.borrower_phone,
          borrower_id: formData.borrower_id,
          borrower_address: formData.borrower_address,
          book_codes: bookCodes,
          loan_date: formData.loan_date,
          notes: formData.notes
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || t.admin.newLoan.messages.error);
      }

      const result = await response.json();
      
      setSuccessMessage(
        t.admin.newLoan.messages.success.replace('{count}', bookCodes.length.toString())
      );
      
      // Reset form
      setTimeout(() => {
        setSelectedUser(null);
        setBookCodes([]);
        setValidatedBooks([]);
        setFormData({
          borrower_email: '',
          borrower_phone: '',
          borrower_id: '',
          borrower_address: '',
          loan_date: formatDateForInput(new Date()),
          notes: ''
        });
        setSuccessMessage('');
        onSuccess();
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : t.admin.newLoan.messages.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setSelectedUser(null);
    setBookCodes([]);
    setValidatedBooks([]);
    setFormData({
      borrower_email: '',
      borrower_phone: '',
      borrower_id: '',
      borrower_address: '',
      loan_date: formatDateForInput(new Date()),
      notes: ''
    });
    setError('');
    setSuccessMessage('');
  };

  const loanDate = new Date(formData.loan_date);
  const returnDate = addDays(loanDate, 21);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t.admin.newLoan.title}
        </h2>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
        >
          {t.admin.newLoan.clearForm}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Search */}
        <div>
          <UserSearchInput
            token={token}
            onUserSelect={handleUserSelect}
            selectedUser={selectedUser}
          />
        </div>

        {/* User Details (editable) */}
        {selectedUser && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              {t.admin.newLoan.userSection.title}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {t.admin.newLoan.userSection.fields.email}
                </label>
                <input
                  type="email"
                  value={formData.borrower_email}
                  onChange={(e) => setFormData({ ...formData, borrower_email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {t.admin.newLoan.userSection.fields.phone}
                </label>
                <input
                  type="tel"
                  value={formData.borrower_phone}
                  onChange={(e) => setFormData({ ...formData, borrower_phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {t.admin.newLoan.userSection.fields.id}
                </label>
                <input
                  type="text"
                  value={formData.borrower_id}
                  onChange={(e) => setFormData({ ...formData, borrower_id: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {t.admin.newLoan.userSection.fields.address}
                </label>
                <input
                  type="text"
                  value={formData.borrower_address}
                  onChange={(e) => setFormData({ ...formData, borrower_address: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Book Codes */}
        <div>
          <BookCodesInput
            token={token}
            onCodesChange={(codes, validated) => {
              setBookCodes(codes);
              setValidatedBooks(validated);
            }}
          />
        </div>

        {/* Date and Return Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.admin.newLoan.dateSection.loanDate}
            </label>
            <input
              type="date"
              value={formData.loan_date}
              onChange={(e) => setFormData({ ...formData, loan_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.admin.newLoan.dateSection.returnDate}
            </label>
            <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded text-blue-900 font-medium">
              {formatDate(returnDate)} {t.admin.newLoan.dateSection.returnDays.replace('{days}', '21')}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.admin.newLoan.notes.title}
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder={t.admin.newLoan.notes.placeholder}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={handleClear}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            {t.admin.newLoan.actions.clear}
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !selectedUser || bookCodes.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t.admin.newLoan.actions.submitting : t.admin.newLoan.actions.submit}
          </button>
        </div>
      </form>
    </div>
  );
}