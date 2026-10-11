import { createContext } from 'react';
import type { Locale, Localized, LocalizedList } from '@/types/content';

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Resolve a localized string for the active locale. */
  t: (value: Localized) => string;
  /** Resolve a localized list for the active locale. */
  tl: (value: LocalizedList) => string[];
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
