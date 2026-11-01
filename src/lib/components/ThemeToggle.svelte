<script lang="ts" module>
// Shared by every instance (the header renders one in the bar and one in the mobile menu).
const theme = $state({ dark: false });
</script>

<script lang="ts">
import Moon from '@lucide/svelte/icons/moon';
import Sun from '@lucide/svelte/icons/sun';
import { onMount } from 'svelte';

let { labels }: { labels: { toDark: string; toLight: string } } = $props();

onMount(() => {
  theme.dark = document.documentElement.classList.contains('dark');
});

function toggle() {
  theme.dark = !theme.dark;
  document.documentElement.classList.toggle('dark', theme.dark);
  try {
    localStorage.setItem('theme', theme.dark ? 'dark' : 'light');
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this page.
  }
}
</script>

<button
  type="button"
  onclick={toggle}
  aria-label={theme.dark ? labels.toLight : labels.toDark}
  class="flex size-11 items-center justify-center rounded-full bg-raised text-foreground transition-colors hover:text-brand-text"
>
  {#if theme.dark}
    <Sun class="size-5" aria-hidden="true" />
  {:else}
    <Moon class="size-5" aria-hidden="true" />
  {/if}
</button>
