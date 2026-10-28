<script lang="ts">
import type { PageProps } from './$types';

let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.dict.nav.about} — Cédric Pontet</title>
</svelte:head>

<!-- TODO: implement from the "v3 · About & Experience" artboard -->
<section class="mx-auto max-w-6xl px-7 py-16">
  <h1 class="text-[clamp(2.4rem,5vw,4rem)]">{data.dict.nav.about}</h1>
</section>
