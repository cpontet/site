import { listPosts } from '#lib/blog.js';
import { SITE_ORIGIN } from '#lib/config.js';
import { servicesWithPage } from '#lib/content/service-pages.js';
import { localize, switchLang } from '#lib/i18n.js';

export const prerender = true;

const pages = [
  '/',
  '/about',
  ...servicesWithPage.map((s) => `/services/${s.slug}`),
  '/blog',
  '/contact',
  '/legal',
];

export function GET() {
  const url = (path: string, alternates: string) =>
    `<url><loc>${SITE_ORIGIN}${path}</loc>${alternates}</url>`;
  const pair = (path: string) =>
    (['en', 'fr'] as const)
      .map(
        (l) =>
          `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_ORIGIN}${switchLang(path, l)}"/>`,
      )
      .join('');

  const entries = [
    ...pages.flatMap((p) => [url(p, pair(p)), url(localize(p, 'fr'), pair(p))]),
    ...listPosts().map((post) => url(localize(`/blog/${post.slug}`, post.lang), '')),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
