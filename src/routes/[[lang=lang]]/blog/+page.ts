import { listPosts } from '#lib/blog.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  // Only articles in the page's language; translations are linked from each post.
  return { posts: listPosts(lang), lang };
};
