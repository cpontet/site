import type { Post } from './blog.js';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_ORIGIN } from './config.js';
import { type Service, services } from './content/profile.js';
import { type Lang, localize, t } from './i18n.js';

/** Static share image per language, rendered by `bun run og`. */
export const ogImage = (lang: Lang) => `${SITE_ORIGIN}/og/default-${lang}.png`;

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
    image: ogImage(post.lang),
    keywords: post.tags.join(', '),
    author,
    publisher: author,
  };
}
