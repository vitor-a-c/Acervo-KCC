'use client';

import { useState } from 'react';
import { BookDocument } from '@/types/database';
import { useLanguage } from '@/contexts/LanguageContext';

interface BookEditModalProps {
  book: BookDocument | null;
  token: string | null;
  onClose: () => void;
  onSave: () => void;
}

export default function BookEditModal({ book, token, onClose, onSave }: BookEditModalProps) {
  const { t } = useLanguage();
  const isEditing = !!book;
  
  const [formData, setFormData] = useState({
    codigo: book?.codigo || '',
    titulo: book?.titulo || '',
    autor: book?.autor || '',
    posicao: book?.posicao || '',
    numero_chamada: book?.numero_chamada || '',
    categoria_livro: book?.categoria_livro || '',
    emprestado: book?.emprestado || false,
    data_retorno: book?.data_retorno || '',
    nivel_sejong: book?.nivel_sejong || '',
    editora: book?.editora || '',
    ano_publicacao: book?.ano_publicacao || '',
    isbn: book?.isbn || '',
    preco: book?.preco || 0
  });
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const url = isEditing 
        ? `/api/admin/books/${encodeURIComponent(book.codigo)}`
        : '/api/admin/books';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || t.admin.bookManagement.messages.failedToSave);
      }

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.admin.bookManagement.messages.errorSaving);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {isEditing ? t.admin.modals.editBook.editTitle : t.admin.modals.editBook.addTitle}
            </h2>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded">
              {error}
            </div>
          )}

          {/* Essential Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.codeRequired}
              </label>
              <input
                type="text"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                disabled={isEditing}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.titleRequired}
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.author}
              </label>
              <input
                type="text"
                value={formData.autor}
                onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.location}
              </label>
              <select
                value={
                  predefinedPositions.includes(formData.posicao)
                    ? formData.posicao
                    : 'Other'
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'Other') {
                    setFormData({ ...formData, posicao: '' });
                  } else {
                    setFormData({ ...formData, posicao: value });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t.admin.bookManagement.fields.selectOption}</option>
                {predefinedPositions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
                <option value="Other">{t.admin.bookManagement.fields.other}</option>
              </select>
              {(!predefinedPositions.includes(formData.posicao) && formData.posicao !== '') || (formData.posicao === '') ? (
                <input
                  type="text"
                  placeholder={t.admin.bookManagement.fields.enterPosition}
                  value={formData.posicao}
                  onChange={(e) => setFormData({ ...formData, posicao: e.target.value })}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.callNumber}
              </label>
              <input
                type="text"
                value={formData.numero_chamada}
                onChange={(e) => setFormData({ ...formData, numero_chamada: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.publisher}
              </label>
              <input
                type="text"
                value={formData.editora}
                onChange={(e) => setFormData({ ...formData, editora: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.publicationYear}
              </label>
              <input
                type="number"
                value={formData.ano_publicacao}
                onChange={(e) => setFormData({ ...formData, ano_publicacao: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.isbn}
              </label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.price}
              </label>
              <input
                type="number"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.admin.modals.editBook.fieldLabels.sejongLevel}
              </label>
              <select
                value={formData.nivel_sejong}
                onChange={(e) => setFormData({ ...formData, nivel_sejong: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t.admin.bookManagement.fields.none}</option>
                {sejongLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Fields */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium text-gray-900 mb-3">
              {t.admin.modals.editBook.fieldLabels.status}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.emprestado}
                    onChange={(e) => setFormData({ ...formData, emprestado: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {t.admin.modals.editBook.fieldLabels.borrowedStatus}
                  </span>
                </label>
              </div>

              {formData.emprestado && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.admin.modals.editBook.fieldLabels.returnDate}
                  </label>
                  <input
                    type="date"
                    value={formData.data_retorno}
                    onChange={(e) => setFormData({ ...formData, data_retorno: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              {t.admin.bookManagement.actions.cancel}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving 
                ? t.admin.bookManagement.status.saving 
                : isEditing 
                  ? t.admin.bookManagement.actions.update 
                  : t.admin.bookManagement.actions.add}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}