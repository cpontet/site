import { error } from '@sveltejs/kit';
import assets from '#lib/content/talk-assets.json';
import { getTalk, type SlideDeck, talksWithPage } from '#lib/content/talks.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
  talksWithPage.flatMap((t) => [{ slug: t.slug }, { lang: 'fr', slug: t.slug }]);

export const load: PageLoad = ({ params }) => {
  const talk = getTalk(params.slug);
  if (!talk) error(404);
  return {
    talk,
    slides: (assets as Partial<Record<string, SlideDeck>>)[talk.slug],
    // Up to three other talks on the same topic, with a page of their own.
    related: talksWithPage.filter((t) => t.topic === talk.topic && t !== talk).slice(0, 3),
  };
};
