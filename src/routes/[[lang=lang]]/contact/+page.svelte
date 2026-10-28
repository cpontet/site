<script lang="ts">
import ContactSection from '#lib/components/ContactSection.svelte';
import type { PageProps } from './$types';

// Reached directly, or after a form post without JavaScript.
let { data, form }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.dict.contact.eyebrow} — Cédric Pontet</title>
  <meta name="description" content={data.dict.contact.lead} />
</svelte:head>

<ContactSection lang={data.lang} dict={data.dict} initial={form} headingLevel={1} />
