import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import express, { type Express } from 'express';
import type { Logger } from './utils/logger.js';

/** SHA-256 CSP hashes for every inline <script> in the built index.html (e.g. the theme bootstrap). */
export function inlineScriptHashes(indexHtml: string): string[] {
  const hashes: string[] = [];
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of indexHtml.matchAll(re)) {
    const body = match[1];
    if (body && body.trim()) hashes.push(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
  return hashes;
}

export interface ClientBundle {
  dir: string;
  indexHtml: string;
}

export function findClientBundle(dir: string | null): ClientBundle | null {
  if (!dir) return null;
  const indexPath = path.join(dir, 'index.html');
  if (!existsSync(indexPath)) return null;
  return { dir, indexHtml: readFileSync(indexPath, 'utf8') };
}

/** Serve the built SPA with long-lived caching for hashed assets and an index.html fallback. */
export function mountClient(app: Express, bundle: ClientBundle, logger: Logger): void {
  app.use(
    '/assets',
    express.static(path.join(bundle.dir, 'assets'), { immutable: true, maxAge: '1y', fallthrough: true }),
  );
  app.use(express.static(bundle.dir, { index: false, maxAge: '1h' }));
  app.use((req, res, next) => {
    if ((req.method !== 'GET' && req.method !== 'HEAD') || req.path.startsWith('/api')) {
      next();
      return;
    }
    if (!req.accepts('html')) {
      next();
      return;
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.type('html').send(bundle.indexHtml);
  });
  logger.info('Serving client bundle', { dir: bundle.dir });
}
