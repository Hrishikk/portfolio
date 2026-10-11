import styles from './Mocks.module.css';

/** Decorative editor window with a Copilot-style ghost-text suggestion. */
export function EditorMock() {
  return (
    <div className={styles.window} aria-hidden="true">
      <div className={styles.chrome}>
        <span className={styles.dots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.file}>orders.service.ts</span>
      </div>
      <pre className={styles.code}>
        <span className={styles.line}>
          <span className={styles.ln}>1</span>
          <span className={styles.kw}>async</span> findOpen() {'{'}
        </span>
        <span className={styles.line}>
          <span className={styles.ln}>2</span>
          {'  '}
          <span className={styles.kw}>return</span> this.repo
          <span className={styles.caret} />
          <span className={styles.ghost}>.find({'{'} status: 'open' {'}'});</span>
        </span>
        <span className={styles.line}>
          <span className={styles.ln}>3</span>
          {'}'}
        </span>
      </pre>
      <div className={styles.hint}>
        <kbd className={styles.kbd}>Tab</kbd> accept
      </div>
    </div>
  );
}
