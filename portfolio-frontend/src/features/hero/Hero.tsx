import profilePhoto from '@/assets/profile.jpg';
import { Button, Tag } from '@/components/ui';
import { metrics, profile } from '@/content';
import { ui } from '@/i18n/ui';
import { useLanguage } from '@/i18n/useLanguage';
import type { Localized } from '@/types/content';
import { MetricCard } from './MetricCard';
import styles from './Hero.module.css';

const copy = {
  metricsLabel: { en: 'Highlights at a glance', ja: '実績ハイライト' },
  coreStackLabel: { en: 'Core stack', ja: '主な技術' },
} satisfies Record<string, Localized>;

/** Landing section: photo, name, role, short pitch, core stack, calls to action and headline metrics. */
export function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section id="home" className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.location}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
              <path
                d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.2" fill="currentColor" />
            </svg>
            {t(profile.location)}
          </p>

          <h1 id="home-heading" className={styles.name}>
            {profile.name}
          </h1>
          {locale === 'ja' && (
            <p className={styles.kana} lang="ja">
              {profile.nameKana}
            </p>
          )}

          <p className={styles.headline}>{t(profile.headline)}</p>
          <p className={styles.tagline}>{t(profile.tagline)}</p>

          <ul className={styles.stack} aria-label={t(copy.coreStackLabel)}>
            {profile.coreStack.map((tech) => (
              <li key={tech}>
                <Tag tone="accent">{tech}</Tag>
              </li>
            ))}
          </ul>

          <div className={styles.ctas}>
            <Button href="#projects">{t(ui.actions.viewWork)}</Button>
            <Button href="#contact" variant="ghost">
              {t(ui.actions.contact)}
            </Button>
          </div>
        </div>

        <figure className={styles.photoWrap}>
          <img
            className={styles.photo}
            src={profilePhoto}
            alt={t(profile.photoAlt)}
            width={640}
            height={823}
            fetchPriority="high"
          />
        </figure>
      </div>

      <div className={styles.metricsWrap}>
        <ul className={styles.metrics} aria-label={t(copy.metricsLabel)}>
          {metrics.map((m) => (
            <MetricCard key={m.id} metric={m} />
          ))}
        </ul>
      </div>
    </section>
  );
}
