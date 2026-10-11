import { useState } from 'react';
import { career } from '@/content';
import { Section } from '@/components/ui';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { copy } from './copy';
import { LineList } from './LineList';
import { LineMap } from './LineMap';
import { useMediaQuery } from './useMediaQuery';
import styles from './Experience.module.css';

const defaultStationId = (career.find((s) => s.kind === 'current') ?? career[career.length - 1])?.id ?? '';

/** Career journey drawn as a Tokyo-Metro-style line map. */
export function Experience() {
  const { t } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 800px)');
  const [selectedId, setSelectedId] = useState(defaultStationId);

  return (
    <Section
      id="experience"
      index="02"
      tone="alt"
      kanji={ui.sections.experience.kanji}
      title={ui.sections.experience.title}
      lead={copy.lead}
    >
      <div className={styles.board}>
        <div className={styles.lineSign}>
          <span className={styles.lineMark} aria-hidden="true">
            VB
          </span>
          <span className={styles.lineName}>{t(copy.lineName)}</span>
          <span className={styles.lineDirection}>{t(copy.lineDirection)}</span>
        </div>

        {career.length > 0 &&
          (isDesktop ? (
            <LineMap stations={career} selectedId={selectedId} onSelect={setSelectedId} />
          ) : (
            <LineList stations={career} initialOpenId={selectedId} />
          ))}
      </div>
    </Section>
  );
}
