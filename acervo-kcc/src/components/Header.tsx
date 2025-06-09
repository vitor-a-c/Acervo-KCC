// src/components/Header.tsx
'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";

const languageOptions = [
  { code: 'pt' as Language, label: 'PT', name: 'Português' },
  { code: 'ko' as Language, label: '한국어', name: '한국어' },
  { code: 'en' as Language, label: 'EN', name: 'English' },
];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KCC</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-gray-900">
                {t.header.title}
              </h1>
              <p className="text-sm text-gray-600">{t.header.subtitle}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-red-600 font-medium border-b-2 border-red-600 pb-4">
              {t.header.library}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 pb-4">
              {t.header.about}
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 pb-4">
              {t.header.contact}
            </a>
          </nav>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              aria-label="Select language"
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}