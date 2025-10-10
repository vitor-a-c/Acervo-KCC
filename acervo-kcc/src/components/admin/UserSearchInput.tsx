'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserSearchResult } from '@/types/user';

interface UserSearchInputProps {
  token: string | null;
  onUserSelect: (user: UserSearchResult | null) => void;
  selectedUser: UserSearchResult | null;
}

export default function UserSearchInput({ token, onUserSelect, selectedUser }: UserSearchInputProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `/api/admin/users/search?q=${encodeURIComponent(searchTerm)}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setResults(data.users || []);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectUser = (user: UserSearchResult) => {
    onUserSelect(user);
    setSearchTerm(user.name);
    setShowDropdown(false);
  };

  const handleAddNewUser = () => {
    // Create new user with current search term as name
    const newUser: UserSearchResult = {
      _id: '',
      name: searchTerm,
      active_loans: 0,
      has_overdue: false
    };
    onUserSelect(newUser);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    onUserSelect(null);
    setShowDropdown(false);
  };

  // Update input when user is selected externally
  useEffect(() => {
    if (selectedUser) {
      setSearchTerm(selectedUser.name);
    }
  }, [selectedUser]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t.admin.newLoan.userSection.nameLabel}
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (selectedUser) {
              onUserSelect(null);
            }
          }}
          onFocus={() => {
            if (results.length > 0) {
              setShowDropdown(true);
            }
          }}
          placeholder={t.admin.newLoan.userSection.searchPlaceholder}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        {(searchTerm || selectedUser) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              {t.admin.newLoan.userSection.searching}
            </div>
          ) : results.length > 0 ? (
            <>
              {results.map((user) => (
                <button
                  key={user._id}
                  type="button"
                  onClick={() => handleSelectUser(user)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      {user.email && (
                        <p className="text-sm text-gray-600">{user.email}</p>
                      )}
                      {user.phone && (
                        <p className="text-sm text-gray-600">{user.phone}</p>
                      )}
                    </div>
                    
                    <div className="ml-3 flex-shrink-0">
                      {user.has_overdue ? (
                        <div className="flex items-center text-red-600">
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-medium">
                            {user.overdue_details && user.overdue_details.length > 0
                              ? `${user.overdue_details.length} ${t.admin.newLoan.userSection.loanInfo.hasOverdue}`
                              : t.admin.newLoan.userSection.loanInfo.hasOverdue}
                          </span>
                        </div>
                      ) : user.active_loans > 0 ? (
                        <span className="text-xs text-gray-600">
                          {t.admin.newLoan.userSection.loanInfo.activeLoans.replace('{count}', user.active_loans.toString())}
                        </span>
                      ) : (
                        <span className="text-xs text-green-600">
                          {t.admin.newLoan.userSection.loanInfo.noLoans}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {user.has_overdue && user.overdue_details && user.overdue_details.length > 0 && (
                    <div className="mt-2 text-xs text-red-600">
                      {user.overdue_details.map((detail, idx) => (
                        <div key={idx}>
                          {t.admin.newLoan.userSection.loanInfo.overdueDetails
                            .replace('{date}', detail.return_date)
                            .replace('{days}', detail.days_overdue.toString())}
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              ))}
              
              {/* Add new user option */}
              <button
                type="button"
                onClick={handleAddNewUser}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 border-t-2 border-blue-200 bg-blue-50"
              >
                <div className="flex items-center text-blue-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-medium">
                    {t.admin.newLoan.userSection.addNew.replace('{name}', searchTerm)}
                  </span>
                </div>
              </button>
            </>
          ) : searchTerm.length >= 2 ? (
            <div className="p-4">
              <p className="text-gray-500 text-center mb-2">
                {t.admin.newLoan.userSection.noUserFound}
              </p>
              <button
                type="button"
                onClick={handleAddNewUser}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {t.admin.newLoan.userSection.addNew.replace('{name}', searchTerm)}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}