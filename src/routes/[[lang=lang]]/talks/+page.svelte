<script lang="ts">
import ArrowRight from '@lucide/svelte/icons/arrow-right';
import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
import FileText from '@lucide/svelte/icons/file-text';
import Mic from '@lucide/svelte/icons/mic';
import Presentation from '@lucide/svelte/icons/presentation';
import Video from '@lucide/svelte/icons/video';
import Seo from '#lib/components/Seo.svelte';
import {
  btnPrimary,
  btnSecondary,
  cardLift,
  eyebrow,
  h2,
  linkUnderline,
  tintBg,
} from '#lib/components/styles.js';
import {
  formatDuration,
  getTalk,
  type MediaKind,
  media,
  type TalkTopic,
  talks,
  talkTopics,
  youtubePlaylist,
} from '#lib/content/talks.js';
import { localize } from '#lib/i18n.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const lang = $derived(data.lang);
const d = $derived(data.dict.talks);

const href = (slug: string) => localize(`/talks/${slug}`, lang);
const month = (date: string) =>
  date.length === 4
    ? date
    : new Date(`${date}-01`).toLocaleDateString(lang === 'fr' ? 'fr-LU' : 'en-GB', {
        month: 'short',
        year: 'numeric',
      });

const videos = talks.filter((t) => t.video);
const offers = talks.filter((t) => t.offer);

// The archive lists every time a talk was given, newest first.
const deliveries = talks
  .flatMap((talk) => talk.deliveries.map((delivery) => ({ talk, delivery })))
  .sort((a, b) => b.delivery.date.localeCompare(a.delivery.date));

let topic = $state<TalkTopic | null>(null);
const shown = $derived(deliveries.filter((x) => !topic || x.talk.topic === topic));
const CUTOFF = '2014';
const byYear = (rows: typeof deliveries) => {
  const years: { year: string; rows: typeof deliveries }[] = [];
  for (const row of rows) {
    const year = row.delivery.date.slice(0, 4);
    const last = years.at(-1);
    if (last?.year === year) last.rows.push(row);
    else years.push({ year, rows: [row] });
  }
  return years;
};
const recent = $derived(byYear(shown.filter((x) => x.delivery.date >= CUTOFF)));
const earlier = $derived(byYear(shown.filter((x) => x.delivery.date < CUTOFF)));
const earlierCount = $derived(earlier.reduce((n, y) => n + y.rows.length, 0));

const mediaIcon: Record<MediaKind, typeof Mic> = {
  podcast: Mic,
  meetup: Video,
  video: Video,
  interview: FileText,
  portrait: FileText,
};
const mediaTint: Record<MediaKind, string> = {
  podcast: tintBg.rose,
  meetup: tintBg.sky,
  video: tintBg.sun,
  interview: tintBg.mint,
  portrait: tintBg.lilac,
};

const chip = (on: boolean) => [
  'min-h-11 cursor-pointer rounded-full px-[18px] text-[15px] font-bold',
  on ? 'bg-primary text-primary-foreground' : 'border-[1.5px] border-border bg-background',
];
const pill = 'rounded-full px-3 py-0.5';
</script>

<Seo {lang} title="{d.title} — Cédric Pontet" description={d.lead} />

