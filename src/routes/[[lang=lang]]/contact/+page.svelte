<script lang="ts">
import ContactSection from '#lib/components/ContactSection.svelte';
import Seo from '#lib/components/Seo.svelte';
import type { PageProps } from './$types';

// Reached directly, or after a form post without JavaScript.
let { data, form }: PageProps = $props();
</script>

<Seo
  lang={data.lang}
  title="{data.dict.contact.eyebrow} — Cédric Pontet"
  description={data.dict.contact.lead}
/>

<ContactSection lang={data.lang} dict={data.dict} initial={form} headingLevel={1} />
