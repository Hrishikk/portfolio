import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Monogram } from '@/components/ui';
import { navItems } from '@/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { useTheme } from '@/theme/useTheme';
import type { Localized, SectionId } from '@/types/content';
import { MenuIcon, MoonIcon, SunIcon } from './icons';
import styles from './Navbar.module.css';

/** The hero is observed too, so scrolling back to the top clears the active link. */
const SECTION_IDS: SectionId[] = ['home', ...navItems.map((item) => item.id)];
const MENU_ID = 'mobile-menu';
const DESKTOP_QUERY = '(min-width: 900px)';

const copy = {
  mainNav: { en: 'Main navigation', ja: 'メインナビゲーション' },
  mobileNav: { en: 'Menu', ja: 'メニュー' },
  home: { en: 'Hrishikesh K K — back to top', ja: 'Hrishikesh K K — トップへ' },
} satisfies Record<string, Localized>;

function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** Measures the active link so the sliding pill can sit behind it; re-measures on resize and language change. */
function useIndicator(active: SectionId | null, locale: string) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const link = active ? list.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
      setStyle(
        link
          ? ({ '--pill-x': `${link.offsetLeft}px`, '--pill-w': `${link.offsetWidth}px`, '--pill-o': 1 } as CSSProperties)
          : ({ '--pill-o': 0 } as CSSProperties),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active, locale]);

  return { listRef, style };
}

/** Fixed top bar with scroll-spy links, language + theme toggles and a mobile menu. */
export function Navbar() {
  const { t, locale, toggleLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection(SECTION_IDS);
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { listRef, style: pillStyle } = useIndicator(active, locale);

  // Escape to close, lock body scroll, and auto-close when resized to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, [open]);

  const links = (variant: 'desktop' | 'mobile') =>
    navItems.map((item) => {
      const isActive = active === item.id;
      return (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`${variant === 'desktop' ? styles.link : styles.mobileLink} ${isActive ? styles.active : ''}`}
            aria-current={isActive ? 'location' : undefined}
            onClick={variant === 'mobile' ? close : undefined}
          >
            {t(item.label)}
          </a>
        </li>
      );
    });

  return (
    <header className={`${styles.header} ${open ? styles.menuOpen : scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#home" className={styles.brand} onClick={close} aria-label={t(copy.home)}>
          <Monogram />
          <span className={styles.wordmark}>Hrishikesh K K</span>
        </a>

        <nav className={styles.desktopNav} aria-label={t(copy.mainNav)}>
          <ul ref={listRef} className={styles.list} style={pillStyle}>
            <li className={styles.indicator} aria-hidden="true" />
            {links('desktop')}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.langButton}
            onClick={toggleLocale}
            aria-label={t(ui.actions.switchLanguage)}
          >
            {t(ui.actions.switchLanguage)}
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={t(ui.actions.toggleTheme)}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={t(open ? ui.actions.closeMenu : ui.actions.openMenu)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div id={MENU_ID} className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`} hidden={!open}>
        <nav aria-label={t(copy.mobileNav)}>
          <ol className={styles.mobileList}>{links('mobile')}</ol>
        </nav>
      </div>
    </header>
  );
}
