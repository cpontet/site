import type { Plugin } from 'vite';

// Build only: a draft post becomes an empty stub that keeps `draft: true`, so its title and text
// never reach the bundles (blog.ts imports every post eagerly, on the client too). Runs before
// mdsvex. `bun run dev` still renders drafts.
const POST = /\/src\/content\/blog\/(en|fr)\/[^/]+\.md$/;

const isDraft = (source: string) => {
  const front = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return front !== null && /^draft:\s*true\s*$/m.test(front[1]);
};

export function dropDrafts(): Plugin {
  return {
    name: 'drop-drafts',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      if (!POST.test(id) || !isDraft(code)) return null;
      return { code: '---\ndraft: true\n---\n', map: null };
    },
  };
}
