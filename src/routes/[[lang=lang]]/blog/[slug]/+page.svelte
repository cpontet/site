<script lang="ts">
import ArrowLeft from '@lucide/svelte/icons/arrow-left';
import { localize } from '#lib/i18n.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const d = $derived(data.dict);
const Content = $derived(data.content);
</script>

<svelte:head>
  <title>{data.post.title} — Cédric Pontet</title>
  <meta name="description" content={data.post.description} />
</svelte:head>

<article class="mx-auto max-w-6xl px-7 pt-8 pb-26">
  <header class="flex flex-col gap-5 rounded-[2rem] bg-tint-mint p-[clamp(2rem,5vw,4rem)]">
    <a
      href={localize('/blog', data.lang)}
      class="inline-flex min-h-10 items-center gap-2 self-start rounded-full bg-background px-4 text-[15px] font-bold"
    >
      <ArrowLeft class="size-4" aria-hidden="true" />
      {d.blog.allArticles}
    </a>
    <h1 class="max-w-4xl text-[clamp(2.3rem,4.8vw,3.8rem)]">{data.post.title}</h1>
    <p class="max-w-3xl text-[21px]">{data.post.description}</p>
    <p class="text-[15px]">
      <time datetime={data.post.date}>{data.post.date}</time> · {data.post.readingMinutes}
      {d.blog.minRead}
    </p>
  </header>

  <div
    class="prose prose-lg mt-14 max-w-[720px] text-foreground prose-headings:font-display prose-headings:text-foreground prose-a:decoration-orange prose-a:decoration-2 prose-a:underline-offset-4 prose-strong:text-foreground prose-code:text-foreground"
  >
    <Content />
  </div>
</article>
