import type { SkillGroup } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { useInView } from '@/hooks/useInView';
import { Tag } from '@/components/ui';
import { SkillMeter } from './SkillMeter';
import { copy } from './copy';
import styles from './Skills.module.css';

interface SkillCardProps {
  group: SkillGroup;
}

/** A card for one skill group: title, plain-language description, year meters and tags. */
export function SkillCard({ group }: SkillCardProps) {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 });
  const measured = group.items.filter((item) => item.years !== undefined);
  const tagged = group.items.filter((item) => item.years === undefined);
  const titleId = `skill-${group.id}-title`;

  return (
    <article ref={ref} className={styles.card} aria-labelledby={titleId}>
      <h3 id={titleId} className={styles.cardTitle}>
        {t(group.title)}
      </h3>
      <p className={styles.cardDesc}>{t(group.description)}</p>

      {measured.length > 0 && (
        <>
          <p className={styles.subLabel}>{t(copy.experienceScale)}</p>
          <ul className={styles.meters}>
            {measured.map((item, i) => (
              <SkillMeter key={item.name} name={item.name} years={item.years ?? 0} active={inView} delay={i * 90} />
            ))}
          </ul>
        </>
      )}

      {tagged.length > 0 && (
        <>
          {measured.length > 0 && <p className={styles.subLabel}>{t(copy.alsoUsed)}</p>}
          <ul className={styles.tags}>
            {tagged.map((item) => (
              <li key={item.name}>
                <Tag>{item.name}</Tag>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
