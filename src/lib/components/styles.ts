import type { Tint } from '#lib/content/profile.js';

// Literal class names so Tailwind can see them.
export const tintBg: Record<Tint, string> = {
  peach: 'bg-tint-peach',
  sky: 'bg-tint-sky',
  mint: 'bg-tint-mint',
  lilac: 'bg-tint-lilac',
  sun: 'bg-tint-sun',
  rose: 'bg-tint-rose',
};

export const btnPrimary =
  'inline-flex min-h-13 items-center gap-2.5 rounded-full bg-primary px-7 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5';
export const btnSecondary =
  'inline-flex min-h-13 items-center gap-2.5 rounded-full border-2 border-foreground px-7 font-bold transition-transform hover:-translate-y-0.5';
export const btnAccent =
  'inline-flex min-h-13 items-center gap-2.5 rounded-full bg-orange px-7 font-bold text-orange-foreground transition-transform hover:-translate-y-0.5';
export const eyebrow = 'text-[15px] font-bold tracking-[0.08em] text-orange-text uppercase';
export const h2 = 'text-[clamp(2.1rem,3.8vw,3.2rem)]';
export const cardLift = 'transition hover:-translate-y-1 hover:shadow-lg';
export const linkUnderline =
  'underline decoration-orange decoration-2 underline-offset-4 hover:text-orange-text';
