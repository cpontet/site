<script lang="ts">
import { localize } from '#lib/i18n.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const d = $derived(data.dict);

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === 'fr' ? 'fr-LU' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
</script>

<svelte:head>
  <title>{d.nav.blog} — Cédric Pontet</title>
  <meta name="description" content={d.blog.lead} />
</svelte:head>

<div class="mx-auto flex max-w-6xl flex-col gap-10 px-7 pt-12 pb-26">
  <section class="flex flex-col gap-3.5 rounded-[2rem] bg-tint-peach p-[clamp(2rem,5vw,3.5rem)]">
    <p class="text-[15px] font-bold tracking-[0.08em] text-orange-text uppercase">{d.nav.blog}</p>
    <h1 class="text-[clamp(2.4rem,5vw,4rem)]">{d.blog.title}</h1>
    <p class="max-w-3xl text-xl text-muted-foreground">{d.blog.lead}</p>
  </section>

  <!-- TODO: topic + language filters (see "v3 · Blog index" artboard) -->
  {#if data.posts.length === 0}
    <p class="text-muted-foreground">{d.blog.empty}</p>
  {:else}
    <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
      {#each data.posts as post (post.lang + post.slug)}
        <a
          href={localize(`/blog/${post.slug}`, post.lang)}
          class="flex flex-col gap-3 rounded-lg border-[1.5px] border-border p-7 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <span class="flex flex-wrap gap-2 text-sm font-bold">
            {#each post.tags as tag (tag)}
              <span class="rounded-full bg-tint-lilac px-3 py-0.5">{tag}</span>
            {/each}
            <span class="rounded-full bg-raised px-3 py-0.5 uppercase">{post.lang}</span>
          </span>
          <h2 lang={post.lang} class="text-2xl font-bold">{post.title}</h2>
          <p lang={post.lang} class="text-base text-muted-foreground">{post.description}</p>
          <span class="mt-auto text-[15px] text-muted-foreground">
            <time datetime={post.date}>{formatDate(post.date, data.lang)}</time> · {post.readingMinutes}
            {d.blog.minRead}
          </span>
        </a>
      {/each}
    </div>
  {/if}
</div>
