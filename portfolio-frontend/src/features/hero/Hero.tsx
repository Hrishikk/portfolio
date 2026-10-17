import type { CSSProperties } from 'react';
import profilePhoto from '@/assets/profile.jpg';
import { AuroraCanvas, Button, Tag } from '@/components/ui';
import { career, metrics, profile } from '@/content';
import { ui } from '@/i18n/ui';
import { useSpotlight } from '@/hooks/useSpotlight';
import { useLanguage } from '@/i18n/useLanguage';
import type { Localized } from '@/types/content';
import { MetricCard } from './MetricCard';
import styles from './Hero.module.css';

const copy = {
  metricsLabel: { en: 'Highlights at a glance', ja: '実績ハイライト' },
  coreStackLabel: { en: 'Core stack', ja: '主な技術' },
} satisfies Record<string, Localized>;

const current = career[career.length - 1];

/** Entrance order for the load sequence: each step rises in a beat after the previous one. */
const step = (n: number) => ({ '--step': n }) as CSSProperties;

/** Landing section: living gradient band, name, role, pitch, core stack, calls to action, portrait and headline metrics. */
export function Hero() {
  const { t, locale } = useLanguage();
  const photoRef = useSpotlight<HTMLElement>({ tilt: 5, trackSection: true });

  return (
    <section id="home" className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.band} aria-hidden="true">
        <AuroraCanvas className={styles.aurora} />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.location} style={step(0)}>
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

          <h1 id="home-heading" className={styles.name} style={step(1)}>
            {profile.name}
          </h1>
          {locale === 'ja' && (
            <p className={styles.kana} lang="ja" style={step(2)}>
              {profile.nameKana}
            </p>
          )}

          <p className={styles.headline} style={step(2)}>
            {t(profile.headline)}
          </p>
          <p className={styles.tagline} style={step(3)}>
            {t(profile.tagline)}
          </p>

          <ul className={styles.stack} aria-label={t(copy.coreStackLabel)} style={step(4)}>
            {profile.coreStack.map((tech) => (
              <li key={tech}>
                <Tag tone="accent">{tech}</Tag>
              </li>
            ))}
          </ul>

          <div className={styles.ctas} style={step(5)}>
            <Button href="#projects" arrow>
              {t(ui.actions.viewWork)}
            </Button>
            <Button href="#contact" variant="ghost">
              {t(ui.actions.contact)}
            </Button>
          </div>
        </div>

        <div className={styles.photoStage}>
        <figure ref={photoRef} className={styles.photoCard}>
          <img
            className={styles.photo}
            src={profilePhoto}
            alt={t(profile.photoAlt)}
            width={640}
            height={823}
            fetchPriority="high"
          />
          <figcaption className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusText}>
              <span className={styles.statusLabel}>{t(ui.labels.present)}</span>
              <strong>{t(current.role)}</strong>
              <span>{current.company}</span>
            </span>
          </figcaption>
        </figure>
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
