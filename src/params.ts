import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
  // English is the default and has no prefix; only "fr" is a valid lang segment.
  lang: (param) => (param === 'fr' ? param : undefined),
});
