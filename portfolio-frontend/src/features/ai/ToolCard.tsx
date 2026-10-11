import type { AiTool } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { EditorMock } from './EditorMock';
import { TerminalMock } from './TerminalMock';
import { copy } from './copy';
import styles from './ToolCard.module.css';

interface ToolCardProps {
  tool: AiTool;
}

/** One AI tool: mock UI, name, vendor, tagline and what it is used for. */
export function ToolCard({ tool }: ToolCardProps) {
  const { t, tl } = useLanguage();
  const titleId = `ai-tool-${tool.id}`;
  return (
    <article className={styles.card} aria-labelledby={titleId}>
      {tool.id === 'copilot' ? <EditorMock /> : <TerminalMock />}
      <div className={styles.body}>
        <p className={styles.vendor}>
          {t(copy.by)} {tool.vendor}
        </p>
        <h4 id={titleId} className={styles.name}>
          {tool.name}
        </h4>
        <p className={styles.tagline}>{t(tool.tagline)}</p>
        <p className={styles.useLabel}>{t(copy.useCases)}</p>
        <ul className={styles.uses}>
          {tl(tool.useCases).map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
