<script lang="ts">
import ArrowRight from '@lucide/svelte/icons/arrow-right';
import ContactSection from '#lib/components/ContactSection.svelte';
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
import { serviceHref } from '#lib/content/service-pages.js';
import { localize } from '#lib/i18n.js';
import { serviceLd } from '#lib/seo.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const d = $derived(data.dict);
const s = $derived(d.service);
const lang = $derived(data.lang);
const service = $derived(data.service);
const page = $derived(data.page);
const eco = $derived(page.ecosystem);
const title = $derived(service.title[lang]);
// Preselect the matching contact topic when there is one.
const topic = $derived.by(() => {
  const name = service.topic?.[lang] ?? title;
  return d.contact.topics.includes(name) ? name : undefined;
});
</script>

<Seo
  {lang}
  title="{title} — Cédric Pontet"
  description={page.lead[lang]}
  jsonLd={serviceLd(service, page.lead[lang], lang)}
/>

<!-- Hero -->
<section class="mx-auto flex max-w-6xl flex-col gap-7 px-7 pt-6 pb-18">
  <nav aria-label={s.breadcrumb} class="text-[15px] font-bold">
    <ol class="flex flex-wrap gap-2">
      <li>
        <a href={localize('/', lang) + '#services'} class="text-muted-foreground hover:text-brand-text"
          >{d.nav.services}</a
        >
      </li>
      <li aria-hidden="true" class="text-muted-foreground">/</li>
      <li aria-current="page">{title}</li>
    </ol>
  </nav>
  <div class="flex flex-wrap items-start gap-12">
    <div class="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
      <span class={['flex size-18 items-center justify-center rounded-full', tintBg[service.tint]]}>
        <ServiceIcon name={service.icon} />
      </span>
      <p class={eyebrow}>{s.eyebrow}</p>
      <h1 class="text-[clamp(2.5rem,5.4vw,4.2rem)]">{title}</h1>
      <p class="max-w-[38rem] text-xl text-muted-foreground">{page.lead[lang]}</p>
      <div class="flex flex-wrap gap-3.5 pt-1">
        <a href="#contact" class={btnPrimary}>
          {s.ctaContact}
          <ArrowRight class="size-[18px]" aria-hidden="true" />
        </a>
        <a href="#formats" class={btnSecondary}>{s.ctaFormats}</a>
      </div>
    </div>
    <div class={['flex flex-[1_1_320px] flex-col gap-4.5 rounded-lg p-7.5 text-[17px]', tintBg[service.tint]]}>
      <h2 class="font-sans text-sm font-bold tracking-[0.08em] uppercase">{s.glance}</h2>
      <dl class="flex flex-col gap-4.5">
        {#each [[s.format, page.format[lang]], [s.duration, page.duration[lang]], [s.where, s.whereValue], [s.languages, s.languagesValue]] as [term, value] (term)}
          <div>
            <dt class="font-bold">{term}</dt>
            <dd>{value}</dd>
          </div>
        {/each}
      </dl>
    </div>
  </div>
</section>

<!-- When it helps -->
<section class="bg-surface">
  <div class="mx-auto flex max-w-6xl flex-wrap gap-12 px-7 py-18">
    <div class="flex flex-[1_1_300px] flex-col gap-2.5">
      <p class={eyebrow}>{s.whenEyebrow}</p>
      <h2 class={h2}>{s.whenTitle}</h2>
    </div>
    <ul
      class="grid min-w-0 flex-[999_1_560px] grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4"
    >
      {#each page.situations as situation (situation.en)}
        <li class="flex gap-3.5 rounded-[20px] bg-background p-5.5">
          <span aria-hidden="true" class="mt-2.5 size-3 flex-none rounded-full bg-brand"></span>
          {situation[lang]}
        </li>
      {/each}
    </ul>
  </div>
</section>

<!-- What I take on -->
<section class="mx-auto flex max-w-6xl flex-col gap-9 px-7 pt-22 pb-12">
  <div class="flex flex-col gap-2.5">
    <p class={eyebrow}>{s.scopeEyebrow}</p>
    <h2 class={h2}>{s.scopeTitle}</h2>
  </div>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
    {#each page.scope as item (item.title.en)}
      <div class="flex flex-col gap-2 rounded-lg border-[1.5px] border-border p-6.5">
        <h3 class="text-[22px] font-extrabold">{item.title[lang]}</h3>
        <p class="text-base text-muted-foreground">{item.body[lang]}</p>
      </div>
    {/each}
  </div>
</section>

<!-- Ecosystem -->
<section class="px-7 pt-6 pb-12">
  <div
    class={[
      'mx-auto flex max-w-6xl flex-col gap-9 rounded-[2rem] p-[clamp(1.75rem,5vw,3.5rem)]',
      tintBg[service.tint],
    ]}
  >
    <div class="flex flex-wrap items-end justify-between gap-5">
      <div class="flex max-w-[680px] flex-col gap-2.5">
        <p class={eyebrow}>{s.ecosystemEyebrow}</p>
        <h2 class={h2}>{eco.title[lang]}</h2>
      </div>
      <p class="max-w-[420px]">{eco.intro[lang]}</p>
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
      {#each eco.groups as group (group.title.en)}
        <div class="flex flex-col gap-4 rounded-lg bg-background p-6.5">
          <h3 class="text-[22px] font-extrabold">{group.title[lang]}</h3>
          <ul class="flex flex-col divide-y divide-border">
            {#each group.items as item (item.name)}
              <li class="flex flex-wrap items-baseline justify-between gap-x-4 py-2.5">
                <span class="font-bold">{item.name}</span>
                <span class="text-[15px] text-muted-foreground">{item.detail[lang]}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
    {#if eco.link}
      <p class="max-w-[46rem]">
        <a href={eco.link.href} target="_blank" rel="noopener" class={['font-bold', linkUnderline]}>{eco.link.name}</a>
        {eco.link.text[lang]}
      </p>
    {/if}
  </div>
</section>

<!-- Ways to work together -->
<section id="formats" class="mx-auto flex max-w-6xl scroll-mt-6 flex-col gap-9 px-7 pt-12 pb-18">
  <div class="flex flex-col gap-2.5">
    <p class={eyebrow}>{s.formatsEyebrow}</p>
    <h2 class={h2}>{s.formatsTitle}</h2>
  </div>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
    {#each page.formats as item (item.title.en)}
      <div class={['flex flex-col gap-2.5 rounded-lg p-7', tintBg[service.tint]]}>
        <h3 class="order-2 text-[26px] font-extrabold">{item.title[lang]}</h3>
        <p class="order-1 self-start rounded-full bg-background px-3 py-0.5 text-sm font-bold">
          {item.label[lang]}
        </p>
        <p class="order-3 text-[17px]">{item.body[lang]}</p>
      </div>
    {/each}
  </div>
</section>

<!-- Where I've done this -->
<section class="mx-auto flex max-w-6xl flex-wrap gap-12 px-7 pt-12 pb-18">
  <div class="flex flex-[1_1_280px] flex-col items-start gap-2.5">
    <p class={eyebrow}>{s.proofEyebrow}</p>
    <h2 class={h2}>{s.proofTitle}</h2>
    <a href={localize('/about', lang)} class={['text-base font-bold', linkUnderline]}
      >{s.fullExperience} →</a
    >
  </div>
  <ol
    class="flex min-w-0 flex-[999_1_560px] flex-col gap-9 border-l-[3px] border-tint-peach pl-7"
  >
    {#each page.proof as item (item.period.en + item.title.en)}
      <li class="relative flex flex-col gap-1.5">
        <span
          aria-hidden="true"
          class="absolute top-1 -left-[41px] size-5 rounded-full border-4 border-background bg-brand"
        ></span>
        <span class="self-start rounded-full bg-raised px-3 py-0.5 text-sm font-bold"
          >{item.period[lang]}</span
        >
        <h3 class="text-2xl font-extrabold">
          {item.title[lang]} · {typeof item.org === 'string' ? item.org : item.org[lang]}
        </h3>
        {#if item.body}<p class="text-[17px] text-muted-foreground">{item.body[lang]}</p>{/if}
      </li>
    {/each}
  </ol>
</section>

<!-- Related writing -->
{#if data.posts.length > 0}
  <section class="mx-auto flex max-w-6xl flex-col gap-8 px-7 pt-6 pb-12">
    <div class="flex flex-wrap items-end justify-between gap-5">
      <div class="flex flex-col gap-2.5">
        <p class={eyebrow}>{d.nav.blog}</p>
        <h2 class={h2}>{s.writingTitle}</h2>
      </div>
      <a class={['font-bold', linkUnderline]} href={localize('/blog', lang)}
        >{d.blog.allArticles} →</a
      >
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
      {#each data.posts as post (post.lang + post.slug)}
        <PostCard {post} uiLang={lang} minRead={d.blog.minRead} />
      {/each}
    </div>
  </section>
{/if}

<!-- Other services -->
<section class="mx-auto flex max-w-6xl flex-col gap-5 px-7 pt-6">
  <h2 class="text-[28px]">{s.otherTitle}</h2>
  <ul class="flex flex-wrap gap-3 font-bold">
    {#each data.others as other (other.id)}
      <li>
        <a
          href={serviceHref(other, lang)}
          class={[
            'inline-flex min-h-12 items-center rounded-full px-5 transition-transform hover:-translate-y-0.5',
            tintBg[other.tint],
          ]}>{other.title[lang]}</a
        >
      </li>
    {/each}
  </ul>
</section>

<ContactSection {lang} dict={d} initial={topic ? { values: { topic } } : null} />
