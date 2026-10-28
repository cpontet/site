<script lang="ts">
import Blocks from '@lucide/svelte/icons/blocks';
import Bot from '@lucide/svelte/icons/bot';
import Cloud from '@lucide/svelte/icons/cloud';
import Dices from '@lucide/svelte/icons/dices';
import ShieldCheck from '@lucide/svelte/icons/shield-check';
import UserRound from '@lucide/svelte/icons/user-round';
import type { ServiceIcon } from '#lib/content/profile.js';

let { name }: { name: ServiceIcon } = $props();

const icons = {
  cto: UserRound,
  cloud: Cloud,
  shield: ShieldCheck,
  bot: Bot,
  blocks: Blocks,
  dice: Dices,
};
const Icon = $derived(icons[name]);
</script>

<Icon class="size-6 text-brand-text" aria-hidden="true" />
