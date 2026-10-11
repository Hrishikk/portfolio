import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Locale } from '@/types/content';
import { LanguageContext, type LanguageContextValue } from './LanguageContext';
import { readStorage, writeStorage } from '@/services/storage';

const STORAGE_KEY = 'portfolio.locale';

function initialLocale(): Locale {
  const stored = readStorage(STORAGE_KEY);
  if (stored === 'en' || stored === 'ja') return stored;
  return navigator.language?.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    writeStorage(STORAGE_KEY, locale);
  }, [locale]);

  const toggleLocale = useCallback(() => setLocale((l) => (l === 'en' ? 'ja' : 'en')), []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t: (v) => v[locale],
      tl: (v) => v[locale],
    }),
    [locale, toggleLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
