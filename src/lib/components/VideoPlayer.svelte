<script lang="ts">
// YouTube video behind a poster: nothing loads from YouTube until the visitor presses play.
// Without JS the poster is a plain link to the video on YouTube.
let {
  id,
  title,
  label,
  badges,
}: {
  id: string;
  title: string;
  /** Screen reader text of the play control; the visible badges follow it. */
  label: string;
  badges: string[];
} = $props();

let playing = $state(false);

function play(event: MouseEvent) {
  // Let modified clicks open YouTube in a new tab as usual.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault();
  playing = true;
}
</script>

<!-- The .dark class scopes the dark tokens to the player: navy in both themes. -->
<div class="dark relative aspect-video max-w-full overflow-hidden rounded-[1.75rem] bg-background">
  {#if playing}
    <iframe
      class="absolute inset-0 size-full"
      src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1&rel=0"
      {title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  {:else}
    <a
      href="https://www.youtube.com/watch?v={id}"
      class="group absolute inset-0 block"
      onclick={play}
    >
      <span class="sr-only">{label}</span>
      <img
        src="/talks/video/{id}-1280.webp"
        srcset="/talks/video/{id}-640.webp 640w, /talks/video/{id}-1280.webp 1280w"
        sizes="(min-width: 1200px) 1144px, 100vw"
        alt=""
        width="1280"
        height="720"
        class="size-full object-cover"
      />
      <span
        aria-hidden="true"
        class="absolute top-1/2 left-1/2 flex size-24 -translate-1/2 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-xl transition-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 max-sm:size-16"
      >
        <svg viewBox="0 0 24 24" class="size-9 fill-current max-sm:size-6"><path d="M8 5.5v13l11-6.5z" /></svg>
      </span>
      <span class="absolute bottom-5 left-5 flex flex-wrap gap-2 text-[15px] font-bold max-sm:bottom-3 max-sm:left-3 max-sm:text-sm">
        {#each badges as badge, i (badge)}
          <span
            class={[
              'rounded-full px-3.5 py-1',
              i === badges.length - 1
                ? 'bg-background text-foreground tabular-nums'
                : 'bg-foreground text-background max-sm:hidden',
            ]}>{badge}</span
          >
        {/each}
      </span>
    </a>
  {/if}
</div>
