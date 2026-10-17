import type { CSSProperties } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import type { SkillGroup } from '@/types/content';
import styles from './Skills.module.css';

/** Months that fill a block's bar completely (3 years). */
export const MAX_MONTHS = 36;

export interface Selection {
  groupId: string;
  name: string;
}

interface StackLayerProps {
  group: SkillGroup;
  /** Position in the stack (0 = top layer); picks the layer's hairline colour. */
  tone?: number;
  /** Cross-cutting band: title above the blocks instead of beside them. */
  compact?: boolean;
  selection: Selection;
  onSelect: (selection: Selection) => void;
}

/**
 * One layer of the stack diagram. Each technology is a toggle block whose bottom bar shows
 * hands-on time against a 3-year scale; technologies without a measured duration are outlined.
 */
export function StackLayer({ group, tone = 0, compact = false, selection, onSelect }: StackLayerProps) {
  const { t } = useLanguage();
  const titleId = `stack-${group.id}`;

  return (
    <div
      role="group"
      aria-labelledby={titleId}
      className={`${styles.layer} ${compact ? styles.compact : ''}`}
      data-tone={compact ? undefined : tone}
    >
      <div className={styles.layerHead}>
        <h3 id={titleId} className={styles.layerTitle}>
          {t(group.title)}
        </h3>
        <p className={styles.layerDesc}>{t(group.description)}</p>
      </div>

      <ul className={styles.blocks}>
        {group.items.map((item, i) => {
          const selected = selection.groupId === group.id && selection.name === item.name;
          const measured = item.months !== undefined;
          const style = {
            '--i': i,
            '--fill': measured ? Math.min((item.months ?? 0) / MAX_MONTHS, 1) : 0,
          } as CSSProperties;
          return (
            <li key={item.name} style={style}>
              <button
                type="button"
                className={`${styles.block} ${measured ? '' : styles.unmeasured}`}
                aria-pressed={selected}
                onClick={() => onSelect({ groupId: group.id, name: item.name })}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
