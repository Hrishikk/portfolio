import { useEffect, useId, useRef, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui';
import { useLanguage } from '@/i18n/useLanguage';
import type { ContactField } from '@/services/contactApi';
import { copy, type CopyKey } from './copy';
import { FIELD_ORDER, LIMITS, useContactForm } from './useContactForm';
import styles from './ContactForm.module.css';

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  error?: string;
  hint?: ReactNode;
  children: (aria: { 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode;
}

function Field({ id, label, required, optionalLabel, error, hint, children }: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`${styles.field} ${error ? styles.hasError : ''}`}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {' '}
              *
            </span>
          )}
          {optionalLabel && <span className={styles.optional}>{optionalLabel}</span>}
        </label>
        {hint && (
          <span id={hintId} className={styles.hint}>
            {hint}
          </span>
        )}
      </div>
      {children({ 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      <p id={errorId} className={styles.error} hidden={!error}>
        {error}
      </p>
    </div>
  );
}

/** Contact form with client-side validation, honeypot and accessible status messaging. */
export function ContactForm() {
  const { t } = useLanguage();
  const { values, errors, status, handleChange, handleBlur, handleSubmit, reset } = useContactForm();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const idFor = (field: ContactField | 'website') => `${uid}-${field}`;
  const errorText = (key: CopyKey | undefined) => (key ? t(copy[key]) : undefined);

  const submitting = status.state === 'submitting';
  const succeeded = status.state === 'success';

  useEffect(() => {
    if (succeeded) successRef.current?.focus();
  }, [succeeded]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const fieldErrors = await handleSubmit(event);
    const first = FIELD_ORDER.find((field) => fieldErrors[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(idFor(first))}`)?.focus();
  };

  const statusMessage =
    status.state === 'submitting'
      ? t(copy.sendingStatus)
      : status.state === 'success'
        ? `${t(copy.successTitle)} ${t(copy.successBody)}`
        : status.state === 'error'
          ? t(copy[status.reason])
          : '';

  const messageLength = values.message.trim().length;

  return (
    <div className={styles.wrapper}>
      {/* Polite live region announces sending / success / failure to screen readers. */}
      <p className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </p>

      {succeeded ? (
        <div className={styles.success}>
          <div className={styles.stamp} aria-hidden="true">
            <span className={styles.stampJa}>{copy.successStamp.ja}</span>
            <span className={styles.stampEn}>{copy.successStamp.en}</span>
          </div>
          <h3 ref={successRef} tabIndex={-1} className={styles.successTitle}>
            {t(copy.successTitle)}
          </h3>
          <p className={styles.successBody}>{t(copy.successBody)}</p>
          <Button type="button" variant="ghost" onClick={reset}>
            {t(copy.sendAnother)}
          </Button>
        </div>
      ) : (
        <form
          ref={formRef}
          className={styles.form}
          noValidate
          onSubmit={(e) => void onSubmit(e)}
          aria-labelledby={`${uid}-heading`}
          aria-busy={submitting}
        >
          <div className={styles.formHeader}>
            <h3 id={`${uid}-heading`} className={styles.formTitle}>
              {t(copy.formHeading)}
            </h3>
            <p className={styles.requiredNote}>{t(copy.requiredNote)}</p>
          </div>

          <div className={styles.row}>
            <Field id={idFor('name')} label={t(copy.nameLabel)} required error={errorText(errors.name)}>
              {(aria) => (
                <input
                  id={idFor('name')}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={LIMITS.name.max + 20}
                  placeholder={t(copy.namePlaceholder)}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={submitting}
                  className={styles.input}
                  {...aria}
                />
              )}
            </Field>

            <Field id={idFor('email')} label={t(copy.emailLabel)} required error={errorText(errors.email)}>
              {(aria) => (
                <input
                  id={idFor('email')}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  maxLength={LIMITS.email.max + 20}
                  placeholder={t(copy.emailPlaceholder)}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={submitting}
                  className={styles.input}
                  {...aria}
                />
              )}
            </Field>
          </div>

          <Field
            id={idFor('company')}
            label={t(copy.companyLabel)}
            optionalLabel={t(copy.optional)}
            error={errorText(errors.company)}
          >
            {(aria) => (
              <input
                id={idFor('company')}
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={LIMITS.company.max + 20}
                placeholder={t(copy.companyPlaceholder)}
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={submitting}
                className={styles.input}
                {...aria}
              />
            )}
          </Field>

          <Field
            id={idFor('message')}
            label={t(copy.messageLabel)}
            required
            error={errorText(errors.message)}
            hint={
              <span className={messageLength > LIMITS.message.max ? styles.countOver : undefined}>
                {messageLength.toLocaleString()} / {LIMITS.message.max.toLocaleString()}
              </span>
            }
          >
            {(aria) => (
              <textarea
                id={idFor('message')}
                name="message"
                rows={6}
                required
                placeholder={t(copy.messagePlaceholder)}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={submitting}
                className={`${styles.input} ${styles.textarea}`}
                {...aria}
              />
            )}
          </Field>

          {/* Honeypot: invisible to people and assistive tech, irresistible to bots. */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor={idFor('website')}>{t(copy.honeypotLabel)}</label>
            <input
              id={idFor('website')}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={handleChange}
            />
          </div>

          {status.state === 'error' && (
            <p className={styles.formError}>
              {t(copy[status.reason])}
            </p>
          )}

          <div className={styles.actions}>
            <Button type="submit" disabled={submitting} className={styles.submit}>
              {submitting && <span className={styles.spinner} aria-hidden="true" />}
              {submitting ? t(copy.sending) : t(copy.submit)}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
