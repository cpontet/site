import type { Post } from './blog.js';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_ORIGIN } from './config.js';
import ogPosts from './content/og-posts.json';
import { type Service, services } from './content/profile.js';
import type { Talk } from './content/talks.js';
import { type Lang, localize, t } from './i18n.js';

/** Static share image per language, rendered by `bun run og`. */
export const ogImage = (lang: Lang) => `${SITE_ORIGIN}/og/default-${lang}.png`;

/** FNV-1a of a post title: og-posts.json stores this, so draft titles never reach the client. */
export function titleHash(title: string): string {
  let hash = 0x811c9dc5;
  for (const char of title) {
    hash ^= char.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

/**
 * A post's own share image, rendered by `bun run og`. Falls back to the default image (with a
 * build warning) when the card is missing or was rendered for an older title.
 */
export function postOgImage(post: Post): string {
  const key = `${post.lang}/${post.slug}`;
  if ((ogPosts as Record<string, string>)[key] === titleHash(post.title)) {
    return `${SITE_ORIGIN}/og/blog/${key}.png`;
  }
  if (import.meta.env.SSR) {
    console.warn(`Share image missing or stale for blog/${key}: run \`bun run og\``);
  }
  return ogImage(post.lang);
}

const PERSON_ID = `${SITE_ORIGIN}/#person`;

const jobTitle = {
  en: 'Freelance CTO & cloud architect',
  fr: 'CTO freelance & architecte cloud',
};

/** schema.org Person, for the home and about pages. `image` is a site-relative URL. */
export function personLd(lang: Lang, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Cédric Pontet',
    url: SITE_ORIGIN + localize('/', lang),
    image: new URL(image, SITE_ORIGIN).href,
    jobTitle: jobTitle[lang],
    description: t(lang).meta.description,
    email: `mailto:${CONTACT_EMAIL}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Luxembourg', addressCountry: 'LU' },
    knowsAbout: services.map((s) => s.title[lang]),
    knowsLanguage: ['fr', 'en'],
    sameAs: [LINKEDIN_URL, GITHUB_URL],
  };
}

/** schema.org Service for a service page. */
export function serviceLd(service: Service, description: string, lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title[lang],
    serviceType: service.title[lang],
    description,
    url: SITE_ORIGIN + localize(`/services/${service.slug}`, lang),
    areaServed: 'Europe',
    provider: { '@type': 'Person', '@id': PERSON_ID, name: 'Cédric Pontet', url: SITE_ORIGIN },
  };
}

/** schema.org BlogPosting for a post page. */
export function blogPostingLd(post: Post) {
  const url = SITE_ORIGIN + localize(`/blog/${post.slug}`, post.lang);
  const author = { '@type': 'Person', '@id': PERSON_ID, name: 'Cédric Pontet', url: SITE_ORIGIN };
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: post.lang,
    url,
    mainEntityOfPage: url,
    image: postOgImage(post),
    keywords: post.tags.join(', '),
    author,
    publisher: author,
  };
}

/** schema.org VideoObject for a recorded talk, otherwise a PresentationDigitalDocument. */
export function talkLd(talk: Talk, lang: Lang) {
  const url = SITE_ORIGIN + localize(`/talks/${talk.slug}`, lang);
  const author = { '@type': 'Person', '@id': PERSON_ID, name: 'Cédric Pontet', url: SITE_ORIGIN };
  const base = {
    '@context': 'https://schema.org',
    name: talk.title,
    description: talk.summary[lang],
    // Spoken language of the recording, or of the latest delivery.
    inLanguage: (talk.deliveries.find((d) => d.recorded) ?? talk.deliveries[0]).lang,
    url,
    author,
  };
  if (!talk.video) return { ...base, '@type': 'PresentationDigitalDocument' };
  const { id, seconds, uploaded } = talk.video;
  return {
    ...base,
    '@type': 'VideoObject',
    thumbnailUrl: `${SITE_ORIGIN}/talks/video/${id}-1280.webp`,
    uploadDate: uploaded,
    duration: `PT${Math.floor(seconds / 60)}M${seconds % 60}S`,
    contentUrl: `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
  };
}
