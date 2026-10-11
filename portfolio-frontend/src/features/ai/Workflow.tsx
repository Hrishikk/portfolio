import type { AiTool, AiWorkflowStep } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { ui } from '@/i18n/ui';
import { Reveal } from '@/components/ui';
import { copy } from './copy';
import styles from './Workflow.module.css';

interface WorkflowProps {
  steps: AiWorkflowStep[];
  tools: AiTool[];
}

/** Plan → Build → Test → Review stepper: horizontal on desktop, vertical on mobile. */
export function Workflow({ steps, tools }: WorkflowProps) {
  const { t } = useLanguage();
  const toolName = (id: AiTool['id']) => tools.find((tool) => tool.id === id)?.name.replace('GitHub ', '') ?? id;

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>{t(ui.labels.workflow)}</h3>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <Reveal as="li" key={step.id} delay={i * 100} className={styles.step}>
            <span className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className={styles.content}>
              <h4 className={styles.title}>
                <span className={styles.srOnly}>
                  {t(copy.step)} {i + 1}:{' '}
                </span>
                {t(step.title)}
              </h4>
              <p className={styles.desc}>{t(step.description)}</p>
              <p className={styles.srOnly}>{t(copy.toolsUsed)}:</p>
              <ul className={styles.badges}>
                {step.tool.map((id) => (
                  <li key={id} className={`${styles.badge} ${id === 'copilot' ? styles.copilot : styles.claude}`}>
                    {toolName(id)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
