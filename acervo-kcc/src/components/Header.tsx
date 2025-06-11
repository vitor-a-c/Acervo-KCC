// src/components/Header.tsx
'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const languageOptions = [
  { code: 'pt' as Language, label: 'PT', name: 'Português' },
  { code: 'ko' as Language, label: '한국어', name: '한국어' },
  { code: 'en' as Language, label: 'EN', name: 'English' },
];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <div className="flex-shrink-0">
              {/* Logo Image - Replace the div with Image component when you have a logo */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden bg-white">
                  <Image 
                    src="/images/kcc-logo.svg" 
                    alt="Korean Cultural Center Logo"
                    width={32} 
                    height={32}
                    className="object-contain"
                  />
                </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-gray-900">
                {t.header.title}
              </h1>
              <p className="text-sm text-gray-600">{t.header.subtitle}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`font-medium border-b-2 pb-4 transition-colors ${
                isActive('/') 
                  ? 'border-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
              style={isActive('/') ? {color: '#053863', borderColor: '#053863'} : {}}
            >
              {t.header.library}
            </Link>
            <Link 
              href="/about" 
              className={`font-medium border-b-2 pb-4 transition-colors ${
                isActive('/about') 
                  ? 'border-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
              style={isActive('/about') ? {color: '#053863', borderColor: '#053863'} : {}}
            >
              {t.header.about}
            </Link>
            <Link 
              href="/contact" 
              className={`font-medium border-b-2 pb-4 transition-colors ${
                isActive('/contact') 
                  ? 'border-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
              style={isActive('/contact') ? {color: '#053863', borderColor: '#053863'} : {}}
            >
              {t.header.contact}
            </Link>
          </nav>

          {/* Mobile Navigation Menu */}
          <div className="md:hidden">
            {/* Add mobile menu button here if needed */}
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:border-blue-500"
              style={{'--tw-ring-color': '#053863'} as React.CSSProperties}
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