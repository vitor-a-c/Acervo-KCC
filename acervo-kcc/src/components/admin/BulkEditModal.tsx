'use client';

import { useState } from 'react';

interface BulkEditModalProps {
  selectedCount: number;
  onConfirm: (field: string, value: string | boolean) => void;
  onCancel: () => void;
  isUpdating: boolean;
}

export default function BulkEditModal({
  selectedCount,
  onConfirm,
  onCancel,
  isUpdating
}: BulkEditModalProps) {
  const [field, setField] = useState('posicao');
  const [value, setValue] = useState('');
  const [boolValue, setBoolValue] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (field === 'emprestado') {
      onConfirm(field, boolValue);
    } else {
      onConfirm(field, value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Bulk Edit {selectedCount} Books
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Field Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field to Update
            </label>
            <select
              value={field}
              onChange={(e) => {
                setField(e.target.value);
                setValue('');
                setBoolValue(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="posicao">Location (Posição)</option>
              <option value="categoria_livro">Category</option>
              <option value="emprestado">Borrowed Status</option>
              <option value="nivel_sejong">Sejong Level</option>
            </select>
          </div>

          {/* Value Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Value
            </label>
            
            {field === 'emprestado' ? (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={boolValue}
                  onChange={(e) => setBoolValue(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Mark as borrowed
                </span>
              </label>
            ) : field === 'nivel_sejong' ? (
              <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select level...</option>
                <option value="">None</option>
                <option value="1A+">1A+</option>
                <option value="1B+">1B+</option>
                <option value="2A+">2A+</option>
                <option value="2B+">2B+</option>
                <option value="3A+">3A+</option>
                <option value="3B+">3B+</option>
                <option value="4A+">4A+</option>
                <option value="4B+">4B+</option>
                <option value="5A+">5A+</option>
                <option value="5B+">5B+</option>
                <option value="Português">Português</option>
                <option value="Inglês (English)">Inglês (English)</option>
              </select>
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                placeholder={`Enter new ${field === 'posicao' ? 'location' : 'value'}...`}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          <div className="text-sm text-gray-600 mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded">
            ⚠️ This will update the {field === 'posicao' ? 'location' : field} for all {selectedCount} selected books.
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isUpdating}
              className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating || (!value && field !== 'emprestado')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isUpdating ? 'Updating...' : 'Update Books'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}