import { t, toLang } from '#lib/i18n.js';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = ({ params }) => {
  const lang = toLang(params.lang);
  return { lang, dict: t(lang) };
};
