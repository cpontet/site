import type { Component } from 'svelte';
import type { Lang } from './i18n.js';

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  lang: Lang;
  tags: string[];
  draft?: boolean;
  /** Highlighted at the top of the blog index instead of the latest post. */
  featured?: boolean;
  /** "<lang>/<slug>" of the same article in the other language. */
  translationOf?: string;
}

export interface Post extends PostMeta {
  slug: string;
  readingMinutes: number;
}

const modules = import.meta.glob<{ metadata: PostMeta; default: Component }>(
  '/src/content/blog/*/*.md',
  { eager: true },
);
const sources = import.meta.glob<string>('/src/content/blog/*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const WORDS_PER_MINUTE = 220;

function toPost(path: string): Post {
  const [, lang, slug] = path.match(/\/blog\/(en|fr)\/([^/]+)\.md$/) ?? [];
  const { metadata } = modules[path];
  const words = sources[path].split(/\s+/).length;
  return {
    ...metadata,
    lang: lang as Lang,
    slug,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

const all: Post[] = Object.keys(modules)
  .map(toPost)
  .filter((post) => !(import.meta.env.PROD && post.draft))
  .sort((a, b) => b.date.localeCompare(a.date));

export function listPosts(lang?: Lang): Post[] {
  return lang ? all.filter((post) => post.lang === lang) : all;
}

export function getPost(lang: Lang, slug: string): { post: Post; content: Component } | undefined {
  const post = all.find((p) => p.lang === lang && p.slug === slug);
  if (!post) return undefined;
  return { post, content: modules[`/src/content/blog/${lang}/${slug}.md`].default };
}
