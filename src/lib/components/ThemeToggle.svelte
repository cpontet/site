<script lang="ts">
import Moon from '@lucide/svelte/icons/moon';
import Sun from '@lucide/svelte/icons/sun';
import { onMount } from 'svelte';

let { labels }: { labels: { toDark: string; toLight: string } } = $props();

let dark = $state(false);

onMount(() => {
  dark = document.documentElement.classList.contains('dark');
});

function toggle() {
  dark = !dark;
  document.documentElement.classList.toggle('dark', dark);
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this page.
  }
}
</script>

<button
  type="button"
  onclick={toggle}
  aria-label={dark ? labels.toLight : labels.toDark}
  class="flex size-11 items-center justify-center rounded-full bg-raised text-foreground transition-colors hover:text-brand-text"
>
  {#if dark}
    <Sun class="size-5" aria-hidden="true" />
  {:else}
    <Moon class="size-5" aria-hidden="true" />
  {/if}
</button>
