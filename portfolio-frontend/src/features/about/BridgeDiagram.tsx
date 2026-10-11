import { Seal } from '@/components/ui';
import { profile } from '@/content';
import { useLanguage } from '@/i18n/useLanguage';
import { copy } from './copy';
import styles from './About.module.css';

/** Simple three-node diagram explaining the bilingual Bridge SE role. */
export function BridgeDiagram() {
  const { t } = useLanguage();
  return (
    <figure className={styles.bridge}>
      <figcaption className={styles.bridgeTitle}>{t(copy.bridgeTitle)}</figcaption>
      <ol className={styles.bridgeRow}>
        <li className={`${styles.node} ${styles.nodeClient}`}>
          <span className={styles.nodeIcon} aria-hidden="true">
            🇯🇵
          </span>
          <span className={styles.nodeLabel}>{t(copy.client)}</span>
          <span className={styles.nodeNote}>{t(copy.clientNote)}</span>
        </li>
        <li className={styles.link} aria-hidden="true">
          <span className={styles.linkLine} />
        </li>
        <li className={`${styles.node} ${styles.nodeMe}`}>
          <Seal text={profile.seal} size="sm" />
          <span className={styles.nodeLabel}>{t(copy.me)}</span>
          <span className={styles.nodeNote}>{t(copy.meNote)}</span>
        </li>
        <li className={styles.link} aria-hidden="true">
          <span className={styles.linkLine} />
        </li>
        <li className={`${styles.node} ${styles.nodeTeam}`}>
          <span className={styles.nodeIcon} aria-hidden="true">
            🌏
          </span>
          <span className={styles.nodeLabel}>{t(copy.team)}</span>
          <span className={styles.nodeNote}>{t(copy.teamNote)}</span>
        </li>
      </ol>
      <p className={styles.bridgeCaption}>{t(copy.bridgeCaption)}</p>
    </figure>
  );
}
