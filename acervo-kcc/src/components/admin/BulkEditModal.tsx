'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BulkEditModalProps {
  selectedCount: number;
  onConfirm: (field: string, value: string | boolean) => Promise<void>;
  onCancel: () => void;
  isUpdating: boolean;
}

export default function BulkEditModal({
  selectedCount,
  onConfirm,
  onCancel,
  isUpdating
}: BulkEditModalProps) {
  const { t } = useLanguage();
  const [field, setField] = useState<string>('posicao');
  const [value, setValue] = useState<string>('');
  const [borrowedStatus, setBorrowedStatus] = useState<boolean>(false);

  const predefinedPositions = [
    'A1','A2','A3','A4','A5','A6','A7','A8',
    'B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11',
    'C1','C2','C3','C4','C5','C6','C7',
    'D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11','D12'
  ];

  const sejongLevels = [
    '1A+', '1B+', '2A+', '2B+', '3A+', '3B+',
    '4A+', '4B+', '5A+', '5B+',
    'Português', 'Inglês (English)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalValue = field === 'emprestado' ? borrowedStatus : value;
    onConfirm(field, finalValue);
  };

  const getFieldLabel = (fieldName: string): string => {
    switch (fieldName) {
      case 'posicao':
        return t.admin.bookManagement.fields.location;
      case 'categoria_livro':
        return t.admin.bookManagement.fields.category;
      case 'emprestado':
        return t.admin.bookManagement.fields.borrowedStatus;
      case 'nivel_sejong':
        return t.admin.bookManagement.fields.sejongLevel;
      default:
        return fieldName;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t.admin.modals.bulkEdit.title.replace('{count}', selectedCount.toString())}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Field Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.admin.modals.bulkEdit.fieldToUpdate}
            </label>
            <select
              value={field}
              onChange={(e) => {
                setField(e.target.value);
                setValue('');
                setBorrowedStatus(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="posicao">{t.admin.bookManagement.fields.location}</option>
              <option value="categoria_livro">{t.admin.bookManagement.fields.category}</option>
              <option value="emprestado">{t.admin.bookManagement.fields.borrowedStatus}</option>
              <option value="nivel_sejong">{t.admin.bookManagement.fields.sejongLevel}</option>
            </select>
          </div>

          {/* Value Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.admin.modals.bulkEdit.newValue}
            </label>

            {field === 'posicao' && (
              <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">{t.admin.bookManagement.fields.selectOption}</option>
                {predefinedPositions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            )}

            {field === 'categoria_livro' && (
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t.admin.modals.bulkEdit.enterNewLocation}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}

            {field === 'emprestado' && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={borrowedStatus}
                  onChange={(e) => setBorrowedStatus(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  {t.admin.modals.bulkEdit.markAsBorrowed}
                </span>
              </label>
            )}

            {field === 'nivel_sejong' && (
              <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">{t.admin.modals.bulkEdit.selectLevel}</option>
                {sejongLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            )}
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-6">
            <p className="text-sm text-yellow-800">
              {t.admin.modals.bulkEdit.warningMessage
                .replace('{count}', selectedCount.toString())
                .replace('{field}', getFieldLabel(field))}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isUpdating}
              className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              {t.admin.bookManagement.actions.cancel}
            </button>
            <button
              type="submit"
              disabled={isUpdating || (field !== 'emprestado' && !value)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isUpdating 
                ? t.admin.bookManagement.status.updating 
                : t.admin.modals.bulkEdit.updateButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}