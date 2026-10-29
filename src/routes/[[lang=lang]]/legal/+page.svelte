<script lang="ts">
import Seo from '#lib/components/Seo.svelte';
import { eyebrow, linkUnderline } from '#lib/components/styles.js';
import { CONTACT_EMAIL } from '#lib/config.js';
import type { PageProps } from './$types';

let { data }: PageProps = $props();
const l = $derived(data.dict.legal);
const fr = $derived(data.lang === 'fr');

// TODO(cedric): fill in the publisher details and have the privacy text reviewed before launch.
const publisher = $derived([
  [fr ? 'Nom' : 'Name', 'Cédric Pontet'],
  [fr ? 'Forme juridique' : 'Legal form', '[LEGAL FORM]'],
  [fr ? 'Adresse' : 'Address', '46 boulevard Jules Selentiny\nL-2511 Luxembourg'],
  ['RCS Luxembourg', '[RCS NUMBER]'],
  [fr ? 'Numéro de TVA' : 'VAT number', '[LU VAT NUMBER]'],
  [fr ? "Autorisation d'établissement" : 'Business permit', '[PERMIT NUMBER]'],
  [fr ? 'Directeur de la publication' : 'Publication director', 'Cédric Pontet'],
]);
</script>

<Seo lang={data.lang} title="{l.title} — Cédric Pontet" description={l.lead} />

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="mx-auto flex max-w-6xl flex-col gap-12 px-7 pt-12 pb-26">
  <header class="flex max-w-3xl flex-col gap-3.5">
    <p class={eyebrow}>{l.eyebrow}</p>
    <h1 class="text-[clamp(2.4rem,5vw,3.6rem)]">{l.title}</h1>
    <p class="text-xl text-muted-foreground">{l.lead}</p>
  </header>

  <div class="flex max-w-3xl flex-col gap-10">
    <section class="flex flex-col gap-3.5">
      <h2 class="text-[28px]">{fr ? 'Éditeur' : 'Publisher'}</h2>
      <dl
        class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 rounded-lg bg-surface p-6.5 text-[17px]"
      >
        {#each publisher as [label, value] (label)}
          <div>
            <dt class="font-bold">{label}</dt>
            <dd class="whitespace-pre-line">{value}</dd>
          </div>
        {/each}
        <div>
          <dt class="font-bold">E-mail</dt>
          <dd><a class={linkUnderline} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd>
        </div>
      </dl>
    </section>

    <section class="flex flex-col gap-3.5">
      <h2 class="text-[28px]">{fr ? 'Hébergement' : 'Hosting'}</h2>
      <p>
        {fr
          ? 'Ce site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis, et diffusé depuis le réseau mondial de Cloudflare.'
          : "This site is hosted by Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA, and served from Cloudflare's global network."}
      </p>
    </section>

    <section class="flex flex-col gap-3.5">
      <h2 class="text-[28px]">{fr ? 'Confidentialité' : 'Privacy'}</h2>
      <h3 class="text-[22px]">{fr ? 'Cookies et mesure d’audience' : 'Cookies and analytics'}</h3>
      <p>
        {fr
          ? "Ce site n'utilise aucun cookie. La mesure d'audience (Cloudflare Web Analytics) est agrégée et ne crée aucun profil."
          : 'This site sets no cookies. Analytics (Cloudflare Web Analytics) are aggregated and build no profile.'}
      </p>
      <h3 class="text-[22px]">{fr ? 'Formulaire de contact' : 'Contact form'}</h3>
      <p>
        {fr
          ? "Lorsque vous utilisez le formulaire, je reçois par e-mail votre nom, votre adresse, votre organisation (facultative), le sujet et votre message. Je les utilise uniquement pour répondre à votre demande et, si nous travaillons ensemble, pour préparer cette collaboration. Base légale : mesures précontractuelles prises à votre demande et intérêt légitime à vous répondre (RGPD art. 6(1)(b) et (f)). Les messages ne sont pas stockés sur le site ; les e-mails sont conservés [DURÉE DE CONSERVATION]."
          : 'When you use the contact form, I receive your name, email, organisation (optional), topic and message by email. I use them only to answer your request and, if we work together, to prepare that collaboration. Legal basis: steps taken at your request before entering into a contract, and my legitimate interest in replying (GDPR art. 6(1)(b) and (f)). Submissions are not stored on the website; emails are kept for [RETENTION PERIOD].'}
      </p>
      <h3 class="text-[22px]">{fr ? 'Prestataires' : 'Service providers'}</h3>
      <p>
        {fr
          ? "Cloudflare fournit l'hébergement, la protection anti-spam (Turnstile), le routage des e-mails et la mesure d'audience sans cookies. Des données peuvent être traitées hors de l'UE dans le cadre des garanties fournies par Cloudflare."
          : 'Cloudflare provides hosting, spam protection (Turnstile), email routing and cookieless analytics. Data may be processed outside the EU under the safeguards Cloudflare provides.'}
      </p>
      <h3 class="text-[22px]">{fr ? 'Vos droits' : 'Your rights'}</h3>
      <p>
        {fr
          ? "Vous pouvez demander l'accès, la rectification ou l'effacement de vos données, ou vous opposer à leur traitement, en écrivant à "
          : 'You can ask to access, correct or delete your data, or object to its processing, by writing to '}
        <a class={linkUnderline} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        {fr
          ? 'Vous pouvez aussi introduire une réclamation auprès de la CNPD (cnpd.lu), l’autorité luxembourgeoise de protection des données.'
          : 'You can also lodge a complaint with the Luxembourg data protection authority, the CNPD (cnpd.lu).'}
      </p>
    </section>

    <section class="flex flex-col gap-3.5">
      <h2 class="text-[28px]">{fr ? 'Contenus' : 'Content'}</h2>
      <p>
        {fr
          ? "Les textes et photos de ce site sont © Cédric Pontet sauf mention contraire. Les noms de clients sont cités pour décrire des missions passées et restent la propriété de leurs titulaires."
          : 'Texts and photos on this site are © Cédric Pontet unless stated otherwise. Client names are mentioned to describe past missions and remain the property of their owners.'}
      </p>
    </section>
  </div>
</div>
