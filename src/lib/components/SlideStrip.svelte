<script lang="ts">
import ChevronLeft from '@lucide/svelte/icons/chevron-left';
import ChevronRight from '@lucide/svelte/icons/chevron-right';
import { onMount } from 'svelte';

// Horizontal, swipeable strip of slide images (scroll-snap, no JS needed to browse).
// The previous/next buttons only appear once JS runs, since they scroll the strip.
let {
  slug,
  pages,
  width,
  height,
  label,
  alt,
  previous,
  next,
}: {
  slug: string;
  pages: number;
  width: number;
  height: number;
  label: string;
  alt: (n: number, total: number) => string;
  previous: string;
  next: string;
} = $props();

let strip: HTMLUListElement | undefined = $state();
let enhanced = $state(false);
onMount(() => (enhanced = true));

function scroll(direction: 1 | -1) {
  if (!strip) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  strip.scrollBy({
    left: direction * strip.clientWidth * 0.9,
    behavior: reduce ? 'auto' : 'smooth',
  });
}

const portrait = $derived(height > width);
</script>

<div class="flex flex-col gap-4">
  {#if enhanced}
    <div class="flex gap-2.5 self-end">
      <button
        type="button"
        class="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-border bg-background"
        aria-label={previous}
        onclick={() => scroll(-1)}><ChevronLeft class="size-5" aria-hidden="true" /></button
      >
      <button
        type="button"
        class="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-border bg-background"
        aria-label={next}
        onclick={() => scroll(1)}><ChevronRight class="size-5" aria-hidden="true" /></button
      >
    </div>
  {/if}
  <!-- Focusable so keyboard users can scroll it with the arrow keys. -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <ul
    bind:this={strip}
    tabindex="0"
    aria-label={label}
    class="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3.5"
  >
    {#each { length: pages }, i (i)}
      <li
        class={[
          'flex snap-start flex-col gap-2',
          portrait ? 'flex-[0_0_min(300px,70%)]' : 'flex-[0_0_min(440px,82%)]',
        ]}
      >
        <img
          src="/talks/{slug}/{i + 1}.webp"
          alt={alt(i + 1, pages)}
          {width}
          {height}
          loading={i < 3 ? 'eager' : 'lazy'}
          decoding="async"
          class="h-auto w-full rounded-lg bg-surface shadow-sm ring-1 ring-border"
        />
        <span class="text-sm font-bold text-muted-foreground tabular-nums" aria-hidden="true"
          >{i + 1} / {pages}</span
        >
      </li>
    {/each}
  </ul>
</div>
