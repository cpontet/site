import { listPosts } from '#lib/blog.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  return { latestPosts: listPosts(lang).slice(0, 3) };
};
