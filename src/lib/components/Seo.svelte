<script lang="ts">
import { SITE_ORIGIN } from '#lib/config.js';
import type { Lang } from '#lib/i18n.js';
import { ogImage } from '#lib/seo.js';
import { page } from '$app/state';

let {
  lang,
  title,
  description,
  type = 'website',
  jsonLd,
}: {
  lang: Lang;
  title: string;
  description?: string;
  type?: 'website' | 'article';
  jsonLd?: object;
} = $props();

const url = $derived(SITE_ORIGIN + page.url.pathname);
// Escape "<" so content can never close the script element.
const ld = $derived(jsonLd && JSON.stringify(jsonLd).replace(/</g, '\\u003c'));
</script>

<svelte:head>
  <title>{title}</title>
  {#if description}<meta name="description" content={description} />{/if}
  <link rel="canonical" href={url} />
  <meta property="og:type" content={type} />
  <meta property="og:site_name" content="Cédric Pontet" />
  <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_GB'} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  {#if description}<meta property="og:description" content={description} />{/if}
  <meta property="og:image" content={ogImage(lang)} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Cédric Pontet" />
  <meta name="twitter:card" content="summary_large_image" />
  {#if ld}
    {@html `<script type="application/ld+json">${ld}</script>`}
  {/if}
</svelte:head>
