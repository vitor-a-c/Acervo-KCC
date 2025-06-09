// src/contexts/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, getTranslation } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');
  const [t, setT] = useState<Translations>(getTranslation('pt'));

  // Load saved language from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('kcc-language') as Language;
      if (savedLanguage && ['pt', 'ko', 'en'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
        setT(getTranslation(savedLanguage));
      }
    }
  }, []);

  // Update translations and save to localStorage when language changes
  useEffect(() => {
    setT(getTranslation(language));
    if (typeof window !== 'undefined') {
      localStorage.setItem('kcc-language', language);
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Utility function to format strings with variables
export function formatString(template: string, variables: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}