<script lang="ts">
import './layout.css';
import atkinson400 from '@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-400-normal.woff2?url';
import atkinson700 from '@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-700-normal.woff2?url';
import bricolage from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2?url';
import type { LayoutProps } from './$types';

let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <!-- Fetch the hero fonts with the HTML so the font swap does not shift layout (CLS). -->
  <link rel="preload" href={bricolage} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={atkinson400} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={atkinson700} as="font" type="font/woff2" crossorigin="anonymous" />
  <!-- Icons live in static/: favicon.svg is the source, `bun run icons` renders the rest. -->
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

{@render children()}
