'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { parseBookCodes, formatBookCodeShort } from '@/utils/bookCodeUtils';
import { BookValidationResult } from '@/types/loan';

interface BookCodesInputProps {
  token: string | null;
  onCodesChange: (codes: string[], validatedBooks: BookValidationResult[]) => void;
  initialValue?: string;
}

export default function BookCodesInput({ token, onCodesChange, initialValue = '' }: BookCodesInputProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState(initialValue);
  const [validatedBooks, setValidatedBooks] = useState<BookValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  // Validate book codes
  useEffect(() => {
    const validateCodes = async () => {
      const codes = parseBookCodes(input);
      
      if (codes.length === 0) {
        setValidatedBooks([]);
        onCodesChange([], []);
        return;
      }

      setIsValidating(true);
      
      try {
        // Validate each code by checking if it exists
        const validations = await Promise.all(
          codes.map(async (code) => {
            try {
              const response = await fetch(
                `/api/admin/books?search=${encodeURIComponent(code)}&limit=1`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );

              if (response.ok) {
                const data = await response.json();
                const book = data.books?.[0];
                
                if (book && book.codigo === code) {
                  return {
                    code,
                    title: book.titulo,
                    author: book.autor,
                    found: true
                  };
                }
              }
              
              return {
                code,
                found: false
              };
            } catch {
              return {
                code,
                found: false
              };
            }
          })
        );

        setValidatedBooks(validations);
        onCodesChange(codes, validations);
      } catch (error) {
        console.error('Validation error:', error);
      } finally {
        setIsValidating(false);
      }
    };

    const timer = setTimeout(validateCodes, 500);
    return () => clearTimeout(timer);
  }, [input, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRemoveCode = (codeToRemove: string) => {
    const codes = parseBookCodes(input);
    const filtered = codes.filter(code => code !== codeToRemove);
    setInput(filtered.map(code => formatBookCodeShort(code)).join(', '));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t.admin.newLoan.booksSection.title}
      </label>
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.admin.newLoan.booksSection.placeholder}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        required
      />
      
      <p className="text-xs text-gray-500 mt-1">
        {t.admin.newLoan.booksSection.tip}
      </p>

      {/* Validation Results */}
      {validatedBooks.length > 0 && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              {t.admin.newLoan.booksSection.detected.replace('{count}', validatedBooks.length.toString())}
            </p>
            {isValidating && (
              <span className="text-xs text-gray-500">{t.admin.newLoan.booksSection.validating}</span>
            )}
          </div>
          
          <div className="space-y-1">
            {validatedBooks.map((book, idx) => (
              <div
                key={idx}
                className={`flex items-start justify-between p-2 rounded text-sm ${
                  book.found
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-yellow-50 border border-yellow-200'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    {book.found ? (
                      <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    
                    <span className="font-mono font-medium">
                      {formatBookCodeShort(book.code)}
                    </span>
                    
                    {book.found ? (
                      <span className="ml-2 text-gray-600 truncate">
                        {t.admin.newLoan.booksSection.found.replace('{title}', book.title || '')}
                      </span>
                    ) : (
                      <span className="ml-2 text-yellow-700">
                        {t.admin.newLoan.booksSection.notFound}
                      </span>
                    )}
                  </div>
                  
                  {book.found && book.author && (
                    <p className="text-xs text-gray-500 ml-6 mt-1">
                      {book.author}
                    </p>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={() => handleRemoveCode(book.code)}
                  className="ml-2 text-gray-400 hover:text-red-600 flex-shrink-0"
                  title={t.admin.newLoan.booksSection.remove}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}