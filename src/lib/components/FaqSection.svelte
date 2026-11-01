<script lang="ts">
import ChevronDown from '@lucide/svelte/icons/chevron-down';
import { questions, steps } from '#lib/content/faq.js';
import type { Dictionary, Lang } from '#lib/i18n.js';
import { eyebrow, h2 } from './styles.js';

let { lang, dict }: { lang: Lang; dict: Dictionary } = $props();

const f = $derived(dict.faq);
</script>

<!-- How we start + common questions. Native <details>: no JS. -->
<section
  aria-labelledby="how-we-start"
  class="mx-auto grid max-w-6xl gap-12 px-7 pt-18 pb-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16"
>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2.5">
      <p class={eyebrow}>{f.eyebrow}</p>
      <h2 id="how-we-start" class={h2}>{f.title}</h2>
    </div>
    <ol class="flex flex-col gap-6 rounded-[1.75rem] bg-tint-sky p-[clamp(1.5rem,4vw,2.25rem)]">
      {#each steps as step, i (step.title.en)}
        <li class="flex gap-5">
          <span
            aria-hidden="true"
            class="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-xl font-extrabold text-brand-foreground"
            >{i + 1}</span
          >
          <div class="flex flex-col gap-1">
            <h3 class="text-[22px] leading-tight font-extrabold">{step.title[lang]}</h3>
            <p class="text-[17px] text-muted-foreground">{step.body[lang]}</p>
          </div>
        </li>
      {/each}
    </ol>
  </div>

  <div class="flex flex-col gap-4">
    <h3 class="text-[26px] leading-tight font-extrabold lg:pt-11">{f.questionsTitle}</h3>
    <div class="flex flex-col divide-y divide-border border-y border-border">
      {#each questions as item (item.q.en)}
        <details class="group">
          <summary
            class="flex min-h-15 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-bold hover:text-brand-text [&::-webkit-details-marker]:hidden"
          >
            {item.q[lang]}
            <ChevronDown
              class="size-5 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <p class="pb-5 text-[17px] text-muted-foreground">{item.a[lang]}</p>
        </details>
      {/each}
    </div>
  </div>
</section>
