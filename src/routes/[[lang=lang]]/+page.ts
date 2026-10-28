import { listPosts } from '#lib/blog.js';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ latestPosts: listPosts().slice(0, 3) });
