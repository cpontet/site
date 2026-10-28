import { env } from 'cloudflare:workers';
import { fail } from '@sveltejs/kit';
import { toLang } from '#lib/i18n.js';
import { buildMime, parseContact, validateContact, verifyTurnstile } from '#lib/server/contact.js';
import { dev } from '$app/env';
import type { Actions } from './$types';

// The only route rendered at request time: it receives form posts.
// Bindings and secrets come from `cloudflare:workers` (SvelteKit 3 no longer passes `platform`).
export const prerender = false;

const FROM = 'contact@cedricpontet.com';

export const actions: Actions = {
  default: async ({ request, params, getClientAddress }) => {
    const lang = toLang(params.lang);
    const form = await request.formData();

    // Honeypot: humans never fill this hidden field. Pretend success for bots.
    if (String(form.get('website') ?? '') !== '') return { success: true };

    const input = parseContact(form);
    const errors = validateContact(input);
    if (errors.length > 0) return fail(400, { values: input, errors });

    const human = await verifyTurnstile(
      String(form.get('cf-turnstile-response') ?? ''),
      env.TURNSTILE_SECRET_KEY,
      getClientAddress(),
      dev,
    );
    if (!human) return fail(400, { values: input, errors: ['captcha'] as const });

    const to = env.CONTACT_TO;
    if (!env.SEND_EMAIL || !to) {
      if (dev) {
        // Local dev without bindings: log instead of sending.
        console.info('[contact] email binding not configured, message:', input);
        return { success: true };
      }
      console.error('[contact] SEND_EMAIL binding or CONTACT_TO secret missing');
      return fail(500, { values: input, errors: [], sendFailed: true });
    }

    try {
      const { raw } = buildMime(input, lang, FROM, to);
      // Runtime-only module; kept out of the bundler's reach.
      const mod = 'cloudflare:email';
      const { EmailMessage } = await import(/* @vite-ignore */ mod);
      await env.SEND_EMAIL.send(new EmailMessage(FROM, to, raw));
      return { success: true };
    } catch (err) {
      console.error('[contact] send failed', err);
      return fail(500, { values: input, errors: [], sendFailed: true });
    }
  },
};
