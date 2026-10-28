<script lang="ts">
import ArrowRight from '@lucide/svelte/icons/arrow-right';
import Download from '@lucide/svelte/icons/download';
import portrait from '#lib/assets/portrait.webp';
import ContactSection from '#lib/components/ContactSection.svelte';
import PostCard from '#lib/components/PostCard.svelte';
import ServiceIcon from '#lib/components/ServiceIcon.svelte';
import {
  btnPrimary,
  btnSecondary,
  cardLift,
  eyebrow,
  h2,
  linkUnderline,
  tintBg,
} from '#lib/components/styles.js';
import { clients, featuredMissions, services, stats, ventures } from '#lib/content/profile.js';
import { localize } from '#lib/i18n.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const d = $derived(data.dict);
const lang = $derived(data.lang);
</script>

<svelte:head>
  <title>{d.meta.title}</title>
  <meta name="description" content={d.meta.description} />
</svelte:head>

<!-- Hero -->
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
      <a href={localize('/', lang) + '#contact'} class={btnPrimary}>
        {d.home.ctaContact}
        <ArrowRight class="size-[18px]" aria-hidden="true" />
      </a>
      <a href="/cv/cedric-pontet-cv.pdf" class={btnSecondary}>
        <Download class="size-[18px]" aria-hidden="true" />
        {d.home.ctaCv}
      </a>
    </div>
    <p class="text-base text-muted-foreground">{d.home.availability}</p>
  </div>

  <div class="mx-auto w-full max-w-[460px] flex-[1_1_340px]">
    <div class="relative aspect-square">
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
          fetchpriority="high"
          class="size-full object-cover"
        />
      </div>
    </div>
  </div>
</section>

<!-- Clients -->
<section aria-label={d.home.clientsLabel} class="mx-auto max-w-6xl px-7">
  <div class="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-lg bg-surface px-8 py-6">
    <span class="text-[15px] font-bold text-muted-foreground">{d.home.clientsLabel}</span>
    {#each clients as client (client)}
      <span class="font-display font-bold">{client}</span>
    {/each}
  </div>
</section>

<!-- Services -->
<section id="services" class="mx-auto flex max-w-6xl scroll-mt-6 flex-col gap-11 px-7 pt-26 pb-16">
  <div class="flex flex-wrap items-end justify-between gap-5">
    <div class="flex max-w-[680px] flex-col gap-2.5">
      <p class={eyebrow}>{d.home.servicesEyebrow}</p>
      <h2 class={h2}>{d.home.servicesTitle}</h2>
    </div>
    <p class="max-w-[380px] text-muted-foreground">{d.home.servicesLead}</p>
  </div>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
    {#each services as service (service.id)}
      <article class="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-border p-[30px]">
        <span class={['flex size-14 items-center justify-center rounded-full', tintBg[service.tint]]}>
          <ServiceIcon name={service.icon} />
        </span>
        <h3 class="text-2xl leading-tight font-extrabold">{service.title[lang]}</h3>
        <p class="text-[17px] text-muted-foreground">{service.body[lang]}</p>
      </article>
    {/each}
  </div>
</section>

<!-- Selected missions -->
<section class="mx-auto flex max-w-6xl flex-col gap-10 px-7 pt-12 pb-22">
  <div class="flex flex-col gap-2.5">
    <p class={eyebrow}>{d.home.workEyebrow}</p>
    <h2 class={h2}>{d.home.workTitle}</h2>
  </div>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
    {#each featuredMissions as mission (mission.client)}
      <a
        href={localize('/about', lang)}
        class={['flex flex-col gap-3.5 rounded-lg p-[30px]', tintBg[mission.tint], cardLift]}
      >
        <p class="text-[15px] font-bold text-muted-foreground">
          {mission.client} · {mission.period[lang]}
        </p>
        <h3 class="text-[26px] leading-tight font-extrabold">{mission.title[lang]}</h3>
        <p class="text-[17px]">{mission.body[lang]}</p>
      </a>
    {/each}
  </div>
</section>

<!-- Facilitation: Playful Learner & #play14 -->
<section class="px-7">
  <div
    class="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-orange p-[clamp(2.25rem,6vw,5rem)] text-orange-foreground"
  >
    <span
      aria-hidden="true"
      class="absolute -top-15 -right-15 size-55 rounded-full border-[28px] border-white/25"
    ></span>
    <span
      aria-hidden="true"
      class="absolute right-[18%] -bottom-10 size-28 rounded-full bg-play-yellow"
    ></span>
    <div class="relative flex flex-wrap items-center gap-12">
      <div class="flex flex-[1_1_400px] flex-col gap-4">
        <p class="text-[15px] font-bold tracking-[0.08em] uppercase">{d.home.playEyebrow}</p>
        <h2 class={h2}>{d.home.playTitle}</h2>
        <p>{d.home.playBody}</p>
      </div>
      <div class="grid flex-[1_1_440px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-5">
        {#each [{ name: 'Playful Learner', ...ventures.playfulLearner }, { name: '#play14', ...ventures.play14 }] as venture (venture.name)}
          <a
            href={venture.url}
            class={['flex flex-col gap-2 rounded-lg bg-background p-6.5 text-foreground', cardLift]}
          >
            <span class="text-sm font-bold text-orange-text">{venture.role[lang]}</span>
            <span class="font-display text-[28px] leading-tight font-extrabold">{venture.name}</span>
            <span class="text-base text-muted-foreground">{venture.body[lang]}</span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Stats -->
<section class="mx-auto max-w-6xl px-7 pt-26 pb-12">
  <dl class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
    {#each stats as stat (stat.value.en)}
      <div class="flex flex-col gap-1 rounded-lg bg-surface p-6.5">
        <dt
          class={[
            'font-display leading-none font-extrabold',
            stat.big ? 'text-[52px] text-orange-text' : 'text-[34px] leading-tight',
          ]}
        >
          {stat.value[lang]}
        </dt>
        <dd class="text-base text-muted-foreground">{stat.label[lang]}</dd>
      </div>
    {/each}
  </dl>
</section>

<!-- Latest writing -->
{#if data.latestPosts.length > 0}
  <section class="mx-auto flex max-w-6xl flex-col gap-8 px-7 pt-14 pb-4">
    <div class="flex flex-wrap items-end justify-between gap-5">
      <div class="flex flex-col gap-2.5">
        <p class={eyebrow}>{d.home.writingEyebrow}</p>
        <h2 class={h2}>{d.home.writingTitle}</h2>
      </div>
      <a class={['font-bold', linkUnderline]} href={localize('/blog', lang)}
        >{d.blog.allArticles} →</a
      >
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
      {#each data.latestPosts as post (post.lang + post.slug)}
        <PostCard {post} uiLang={lang} minRead={d.blog.minRead} />
      {/each}
    </div>
  </section>
{/if}

<ContactSection {lang} dict={d} />
