import type { ContactField } from '#lib/contact.js';
import type { Lang } from '#lib/i18n.js';

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContact(form: FormData): ContactInput {
  const get = (key: string, max: number) =>
    String(form.get(key) ?? '')
      .trim()
      .slice(0, max);
  return {
    name: get('name', 120),
    email: get('email', 200),
    company: get('company', 160),
    topic: get('topic', 80),
    message: get('message', 5000),
  };
}

export function validateContact(input: ContactInput): ContactField[] {
  const errors: ContactField[] = [];
  if (input.name.length < 2) errors.push('name');
  if (!EMAIL_RE.test(input.email)) errors.push('email');
  if (input.message.length < 10) errors.push('message');
  return errors;
}

// Cloudflare's documented test secret: always passes. Used when no secret is configured (dev).
const TEST_SECRET = '1x0000000000000000000000000000000AA';

export async function verifyTurnstile(
  token: string,
  secret: string | undefined,
  ip: string | null,
): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.set('secret', secret || TEST_SECRET);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
}

/** Plain-text MIME message for the Cloudflare `send_email` binding. */
export function buildMime(
  input: ContactInput,
  lang: Lang,
  from: string,
  to: string,
): { raw: string; subject: string } {
  const subject = `[cedricpontet.com] ${input.topic || 'Contact'} — ${input.name}`;
  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Organisation: ${input.company || '-'}`,
    `Topic: ${input.topic || '-'}`,
    `Language: ${lang}`,
    '',
    input.message,
  ].join('\n');
  const encodedSubject = `=?UTF-8?B?${btoa(String.fromCharCode(...new TextEncoder().encode(subject)))}?=`;
  const raw = [
    `From: cedricpontet.com <${from}>`,
    `To: ${to}`,
    `Reply-To: ${input.email}`,
    `Subject: ${encodedSubject}`,
    `Message-ID: <${crypto.randomUUID()}@cedricpontet.com>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    text,
  ].join('\r\n');
  return { raw, subject };
}
