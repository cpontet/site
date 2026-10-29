import type { Post } from '../blog.js';
import { type Lang, localize } from '../i18n.js';
import type { ExperienceItem } from './experience.js';
import { type L10n, type Service, services } from './profile.js';

/**
 * Detail page of a service. Every page follows the same hierarchy, in this order:
 * hero (lead + at a glance) → when it helps → what I take on → ways to work together
 * → where I've done this → related writing → other services → contact.
 */
export interface ServicePage {
  /** Hero lead, also the meta description. */
  lead: L10n;
  /** "At a glance": engagement formats and typical duration. */
  format: L10n;
  duration: L10n;
  /** "When it helps": 3–4 situations, in the reader's words. */
  situations: L10n[];
  /** "What I take on": 4–6 items. */
  scope: { title: L10n; body: L10n }[];
  /** "Ways to work together": 2–3 engagement formats. */
  formats: { label: L10n; title: L10n; body: L10n }[];
  /** "Where I've done this": 2–3 real missions (source: resources/ CVs). */
  proof: ExperienceItem[];
  /** Blog tags that make a post related to this service. */
  tags: string[];
}

/** Keyed by service id. Services without an entry have no page yet. */
const pages: Partial<Record<string, ServicePage>> = {
  cto: {
    lead: {
      en: 'Senior technology leadership for the decisions that shape your product, your architecture and your teams, without a full-time hire.',
      fr: 'Un leadership technique senior pour les décisions qui façonnent votre produit, votre architecture et vos équipes, sans recrutement à temps plein.',
    },
    format: {
      en: 'Advisory days, fractional or interim CTO',
      fr: 'Jours de conseil, CTO à temps partagé ou de transition',
    },
    duration: {
      en: 'From a few days to several months',
      fr: 'De quelques jours à plusieurs mois',
    },
    situations: [
      {
        en: 'You have no CTO, or yours just left, and technical decisions are waiting.',
        fr: 'Vous n’avez pas de CTO, ou le vôtre vient de partir, et des décisions techniques attendent.',
      },
      {
        en: 'Technology choices are made project by project, with no shared direction.',
        fr: 'Les choix technologiques se font projet par projet, sans direction commune.',
      },
      {
        en: 'Your business strategy and your technical roadmap have drifted apart.',
        fr: 'Votre stratégie métier et votre feuille de route technique se sont éloignées.',
      },
      {
        en: 'Teams deliver, but quality, tooling and practices differ from one team to the next.',
        fr: 'Les équipes livrent, mais la qualité, les outils et les pratiques varient d’une équipe à l’autre.',
      },
    ],
    scope: [
      {
        title: { en: 'Technical strategy', fr: 'Stratégie technique' },
        body: {
          en: 'A roadmap tied to your business goals, with the trade-offs written down.',
          fr: 'Une feuille de route liée à vos objectifs métier, avec les arbitrages écrits noir sur blanc.',
        },
      },
      {
        title: { en: 'Architecture governance', fr: 'Gouvernance d’architecture' },
        body: {
          en: 'Shared principles, decision records and reviews of project architectures.',
          fr: 'Des principes partagés, des décisions documentées et la revue des architectures de projets.',
        },
      },
      {
        title: { en: 'Technical excellence', fr: 'Excellence technique' },
        body: {
          en: 'Training and workshops on clean code, testing, refactoring and technical debt.',
          fr: 'Formations et ateliers sur le clean code, les tests, le refactoring et la dette technique.',
        },
      },
      {
        title: { en: 'Delivery platform', fr: 'Plateforme de livraison' },
        body: {
          en: 'The tools, pipelines and cloud platforms your teams need to work well.',
          fr: 'Les outils, chaînes CI/CD et plateformes cloud dont vos équipes ont besoin pour bien travailler.',
        },
      },
      {
        title: { en: 'Teams and hiring', fr: 'Équipes et recrutement' },
        body: {
          en: 'Recruitment, communities of practice and a culture where people keep learning.',
          fr: 'Recrutement, communautés de pratique et une culture où l’on continue d’apprendre.',
        },
      },
      {
        title: { en: 'AI in delivery', fr: 'L’IA dans la livraison' },
        body: {
          en: 'Where coding agents fit in your process, and the guardrails they need.',
          fr: 'Où les agents de code trouvent leur place dans votre processus, et les garde-fous nécessaires.',
        },
      },
    ],
    formats: [
      {
        label: { en: 'A few days', fr: 'Quelques jours' },
        title: { en: 'Advisory', fr: 'Conseil' },
        body: {
          en: 'Frame one decision: an architecture review, a strategy workshop, a second opinion before a large investment.',
          fr: 'Cadrer une décision : une revue d’architecture, un atelier de stratégie, un second avis avant un investissement important.',
        },
      },
      {
        label: { en: 'Part-time, over months', fr: 'Temps partiel, sur plusieurs mois' },
        title: { en: 'Fractional CTO', fr: 'CTO à temps partagé' },
        body: {
          en: 'A regular presence in your leadership team. I set direction with you and work alongside your tech leads.',
          fr: 'Une présence régulière dans votre équipe de direction. Je fixe le cap avec vous et je travaille aux côtés de vos tech leads.',
        },
      },
      {
        label: { en: 'Full-time, fixed term', fr: 'Temps plein, durée définie' },
        title: { en: 'Interim CTO', fr: 'CTO de transition' },
        body: {
          en: 'I hold the role for a defined period, for example while you recruit, and hand over to your permanent CTO.',
          fr: 'J’occupe le poste pour une période définie, par exemple pendant un recrutement, puis je passe le relais à votre CTO permanent.',
        },
      },
    ],
    proof: [
      {
        period: { en: '2019 – 2026', fr: '2019 – 2026' },
        title: { en: 'CTO', fr: 'CTO' },
        org: 'Agile Partner',
        body: {
          en: 'Defined the technical strategy with the management team, supported every project on value and quality, organised training and workshops, and built new technical service offers.',
          fr: 'Définition de la stratégie technique avec la direction, soutien de chaque projet sur la valeur et la qualité, organisation de formations et d’ateliers, et création de nouvelles offres de services techniques.',
        },
      },
      {
        period: { en: '2023 – now', fr: '2023 – auj.' },
        title: { en: 'Enterprise architect', fr: 'Architecte d’entreprise' },
        org: 'EU Publications Office',
        body: {
          en: 'Member of the Security and Architecture Competence Center, the cross-directorate council that sets security and architecture guidelines.',
          fr: 'Membre du centre de compétence Sécurité et Architecture, le conseil inter-directions qui définit les lignes directrices de sécurité et d’architecture.',
        },
      },
      {
        period: { en: '2017 – 2019', fr: '2017 – 2019' },
        title: { en: 'Head of software development', fr: 'Responsable du développement logiciel' },
        org: 'Agile Partner',
        body: {
          en: 'Technical leadership of the in-house software factory: validated project architectures, set tools and practices, and took part in recruitment.',
          fr: 'Leadership technique de la software factory interne : validation des architectures de projets, choix des outils et des pratiques, et participation au recrutement.',
        },
      },
    ],
    tags: ['cto', 'tech-strategy', 'architecture-governance', 'technical-excellence'],
  },
};

export function getServicePage(service: Service): ServicePage | undefined {
  return pages[service.id];
}

/** Services that have a detail page. */
export const servicesWithPage = services.filter((s) => pages[s.id]);

/** Link to a service: its page when it has one, otherwise the home page section. */
export function serviceHref(service: Service, lang: Lang): string {
  return pages[service.id]
    ? localize(`/services/${service.slug}`, lang)
    : `${localize('/', lang)}#services`;
}

/** Posts that share at least one tag with the service page. */
export function relatedPosts(page: ServicePage, posts: Post[]): Post[] {
  return posts.filter((post) => post.tags.some((tag) => page.tags.includes(tag)));
}
