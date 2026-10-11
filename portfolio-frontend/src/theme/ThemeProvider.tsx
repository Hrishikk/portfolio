import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readStorage, writeStorage } from '@/services/storage';
import { ThemeContext, type Theme } from './ThemeContext';

const STORAGE_KEY = 'portfolio.theme';

function initialTheme(): Theme {
  const stored = readStorage(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStorage(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
