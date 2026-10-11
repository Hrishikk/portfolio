/**
 * Content model for the portfolio.
 * All user-facing copy lives in `src/content` and is typed here,
 * so UI components stay presentational and content can change without code edits.
 */

export type Locale = 'en' | 'ja';

/** A string available in every supported locale. */
export type Localized = Record<Locale, string>;

/** A list of strings available in every supported locale. */
export type LocalizedList = Record<Locale, string[]>;

export interface ContactLink {
  id: 'email' | 'linkedin' | 'location';
  label: Localized;
  value: string;
  href?: string;
}

export interface Profile {
  name: string;
  /** Katakana reading of the name, used as a decorative vertical label. */
  nameKana: string;
  /** Short initials-style seal text (hanko). */
  seal: string;
  headline: Localized;
  roles: Localized[];
  tagline: Localized;
  summary: LocalizedList;
  location: Localized;
  availability: Localized;
  contacts: ContactLink[];
}

export interface Metric {
  id: string;
  value: string;
  label: Localized;
  detail: Localized;
}

export type StationKind = 'join' | 'project' | 'promotion' | 'current';

/** One stop on the career "train line". */
export interface CareerStation {
  id: string;
  kind: StationKind;
  /** ISO-ish period strings, e.g. "2024-01". `end` undefined = present. */
  start: string;
  end?: string;
  title: Localized;
  role: Localized;
  company: string;
  teamSize?: Localized;
  summary: Localized;
  highlights: LocalizedList;
  phases: Localized[];
  stack: string[];
}

export interface Project {
  id: string;
  name: string;
  period: Localized;
  role: Localized;
  problem: Localized;
  solution: Localized;
  outcomes: LocalizedList;
  stack: string[];
  /** Accent token name used for the project card. */
  accent: 'vermilion' | 'indigo' | 'matcha' | 'gold';
}

export interface SkillItem {
  name: string;
  /** Hands-on experience, in years (from the 職務経歴書 skills table) when known. */
  years?: number;
}

export interface SkillGroup {
  id: string;
  title: Localized;
  description: Localized;
  items: SkillItem[];
}

export interface AiTool {
  id: 'copilot' | 'claude-code';
  name: string;
  vendor: string;
  tagline: Localized;
  useCases: LocalizedList;
}

export interface AiWorkflowStep {
  id: string;
  title: Localized;
  description: Localized;
  tool: Array<AiTool['id']>;
}

export interface AiExperience {
  intro: Localized;
  tools: AiTool[];
  workflow: AiWorkflowStep[];
  principles: Array<{ id: string; title: Localized; description: Localized }>;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: Localized;
  status: 'earned' | 'in-progress';
}

export interface Education {
  degree: Localized;
  school: string;
  period: Localized;
}

export interface LanguageSkill {
  id: string;
  name: Localized;
  level: Localized;
}

export interface NavItem {
  id: SectionId;
  label: Localized;
}

export type SectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'ai'
  | 'certifications'
  | 'contact';
