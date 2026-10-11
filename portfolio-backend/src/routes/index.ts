import { Router } from 'express';
import { createContactRouter, type ContactRouterDeps } from './contact.routes.js';
import { createHealthRouter } from './health.routes.js';

/** Mounts every API route under the router returned here (mounted at /api by the app). */
export function createApiRouter(deps: ContactRouterDeps): Router {
  const router = Router();
  router.use('/health', createHealthRouter());
  router.use('/contact', createContactRouter(deps));
  return router;
}
