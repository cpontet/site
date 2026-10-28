<script lang="ts">
import { CONTACT_EMAIL, LINKEDIN_URL } from '#lib/config.js';
import type { ContactFormState } from '#lib/contact.js';
import type { Dictionary, Lang } from '#lib/i18n.js';
import ContactForm from './ContactForm.svelte';
import { h2 } from './styles.js';

let {
  lang,
  dict,
  initial = null,
  headingLevel = 2,
}: {
  lang: Lang;
  dict: Dictionary;
  initial?: ContactFormState | null;
  headingLevel?: 1 | 2;
} = $props();

const c = $derived(dict.contact);
</script>

<section id="contact" class="mx-auto max-w-6xl px-7 pt-18 pb-26">
  <!-- The .dark class scopes the dark tokens to this panel: navy in both themes. -->
  <div
    class="dark flex flex-wrap gap-12 rounded-[2rem] border-[1.5px] border-border bg-background p-[clamp(1.75rem,5vw,3.5rem)] text-foreground"
  >
    <div class="flex flex-[1_1_320px] flex-col gap-4">
      <p class="text-[15px] font-bold tracking-[0.08em] text-orange-text uppercase">{c.eyebrow}</p>
      <svelte:element this={`h${headingLevel}`} class={h2}>{c.title}</svelte:element>
      <p class="text-muted-foreground">{c.lead}</p>
      <div class="flex flex-col gap-2 pt-2 font-bold">
        <a
          class="underline decoration-orange decoration-2 underline-offset-4"
          href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a
        >
        <a
          class="underline decoration-orange decoration-2 underline-offset-4"
          href={LINKEDIN_URL}>LinkedIn</a
        >
      </div>
    </div>
    <ContactForm {lang} {dict} {initial} />
  </div>
</section>