{#snippet archiveYears(years: ReturnType<typeof byYear>)}
  {#each years as { year, rows } (year)}
    <div class="flex flex-wrap gap-x-8 gap-y-2 border-t-[1.5px] border-border py-7">
      <h3 class="flex-[0_0_120px] text-[34px] tabular-nums">{year}</h3>
      <ul class="flex min-w-0 flex-[999_1_560px] flex-col gap-6.5">
        {#each rows as { talk, delivery } (talk.slug + delivery.date)}
          {@const title = delivery.title ?? talk.title}
          {@const page = getTalk(talk.slug)}
          <li class="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            <div class="flex min-w-0 flex-[999_1_480px] flex-col gap-1.5">
              <p class="text-[15px] font-bold text-muted-foreground">
                {month(delivery.date)} · {delivery.event}{delivery.place
                  ? `, ${delivery.place[lang]}`
                  : ''}
              </p>
              <h4 lang={delivery.lang} class="font-display text-[23px] leading-tight font-bold">
                {#if page}
                  <a href={href(talk.slug)} class="hover:text-brand-text hover:underline"
                    >{title}</a
                  >
                {:else}
                  {title}
                {/if}
              </h4>
              <p class="flex flex-wrap gap-2 pt-1 text-sm font-bold">
                <span class={[pill, tintBg[talkTopics[talk.topic].tint]]}
                  >{talkTopics[talk.topic].label[lang]}</span
                >
                <span class={[pill, 'bg-raised']}>{d.formats[talk.format]}</span>
                <span class={[pill, 'bg-raised']}>{d.langNames[delivery.lang]}</span>
              </p>
            </div>
            {#if page}
              <p class="flex flex-none gap-2 text-sm font-bold">
                {#if delivery.recorded}
                  <span
                    class="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-border py-1 pr-3 pl-1.5"
                  >
                    <span
                      aria-hidden="true"
                      class="flex size-5.5 items-center justify-center rounded-full bg-brand text-brand-foreground"
                    >
                      <svg viewBox="0 0 24 24" class="size-2.5 fill-current"
                        ><path d="M6 4v16l14-8z" /></svg
                      >
                    </span>
                    {d.video}
                  </span>
                {/if}
                {#if talk.slides}
                  <span
                    class="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-border py-1 pr-3 pl-2"
                  >
                    <Presentation class="size-4 text-brand-text" aria-hidden="true" />
                    {d.slides}
                  </span>
                {/if}
              </p>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  {/each}
{/snippet}

<div class="mx-auto flex max-w-6xl flex-col gap-20 px-7 pt-12 pb-26">
  <!-- Hero -->
  <section
    class="relative flex flex-wrap items-end justify-between gap-8 overflow-hidden rounded-[2rem] bg-tint-sky p-[clamp(2rem,5vw,3.5rem)]"
  >
    <span
      aria-hidden="true"
      class="absolute -top-11.5 right-[5%] size-33 rounded-full border-[18px] border-foreground opacity-12"
    ></span>
    <span
      aria-hidden="true"
      class="absolute top-9.5 right-[20%] size-6.5 rounded-full bg-play-yellow"
    ></span>
    <span
      aria-hidden="true"
      class="absolute right-[9%] bottom-7.5 size-0 border-x-[22px] border-b-[38px] border-x-transparent border-b-play-green"
    ></span>
    <div class="relative flex max-w-[740px] flex-col gap-3.5">
      <p class={eyebrow}>{d.eyebrow}</p>
      <h1 class="text-[clamp(2.4rem,5vw,4rem)]">{d.title}</h1>
      <p class="text-xl text-muted-foreground">{d.lead}</p>
      <dl class="mt-2 flex flex-wrap gap-3">
        {#each [[d.statTalks, talks.length], [d.statRecorded, videos.length], [d.statSince, 2010], [d.statLanguages, 'EN · FR']] as [label, value] (label)}
          <div class="flex flex-col rounded-[20px] bg-background px-5 py-3">
            <dt class="text-sm font-bold text-muted-foreground">{label}</dt>
            <dd class="font-display text-[28px] leading-tight font-extrabold">{value}</dd>
          </div>
        {/each}
      </dl>
    </div>
    <div class="relative flex flex-wrap gap-3">
      <a href="#watch" class={btnPrimary}>
        {d.ctaWatch}
        <ArrowRight class="size-[18px]" aria-hidden="true" />
      </a>
      <a href={localize('/contact', lang)} class={[btnSecondary, 'bg-background']}>{d.ctaInvite}</a>
    </div>
  </section>

  <!-- Watch: every recorded talk -->
  <section id="watch" aria-labelledby="watch-h" class="flex scroll-mt-6 flex-col gap-7">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="flex flex-col gap-2.5">
        <p class={eyebrow}>{d.watchEyebrow}</p>
        <h2 id="watch-h" class={h2}>{d.watchTitle}</h2>
      </div>
      <a href={youtubePlaylist} target="_blank" rel="noopener" class={[linkUnderline, 'text-base font-bold']}>{d.playlist}</a>
    </div>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-x-6 gap-y-8">
      {#each videos as talk (talk.slug)}
        {@const delivery = talk.deliveries.find((x) => x.recorded) ?? talk.deliveries[0]}
        {@const id = talk.video?.id}
        <li class="group relative flex flex-col gap-3">
          <div class="relative aspect-video max-w-full overflow-hidden rounded-[20px] bg-surface">
            <img
              src="/talks/video/{id}-640.webp"
              alt=""
              width="640"
              height="360"
              loading="lazy"
              class="size-full object-cover"
            />
            <span
              aria-hidden="true"
              class="absolute top-1/2 left-1/2 flex size-16 -translate-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg transition-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            >
              <svg viewBox="0 0 24 24" class="size-6 fill-current"><path d="M8 5.5v13l11-6.5z" /></svg>
            </span>
            <span
              class="dark absolute right-3 bottom-3 rounded-full bg-background px-2.5 py-0.5 text-sm font-bold text-foreground tabular-nums"
              >{formatDuration(talk.video?.seconds ?? 0)}</span
            >
          </div>
          <p class="text-[15px] font-bold text-muted-foreground">
            {delivery.event} · {delivery.date.slice(0, 4)}
          </p>
          <h3
            lang={delivery.lang}
            class="font-display text-[22px] leading-tight font-bold text-balance"
          >
            <a
              href={href(talk.slug)}
              class="after:absolute after:inset-0 after:rounded-[20px] hover:text-brand-text"
              >{delivery.title ?? talk.title}</a
            >
          </h3>
          <p class="flex flex-wrap gap-2 text-sm font-bold">
            <span class={[pill, tintBg[talkTopics[talk.topic].tint]]}
              >{talkTopics[talk.topic].label[lang]}</span
            >
            <span class={[pill, 'bg-raised']}>{d.langNames[delivery.lang]}</span>
            {#if talk.slides}<span class={[pill, 'bg-raised']}>{d.withSlides}</span>{/if}
          </p>
        </li>
      {/each}
    </ul>
  </section>

  <!-- Talks I give today -->
  <section aria-labelledby="today-h" class="flex flex-col gap-7">
    <div class="flex flex-col gap-2.5">
      <p class={eyebrow}>{d.todayEyebrow}</p>
      <h2 id="today-h" class={h2}>{d.todayTitle}</h2>
      <p class="max-w-[44rem] text-[17px] text-muted-foreground">{d.todayLead}</p>
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
      {#each offers as talk (talk.slug)}
        <article
          class={[
            'relative flex flex-col gap-3 rounded-lg p-7',
            tintBg[talkTopics[talk.topic].tint],
            cardLift,
          ]}
        >
          <span class="self-start rounded-full bg-background px-3 py-0.5 text-sm font-bold"
            >{talkTopics[talk.topic].label[lang]}</span
          >
          <h3 class="text-[26px] leading-tight">
            <a href={href(talk.slug)} class="after:absolute after:inset-0 after:rounded-lg"
              >{talk.offer?.title[lang]}</a
            >
          </h3>
          <p class="text-base">{talk.offer?.summary[lang]}</p>
          <p class="mt-auto pt-2 text-[15px] font-bold text-muted-foreground">
            {d.lastGiven(`${talk.deliveries[0].event} ${talk.deliveries[0].date.slice(0, 4)}`)}
          </p>
        </article>
      {/each}
    </div>
  </section>

  <!-- Archive -->
  <section aria-labelledby="archive-h" class="flex flex-col gap-7">
    <div class="flex flex-wrap items-end justify-between gap-5">
      <div class="flex flex-col gap-2.5">
        <p class={eyebrow}>{d.archiveEyebrow}</p>
        <h2 id="archive-h" class={h2}>{d.archiveTitle}</h2>
      </div>
      <div role="group" aria-label={d.filterTopic} class="flex flex-wrap gap-2">
        <button
          type="button"
          class={chip(topic === null)}
          aria-pressed={topic === null}
          onclick={() => (topic = null)}>{d.allTopics}</button
        >
        {#each Object.entries(talkTopics) as [id, info] (id)}
          <button
            type="button"
            class={chip(topic === id)}
            aria-pressed={topic === id}
            onclick={() => (topic = id as TalkTopic)}>{info.label[lang]}</button
          >
        {/each}
      </div>
    </div>
    <!-- Announces the result count when a topic filter changes. -->
    <p role="status" class="sr-only">{d.count(shown.length)}</p>

    <div class="flex flex-col">
      {@render archiveYears(recent)}
    </div>
    {#if earlierCount > 0}
      <details class="group flex flex-col">
        <summary
          class="inline-flex min-h-12.5 cursor-pointer list-none items-center gap-2.5 self-start rounded-full border-2 border-foreground px-6 text-base font-bold [&::-webkit-details-marker]:hidden"
        >
          <ArrowRight
            class="size-4 transition-transform group-open:rotate-90 motion-reduce:transition-none"
            aria-hidden="true"
          />
          {d.earlier(earlierCount)}
        </summary>
        <div class="flex flex-col pt-7">
          {@render archiveYears(earlier)}
        </div>
      </details>
    {/if}
    {#if shown.length === 0}
      <p class="rounded-lg bg-surface p-14 text-center text-muted-foreground">{d.noMatch}</p>
    {/if}
  </section>

  <!-- Podcasts, interviews & press -->
  <section aria-labelledby="media-h" class="flex flex-col gap-7">
    <div class="flex flex-col gap-2.5">
      <p class={eyebrow}>{d.mediaEyebrow}</p>
      <h2 id="media-h" class={h2}>{d.mediaTitle}</h2>
    </div>
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(min(340px,100%),1fr))] gap-5">
      {#each media as item (item.href)}
        {@const Icon = mediaIcon[item.kind]}
        <li
          class={[
            'relative flex items-start gap-4.5 rounded-lg border-[1.5px] border-border p-5.5',
            cardLift,
          ]}
        >
          <span
            aria-hidden="true"
            class={[
              'flex size-13 flex-none items-center justify-center rounded-full',
              mediaTint[item.kind],
            ]}
          >
            <Icon class="size-6 text-brand-text" />
          </span>
          <div class="flex min-w-0 flex-col gap-1.5">
            <p class="text-sm font-bold tracking-[0.06em] text-muted-foreground uppercase">
              {d.mediaKinds[item.kind]} · {item.outlet} · {month(item.date)}
            </p>
            <h3 lang={item.lang} class="font-display text-[21px] leading-tight font-bold">
              <a href={item.href} target="_blank" rel="noopener" class="after:absolute after:inset-0 after:rounded-lg"
                >{item.title}</a
              >
            </h3>
            <p class="text-base text-muted-foreground">{item.summary[lang]}</p>
            <p class="inline-flex items-center gap-1.5 pt-1 text-[15px] font-bold text-brand-text">
              {d.mediaCta[item.platform]}
              <ArrowUpRight class="size-4" aria-hidden="true" />
            </p>
          </div>
        </li>
      {/each}
    </ul>
  </section>

  <!-- Invite -->
  <section
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
        <h2 class="text-[clamp(2rem,3.4vw,2.8rem)]">{d.bandTitle}</h2>
        <p class="max-w-[40rem]">{d.bandBody}</p>
      </div>
      <div class="flex flex-[1_1_auto] flex-wrap gap-3">
        <a href={localize('/contact', lang)} class={btnPrimary}>{d.ctaInvite}</a>
        <a
          href={localize('/services/facilitation-workshops', lang)}
          class={[btnSecondary, 'border-brand-foreground']}>{d.facilitation}</a
        >
      </div>
    </div>
  </section>
</div>
