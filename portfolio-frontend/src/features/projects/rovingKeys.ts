import type { KeyboardEvent } from 'react';

/**
 * Tab-list keyboard model: arrows move (wrapping), Home/End jump to the ends.
 * Returns the new index, or null when the key isn't one of ours.
 */
export function nextIndexForKey(event: KeyboardEvent, current: number, count: number, orientation: 'horizontal' | 'vertical') {
  const back = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
  const forward = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
  switch (event.key) {
    case back:
      return (current - 1 + count) % count;
    case forward:
      return (current + 1) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
}
