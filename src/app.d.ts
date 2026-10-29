// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  // Worker secrets (set with `wrangler secret put`), read via `import { env } from 'cloudflare:workers'`.
  namespace Cloudflare {
    interface Env {
      CONTACT_TO?: string;
      TURNSTILE_SECRET_KEY?: string;
    }
  }

  namespace App {
    interface Platform {
      env: Env;
      ctx: ExecutionContext;
      caches: CacheStorage;
      cf?: IncomingRequestCfProperties;
    }

    // interface Error {}
    // interface Locals {}
    interface PageData {
      /** Paths of this page per language, when they differ from the "/fr" prefix rule
       *  (blog posts: a missing language means there is no translation). */
      alternates?: Partial<Record<import('#lib/i18n.js').Lang, string>>;
    }
    // interface PageState {}
  }
}

export {};
