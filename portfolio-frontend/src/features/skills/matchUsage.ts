import { career } from '@/content';
import type { CareerStation } from '@/types/content';

const key = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** Skill names that are written differently in the career stacks. */
const ALIASES: Record<string, string[]> = {
  'microsoft azure': ['azure'],
  'restful apis': ['rest apis'],
};

/** Skills that must only match themselves, not their shorter base name ("AWS Serverless" ≠ "AWS"). */
const EXACT_ONLY = new Set(['aws serverless']);

/**
 * Career stations whose stack lists this skill. Matching is by normalised name, allowing a more
 * specific variant on either side ("Swagger" ↔ "Swagger / OpenAPI", "AWS" ↔ "AWS (serverless)").
 */
export function stationsUsing(skill: string): CareerStation[] {
  const keys = [key(skill), ...(ALIASES[key(skill)] ?? [])];
  return career.filter((station) =>
    station.stack.some((item) => {
      const candidate = key(item);
      return keys.some(
        (k) => candidate === k || candidate.startsWith(`${k} `) || (!EXACT_ONLY.has(k) && k.startsWith(`${candidate} `)),
      );
    }),
  );
}
