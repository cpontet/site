<script lang="ts">
import ArrowRight from '@lucide/svelte/icons/arrow-right';
import { tick } from 'svelte';
import { TURNSTILE_SITE_KEY } from '#lib/config.js';
import type { ContactField as Field, ContactFormState as FormState } from '#lib/contact.js';
import type { Dictionary, Lang } from '#lib/i18n.js';
import { localize } from '#lib/i18n.js';
import { enhance } from '$app/forms';

let {
  lang,
  dict,
  initial = null,
}: { lang: Lang; dict: Dictionary; initial?: FormState | null } = $props();

const c = $derived(dict.contact);
let formState = $state<FormState | null>(null);
const current = $derived(formState ?? initial);
let pending = $state(false);
let submitButton = $state<HTMLButtonElement>();

const hasError = (field: Field) => current?.errors?.includes(field) ?? false;
const value = (field: keyof NonNullable<FormState['values']>) => current?.values?.[field] ?? '';

const inputClass =
  'min-h-[50px] rounded-md border-[1.5px] border-input bg-background px-4 text-foreground';
const labelClass = 'text-base font-bold';
</script>

<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

{#if current?.success}
  <p
    id="cf-success"
    role="status"
    tabindex="-1"
    class="rounded-lg bg-background p-8 text-lg font-bold text-foreground"
  >
    {c.success}
  </p>
{:else}
  <form
    method="POST"
    action={localize('/contact', lang)}
    use:enhance={() => {
      pending = true;
      return async ({ result }) => {
        pending = false;
        if (result.type === 'success') {
          formState = { success: true };
          await tick();
          document.getElementById('cf-success')?.focus();
          return;
        }
        formState =
          result.type === 'failure' ? ((result.data as FormState) ?? null) : { sendFailed: true };
        // Tokens are single-use: re-arm the anti-spam widget for the retry.
        (globalThis as { turnstile?: { reset: () => void } }).turnstile?.reset();
        // The disabled button dropped focus: move it to the first invalid field, whose error
        // is read through aria-describedby. Captcha and send errors are announced as alerts.
        await tick();
        const field = formState?.errors?.find((e) => e !== 'captcha');
        (field ? document.getElementById(`cf-${field}`) : submitButton)?.focus();
      };
    }}
    class="grid min-w-0 flex-[999_1_460px] grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-[18px] rounded-lg bg-background p-[30px] text-foreground"
    novalidate
  >
    <div class="flex flex-col gap-1.5">
      <label for="cf-name" class={labelClass}>{c.name}</label>
      <input
        id="cf-name"
        name="name"
        autocomplete="name"
        required
        value={value('name')}
        aria-invalid={hasError('name')}
        aria-describedby={hasError('name') ? 'cf-name-err' : undefined}
        class={inputClass}
      />
      {#if hasError('name')}<p id="cf-name-err" class="text-sm text-destructive">{c.errors.name}</p>{/if}
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="cf-email" class={labelClass}>{c.email}</label>
      <input
        id="cf-email"
        name="email"
        type="email"
        autocomplete="email"
        required
        value={value('email')}
        aria-invalid={hasError('email')}
        aria-describedby={hasError('email') ? 'cf-email-err' : undefined}
        class={inputClass}
      />
      {#if hasError('email')}<p id="cf-email-err" class="text-sm text-destructive">{c.errors.email}</p>{/if}
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="cf-company" class={labelClass}
        >{c.company} <span class="font-normal text-muted-foreground">{c.optional}</span></label
      >
      <input
        id="cf-company"
        name="company"
        autocomplete="organization"
        value={value('company')}
        class={inputClass}
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="cf-topic" class={labelClass}>{c.topic}</label>
      <select id="cf-topic" name="topic" class={inputClass}>
        {#each c.topics as topic (topic)}
          <option selected={value('topic') === topic}>{topic}</option>
        {/each}
      </select>
    </div>

    <div class="col-span-full flex flex-col gap-1.5">
      <label for="cf-message" class={labelClass}>{c.message}</label>
      <textarea
        id="cf-message"
        name="message"
        rows="5"
        required
        aria-invalid={hasError('message')}
        aria-describedby={hasError('message') ? 'cf-message-err' : undefined}
        class="resize-y rounded-md border-[1.5px] border-input bg-background px-4 py-3.5 text-foreground"
        >{value('message')}</textarea
      >
      {#if hasError('message')}<p id="cf-message-err" class="text-sm text-destructive">
          {c.errors.message}
        </p>{/if}
    </div>

    <!-- Honeypot: hidden from people and assistive tech. -->
    <div class="hidden" aria-hidden="true">
      <label>Website <input name="website" tabindex="-1" autocomplete="off" /></label>
    </div>

    <div class="col-span-full">
      <div class="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-language={lang}></div>
      {#if hasError('captcha')}<p role="alert" class="text-sm text-destructive">{c.errors.captcha}</p>{/if}
      {#if current?.sendFailed}<p role="alert" class="text-sm text-destructive">{c.failure}</p>{/if}
    </div>

    <div class="col-span-full flex flex-wrap items-center justify-between gap-4">
      <p class="max-w-[400px] text-sm text-muted-foreground">{c.privacy}</p>
      <button
        bind:this={submitButton}
        type="submit"
        disabled={pending}
        class="inline-flex min-h-13 cursor-pointer items-center gap-2.5 rounded-full bg-brand px-7 font-bold text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {pending ? c.sending : c.submit}
        <ArrowRight class="size-[18px]" aria-hidden="true" />
      </button>
    </div>
  </form>
{/if}
