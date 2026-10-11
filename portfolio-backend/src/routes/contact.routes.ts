import { Router, type RequestHandler } from 'express';
import { createContactController } from '../controllers/contact.controller.js';
import { validateBody } from '../middleware/validate.js';
import type { ContactService } from '../services/contact.service.js';
import { contactSchema } from '../validation/contact.schema.js';

export interface ContactRouterDeps {
  contactService: ContactService;
  rateLimiter: RequestHandler;
}

export function createContactRouter({ contactService, rateLimiter }: ContactRouterDeps): Router {
  const router = Router();
  const controller = createContactController(contactService);
  router.post('/', rateLimiter, validateBody(contactSchema), controller.create);
  return router;
}
