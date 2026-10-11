import type { ReactNode } from 'react';
import { profile } from '@/content';
import { useLanguage } from '@/i18n/useLanguage';
import { copy as text } from './copy';
import { ArrowIcon, CheckIcon, CopyIcon, LinkedInIcon, MailIcon } from './icons';
import { useCopyToClipboard } from './useCopyToClipboard';
import styles from './ContactActions.module.css';

const email = profile.contacts.find((c) => c.id === 'email');
const linkedin = profile.contacts.find((c) => c.id === 'linkedin');

interface ActionContentProps {
  icon: ReactNode;
  title: string;
  detail: string;
  trailing?: ReactNode;
}

function ActionContent({ icon, title, detail, trailing = <ArrowIcon /> }: ActionContentProps) {
  return (
    <>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.detail}>{detail}</span>
      </span>
      <span className={styles.trailing}>{trailing}</span>
    </>
  );
}

/** Large, tappable ways to get in touch: email, copy email, LinkedIn. */
export function ContactActions() {
  const { t } = useLanguage();
  const { status, copy } = useCopyToClipboard();

  const copyLabel =
    status === 'copied' ? t(text.copied) : status === 'failed' ? t(text.copyFailed) : t(text.copyEmail);

  return (
    <div className={styles.actions}>
      {email?.href && (
        <a className={`${styles.action} ${styles.primary}`} href={email.href}>
          <ActionContent icon={<MailIcon />} title={t(text.emailMe)} detail={email.value} />
        </a>
      )}

      {email && (
        <button type="button" className={styles.action} onClick={() => copy(email.value)}>
          <ActionContent
            icon={status === 'copied' ? <CheckIcon /> : <CopyIcon />}
            title={copyLabel}
            detail={t(text.copyHint)}
            trailing={null}
          />
        </button>
      )}

      {linkedin?.href && (
        <a className={styles.action} href={linkedin.href} target="_blank" rel="noopener noreferrer">
          <ActionContent icon={<LinkedInIcon />} title={t(text.connectLinkedIn)} detail={linkedin.value} />
          <span className="visually-hidden"> {t(text.opensInNewTab)}</span>
        </a>
      )}

      <p className={styles.status} role="status" aria-live="polite">
        {status === 'copied' ? t(text.copied) : status === 'failed' ? t(text.copyFailed) : ''}
      </p>
    </div>
  );
}
