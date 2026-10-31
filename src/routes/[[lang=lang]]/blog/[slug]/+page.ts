import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '#lib/blog.js';
import { getServicePage, servicesWithPage } from '#lib/content/service-pages.js';
import { type Lang, localize } from '#lib/i18n.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  listPosts().map((post) =>
    post.lang === 'en' ? { slug: post.slug } : { lang: post.lang, slug: post.slug },
  );

const shared = (a: string[], b: string[]) => a.filter((tag) => b.includes(tag)).length;

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

  // The service sharing the most tags with the post, if any.
  const service = servicesWithPage
    .map((s) => ({ s, n: shared(getServicePage(s)?.tags ?? [], post.tags) }))
    .filter(({ n }) => n > 0)
    .sort((a, b) => b.n - a.n)[0]?.s;

  // Three other posts in the page language: most shared tags first, then the latest (stable sort).
  const morePosts = listPosts(lang)
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => shared(b.tags, post.tags) - shared(a.tags, post.tags))
    .slice(0, 3);

  return { ...found, alternates, service, morePosts };
};
