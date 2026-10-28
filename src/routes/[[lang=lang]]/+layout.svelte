<script lang="ts">
import SiteFooter from '#lib/components/SiteFooter.svelte';
import SiteHeader from '#lib/components/SiteHeader.svelte';
import { switchLang } from '#lib/i18n.js';
import { page } from '$app/state';
import type { LayoutProps } from './$types';

let { data, children }: LayoutProps = $props();

const origin = 'https://cedricpontet.com';
</script>

<svelte:head>
  <link rel="alternate" hreflang="en" href={origin + switchLang(page.url.pathname, 'en')} />
  <link rel="alternate" hreflang="fr" href={origin + switchLang(page.url.pathname, 'fr')} />
  <link rel="alternate" hreflang="x-default" href={origin + switchLang(page.url.pathname, 'en')} />
</svelte:head>

<div class="flex min-h-screen flex-col">
  <SiteHeader lang={data.lang} dict={data.dict} />
  <main class="flex-1">
    {@render children()}
  </main>
  <SiteFooter lang={data.lang} dict={data.dict} />
</div>
