import { listPosts } from '#lib/blog.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  // The index shows every article; each card says which language it is in.
  return { posts: listPosts(), lang };
};
