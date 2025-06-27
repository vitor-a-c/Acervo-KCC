// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchBooksFromSheet } from '@/utils/fetchBooksFromSheet';
import { Book } from '@/types/book';
import { useLanguage, formatString } from '@/contexts/LanguageContext';
import { getMainCategories, getSubcategories, getDetailedTheme } from '@/utils/hybridKdcUtils';
import { Translations } from '@/lib/translations';
import LibraryLayoutModal from '@/components/LibraryLayoutModal';

const BOOKS_PER_PAGE = 12;

function extractKdcCode(bookCode: string): string | null {
  const match = bookCode.match(/(\d{3})/);
  return match ? match[1] : null;
}

const validRecommendations = [
  '1A+', '1B+', '2A+', '2B+', '3A+', '3B+',
  '4A+', '4B+', '5A+', '5B+',
  'Português', 'Inglês (English)'
];

// Helper functions
function isBookAvailable(book: Book): boolean {
  const isNotBorrowed = book['Emprestado?'] !== 'TRUE';
  const hasValidLocation = book['Posição'] !== 'Indisponível';
  return isNotBorrowed && hasValidLocation;
}

function getAvailabilityStatus(book: Book, t: Translations): string {
  if (book['Posição'] === 'Indisponível') {
    return t.book.unavailable;
  }
  return book['Emprestado?'] === 'TRUE' ? t.book.borrowed : t.book.available;
}

function getAvailabilityClasses(book: Book): string {
  if (book['Posição'] === 'Indisponível') {
    return 'bg-white border-gray-200 opacity-75';
  }
  return book['Emprestado?'] === 'TRUE' ? 'bg-white border-red-200' : 'bg-white border-green-200';
}

