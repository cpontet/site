<script lang="ts">
import { btnPrimary, btnSecondary, eyebrow } from '#lib/components/styles.js';
import { localize, t, toLang } from '#lib/i18n.js';
import { page } from '$app/state';

// Errors can happen outside the [[lang]] layout, so derive the language from the URL.
const lang = $derived(toLang(page.url.pathname.match(/^\/(fr)(\/|$)/)?.[1]));
const n = $derived(t(lang).notFound);
const is404 = $derived(page.status === 404);
</script>

<svelte:head>
  <title>{page.status} — Cédric Pontet</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main
  class="mx-auto flex min-h-screen max-w-6xl flex-wrap items-center justify-center gap-14 overflow-x-hidden px-7 py-24"
>
  <div
    aria-hidden="true"
    class="relative h-[300px] w-[460px] shrink-0 origin-top max-sm:-mx-[69px] max-sm:-mb-[90px] max-sm:scale-[0.7]"
  >
    <span class="absolute top-[30px] left-0 font-display text-[220px] leading-none font-extrabold">
      {String(page.status)[0]}
    </span>
    <span class="absolute top-[54px] left-[150px] size-[170px] rounded-full bg-orange"></span>
    <span class="absolute top-[30px] left-[330px] font-display text-[220px] leading-none font-extrabold">
      {String(page.status)[2]}
    </span>
    <span class="absolute top-0 left-[210px] size-11 rounded-full border-[9px] border-foreground"></span>
    <span
      class="absolute bottom-1.5 left-[120px] size-0 rotate-[18deg] border-x-[22px] border-b-[38px] border-x-transparent border-b-play-green"
    ></span>
    <span class="absolute right-2.5 bottom-5 size-[30px] rounded-full bg-play-yellow"></span>
    <span class="absolute bottom-0 left-[260px] h-10 w-20 rounded-t-full bg-play-blue"></span>
  </div>
  <div class="flex max-w-[520px] flex-[1_1_380px] flex-col gap-4.5">
    <p class={eyebrow}>{n.eyebrow} {page.status}</p>
    <h1 class="text-[clamp(2.2rem,4.4vw,3.4rem)]">{is404 ? n.title : page.error?.message}</h1>
    <p class="text-xl text-muted-foreground">{is404 ? n.lead : n.generic}</p>
    <div class="flex flex-wrap gap-3.5 pt-1.5">
      <a href={localize('/', lang)} class={btnPrimary}>{n.home}</a>
      <a href={localize('/blog', lang)} class={btnSecondary}>{n.blog}</a>
    </div>
  </div>
</main>
