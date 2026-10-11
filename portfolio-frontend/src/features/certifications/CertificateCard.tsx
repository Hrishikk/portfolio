import type { Certification } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { Seal, Tag } from '@/components/ui';
import { copy } from './copy';
import styles from './Certifications.module.css';

interface CertificateCardProps {
  cert: Certification;
}

/** A certificate styled like a stamped paper slip. In-progress ones get a dashed border. */
export function CertificateCard({ cert }: CertificateCardProps) {
  const { t } = useLanguage();
  const earned = cert.status === 'earned';
  return (
    <article className={`${styles.cert} ${earned ? styles.earned : styles.pending}`}>
      <div className={styles.certTop}>
        <Tag tone={earned ? 'matcha' : 'gold'}>{t(earned ? ui.labels.earned : ui.labels.inProgress)}</Tag>
        <Seal text={earned ? '証' : '習'} size="sm" className={earned ? '' : styles.sealFaded} />
      </div>
      <h4 className={styles.certName}>{cert.name}</h4>
      <p className={styles.issuer}>
        <span className={styles.srOnly}>{t(copy.issuedBy)}: </span>
        {cert.issuer}
      </p>
      <p className={styles.date}>{t(cert.date)}</p>
    </article>
  );
}
