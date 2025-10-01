'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PasteCodesModalProps {
  onConfirm: (codes: string[]) => void;
  onCancel: () => void;
}

export default function PasteCodesModal({ onConfirm, onCancel }: PasteCodesModalProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse comma-separated codes
    const codes = input
      .split(',')
      .map(code => code.trim())
      .filter(code => code.length > 0);
    
    if (codes.length > 0) {
      onConfirm(codes);
    }
  };

  // Count codes in input
  const codeCount = input
    .split(',')
    .map(code => code.trim())
    .filter(code => code.length > 0).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t.admin.modals.pasteCodes.title}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.admin.modals.pasteCodes.label}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.admin.modals.pasteCodes.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              required
            />
            <p className="text-sm text-gray-600 mt-1">
              {t.admin.modals.pasteCodes.codesDetected.replace('{count}', codeCount.toString())}
            </p>
          </div>

          <div className="text-sm text-gray-600 mb-6">
            {t.admin.modals.pasteCodes.tip}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              {t.admin.bookManagement.actions.cancel}
            </button>
            <button
              type="submit"
              disabled={codeCount === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {t.admin.modals.pasteCodes.selectButton.replace('{count}', codeCount.toString())}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}