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

/** A certification card. In-progress ones get a dashed border. */
export function CertificateCard({ cert }: CertificateCardProps) {
  const { t } = useLanguage();
  const earned = cert.status === 'earned';
  const spotRef = useSpotlight<HTMLElement>({ tilt: 5 });
  return (
    <article ref={spotRef} className={`${styles.cert} ${earned ? '' : styles.pending} spotlight`}>
      <div className={styles.certTop}>
        <Tag tone={earned ? 'accent' : 'neutral'}>{t(earned ? ui.labels.earned : ui.labels.inProgress)}</Tag>
      </div>
      <h4 className={styles.certName}>{cert.name}</h4>
      <p className={styles.issuer}>
        <span className={styles.srOnly}>{t(copy.issuedBy)}: </span>
        {cert.issuer}
      </p>
      {earned && <p className={styles.date}>{t(cert.date)}</p>}
    </article>
  );
}
