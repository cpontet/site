<script lang="ts">
import ArrowLeft from '@lucide/svelte/icons/arrow-left';
import ArrowRight from '@lucide/svelte/icons/arrow-right';
import ChevronDown from '@lucide/svelte/icons/chevron-down';
import portrait from '#lib/assets/portrait.webp';
import PostCard from '#lib/components/PostCard.svelte';
import Seo from '#lib/components/Seo.svelte';
import ServiceIcon from '#lib/components/ServiceIcon.svelte';
import {
  btnPrimary,
  btnSecondary,
  eyebrow,
  h2,
  linkUnderline,
  tintBg,
} from '#lib/components/styles.js';
import TableOfContents from '#lib/components/TableOfContents.svelte';
import { serviceHref } from '#lib/content/service-pages.js';
import { formatDate } from '#lib/format.js';
import { localize } from '#lib/i18n.js';
import { blogPostingLd } from '#lib/seo.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const d = $derived(data.dict);
const b = $derived(d.blog);
const lang = $derived(data.lang);
const post = $derived(data.post);
const toc = $derived(post.toc ?? []);
const Content = $derived(data.content);
// "fr/some-slug" → link to the translation, shown in that language.
const translation = $derived(post.translationOf?.match(/^(en|fr)\/(.+)$/));
</script>

<Seo
  {lang}
  title="{post.title} — Cédric Pontet"
  description={post.description}
  type="article"
  jsonLd={blogPostingLd(post)}
/>

