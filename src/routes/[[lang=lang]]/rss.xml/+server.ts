import { listPosts } from '#lib/blog.js';
import { localize, t, toLang } from '#lib/i18n.js';
import type { RequestHandler } from './$types';

export const prerender = true;

const origin = 'https://cedricpontet.com';
const escapeXml = (s: string) => s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

export const GET: RequestHandler = ({ params }) => {
  const lang = toLang(params.lang);
  const dict = t(lang);
  const items = listPosts(lang)
    .map((post) => {
      const url = origin + localize(`/blog/${post.slug}`, lang);
      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escapeXml(post.description)}</description></item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(dict.meta.title)}</title><link>${origin + localize('/blog', lang)}</link><description>${escapeXml(dict.blog.lead)}</description><language>${lang}</language>${items}</channel></rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
