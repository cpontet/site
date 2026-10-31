<script lang="ts">
import Download from '@lucide/svelte/icons/download';
import Seo from '#lib/components/Seo.svelte';
import SlideStrip from '#lib/components/SlideStrip.svelte';
import {
  btnPrimary,
  cardLift,
  eyebrow,
  h2,
  linkUnderline,
  tintBg,
} from '#lib/components/styles.js';
import VideoPlayer from '#lib/components/VideoPlayer.svelte';
import { formatDuration, talkTopics } from '#lib/content/talks.js';
import { localize } from '#lib/i18n.js';
import { talkLd } from '#lib/seo.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const lang = $derived(data.lang);
const d = $derived(data.dict.talks);
const talk = $derived(data.talk);
const slides = $derived(data.slides);
const topic = $derived(talkTopics[talk.topic]);
const tint = $derived(tintBg[topic.tint]);
const recorded = $derived(talk.deliveries.find((x) => x.recorded));
const languages = $derived([...new Set(talk.deliveries.map((x) => x.lang))]);

const monthYear = (date: string) =>
  new Date(`${date}-01`).toLocaleDateString(lang === 'fr' ? 'fr-LU' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  });
const pdfSize = (bytes: number) =>
  `${(bytes / 1e6).toLocaleString(lang === 'fr' ? 'fr-LU' : 'en-GB', { maximumFractionDigits: 1 })} ${d.megabytes}`;
</script>

<Seo
  {lang}
  title="{talk.title} — Cédric Pontet"
  description={talk.summary[lang]}
  jsonLd={talkLd(talk, lang)}
/>

