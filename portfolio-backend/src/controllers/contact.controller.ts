import type { Request, Response } from 'express';
import type { ContactService } from '../services/contact.service.js';
import type { ContactPayload } from '../validation/contact.schema.js';

/** HTTP adapter for the contact service. Validation has already run in middleware. */
export function createContactController(service: ContactService) {
  return {
    async create(req: Request, res: Response): Promise<void> {
      const payload = req.body as ContactPayload;
      await service.submit(payload, { ip: req.ip, userAgent: req.get('user-agent') });
      // Honeypot hits get the same response as real submissions so bots learn nothing.
      res.status(201).json({ ok: true });
    },
  };
}
