import { useState } from 'react';
import type { Certification } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { Tag } from '@/components/ui';
import { useSpotlight } from '@/hooks/useSpotlight';
import { copy } from './copy';
import styles from './Certifications.module.css';

interface CertificateCardProps {
  cert: Certification;
}

/** Turn-over arrow for the flip hint. */
function FlipIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
      <path
        d="M4 9a6 6 0 0 1 10.6-3.8M16 4v3.5h-3.5M16 11a6 6 0 0 1-10.6 3.8M4 16v-3.5h3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A certification card that turns over on click, Enter or Space.
 * Front: status and name. Back: issuer and date (or the progress note).
 * Both faces stay in the accessibility tree; under reduced motion and in print they sit flat, one above the other.
 * In-progress ones get a dashed border.
 */
export function CertificateCard({ cert }: CertificateCardProps) {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const earned = cert.status === 'earned';
  const status = t(earned ? ui.labels.earned : ui.labels.inProgress);
  const spotRef = useSpotlight<HTMLElement>({ tilt: 5 });
  const nameId = `cert-${cert.id}-name`;

  return (
    <article
      ref={spotRef}
      className={`${styles.cert} ${earned ? '' : styles.pending} ${flipped ? styles.flipped : ''}`}
      aria-labelledby={nameId}
    >
      <div className={styles.flipper}>
        <div className={`${styles.face} ${styles.front}`}>
          <div className={styles.certTop}>
            <Tag tone={earned ? 'accent' : 'neutral'}>{status}</Tag>
          </div>
          <h4 id={nameId} className={styles.certName}>
            {cert.name}
          </h4>
          <span className={styles.hint} aria-hidden="true">
            <FlipIcon />
            {t(copy.showDetails)}
          </span>
        </div>

        <div className={`${styles.face} ${styles.back}`}>
          <p className={styles.backLabel}>{t(copy.issuedBy)}</p>
          <p className={styles.issuer}>{cert.issuer}</p>
          <p className={styles.backFoot}>
            {earned && <Tag tone="accent">{status}</Tag>}
            <span className={earned ? styles.date : styles.progress}>{t(cert.date)}</span>
          </p>
          <span className={styles.hint} aria-hidden="true">
            <FlipIcon />
            {t(copy.hideDetails)}
          </span>
        </div>
      </div>

      <button
        type="button"
        className={styles.flipButton}
        aria-pressed={flipped}
        aria-label={t(copy.showDetails)}
        aria-describedby={nameId}
        onClick={() => setFlipped((v) => !v)}
      />
    </article>
  );
}