<svelte:head>
  <meta property="article:published_time" content={post.date} />
  <meta property="article:author" content="Cédric Pontet" />
  {#each post.tags as tag (tag)}<meta property="article:tag" content={tag} />{/each}
</svelte:head>

<article class="mx-auto max-w-6xl px-7 pt-6">
  <header
    class="relative grid gap-12 overflow-hidden rounded-[2rem] bg-tint-mint p-[clamp(1.25rem,5vw,4rem)] lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end"
  >
    <!-- #play14 game pieces, decor only -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 hidden lg:block">
      <span
        class="absolute right-6 -bottom-22 size-44 rounded-full bg-play-orange [clip-path:inset(0_0_50%_0)]"
      ></span>
      <span class="absolute top-11 right-[19rem] size-7 rounded-full bg-play-yellow"></span>
      <span class="absolute top-9 right-16 size-13 rounded-full border-10 border-foreground"></span>
      <svg
        class="absolute top-[4.5rem] right-[11rem] -rotate-12 fill-play-green"
        width="58"
        height="52"
        viewBox="0 0 58 52"><path d="M29 0 58 52H0Z" /></svg
      >
    </div>

    <div class="relative flex min-w-0 flex-col gap-5">
      <a
        href={localize('/blog', lang)}
        class="inline-flex min-h-10 items-center gap-2 self-start rounded-full bg-background px-4 text-[15px] font-bold"
      >
        <ArrowLeft class="size-4" aria-hidden="true" />
        {b.allArticles}
      </a>
      <h1 class="max-w-4xl text-[clamp(2.3rem,4.8vw,3.8rem)]">{post.title}</h1>
      <p class="max-w-3xl text-[21px]">{post.description}</p>
      <p class="flex items-center gap-3.5 pt-1">
        <img
          src={portrait}
          alt=""
          width="52"
          height="52"
          class="size-13 shrink-0 rounded-full bg-brand object-cover"
        />
        <span class="flex flex-col leading-snug">
          <strong>Cédric Pontet</strong>
          <span class="text-[15px]">{b.authorRole}</span>
        </span>
      </p>
    </div>

    <div class="relative flex flex-col gap-3.5 rounded-lg bg-background p-5 sm:p-6.5">
      <p class={eyebrow}>{b.glance}</p>
      <dl class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-base">
        <dt class="text-muted-foreground">{b.published}</dt>
        <dd class="font-bold"><time datetime={post.date}>{formatDate(post.date, lang)}</time></dd>
        <dt class="text-muted-foreground">{b.reading}</dt>
        <dd class="font-bold">{post.readingMinutes} min</dd>
        <dt class="text-muted-foreground">{b.language}</dt>
        <dd>
          <strong>{b.languageName}</strong>
          {#if translation}
            ·
            <a
              href={localize(`/blog/${translation[2]}`, translation[1] as 'en' | 'fr')}
              hreflang={translation[1]}
              lang={translation[1]}
              class={['font-bold whitespace-nowrap', linkUnderline]}>{b.readOtherLang}</a
            >
          {/if}
        </dd>
      </dl>
      <ul class="mt-1 flex flex-wrap gap-2 border-t-[1.5px] pt-3.5 text-sm font-bold">
        {#each post.tags as tag (tag)}
          <li class="rounded-full bg-tint-lilac px-3 py-0.5">{tag}</li>
        {/each}
      </ul>
    </div>
  </header>

  <div
    class="mt-14 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,720px)_17rem] lg:items-start lg:justify-between lg:gap-16"
  >
    <div class="flex min-w-0 flex-col gap-14">
      {#if toc.length > 1}
        <details class="group rounded-lg bg-surface lg:hidden">
          <summary
            class="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 [&::-webkit-details-marker]:hidden"
          >
            <span class={eyebrow}>{b.onThisPage}</span>
            <ChevronDown class="size-5 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <ol class="list-decimal px-5 pb-4 pl-10 text-base leading-loose">
            {#each toc as entry (entry.id)}
              <li><a href="#{entry.id}" class="hover:text-brand-text">{entry.text}</a></li>
            {/each}
          </ol>
        </details>
      {/if}

      <div
        class="prose prose-lg max-w-[720px] text-foreground prose-headings:scroll-mt-6 prose-headings:font-display prose-headings:text-foreground prose-a:decoration-brand prose-a:decoration-2 prose-a:underline-offset-4 prose-strong:text-foreground prose-code:text-foreground [&>p:first-child]:text-[1.15em] [&>p:first-child]:leading-normal"
      >
        <Content />
      </div>

      <section
        aria-labelledby="author"
        class="flex flex-wrap items-center gap-6 rounded-[1.75rem] bg-tint-peach p-8"
      >
        <img
          src={portrait}
          alt={d.home.portraitAlt}
          width="84"
          height="84"
          class="size-21 shrink-0 rounded-full bg-brand object-cover"
        />
        <div class="flex flex-[1_1_18rem] flex-col gap-1.5">
          <h2 id="author" class="text-[22px]">{b.writtenBy}</h2>
          <p class="text-base">{b.authorBio}</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href={localize('/', lang) + '#contact'} class={btnPrimary}>{d.home.ctaContact}</a>
          <a href={localize('/about', lang)} class={btnSecondary}>{b.aboutMe}</a>
        </div>
      </section>
    </div>

    <div class="mt-14 flex flex-col gap-5 lg:sticky lg:top-6 lg:mt-0">
      {#if toc.length > 1}
        <div class="hidden lg:block">
          <TableOfContents {toc} label={b.onThisPage} />
        </div>
      {/if}
      {#if data.service}
        {@const service = data.service}
        <aside
          aria-labelledby="related-service"
          class="flex flex-col gap-3.5 rounded-lg border-[1.5px] p-6"
        >
          <span class={['flex size-12 items-center justify-center rounded-full', tintBg[service.tint]]}>
            <ServiceIcon name={service.icon} />
          </span>
          <p class={eyebrow}>{b.relatedService}</p>
          <h2 id="related-service" class="text-xl">{service.title[lang]}</h2>
          <p class="text-base text-muted-foreground">{service.body[lang]}</p>
          <a
            href={serviceHref(service, lang)}
            class="inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-brand px-5 text-base font-bold text-brand-foreground transition-transform hover:-translate-y-0.5"
          >
            {b.serviceLink}<span class="sr-only">: {service.title[lang]}</span>
            <ArrowRight class="size-4" aria-hidden="true" />
          </a>
        </aside>
      {/if}
    </div>
  </div>
</article>

{#if data.morePosts.length}
  <section aria-labelledby="keep-reading" class="mx-auto flex max-w-6xl flex-col gap-6 px-7 pt-24 pb-26">
    <div class="flex flex-wrap items-baseline justify-between gap-3">
      <h2 id="keep-reading" class={h2}>{b.keepReading}</h2>
      <a class={['font-bold', linkUnderline]} href={localize('/blog', lang)}>{b.allArticles} →</a>
    </div>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each data.morePosts as more (more.slug)}
        <PostCard post={more} uiLang={lang} minRead={b.minRead} />
      {/each}
    </div>
  </section>
{:else}
  <div class="pb-26"></div>
{/if}
