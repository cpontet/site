<script lang="ts">
import SiteFooter from '#lib/components/SiteFooter.svelte';
import SiteHeader from '#lib/components/SiteHeader.svelte';
import { switchLang } from '#lib/i18n.js';
import { page } from '$app/state';
import type { LayoutProps } from './$types';

let { data, children }: LayoutProps = $props();

const origin = 'https://cedricpontet.com';
const alternates = $derived(
  page.data.alternates ?? {
    en: switchLang(page.url.pathname, 'en'),
    fr: switchLang(page.url.pathname, 'fr'),
  },
);
</script>

<svelte:head>
  {#each Object.entries(alternates) as [l, href] (l)}
    <link rel="alternate" hreflang={l} href={origin + href} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={origin + (alternates.en ?? alternates.fr)} />
</svelte:head>

<a
  href="#main"
  class="sr-only rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
  >{data.dict.nav.skip}</a
>
<div class="flex min-h-screen flex-col">
  <SiteHeader lang={data.lang} dict={data.dict} />
  <main id="main" tabindex="-1" class="flex-1 focus:outline-none">
    {@render children()}
  </main>
  <SiteFooter lang={data.lang} dict={data.dict} />
</div>
