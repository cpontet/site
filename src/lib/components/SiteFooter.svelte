<script lang="ts">
import { GITHUB_URL, LINKEDIN_URL } from '#lib/config.js';
import { type Dictionary, type Lang, localize } from '#lib/i18n.js';

let { lang, dict }: { lang: Lang; dict: Dictionary } = $props();

const year = new Date().getFullYear();
const linkClass =
  'underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-text';
</script>

<footer class="border-t-[1.5px] border-border">
  <div
    class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-7 py-8 text-[15px] text-muted-foreground"
  >
    <span>© {year} Cédric Pontet · {dict.footer.tagline}</span>
    <nav aria-label={dict.nav.footer} class="flex flex-wrap gap-5">
      <a class={linkClass} href={GITHUB_URL}>GitHub</a>
      <a class={linkClass} href={LINKEDIN_URL}>LinkedIn</a>
      <a class={linkClass} href={localize('/rss.xml', lang)}>{dict.footer.rss}</a>
      <a class={linkClass} href={localize('/legal', lang)}>{dict.footer.legal}</a>
    </nav>
  </div>
</footer>
