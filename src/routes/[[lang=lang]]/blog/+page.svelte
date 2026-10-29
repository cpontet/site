<script lang="ts">
import Rss from '@lucide/svelte/icons/rss';
import PostCard from '#lib/components/PostCard.svelte';
import { cardLift, eyebrow } from '#lib/components/styles.js';
import { formatDate } from '#lib/format.js';
import { localize } from '#lib/i18n.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const b = $derived(data.dict.blog);

let topic = $state<string | null>(null);

const topics = $derived([...new Set(data.posts.flatMap((p) => p.tags))].sort());
const shown = $derived(data.posts.filter((p) => !topic || p.tags.includes(topic)));
const [featured, ...rest] = $derived(shown);

const chip = (on: boolean) => [
  'min-h-[42px] cursor-pointer rounded-full px-[18px] text-[15px] font-bold',
  on ? 'bg-primary text-primary-foreground' : 'border-[1.5px] border-border bg-background',
];
</script>

<svelte:head>
  <title>{data.dict.nav.blog} — Cédric Pontet</title>
  <meta name="description" content={b.lead} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="RSS"
    href={localize('/rss.xml', data.lang)}
  />
</svelte:head>

<div class="mx-auto flex max-w-6xl flex-col gap-10 px-7 pt-12 pb-26">
  <section
    class="relative flex flex-wrap items-end justify-between gap-6 overflow-hidden rounded-[2rem] bg-tint-peach p-[clamp(2rem,5vw,3.5rem)]"
  >
    <span
      aria-hidden="true"
      class="absolute -top-10 right-[6%] size-30 rounded-full border-[18px] border-brand opacity-50"
    ></span>
    <div class="relative flex max-w-3xl flex-col gap-3.5">
      <p class={eyebrow}>{data.dict.nav.blog}</p>
      <h1 class="text-[clamp(2.4rem,5vw,4rem)]">{b.title}</h1>
      <p class="text-xl text-muted-foreground">{b.lead}</p>
    </div>
    <a
      href={localize('/rss.xml', data.lang)}
      class="relative inline-flex min-h-11 items-center gap-2 rounded-full bg-background px-5 text-base font-bold"
    >
      <Rss class="size-[18px] text-brand-text" aria-hidden="true" />
      RSS
    </a>
  </section>

  {#if data.posts.length === 0}
    <p class="text-muted-foreground">{b.empty}</p>
  {:else}
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div role="group" aria-label={b.filterTopic} class="flex flex-wrap gap-2">
        <button
          type="button"
          class={chip(topic === null)}
          aria-pressed={topic === null}
          onclick={() => (topic = null)}>{b.allTopics}</button
        >
        {#each topics as tag (tag)}
          <button
            type="button"
            class={chip(topic === tag)}
            aria-pressed={topic === tag}
            onclick={() => (topic = tag)}>{tag}</button
          >
        {/each}
      </div>
    </div>

    {#if featured}
      <a
        href={localize(`/blog/${featured.slug}`, featured.lang)}
        class={[
          'flex flex-wrap items-center gap-8 rounded-[2rem] bg-tint-mint p-[clamp(1.75rem,4vw,2.75rem)]',
          cardLift,
        ]}
      >
        <div class="flex min-w-0 flex-[999_1_520px] flex-col gap-3.5">
          <span class="flex flex-wrap gap-2 text-sm font-bold">
            <span class="rounded-full bg-background px-3 py-0.5">{b.latest}</span>
            {#each featured.tags as tag (tag)}
              <span class="rounded-full bg-background px-3 py-0.5">{tag}</span>
            {/each}
          </span>
          <h2 lang={featured.lang} class="text-[clamp(1.9rem,3.4vw,2.8rem)]">{featured.title}</h2>
          <p lang={featured.lang} class="max-w-[44rem] text-[19px]">{featured.description}</p>
          <span class="text-[15px] font-bold text-muted-foreground">
            {formatDate(featured.date, data.lang)} · {featured.readingMinutes}
            {b.minRead}
          </span>
        </div>
        <span
          class="inline-flex min-h-13 flex-none items-center rounded-full bg-primary px-6.5 font-bold text-primary-foreground"
          >{b.readMore}</span
        >
      </a>
    {/if}

    {#if rest.length > 0}
      <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
        {#each rest as post (post.lang + post.slug)}
          <PostCard {post} uiLang={data.lang} minRead={b.minRead} />
        {/each}
      </div>
    {/if}

    {#if shown.length === 0}
      <p class="rounded-lg bg-surface p-14 text-center text-muted-foreground">{b.noMatch}</p>
    {/if}
  {/if}
</div>
