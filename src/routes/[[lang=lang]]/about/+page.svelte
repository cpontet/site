<script lang="ts">
import Download from '@lucide/svelte/icons/download';
import portrait from '#lib/assets/portrait.webp';
import { btnPrimary, btnSecondary, eyebrow, h2, tintBg } from '#lib/components/styles.js';
import { certifications, experience, expertise, talks } from '#lib/content/experience.js';
import { ventures } from '#lib/content/profile.js';
import { localize } from '#lib/i18n.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const a = $derived(data.dict.about);
const lang = $derived(data.lang);
</script>

<svelte:head>
  <title>{data.dict.nav.about} — Cédric Pontet</title>
  <meta name="description" content={a.lead} />
</svelte:head>

<section class="mx-auto flex max-w-6xl flex-wrap items-center gap-14 px-7 pt-12 pb-18">
  <div class="mx-auto w-full max-w-[340px] flex-[1_1_280px]">
    <div class="relative aspect-square">
      <span
        aria-hidden="true"
        class="absolute top-0 right-0 size-[18%] rounded-full bg-play-yellow"
      ></span>
      <span
        aria-hidden="true"
        class="absolute bottom-[6%] left-0 size-[24%] rounded-full border-8 border-foreground"
      ></span>
      <div class="absolute inset-[8%] overflow-hidden rounded-full bg-brand">
        <img
          src={portrait}
          alt={data.dict.home.portraitAlt}
          width="720"
          height="720"
          class="size-full object-cover"
        />
      </div>
    </div>
  </div>
  <div class="flex min-w-0 flex-[999_1_560px] flex-col gap-4.5">
    <p class={eyebrow}>{a.eyebrow}</p>
    <h1 class="text-[clamp(2.4rem,5vw,4rem)]">{a.title}</h1>
    <p class="text-xl">{a.lead}</p>
    <p class="text-muted-foreground">{a.body}</p>
    <div class="flex flex-wrap gap-3.5 pt-1.5">
      <a href="/cv/cedric-pontet-cv.pdf" class={btnPrimary}>
        <Download class="size-[18px]" aria-hidden="true" />
        {a.ctaCv}
      </a>
      <a href={localize('/', lang) + '#contact'} class={btnSecondary}>{a.ctaContact}</a>
    </div>
  </div>
</section>

<section class="mx-auto flex max-w-6xl flex-col gap-9 px-7 py-12">
  <div class="flex flex-col gap-2.5">
    <p class={eyebrow}>{a.expertiseEyebrow}</p>
    <h2 class={h2}>{a.expertiseTitle}</h2>
  </div>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
    {#each expertise as item (item.title.en)}
      <div class={['flex flex-col gap-2 rounded-lg p-6.5', tintBg[item.tint]]}>
        <h3 class="text-[22px] font-extrabold">{item.title[lang]}</h3>
        <p class="text-base">{item.body[lang]}</p>
      </div>
    {/each}
  </div>
</section>

<section class="mx-auto flex max-w-6xl flex-wrap gap-12 px-7 pt-12 pb-18">
  <div class="flex flex-[1_1_280px] flex-col gap-2.5">
    <p class={eyebrow}>{a.experienceEyebrow}</p>
    <h2 class={h2}>{a.experienceTitle}</h2>
    <p class="text-base text-muted-foreground">{a.experienceNote}</p>
  </div>
  <ol
    class="flex min-w-0 flex-[999_1_560px] flex-col gap-9 border-l-[3px] border-tint-peach pl-7"
  >
    {#each experience as item (item.period.en + item.title.en)}
      <li class="relative flex flex-col gap-1.5">
        <span
          aria-hidden="true"
          class="absolute top-1 -left-[41px] size-5 rounded-full border-4 border-background bg-brand"
        ></span>
        <span
          class={[
            'self-start rounded-full px-3 py-0.5 text-sm font-bold',
            item.current ? 'bg-tint-peach' : 'bg-raised',
          ]}>{item.period[lang]}</span
        >
        <h3 class="text-2xl font-extrabold">{item.title[lang]} · {typeof item.org === 'string' ? item.org : item.org[lang]}</h3>
        {#if item.body}<p class="text-[17px] text-muted-foreground">{item.body[lang]}</p>{/if}
      </li>
    {/each}
  </ol>
</section>

<section class="px-7">
  <div
    class="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand p-[clamp(2.25rem,6vw,4.5rem)] text-brand-foreground"
  >
    <span
      aria-hidden="true"
      class="absolute -bottom-12 -left-12 size-45 rounded-full border-[24px] border-white/25"
    ></span>
    <div class="relative flex flex-wrap gap-10">
      <div class="flex flex-[1_1_340px] flex-col gap-3.5">
        <p class="text-[15px] font-bold tracking-[0.08em] uppercase">{a.facilitationEyebrow}</p>
        <h2 class="text-[clamp(2rem,3.4vw,2.8rem)]">{a.facilitationTitle}</h2>
      </div>
      <div class="flex min-w-0 flex-[999_1_520px] flex-col gap-3.5">
        <p>{a.facilitationPL}</p>
        <p>
          <a
            href={ventures.play14.url}
            class="font-bold underline decoration-2 underline-offset-4">#play14</a
          >
          {a.facilitationPlay14}
        </p>
      </div>
    </div>
  </div>
</section>

<section
  class="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 px-7 pt-22 pb-26"
>
  <div class="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-border p-7">
    <h2 class="text-2xl">{a.certifications}</h2>
    <ul class="flex list-disc flex-col gap-1.5 pl-5 text-base">
      {#each certifications as cert (cert)}<li>{cert}</li>{/each}
    </ul>
  </div>
  <div class="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-border p-7">
    <h2 class="text-2xl">{a.speaking}</h2>
    <ul class="flex list-disc flex-col gap-1.5 pl-5 text-base">
      {#each talks as talk (talk)}<li>{talk}</li>{/each}
    </ul>
    <p class="text-[15px] text-muted-foreground">{a.languages}</p>
  </div>
</section>
