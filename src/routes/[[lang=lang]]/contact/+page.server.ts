import { fail } from '@sveltejs/kit';
import { toLang } from '#lib/i18n.js';
import { buildMime, parseContact, validateContact, verifyTurnstile } from '#lib/server/contact.js';
import type { Actions } from './$types';

// The only route rendered at request time: it receives form posts.
export const prerender = false;

const FROM = 'contact@cedricpontet.com';

export const actions: Actions = {
  default: async ({ request, params, platform, getClientAddress }) => {
    const lang = toLang(params.lang);
    const form = await request.formData();

    // Honeypot: humans never fill this hidden field. Pretend success for bots.
    if (String(form.get('website') ?? '') !== '') return { success: true };

    const input = parseContact(form);
    const errors = validateContact(input);
    if (errors.length > 0) return fail(400, { values: input, errors });

    const env = platform?.env;
    const human = await verifyTurnstile(
      String(form.get('cf-turnstile-response') ?? ''),
      env?.TURNSTILE_SECRET_KEY,
      getClientAddress(),
    );
    if (!human) return fail(400, { values: input, errors: ['captcha'] as const });

    const to = env?.CONTACT_TO;
    if (!env?.SEND_EMAIL || !to) {
      if (import.meta.env.DEV) {
        // Local dev without bindings: log instead of sending.
        console.info('[contact] email binding not configured, message:', input);
        return { success: true };
      }
      console.error('[contact] SEND_EMAIL binding or CONTACT_TO var missing');
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
