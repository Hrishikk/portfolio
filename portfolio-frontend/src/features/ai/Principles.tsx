import type { AiExperience } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { Reveal, Seal } from '@/components/ui';
import styles from './Principles.module.css';

interface PrinciplesProps {
  principles: AiExperience['principles'];
}

/** Decorative seal kanji per principle. */
const PRINCIPLE_SEAL: Record<string, string> = {
  ownership: '責',
  security: '守',
  team: '共',
};

/** Three small stamped cards describing the rules I follow when using AI. */
export function Principles({ principles }: PrinciplesProps) {
  const { t } = useLanguage();
  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>{t(ui.labels.principles)}</h3>
      <ul className={styles.grid}>
        {principles.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 90} className={styles.card}>
            <Seal text={PRINCIPLE_SEAL[p.id] ?? '印'} size="sm" className={styles.seal} />
            <h4 className={styles.title}>{t(p.title)}</h4>
            <p className={styles.desc}>{t(p.description)}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
