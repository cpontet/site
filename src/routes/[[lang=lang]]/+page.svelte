<script lang="ts">
import ArrowRight from '@lucide/svelte/icons/arrow-right';
import Download from '@lucide/svelte/icons/download';
import portrait from '#lib/assets/portrait.webp';
import { localize } from '#lib/i18n.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const d = $derived(data.dict);
</script>

<svelte:head>
  <title>{d.meta.title}</title>
  <meta name="description" content={d.meta.description} />
</svelte:head>

<!-- Hero — remaining home sections follow the "v3 · Home" artboard. -->
<section class="mx-auto flex max-w-6xl flex-wrap items-center gap-12 px-7 pt-12 pb-22">
  <div class="flex min-w-0 flex-[999_1_540px] flex-col gap-6">
    <p
      class="inline-flex items-center gap-2.5 self-start rounded-full bg-tint-peach px-3.5 py-1.5 text-[15px] font-bold"
    >
      <span class="size-2 rounded-full bg-play-green"></span>
      {d.home.badge}
    </p>
    <h1 class="text-[clamp(2.5rem,5.4vw,4.5rem)]">
      {d.home.titleStart}
      <span class="relative inline-block text-orange-text">
        {d.home.titleHighlight}<svg
          viewBox="0 0 200 16"
          preserveAspectRatio="none"
          aria-hidden="true"
          class="absolute -bottom-2.5 left-0 h-3.5 w-full"
          ><path
            d="M2 10 C 30 2, 50 14, 80 8 S 130 2, 160 9 S 190 6, 198 7"
            fill="none"
            stroke="var(--orange)"
            stroke-width="4"
            stroke-linecap="round"
          /></svg
        ></span
      >.
    </h1>
    <p class="max-w-[38rem] text-xl text-muted-foreground">{d.home.lead}</p>
    <div class="flex flex-wrap gap-3.5 pt-1">
      <a
        href={localize('/', data.lang) + '#contact'}
        class="inline-flex min-h-13 items-center gap-2.5 rounded-full bg-primary px-7 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        {d.home.ctaContact}
        <ArrowRight class="size-[18px]" aria-hidden="true" />
      </a>
      <!-- TODO(cedric): public PDF CV in static/cv/ -->
      <a
        href="/cv/cedric-pontet-cv.pdf"
        class="inline-flex min-h-13 items-center gap-2.5 rounded-full border-2 border-foreground px-7 font-bold transition-transform hover:-translate-y-0.5"
      >
        <Download class="size-[18px]" aria-hidden="true" />
        {d.home.ctaCv}
      </a>
    </div>
    <p class="text-base text-muted-foreground">{d.home.availability}</p>
  </div>

  <div class="mx-auto w-full max-w-[460px] flex-[1_1_340px]">
    <div class="relative aspect-square" aria-hidden="false">
      <span
        aria-hidden="true"
        class="absolute top-[6%] left-[4%] size-[22%] rounded-full border-[10px] border-foreground"
      ></span>
      <span
        aria-hidden="true"
        class="absolute top-[12%] right-[2%] size-[14%] rounded-full bg-play-yellow"
      ></span>
      <span
        aria-hidden="true"
        class="absolute right-0 bottom-[10%] h-[13%] w-[26%] rounded-t-full bg-play-blue"
      ></span>
      <span
        aria-hidden="true"
        class="absolute bottom-[4%] left-0 size-0 -rotate-[14deg] border-x-[28px] border-b-[48px] border-x-transparent border-b-play-green"
      ></span>
      <div class="absolute inset-[12%] overflow-hidden rounded-full bg-orange">
        <img
          src={portrait}
          alt={d.home.portraitAlt}
          width="720"
          height="720"
          class="size-full object-cover"
        />
      </div>
    </div>
  </div>
</section>

<!-- TODO: services, missions, facilitation, stats and writing sections from the "v3 · Home" artboard -->
<section id="services" class="mx-auto max-w-6xl px-7 py-16">
  <h2 class="text-[clamp(2.1rem,3.8vw,3.2rem)]">{d.nav.services}</h2>
</section>

<!-- TODO: contact form (form action at ./contact, Turnstile) -->
<section id="contact" class="mx-auto max-w-6xl px-7 pt-8 pb-26">
  <div class="rounded-[2rem] bg-primary p-[clamp(1.75rem,5vw,3.5rem)] text-primary-foreground">
    <h2 class="text-[clamp(2.1rem,3.6vw,3rem)]">{d.nav.contact}</h2>
    <p class="mt-4"><a class="underline" href="mailto:hello@cedricpontet.com">hello@cedricpontet.com</a></p>
  </div>
</section>
