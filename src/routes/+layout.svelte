<script lang="ts">
import './layout.css';
import type { LayoutProps } from './$types';

let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <!-- Icons live in static/: favicon.svg is the source, `bun run icons` renders the rest. -->
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

{@render children()}
