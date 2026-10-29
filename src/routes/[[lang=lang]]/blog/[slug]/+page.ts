import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '#lib/blog.js';
import { type Lang, localize } from '#lib/i18n.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  listPosts().map((post) =>
    post.lang === 'en' ? { slug: post.slug } : { lang: post.lang, slug: post.slug },
  );

export const load: PageLoad = async ({ params, parent }) => {
  const { lang } = await parent();
  const found = getPost(lang, params.slug);
  if (!found) error(404);
  const { post } = found;
  const translation = post.translationOf?.match(/^(en|fr)\/(.+)$/);
  const alternates: Partial<Record<Lang, string>> = {
    [lang]: localize(`/blog/${post.slug}`, lang),
  };
  if (translation) {
    const other = translation[1] as Lang;
    alternates[other] = localize(`/blog/${translation[2]}`, other);
  }
  return { ...found, alternates };
};
