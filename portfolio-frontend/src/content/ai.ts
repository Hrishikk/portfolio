import type { AiExperience } from '@/types/content';

/**
 * AI-assisted development experience.
 * Not part of the source resumes — written from the owner's brief; edit freely.
 */
export const aiExperience: AiExperience = {
  intro: {
    en: 'I use AI tools every day to move faster without lowering quality. AI writes drafts; I own the design, the review and the final result.',
    ja: '品質を落とさずに開発スピードを上げるため、日常的にAIツールを活用しています。AIは下書きを担当し、設計・レビュー・最終的な品質は自分が責任を持ちます。',
  },
  tools: [
    {
      id: 'copilot',
      name: 'GitHub Copilot',
      vendor: 'GitHub',
      tagline: {
        en: 'My pair programmer inside the editor',
        ja: 'エディタの中のペアプログラマー',
      },
      useCases: {
        en: [
          'Inline completion for React components, NestJS modules and DTOs',
          'Writing Jest unit tests and test data quickly',
          'Explaining unfamiliar code and suggesting refactors in Copilot Chat',
          'Drafting commit messages and pull-request summaries',
        ],
        ja: [
          'Reactコンポーネント、NestJSモジュール、DTOのインライン補完',
          'Jestのユニットテストやテストデータの素早い作成',
          'Copilot Chatで不慣れなコードの解説やリファクタ提案',
          'コミットメッセージやプルリクエスト概要の下書き',
        ],
      },
    },
    {
      id: 'claude-code',
      name: 'Claude Code',
      vendor: 'Anthropic',
      tagline: {
        en: 'An agent for whole tasks across the codebase',
        ja: 'コードベース全体のタスクを任せられるエージェント',
      },
      useCases: {
        en: [
          'Planning multi-file features and refactors before writing code',
          'Running parallel sub-agents for larger builds — this portfolio was built that way',
          'Investigating bugs by reading code, logs and running commands',
          'Code review, documentation and migration scripts',
        ],
        ja: [
          'コードを書く前に、複数ファイルにまたがる機能やリファクタを計画',
          '大きな開発ではサブエージェントを並列実行（このポートフォリオもその方法で構築）',
          'コード・ログの調査やコマンド実行によるバグ解析',
          'コードレビュー、ドキュメント作成、移行スクリプト',
        ],
      },
    },
  ],
  workflow: [
    {
      id: 'plan',
      title: { en: 'Plan', ja: '計画' },
      description: {
        en: 'Break the requirement into small steps and agree the design with AI before any code.',
        ja: '要件を小さなステップに分け、コードを書く前にAIと設計をすり合わせる。',
      },
      tool: ['claude-code'],
    },
    {
      id: 'build',
      title: { en: 'Build', ja: '実装' },
      description: {
        en: 'Write code with inline suggestions and let the agent handle repetitive multi-file changes.',
        ja: 'インライン補完でコードを書き、繰り返しの多い複数ファイルの変更はエージェントに任せる。',
      },
      tool: ['copilot', 'claude-code'],
    },
    {
      id: 'test',
      title: { en: 'Test', ja: 'テスト' },
      description: {
        en: 'Generate unit and E2E test cases, then check edge cases myself.',
        ja: 'ユニットテストとE2Eテストを生成し、境界値は自分で確認する。',
      },
      tool: ['copilot', 'claude-code'],
    },
    {
      id: 'review',
      title: { en: 'Review', ja: 'レビュー' },
      description: {
        en: 'Every AI change is read, understood and reviewed like a teammate’s pull request.',
        ja: 'AIによる変更はすべて、チームメンバーのPRと同じように読んで理解し、レビューする。',
      },
      tool: ['claude-code'],
    },
  ],
  principles: [
    {
      id: 'ownership',
      title: { en: 'I own the output', ja: '成果物の責任は自分に' },
      description: {
        en: 'AI suggests; I decide. Nothing ships that I do not understand.',
        ja: 'AIは提案し、判断するのは自分。理解していないコードはリリースしない。',
      },
    },
    {
      id: 'security',
      title: { en: 'Client data stays safe', ja: '顧客データを守る' },
      description: {
        en: 'I follow client and company rules on what can be shared with AI tools.',
        ja: 'AIツールに共有できる情報について、顧客・社内のルールを遵守する。',
      },
    },
    {
      id: 'team',
      title: { en: 'Share with the team', ja: 'チームに共有する' },
      description: {
        en: 'As a team leader I share prompts and practices so the whole team benefits.',
        ja: 'チームリーダーとして、プロンプトやノウハウを共有しチーム全体の生産性を高める。',
      },
    },
  ],
};
