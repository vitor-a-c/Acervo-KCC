// src/components/Footer.tsx
'use client';

import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {t.footer.aboutKcc}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {t.footer.aboutDescription}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {t.footer.contact}
            </h3>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>São Paulo, Brasil</p>
              <p>programas@kccbrazil.com.br</p>
              <p>+55 (11) 2893-1098</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {t.footer.hours}
            </h3>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>{t.footer.weekdays}</p>
              <p>{t.footer.saturday}</p>
              <p>{t.footer.sunday}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}