import type { Handle } from '@sveltejs/kit/hooks';

// Set <html lang> from the URL so prerendered pages carry the right language.
export const handle: Handle = ({ event, resolve }) => {
  const lang = /^\/fr(\/|$)/.test(event.url.pathname) ? 'fr' : 'en';
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang),
  });
};