<!-- Hero: what the talk is, where it was given -->
<section class="mx-auto flex max-w-6xl flex-col gap-7 px-7 pt-6 pb-12">
  <nav aria-label={data.dict.service.breadcrumb} class="text-[15px] font-bold">
    <a href={localize('/talks', lang)} class="hover:text-brand-text">{data.dict.nav.talks}</a>
    <span aria-hidden="true" class="px-2 text-muted-foreground">/</span>
    <span aria-current="page" lang={talk.lang}>{talk.title}</span>
  </nav>
  <div class="flex flex-wrap items-start gap-12">
    <div class="flex min-w-0 flex-[999_1_560px] flex-col gap-4.5">
      <p class={eyebrow}>{d.formats[talk.format]} · {topic.label[lang]}</p>
      <h1 lang={talk.lang} class="text-[clamp(2.4rem,5vw,3.8rem)] text-balance">{talk.title}</h1>
      <p class="max-w-[40rem] text-xl text-muted-foreground">{talk.summary[lang]}</p>
      <p class="flex flex-wrap gap-2 text-sm font-bold">
        <span class={['rounded-full px-3 py-0.5', tint]}>{topic.label[lang]}</span>
        {#if talk.video}
          <span class="rounded-full bg-raised px-3 py-0.5"
            >{d.video} · {d.minutes(Math.round(talk.video.seconds / 60))}</span
          >
        {/if}
        {#if slides}
          <span class="rounded-full bg-raised px-3 py-0.5">{d.slideCount(slides.pages)}</span>
        {/if}
        <span class="rounded-full bg-raised px-3 py-0.5"
          >{languages.map((l) => l.toUpperCase()).join(' · ')}</span
        >
      </p>
    </div>
    <div class={['flex flex-[1_1_320px] flex-col gap-4 rounded-lg p-7', tint]}>
      <h2 class="font-sans text-sm font-bold tracking-[0.08em] uppercase">{d.givenAt}</h2>
      <ol class="flex flex-col gap-3.5 text-[17px]">
        {#each talk.deliveries as delivery (delivery.date + delivery.event)}
          <li class="flex flex-col">
            <span class="font-bold"
              >{delivery.event}{delivery.place ? `, ${delivery.place[lang]}` : ''}</span
            >
            <span class="text-base text-muted-foreground">
              {monthYear(delivery.date)} · {d.inLang[delivery.lang]}{delivery.recorded
                ? ` · ${d.recorded}`
                : ''}
            </span>
            {#if delivery.title}
              <span lang={delivery.lang} class="text-base italic">{delivery.title}</span>
            {/if}
          </li>
        {/each}
      </ol>
    </div>
  </div>
</section>

<!-- Video: poster first, YouTube loads on click -->
{#if talk.video && recorded}
  <section aria-labelledby="video-h" class="mx-auto flex max-w-6xl flex-col gap-3.5 px-7 pb-18">
    <h2 id="video-h" class="sr-only">{d.videoTitle}</h2>
    <VideoPlayer
      id={talk.video.id}
      title={recorded.title ?? talk.title}
      label={d.play(recorded.title ?? talk.title)}
      badges={[`${recorded.event} ${recorded.date.slice(0, 4)}`, formatDuration(talk.video.seconds)]}
    />
    <p class="flex flex-wrap justify-between gap-x-6 gap-y-2 text-[15px] text-muted-foreground">
      <span>{d.videoNotice}</span>
      <a
        href="https://www.youtube.com/watch?v={talk.video.id}"
        target="_blank"
        rel="noopener"
        class={[linkUnderline, 'font-bold text-foreground']}>{d.watchOnYoutube}</a
      >
    </p>
  </section>
{/if}

<!-- Slides: swipeable strip and PDF -->
{#if slides}
  <section aria-labelledby="slides-h" class="bg-surface">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-7 py-16">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="flex flex-col gap-2.5">
          <p class={eyebrow}>{d.slideCount(slides.pages)}</p>
          <h2 id="slides-h" class={h2}>{d.slidesTitle}</h2>
        </div>
        <a
          href="/talks/{talk.slug}.pdf"
          class={[btnPrimary, 'min-h-12 px-5.5 text-base']}
          type="application/pdf"
        >
          <Download class="size-[18px]" aria-hidden="true" />
          {d.pdf} · {pdfSize(slides.pdfBytes)}
        </a>
      </div>
      <SlideStrip
        slug={talk.slug}
        pages={slides.pages}
        width={slides.width}
        height={slides.height}
        label={d.slidesTitle}
        alt={d.slideAlt}
        previous={d.previous}
        next={d.next}
      />
      <p class="text-[15px] text-muted-foreground">{d.slidesHint}</p>
    </div>
  </section>
{/if}

<!-- What it covers -->
{#if talk.body}
  <section
    aria-labelledby="about-h"
    class="mx-auto flex max-w-6xl flex-wrap gap-12 px-7 pt-20 pb-10"
  >
    <div class="flex flex-[1_1_300px] flex-col gap-2.5">
      <p class={eyebrow}>{d.aboutEyebrow}</p>
      <h2 id="about-h" class={h2}>{d.aboutTitle}</h2>
    </div>
    <div class="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
      {#each talk.body as paragraph, i (i)}
        <p class="max-w-[42rem]">{paragraph[lang]}</p>
      {/each}
    </div>
  </section>
{/if}

<!-- More on this topic -->
{#if data.related.length > 0}
  <section aria-labelledby="more-h" class="mx-auto flex max-w-6xl flex-col gap-6 px-7 pt-12 pb-18">
    <h2 id="more-h" class="text-[clamp(1.8rem,3vw,2.4rem)]">{d.moreOn(topic.label[lang])}</h2>
    <ul class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
      {#each data.related as other (other.slug)}
        {@const latest = other.deliveries[0]}
        <li class={['relative flex flex-col gap-2 rounded-lg p-6', tint, cardLift]}>
          <span class="text-[15px] font-bold text-muted-foreground"
            >{latest.event} · {latest.date.slice(0, 4)}</span
          >
          <a
            href={localize(`/talks/${other.slug}`, lang)}
            lang={other.lang}
            class="font-display text-[21px] leading-tight font-bold after:absolute after:inset-0 after:rounded-lg"
            >{other.title}</a
          >
        </li>
      {/each}
    </ul>
    <a href={localize('/talks', lang)} class={[linkUnderline, 'self-start font-bold']}
      >{d.allTalks}</a
    >
  </section>
{/if}

<!-- Invite -->
<section class="mx-auto max-w-6xl px-7 pb-26">
  <div
    class="relative overflow-hidden rounded-[2rem] bg-brand p-[clamp(2.25rem,6vw,4rem)] text-brand-foreground"
  >
    <span
      aria-hidden="true"
      class="absolute -right-12.5 -bottom-15 size-50 rounded-full border-[26px] border-background/25"
    ></span>
    <span
      aria-hidden="true"
      class="absolute top-7 right-[18%] size-6 rounded-full bg-play-yellow"
    ></span>
    <div class="relative flex flex-wrap items-end justify-between gap-7">
      <div class="flex min-w-0 flex-[999_1_520px] flex-col gap-3">
        <h2 class="text-[clamp(2rem,3.4vw,2.8rem)]">{d.bandTalkTitle}</h2>
        <p class="max-w-[40rem]">{d.bandTalkBody}</p>
      </div>
      <a href={localize('/contact', lang)} class={btnPrimary}>{d.ctaInvite}</a>
    </div>
  </div>
</section>
