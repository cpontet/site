import { en } from './i18n/en.js';
import { fr } from './i18n/fr.js';

export const langs = ['en', 'fr'] as const;
export type Lang = (typeof langs)[number];
export type Dictionary = typeof en;

const dictionaries: Record<Lang, Dictionary> = { en, fr };

export function toLang(param: string | undefined): Lang {
  return param === 'fr' ? 'fr' : 'en';
}

export function t(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Prefix an app path with the language segment ("/blog" → "/fr/blog"). */
export function localize(path: string, lang: Lang): string {
  if (lang === 'en') return path;
  return path === '/' ? '/fr' : `/fr${path}`;
}

/** Public PDF CV in the given language. */
export function cvPath(lang: Lang): string {
  return lang === 'fr' ? '/cv/cedric-pontet-cv-fr.pdf' : '/cv/cedric-pontet-cv.pdf';
}

/** Same page in the other language ("/fr/blog" ↔ "/blog"). */
export function switchLang(pathname: string, to: Lang): string {
  const bare = pathname.replace(/^\/fr(?=\/|$)/, '') || '/';
  return localize(bare, to);
}