function getStatusBadgeClasses(book: Book): string {
  if (book['Posição'] === 'Indisponível') {
    return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
  return book['Emprestado?'] === 'TRUE' 
    ? 'bg-red-50 text-red-700 border border-red-200' 
    : 'bg-green-50 text-green-700 border border-green-200';
}

export default function HomePage() {
  const { t, language } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sejongLevel, setSejongLevel] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [highlightedShelf, setHighlightedShelf] = useState<string | undefined>();

  // Get categories based on current language
  const mainCategories = getMainCategories(language);
  const subcategories = getSubcategories(mainCategory, language);

  // Function to find which shelf contains a specific book based on its position
  const findShelfForLocation = (location: string): string | null => {
    // Direct mapping: if location is "A1", return "A1", etc.
    // Handle cases like "A1, A2" or "A1-A3" by taking the first shelf
    if (!location || location === 'Indisponível') return null;

    // Extract the first shelf ID from the location
    const shelfMatch = location.match(/([A-D]\d+)/);
    if (shelfMatch) {
      return shelfMatch[1];
    }
    return null;
  };

  const handleShowInLayout = (location: string) => {
    if (!location || location === 'Indisponível') {
      console.log('Book location unavailable');
      return;
    }
    
    const shelf = findShelfForLocation(location);
    if (shelf) {
      console.log(`Showing book location: ${location} -> Shelf: ${shelf}`);
      setHighlightedShelf(shelf);
      setIsLayoutModalOpen(true);
    } else {
      console.log(`Could not find shelf for location: ${location}`);
    }
  };

  // Category matching function
  const matchesCategory = (bookCode: string): boolean => {
    const digitsMatch = bookCode.match(/\d{3}/);
    if (!digitsMatch) return false;
    const code = digitsMatch[0];

    // If subcategory is selected, check if code starts with the subcategory prefix
    if (subCategory) {
      return code.startsWith(subCategory);
    }
    
    // If main category is selected, check if code starts with the main category prefix
    if (mainCategory) {
      const mainPrefix = mainCategory.substring(0, 1);
      return code.startsWith(mainPrefix);
    }
    
    return true;
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooksFromSheet();
        setBooks(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchMatch = [book['Título'], book['Autor'], book['Número chamada'], book['Código']]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const availableMatch = !onlyAvailable || isBookAvailable(book);
    const categoryMatch = matchesCategory(book['Número chamada'] || '');
    const sejongMatch = sejongLevel ? book['Recomendação nível Sejong'] === sejongLevel : true;

    return searchMatch && availableMatch && categoryMatch && sejongMatch;
  });

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAvailabilityToggle = () => {
    setOnlyAvailable((prev) => !prev);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMainCategory('');
    setSubCategory('');
    setSejongLevel('');
    setOnlyAvailable(false);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{borderColor: '#053863'}}></div>
          <p className="mt-4 text-gray-600">{t.states.loadingLibrary}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t.states.errorLoading}</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-white" style={{background: 'linear-gradient(to right, #053863, #1e40af)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {t.hero.title}
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {formatString(t.hero.description, { count: books.length.toString() })}
            </p>
            
            {/* Main Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder={t.hero.searchPlaceholder}
                  className="block w-full pl-10 pr-12 py-4 border border-transparent rounded-lg text-gray-900 placeholder-gray-500 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label="Clear search"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Library Layout Button */}
            <div className="mt-6">
              <button
                onClick={() => setIsLayoutModalOpen(true)}
                className="inline-flex items-center px-6 py-3 border border-white/30 text-base font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {t.hero.viewLayout}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="lg:hidden inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {t.filters.filters}
              </button>
              
              <div className="text-sm text-gray-600">
                {filteredBooks.length} {filteredBooks.length === 1 ? t.filters.bookFound : t.filters.booksFound}
              </div>
            </div>

            {(mainCategory || subCategory || sejongLevel || onlyAvailable) && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium hover:underline"
                style={{color: '#053863'}}
              >
                {t.filters.clearFilters}
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block mt-4`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Main Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.filters.mainTheme}
                </label>
                <select
                  value={mainCategory}
                  onChange={(e) => {
                    setMainCategory(e.target.value);
                    setSubCategory("");
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:border-blue-500"
                  style={{'--tw-ring-color': '#053863'} as React.CSSProperties}
                >
                  <option value="">{t.filters.allThemes}</option>
                  {mainCategories.map((cat) => (
                    <option key={cat.code} value={cat.code}>
                      {cat.code} - {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.filters.subtheme}
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  disabled={!mainCategory}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{'--tw-ring-color': '#053863'} as React.CSSProperties}
                >
                  <option value="">{t.filters.allSubthemes}</option>
                  {subcategories.map((sub) => (
                    <option key={sub.code} value={sub.code}>
                      {sub.code} - {sub.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sejong Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.filters.sejongLevel}
                </label>
                <select
                  value={sejongLevel}
                  onChange={(e) => {
                    setSejongLevel(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:border-blue-500"
                  style={{'--tw-ring-color': '#053863'} as React.CSSProperties}
                >
                  <option value="">{t.filters.allLevels}</option>
                  {validRecommendations.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div className="flex items-center pt-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyAvailable}
                    onChange={handleAvailabilityToggle}
                    className="h-4 w-4 border-gray-300 rounded focus:ring-2"
                    style={{'--tw-ring-color': '#053863', color: '#053863'} as React.CSSProperties}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {t.filters.onlyAvailable}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📚</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.states.noBooksFound}</h3>
            <p className="text-gray-600 mb-4">{t.states.adjustFilters}</p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 transition-opacity"
              style={{backgroundColor: '#053863'}}
            >
              {t.filters.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBooks.map((book, index) => {
              const kdcCode = extractKdcCode(book['Número chamada'] || '');
              const themeName = kdcCode ? getDetailedTheme(kdcCode, language) : t.book.unknownTheme;
              
              // Check if it's a Korean language level (for flag emoji)
              const isKoreanLevel = book['Recomendação nível Sejong'] && 
                !['Português', 'Inglês (English)'].includes(book['Recomendação nível Sejong']);

              return (
                <div
                  key={index}
                  className={`rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 p-6 space-y-4 ${getAvailabilityClasses(book)}`}
                >
                  {/* Header with Title and Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 leading-6 line-clamp-2 mb-2">
                        {book['Título']}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">{t.book.author}</span> {book['Autor'] || t.book.unknown}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap flex-shrink-0 ${getStatusBadgeClasses(book)}`}>
                      {getAvailabilityStatus(book, t)}
                    </span>
                  </div>

                  {/* Book Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block font-medium text-gray-700 mb-1">{t.book.code}</span>
                      <span className="text-gray-900 font-mono text-xs">{book['Código']}</span>
                    </div>
                    <div>
                      <span className="block font-medium text-gray-700 mb-1">{t.book.callNumber}</span>
                      <span className="text-gray-900 font-mono text-xs">{book['Número chamada']}</span>
                    </div>
                    <div>
                      <span className="block font-medium text-gray-700 mb-1">{t.book.location}</span>
                      <span className="text-gray-900">{book['Posição']}</span>
                    </div>
                    <div>
                      <span className="block font-medium text-gray-700 mb-1">{t.book.theme}</span>
                      <span className="text-gray-900">{kdcCode}</span>
                    </div>
                  </div>

                  {/* Theme Description */}
                  {kdcCode && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600 italic">
                        {themeName}
                      </p>
                    </div>
                  )}

                  {/* Sejong Level and Return Date */}
                  <div className="flex flex-wrap gap-2 justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {validRecommendations.includes(book['Recomendação nível Sejong']) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          {isKoreanLevel && '🇰🇷 '}{book['Recomendação nível Sejong']}
                        </span>
                      )}
                    </div>
                    
                    {book['Emprestado?'] === 'TRUE' && book['Posição'] !== 'Indisponível' && (
                      <div className="text-right">
                        <p className="text-xs text-red-600 font-medium">
                          ⏳ {t.book.return} {book['Data prevista de retorno']}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Show in Layout Button */}
                  {book['Posição'] && book['Posição'] !== 'Indisponível' && (
                    <div className="pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleShowInLayout(book['Posição'])}
                        className="text-xs px-3 py-1 rounded-full border transition-colors hover:bg-gray-50"
                        style={{borderColor: '#053863', color: '#053863'}}
                      >
                        📍 {language === 'pt' ? 'Ver no layout' : language === 'ko' ? '배치도에서 보기' : 'Show in layout'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.pagination.previous}
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.pagination.next}
              </button>
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  {t.pagination.showing}{' '}
                  <span className="font-medium">{(currentPage - 1) * BOOKS_PER_PAGE + 1}</span>
                  {' '}{t.pagination.to}{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * BOOKS_PER_PAGE, filteredBooks.length)}
                  </span>
                  {' '}{t.pagination.of}{' '}
                  <span className="font-medium">{filteredBooks.length}</span>
                  {' '}{t.pagination.results}
                </p>
              </div>
              
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? 'z-10 text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                        style={currentPage === pageNum ? {backgroundColor: '#053863', borderColor: '#053863'} : {}}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Library Layout Modal */}
      <LibraryLayoutModal 
        isOpen={isLayoutModalOpen}
        onClose={() => {
          setIsLayoutModalOpen(false);
          setHighlightedShelf(undefined);
        }}
        highlightedShelf={highlightedShelf}
      />
    </div>
  );
}