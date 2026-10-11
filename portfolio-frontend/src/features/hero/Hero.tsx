import { Button, Seal } from '@/components/ui';
import { metrics, profile } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import type { Localized } from '@/types/content';
import { MetricCard } from './MetricCard';
import { RoleCycler } from './RoleCycler';
import styles from './Hero.module.css';

const copy = {
  metricsLabel: { en: 'Highlights at a glance', ja: '実績ハイライト' },
} satisfies Record<string, Localized>;

/** Splits "Given Middle Last" into a quiet lead and an emphasised final name. */
function splitName(name: string): { lead: string; main: string } {
  const parts = name.trim().split(/\s+/);
  const main = parts.pop() ?? name;
  return { lead: parts.join(' '), main };
}

/** Landing section: display name, vertical katakana, cycling roles, CTAs and headline metrics. */
export function Hero() {
  const { t } = useLanguage();
  const { lead, main } = splitName(profile.name);

  return (
    <section id="home" className={styles.hero} aria-labelledby="home-heading">
      <span className={styles.watermark} aria-hidden="true">
        橋
      </span>

      <div className={styles.inner}>
        <p className={styles.kana} lang="ja" aria-hidden="true">
          {profile.nameKana}
        </p>

        <div className={styles.content}>
          <p className={styles.availability}>
            <span className={styles.pulse} aria-hidden="true" />
            {t(profile.availability)}
          </p>

          <h1 id="home-heading" className={styles.name}>
            {lead && <span className={styles.nameLead}>{lead}</span>}
            <span className={styles.nameMain}>{main}</span>
          </h1>

          <p className={styles.headline}>{t(profile.headline)}</p>
          <RoleCycler roles={profile.roles} />
          <p className={styles.tagline}>{t(profile.tagline)}</p>

          <div className={styles.ctas}>
            <Button href="#contact">{t(ui.actions.contact)}</Button>
            <Button href="#experience" variant="ghost">
              {t(ui.actions.viewJourney)}
            </Button>
          </div>
        </div>

        <div className={styles.sealWrap} aria-hidden="true">
          <Seal text={profile.seal} size="lg" className={styles.seal} />
        </div>
      </div>

      <div className={styles.metricsWrap}>
        <ul className={styles.metrics} aria-label={t(copy.metricsLabel)}>
          {metrics.map((m, i) => (
            <MetricCard key={m.id} metric={m} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
