import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { loadConfig } from '../src/config/env.js';
import type { MailMessage, Mailer } from '../src/services/mailer/index.js';
import { createLogger } from '../src/utils/logger.js';

class FakeMailer implements Mailer {
  readonly name = 'fake';
  sent: MailMessage[] = [];
  fail = false;
  send(message: MailMessage): Promise<void> {
    if (this.fail) return Promise.reject(new Error('SMTP down'));
    this.sent.push(message);
    return Promise.resolve();
  }
}

const config = loadConfig({ NODE_ENV: 'test', CONTACT_TO: 'owner@example.com', CONTACT_FROM: 'site@example.com' });
const logger = createLogger('silent');
const passThrough = (_req: unknown, _res: unknown, next: () => void) => next();

const valid = {
  name: 'Taro Yamada',
  email: 'taro@example.co.jp',
  company: 'Example KK',
  message: 'Hello! I would love to talk about a role on our team.',
};

describe('API', () => {
  let mailer: FakeMailer;
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    mailer = new FakeMailer();
    app = createApp({ config, logger, mailer, rateLimiter: passThrough });
  });

  it('GET /api/health → 200 {status:"ok"}', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('POST /api/contact with valid data → 201 and sends one email', async () => {
    const res = await request(app).post('/api/contact').send(valid);
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ ok: true });
    expect(mailer.sent).toHaveLength(1);
    const mail = mailer.sent[0]!;
    expect(mail.to).toBe('owner@example.com');
    expect(mail.replyTo).toBe(valid.email);
    expect(mail.text).toContain(valid.message);
  });

  it('escapes user content in the HTML email', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...valid, name: '<b>Evil</b>', message: '<script>alert("x")</script> hello there' });
    expect(res.status).toBe(201);
    const html = mailer.sent[0]!.html!;
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
    expect(html).toContain('&lt;b&gt;Evil&lt;/b&gt;');
  });

  it('POST /api/contact with invalid data → 400 with field errors', async () => {
    const res = await request(app).post('/api/contact').send({ name: 'A', email: 'not-an-email', message: 'short' });
    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(typeof res.body.error.message).toBe('string');
    expect(Object.keys(res.body.error.fields).sort()).toEqual(['email', 'message', 'name']);
    expect(mailer.sent).toHaveLength(0);
  });

  it('rejects over-long company and missing fields', async () => {
    const res = await request(app).post('/api/contact').send({ company: 'x'.repeat(101) });
    expect(res.status).toBe(400);
    expect(res.body.error.fields).toHaveProperty('company');
    expect(res.body.error.fields).toHaveProperty('name');
    expect(res.body.error.fields).toHaveProperty('email');
    expect(res.body.error.fields).toHaveProperty('message');
  });

  it('honeypot filled → 201 but nothing is sent', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid, website: 'http://spam.example' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ ok: true });
    expect(mailer.sent).toHaveLength(0);
  });

  it('malformed JSON → 400 VALIDATION_ERROR', async () => {
    const res = await request(app).post('/api/contact').set('Content-Type', 'application/json').send('{"name":');
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('mailer failure → 500 INTERNAL_ERROR', async () => {
    mailer.fail = true;
    const res = await request(app).post('/api/contact').send(valid);
    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      ok: false,
      error: { code: 'INTERNAL_ERROR', message: expect.any(String) as string },
    });
  });

  it('unknown route → 404 JSON', async () => {
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('rate limits /api/contact → 429 RATE_LIMITED after 5 requests', async () => {
    const limited = createApp({ config, logger, mailer });
    for (let i = 0; i < 5; i++) {
      const ok = await request(limited).post('/api/contact').send(valid);
      expect(ok.status).toBe(201);
    }
    const res = await request(limited).post('/api/contact').send(valid);
    expect(res.status).toBe(429);
    expect(res.body).toEqual({
      ok: false,
      error: { code: 'RATE_LIMITED', message: expect.any(String) as string },
    });
  });
});
