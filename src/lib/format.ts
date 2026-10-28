import type { Lang } from './i18n.js';

export function formatDate(iso: string, lang: Lang): string {
  return new Date(iso).toLocaleDateString(lang === 'fr' ? 'fr-LU' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
