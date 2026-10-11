import styles from './Mocks.module.css';

const STEPS = ['Read 14 files', 'Plan: 4 steps', 'Built 3 components', 'Tests passing'];

/** Decorative terminal window showing a Claude Code session. */
export function TerminalMock() {
  return (
    <div className={styles.window} aria-hidden="true">
      <div className={styles.chrome}>
        <span className={styles.dots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.file}>~/portfolio — claude</span>
      </div>
      <pre className={styles.code}>
        <span className={styles.line}>
          <span className={styles.prompt}>&gt;</span> plan the feature, then build it
        </span>
        {STEPS.map((step) => (
          <span key={step} className={styles.line}>
            <span className={styles.check}>✓</span> {step}
          </span>
        ))}
        <span className={styles.line}>
          <span className={styles.prompt}>&gt;</span>
          <span className={`${styles.caret} ${styles.blink}`} />
        </span>
      </pre>
    </div>
  );
}
