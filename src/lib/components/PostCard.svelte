<script lang="ts">
import type { Post } from '#lib/blog.js';
import { formatDate } from '#lib/format.js';
import { type Lang, localize } from '#lib/i18n.js';
import { cardLift } from './styles.js';

let {
  post,
  uiLang,
  minRead,
  headingLevel = 3,
}: { post: Post; uiLang: Lang; minRead: string; headingLevel?: 2 | 3 } = $props();
</script>

<a
  href={localize(`/blog/${post.slug}`, post.lang)}
  class={['flex flex-col gap-3 rounded-lg border-[1.5px] border-border p-7', cardLift]}
>
  <span class="flex flex-wrap gap-2 text-sm font-bold">
    {#each post.tags as tag (tag)}
      <span class="rounded-full bg-tint-lilac px-3 py-0.5">{tag}</span>
    {/each}
  </span>
  <svelte:element this={`h${headingLevel}`} lang={post.lang} class="text-2xl font-bold tracking-tight"
    >{post.title}</svelte:element
  >
  <p lang={post.lang} class="text-base text-muted-foreground">{post.description}</p>
  <span class="mt-auto text-[15px] text-muted-foreground">
    <time datetime={post.date}>{formatDate(post.date, uiLang)}</time> · {post.readingMinutes}
    {minRead}
  </span>
</a>
