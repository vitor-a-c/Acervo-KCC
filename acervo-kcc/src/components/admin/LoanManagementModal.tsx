'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate, daysUntilReturn, isOverdue, formatDateForInput } from '@/utils/dateUtils';
import { LoanWithBook } from '@/types/loan';

interface LoanManagementModalProps {
  loanId: string;
  token: string | null;
  onClose: () => void;
  onUpdate: () => void;
}

export default function LoanManagementModal({
  loanId,
  token,
  onClose,
  onUpdate
}: LoanManagementModalProps) {
  const { t } = useLanguage();
  
  const [loanData, setLoanData] = useState<LoanWithBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showExtendConfirm, setShowExtendConfirm] = useState(false);
  const [showReturnConfirm, setShowReturnConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editForm, setEditForm] = useState({
    borrower_name: '',
    borrower_email: '',
    borrower_phone: '',
    borrower_id: '',
    borrower_address: '',
    current_return_date: '',
    notes: ''
  });

  useEffect(() => {
    loadLoan();
  }, [loanId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLoan = async () => {
    try {
      const response = await fetch(`/api/admin/loans/${loanId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLoanData(data);
        setEditForm({
          borrower_name: data.loan.borrower_name,
          borrower_email: data.loan.borrower_email || '',
          borrower_phone: data.loan.borrower_phone || '',
          borrower_id: data.loan.borrower_id || '',
          borrower_address: data.loan.borrower_address || '',
          current_return_date: formatDateForInput(data.loan.current_return_date),
          notes: data.loan.notes || ''
        });
      } else {
        setError(t.loans.errors.failedToLoad);
      }
    } catch (err) {
      setError(t.loans.errors.failedToLoad);
    } finally {
      setLoading(false);
    }
  };

  const handleExtend = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/loans/${loanId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action: 'extend' })
      });

      if (response.ok) {
        await loadLoan();
        onUpdate();
        setShowExtendConfirm(false);
      } else {
        const data = await response.json();
        setError(data.message || t.loans.errors.failedToExtend);
      }
    } catch (err) {
      setError(t.loans.errors.failedToExtend);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReturn = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/loans/${loanId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action: 'return' })
      });

      if (response.ok) {
        onUpdate();
        onClose();
      } else {
        const data = await response.json();
        setError(data.message || t.loans.errors.failedToReturn);
      }
    } catch (err) {
      setError(t.loans.errors.failedToReturn);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/loans/${loanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        await loadLoan();
        setIsEditing(false);
        onUpdate();
      } else {
        const data = await response.json();
        setError(data.message || t.loans.errors.failedToLoad);
      }
    } catch (err) {
      setError(t.loans.errors.failedToLoad);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!loanData) return null;

  const loan = loanData.loan;
  const book = loanData.book;
  const daysLeft = daysUntilReturn(loan.current_return_date);
  const overdueStatus = isOverdue(loan.current_return_date);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {t.loans.loanDetails}
              </h2>
              {book && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium">{book.titulo}</p>
                  <p>{book.autor}</p>
                </div>
              )}
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded">
              {error}
            </div>
          )}

          {/* Status Banner */}
          {loan.status === 'active' && (
            <div className={`p-4 rounded-lg border ${
              overdueStatus 
                ? 'bg-red-50 border-red-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold ${overdueStatus ? 'text-red-900' : 'text-blue-900'}`}>
                    {overdueStatus ? t.loans.overdue : t.loans.activeLoan}
                  </p>
                  <p className={`text-sm ${overdueStatus ? 'text-red-700' : 'text-blue-700'}`}>
                    {overdueStatus 
                      ? `${t.loans.overdueBy} ${Math.abs(daysLeft)} ${t.loans.overdueDays}`
                      : `${t.loans.dueIn} ${daysLeft} ${t.loans.daysRemaining}`
                    }
                  </p>
                </div>
                {loan.extensions > 0 && (
                  <span className="text-sm text-gray-600">
                    {loan.extensions} {t.loans.timesExtended}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Loan Dates */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">{t.loans.loanDate}</p>
              <p className="text-lg text-gray-900">{formatDate(loan.loan_date)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{t.loans.currentReturnDate}</p>
              <p className="text-lg text-gray-900">{formatDate(loan.current_return_date)}</p>
            </div>
            {loan.extensions > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700">{t.loans.originalReturnDate}</p>
                <p className="text-lg text-gray-500">{formatDate(loan.original_return_date)}</p>
              </div>
            )}
          </div>

          {/* Borrower Information */}
          {!isEditing ? (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{t.loans.borrowerInfo}</h3>
                {loan.status === 'active' && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {t.admin.bookManagement.actions.edit}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">{t.loans.borrowerName}</p>
                  <p className="text-gray-900">{loan.borrower_name}</p>
                </div>
                {loan.borrower_email && (
                  <div>
                    <p className="font-medium text-gray-700">{t.loans.borrowerEmail}</p>
                    <p className="text-gray-900">{loan.borrower_email}</p>
                  </div>
                )}
                {loan.borrower_phone && (
                  <div>
                    <p className="font-medium text-gray-700">{t.loans.borrowerPhone}</p>
                    <p className="text-gray-900">{loan.borrower_phone}</p>
                  </div>
                )}
                {loan.borrower_id && (
                  <div>
                    <p className="font-medium text-gray-700">{t.loans.borrowerId}</p>
                    <p className="text-gray-900">{loan.borrower_id}</p>
                  </div>
                )}
                {loan.borrower_address && (
                  <div className="col-span-2">
                    <p className="font-medium text-gray-700">{t.loans.borrowerAddress}</p>
                    <p className="text-gray-900">{loan.borrower_address}</p>
                  </div>
                )}
              </div>
              {loan.notes && (
                <div className="mt-4">
                  <p className="font-medium text-gray-700">{t.loans.notes}</p>
                  <p className="text-gray-900 text-sm mt-1">{loan.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.loans.borrowerInfo}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.loans.borrowerName} *
                  </label>
                  <input
                    type="text"
                    value={editForm.borrower_name}
                    onChange={(e) => setEditForm({ ...editForm, borrower_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.loans.borrowerEmail}
                  </label>
                  <input
                    type="email"
                    value={editForm.borrower_email}
                    onChange={(e) => setEditForm({ ...editForm, borrower_email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.loans.borrowerPhone}
                  </label>
                  <input
                    type="tel"
                    value={editForm.borrower_phone}
                    onChange={(e) => setEditForm({ ...editForm, borrower_phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.loans.borrowerId}
                  </label>
                  <input
                    type="text"
                    value={editForm.borrower_id}
                    onChange={(e) => setEditForm({ ...editForm, borrower_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.loans.returnDate}
                  </label>
                  <input
                    type="date"
                    value={editForm.current_return_date}
                    onChange={(e) => setEditForm({ ...editForm, current_return_date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.loans.borrowerAddress}
                  </label>
                  <input
                    type="text"
                    value={editForm.borrower_address}
                    onChange={(e) => setEditForm({ ...editForm, borrower_address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.loans.notes}
                  </label>
                  <textarea
                    value={editForm.notes}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={isProcessing}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  {t.admin.bookManagement.actions.cancel}
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isProcessing ? t.admin.bookManagement.status.saving : t.admin.bookManagement.actions.save}
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          {loan.status === 'active' && !isEditing && (
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => setShowExtendConfirm(true)}
                className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                {t.loans.extend}
              </button>
              <button
                onClick={() => setShowReturnConfirm(true)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {t.loans.return}
              </button>
            </div>
          )}
        </div>

        {/* Extend Confirmation */}
        {showExtendConfirm && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-3">{t.loans.confirmExtend}</h3>
              <p className="text-gray-600 mb-6">{t.loans.confirmExtendMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExtendConfirm(false)}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  {t.admin.bookManagement.actions.cancel}
                </button>
                <button
                  onClick={handleExtend}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isProcessing ? t.admin.bookManagement.status.processing : t.loans.extend}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Return Confirmation */}
        {showReturnConfirm && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-3">{t.loans.confirmReturn}</h3>
              <p className="text-gray-600 mb-6">{t.loans.confirmReturnMessage}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReturnConfirm(false)}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  {t.admin.bookManagement.actions.cancel}
                </button>
                <button
                  onClick={handleReturn}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {isProcessing ? t.admin.bookManagement.status.processing : t.loans.return}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}