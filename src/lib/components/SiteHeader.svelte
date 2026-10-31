<script lang="ts">
import { type Dictionary, type Lang, localize, switchLang } from '#lib/i18n.js';
import { page } from '$app/state';
import ThemeToggle from './ThemeToggle.svelte';

let { lang, dict }: { lang: Lang; dict: Dictionary } = $props();

// Autonyms, read by screen readers after the visible "EN" / "FR".
const langNames = { en: 'English', fr: 'Français' };

const links = $derived([
  { href: localize('/', lang) + '#services', label: dict.nav.services },
  { href: localize('/about', lang), label: dict.nav.about },
  { href: localize('/talks', lang), label: dict.nav.talks },
  { href: localize('/blog', lang), label: dict.nav.blog },
]);
</script>

<header>
  <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-7 py-5">
    <a
      href={localize('/', lang)}
      class="flex items-center gap-2.5 font-display text-2xl font-extrabold tracking-tight"
    >
      <span aria-hidden="true" class="size-3.5 rounded-full bg-brand"></span>
      Cédric Pontet
    </a>

    <nav aria-label={dict.nav.main} class="flex flex-wrap items-center gap-6 font-bold">
      {#each links as link (link.href)}
        <a
          href={link.href}
          class="decoration-brand decoration-2 underline-offset-8 hover:text-brand-text aria-[current=page]:underline"
          aria-current={page.url.pathname === link.href ||
          page.url.pathname.startsWith(`${link.href}/`)
            ? 'page'
            : undefined}>{link.label}</a
        >
      {/each}

      <span
        role="group"
        aria-label={dict.nav.language}
        class="flex rounded-full bg-raised p-0.5 text-sm"
      >
        {#each ['en', 'fr'] as const as l (l)}
          <a
            href={page.data.alternates
              ? (page.data.alternates[l] ?? localize('/blog', l))
              : switchLang(page.url.pathname, l)}
            hreflang={l}
            lang={l}
            aria-current={l === lang ? 'true' : undefined}
            class={['rounded-full px-3 py-1', l === lang && 'bg-background shadow-sm']}
            >{l.toUpperCase()}<span class="sr-only">{` ${langNames[l]}`}</span></a
          >
        {/each}
      </span>

      <ThemeToggle labels={{ toDark: dict.nav.switchToDark, toLight: dict.nav.switchToLight }} />

      <a
        href={localize('/', lang) + '#contact'}
        class="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-brand-foreground transition-transform hover:-translate-y-0.5"
        >{dict.nav.contact}</a
      >
    </nav>
  </div>
</header>
