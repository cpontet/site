<script lang="ts">
import type { PageProps } from './$types';

let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.dict.footer.legal} — Cédric Pontet</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<!-- TODO: implement from the "v3 · Legal notice & privacy" artboard (RCS, VAT, permit, address) -->
<section class="mx-auto max-w-6xl px-7 py-16">
  <h1 class="text-[clamp(2.4rem,5vw,3.6rem)]">{data.dict.footer.legal}</h1>
</section>
