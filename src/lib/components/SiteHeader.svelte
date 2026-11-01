<script lang="ts">
import Menu from '@lucide/svelte/icons/menu';
import X from '@lucide/svelte/icons/x';
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

const isCurrent = (href: string) =>
  page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);

// Mobile menu: a native <details>, so it works without JS. The script only adds
// closing on Escape, on a click outside and after following a link.
let open = $state(false);
let menu = $state<HTMLDetailsElement>();

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open) {
    open = false;
    menu?.querySelector('summary')?.focus();
  }
}

function onWindowClick(event: MouseEvent) {
  // composedPath, not contains: the theme toggle swaps its icon before this runs.
  if (open && menu && !event.composedPath().includes(menu)) open = false;
}

const linkClass =
  'decoration-brand decoration-2 underline-offset-8 hover:text-brand-text aria-[current=page]:underline';
const contactClass =
  'inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-brand-foreground transition-transform hover:-translate-y-0.5';
</script>

<svelte:window onclick={onWindowClick} onkeydown={onKeydown} />

{#snippet langSwitch()}
  <span role="group" aria-label={dict.nav.language} class="flex rounded-full bg-raised p-0.5 text-sm">
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
{/snippet}

{#snippet themeToggle()}
  <ThemeToggle labels={{ toDark: dict.nav.switchToDark, toLight: dict.nav.switchToLight }} />
{/snippet}

<header>
  <div class="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-7 py-5">
    <a
      href={localize('/', lang)}
      class="flex items-center gap-2.5 font-display text-2xl font-extrabold tracking-tight whitespace-nowrap"
    >
      <span aria-hidden="true" class="size-3.5 rounded-full bg-brand"></span>
      Cédric Pontet
    </a>

    <nav aria-label={dict.nav.main} class="font-bold">
      <div class="hidden items-center gap-6 lg:flex">
        {#each links as link (link.href)}
          <a href={link.href} class={linkClass} aria-current={isCurrent(link.href) ? 'page' : undefined}
            >{link.label}</a
          >
        {/each}
        {@render langSwitch()}
        {@render themeToggle()}
        <a href={localize('/', lang) + '#contact'} class={contactClass}>{dict.nav.contact}</a>
      </div>

      <details bind:this={menu} bind:open class="group lg:hidden">
        <summary
          class="flex size-11 cursor-pointer list-none items-center justify-center rounded-full bg-raised transition-colors hover:text-brand-text [&::-webkit-details-marker]:hidden"
        >
          <Menu class="size-5 group-open:hidden" aria-hidden="true" />
          <X class="hidden size-5 group-open:block" aria-hidden="true" />
          <span class="sr-only">{dict.nav.menu}</span>
        </summary>

        <div
          class="absolute inset-x-4 top-full z-50 flex flex-col gap-5 rounded-lg border border-border bg-surface p-6"
        >
          <ul class="flex flex-col text-lg">
            {#each links as link (link.href)}
              <li>
                <a
                  href={link.href}
                  onclick={() => (open = false)}
                  class={['flex min-h-12 items-center', linkClass]}
                  aria-current={isCurrent(link.href) ? 'page' : undefined}>{link.label}</a
                >
              </li>
            {/each}
          </ul>
          <div class="flex items-center justify-between gap-4">
            {@render langSwitch()}
            {@render themeToggle()}
          </div>
          <a
            href={localize('/', lang) + '#contact'}
            onclick={() => (open = false)}
            class={contactClass}>{dict.nav.contact}</a
          >
        </div>
      </details>
    </nav>
  </div>
</header>
