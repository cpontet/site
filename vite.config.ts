import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
      },
      adapter: adapter(),
      preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
      extensions: ['.svelte', '.svx', '.md'],
      prerender: {
        handleHttpError: ({ path, message }) => {
          // TODO(cedric): add the public CV PDF to static/cv/, then remove this exception.
          if (path.startsWith('/cv/')) {
            console.warn(`[prerender] missing ${path}`);
            return;
          }
          throw new Error(message);
        },
        // Blog posts are unseen while every article is still a draft.
        handleUnseenRoutes: 'warn',
      },
    }),
  ],
});
