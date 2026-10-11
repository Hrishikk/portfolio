import { z } from 'zod';

/** Collapse control characters (except newlines/tabs) that have no place in a contact message. */
const stripControl = (v: string) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');

/** Single-line fields additionally may not contain line breaks (prevents header-injection style abuse). */
const singleLine = (v: string) => stripControl(v).replace(/[\r\n\t]+/g, ' ');

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  message: { min: 10, max: 2000 },
  company: { max: 100 },
  website: { max: 200 },
} as const;

export const contactSchema = z.object({
  name: z
    .string({ error: 'Name is required.' })
    .transform(singleLine)
    .pipe(
      z
        .string()
        .trim()
        .min(CONTACT_LIMITS.name.min, `Name must be at least ${CONTACT_LIMITS.name.min} characters.`)
        .max(CONTACT_LIMITS.name.max, `Name must be at most ${CONTACT_LIMITS.name.max} characters.`),
    ),
  email: z
    .string({ error: 'Email is required.' })
    .trim()
    .min(1, 'Email is required.')
    .max(CONTACT_LIMITS.email.max, `Email must be at most ${CONTACT_LIMITS.email.max} characters.`)
    .pipe(z.email({ error: 'Please enter a valid email address.' })),
  message: z
    .string({ error: 'Message is required.' })
    .transform(stripControl)
    .pipe(
      z
        .string()
        .trim()
        .min(CONTACT_LIMITS.message.min, `Message must be at least ${CONTACT_LIMITS.message.min} characters.`)
        .max(CONTACT_LIMITS.message.max, `Message must be at most ${CONTACT_LIMITS.message.max} characters.`),
    ),
  company: z
    .string({ error: 'Company must be text.' })
    .transform(singleLine)
    .pipe(z.string().trim().max(CONTACT_LIMITS.company.max, `Company must be at most ${CONTACT_LIMITS.company.max} characters.`))
    .optional()
    .transform((v) => (v ? v : undefined)),
  /**
   * Honeypot. Real users never see or fill this field. It is accepted (not rejected) so bots get a
   * normal-looking success response; the service silently drops submissions where it is non-empty.
   */
  website: z.string().max(CONTACT_LIMITS.website.max).optional().default(''),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;
