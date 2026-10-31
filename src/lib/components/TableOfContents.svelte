<script lang="ts">
import type { TocEntry } from '#lib/markdown/rehype-toc.js';
import { eyebrow } from './styles.js';

let { toc, label }: { toc: TocEntry[]; label: string } = $props();

// Section being read: the last heading above the top quarter of the viewport.
// Progressive enhancement only: without JS the list works, just without the marker.
let active = $state<string | null>(null);

$effect(() => {
  const headings = toc
    .map(({ id }) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);
  let frame = 0;
  const update = () => {
    frame = 0;
    const line = window.innerHeight / 4;
    active = headings.findLast((el) => el.getBoundingClientRect().top <= line)?.id ?? null;
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(frame);
  };
});
</script>

<nav aria-label={label} class="flex flex-col gap-3.5 rounded-lg bg-surface p-6.5">
  <p class={eyebrow}>{label}</p>
  <ol class="flex flex-col text-base leading-snug">
    {#each toc as entry (entry.id)}
      <li class="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          class={[
            'size-2 shrink-0 rounded-full transition-colors',
            active === entry.id ? 'bg-brand' : 'bg-border',
          ]}
        ></span>
        <a
          href="#{entry.id}"
          aria-current={active === entry.id ? 'location' : undefined}
          class={[
            'py-1.5 hover:text-brand-text',
            active === entry.id ? 'font-bold text-foreground' : 'text-muted-foreground',
          ]}>{entry.text}</a
        >
      </li>
    {/each}
  </ol>
</nav>
