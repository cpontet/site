import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '#lib/blog.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  listPosts().map((post) =>
    post.lang === 'en' ? { slug: post.slug } : { lang: post.lang, slug: post.slug },
  );

export const load: PageLoad = async ({ params, parent }) => {
  const { lang } = await parent();
  const found = getPost(lang, params.slug);
  if (!found) error(404);
  return found;
};
