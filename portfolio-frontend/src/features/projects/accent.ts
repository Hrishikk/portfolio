import type { CSSProperties } from 'react';
import type { Project } from '@/types/content';

type Accent = Project['accent'];
type TagTone = 'accent' | 'indigo' | 'matcha' | 'gold';

/** Expose a project's accent as token-backed CSS variables (`--accent`, `--accent-soft`). */
export function accentStyle(accent: Accent): CSSProperties {
  return {
    '--accent': `var(--color-${accent})`,
    '--accent-soft': `var(--color-${accent}-soft)`,
  } as CSSProperties;
}

/** Map a project accent onto the matching Tag tone. */
export function accentTagTone(accent: Accent): TagTone {
  return accent === 'vermilion' ? 'accent' : accent;
}
