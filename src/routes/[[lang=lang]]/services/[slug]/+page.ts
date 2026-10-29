import { error } from '@sveltejs/kit';
import { listPosts } from '#lib/blog.js';
import { services } from '#lib/content/profile.js';
import { getServicePage, relatedPosts, servicesWithPage } from '#lib/content/service-pages.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  servicesWithPage.flatMap((s) => [{ slug: s.slug }, { lang: 'fr', slug: s.slug }]);

export const load: PageLoad = async ({ params, parent }) => {
  const { lang } = await parent();
  const service = services.find((s) => s.slug === params.slug);
  const page = service && getServicePage(service);
  if (!service || !page) error(404);
  return {
    service,
    page,
    // Same rule as the blog index: only articles in the page's language.
    posts: relatedPosts(page, listPosts(lang)),
    others: services.filter((s) => s.id !== service.id),
  };
};
