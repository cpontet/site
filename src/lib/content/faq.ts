import type { L10n } from './profile.js';

/**
 * "How we start" steps and common questions, shown above the contact section on the home page
 * and below it on /contact. Facts only: terms decided with Cédric on 2026-11-01 (free 30-minute
 * call, quote after it, no prices or minimums on the site, direct or through a prime contractor).
 */
export const steps: { title: L10n; body: L10n }[] = [
  {
    title: { en: 'Write to me', fr: 'Écrivez-moi' },
    body: {
      en: 'Use the form or email me with a few lines about your context. I reply within one business day.',
      fr: 'Par le formulaire ou par email, en quelques lignes sur votre contexte. Je réponds sous un jour ouvré.',
    },
  },
  {
    title: { en: 'A free 30-minute call', fr: 'Un appel gratuit de 30 minutes' },
    body: {
      en: 'We go through your situation, your constraints and your timing, and see whether I am the right person to help.',
      fr: 'Nous passons en revue votre situation, vos contraintes et votre calendrier, et voyons si je suis la bonne personne pour vous aider.',
    },
  },
  {
    title: { en: 'A short written proposal', fr: 'Une courte proposition écrite' },
    body: {
      en: 'Scope, format, duration and price, in writing. You decide from there.',
      fr: 'Périmètre, format, durée et prix, par écrit. Vous décidez ensuite.',
    },
  },
];

export const questions: { q: L10n; a: L10n }[] = [
  {
    q: { en: 'Do you work remotely?', fr: 'Travaillez-vous à distance ?' },
    a: {
      en: 'Yes. I work remotely from Luxembourg, and come on site in Luxembourg and across the EU when it matters, for a workshop or a kick-off for example.',
      fr: 'Oui. Je travaille à distance depuis le Luxembourg, et je me déplace au Luxembourg et dans l’UE quand c’est utile, pour un atelier ou un lancement par exemple.',
    },
  },
  {
    q: { en: 'Which languages do you work in?', fr: 'Dans quelles langues travaillez-vous ?' },
    a: {
      en: 'English and French. Workshops, documents and talks can be in either.',
      fr: 'Français et anglais. Ateliers, documents et conférences peuvent se faire dans l’une ou l’autre langue.',
    },
  },
  {
    q: { en: 'How do you price your work?', fr: 'Comment fixez-vous vos prix ?' },
    a: {
      en: 'A day rate or a fixed price, depending on the engagement. I quote after our first conversation, once the scope is clear, which is why there are no prices on this site.',
      fr: 'Un tarif journalier ou un forfait, selon la mission. Je fais un devis après notre premier échange, une fois le périmètre clair : c’est pourquoi aucun prix ne figure sur ce site.',
    },
  },
  {
    q: { en: 'Can we start small?', fr: 'Peut-on commencer petit ?' },
    a: {
      en: 'Yes. Most engagements start with something bounded: a few advisory days, an assessment, a feasibility study, a 30-day pilot or a single workshop. We decide on the next step from there.',
      fr: 'Oui. La plupart des missions commencent par quelque chose de borné : quelques jours de conseil, un diagnostic, une étude de faisabilité, un pilote de 30 jours ou un seul atelier. Nous décidons de la suite à partir de là.',
    },
  },
  {
    q: { en: 'How long does an engagement last?', fr: 'Combien de temps dure une mission ?' },
    a: {
      en: 'From a one-hour talk or a single workshop to several months as a fractional or interim CTO. The length follows what you need.',
      fr: 'D’une conférence d’une heure ou d’un seul atelier à plusieurs mois comme CTO à temps partagé ou de transition. La durée suit votre besoin.',
    },
  },
  {
    q: {
      en: 'Do you work through intermediaries or framework contracts?',
      fr: 'Travaillez-vous via des intermédiaires ou des contrats-cadres ?',
    },
    a: {
      en: 'Yes. I work directly with clients, or through a prime contractor or a framework contract, as is common for EU institutions and the public sector.',
      fr: 'Oui. Je travaille directement avec les clients, ou via un contractant principal ou un contrat-cadre, comme c’est courant pour les institutions européennes et le secteur public.',
    },
  },
];
