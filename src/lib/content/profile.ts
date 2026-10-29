import type { Lang } from '../i18n.js';

/** A string in both site languages. */
export type L10n = Record<Lang, string>;

export type Tint = 'peach' | 'sky' | 'mint' | 'lilac' | 'sun' | 'rose';

export type ServiceIcon = 'cto' | 'route' | 'cloud' | 'shield' | 'bot' | 'blocks' | 'dice';

export interface Service {
  id: string;
  /** URL segment of the service page, `/services/<slug>` (same in both languages). */
  slug: string;
  icon: ServiceIcon;
  tint: Tint;
  title: L10n;
  body: L10n;
  /** Contact form topic, when it differs from the title. */
  topic?: L10n;
}

export const services: Service[] = [
  {
    id: 'cto',
    slug: 'cto-strategic-advisory',
    icon: 'cto',
    tint: 'peach',
    title: { en: 'CTO & strategic advisory', fr: 'CTO & conseil stratégique' },
    body: {
      en: 'Tech strategy, architecture governance and technical leadership, without a full-time hire.',
      fr: "Stratégie technique, gouvernance d'architecture et leadership technique, sans recrutement à temps plein.",
    },
  },
  {
    id: 'agile',
    slug: 'agile-coaching',
    icon: 'route',
    tint: 'sun',
    title: { en: 'Agile coaching & transformation', fr: 'Coaching agile & transformation' },
    body: {
      en: 'Agile transformation, process improvement, change management and leadership coaching that last beyond the engagement.',
      fr: 'Transformation agile, amélioration des processus, conduite du changement et coaching de dirigeants, qui durent au-delà de la mission.',
    },
  },
  {
    id: 'cloud',
    slug: 'cloud-architecture',
    icon: 'cloud',
    tint: 'sky',
    title: { en: 'Cloud architecture', fr: 'Architecture cloud' },
    body: {
      en: 'Target architectures, landing zones and Infrastructure as Code on Azure and AWS, with FinOps from day one.',
      fr: 'Architectures cibles, landing zones et Infrastructure as Code sur Azure et AWS, avec le FinOps dès le premier jour.',
    },
  },
  {
    id: 'sovereign',
    slug: 'sovereign-cloud',
    icon: 'shield',
    tint: 'mint',
    title: { en: 'Sovereign cloud', fr: 'Cloud souverain' },
    body: {
      en: 'Feasibility, target architecture, data and workload migration, continuity and recovery for strategic assets.',
      fr: 'Faisabilité, architecture cible, migration des données et des charges, continuité et reprise pour les actifs stratégiques.',
    },
  },
  {
    id: 'agentic',
    slug: 'agentic-software-factory',
    icon: 'bot',
    tint: 'lilac',
    title: { en: 'Agentic software factory', fr: 'Software factory agentique' },
    body: {
      en: 'Coding agents in your delivery process, with guardrails: specs, tests, review gates and cost tracking.',
      fr: 'Des agents de code dans votre chaîne de livraison, avec des garde-fous : spécifications, tests, revues et suivi des coûts.',
    },
  },
  {
    id: 'ddd',
    slug: 'domain-driven-design-eventstorming',
    icon: 'blocks',
    tint: 'sun',
    title: {
      en: 'Domain-Driven Design & EventStorming',
      fr: 'Domain-Driven Design & EventStorming',
    },
    body: {
      en: 'Explore the business with the people who know it and turn it into boundaries, models and event-driven architectures.',
      fr: 'Explorer le métier avec ceux qui le connaissent et le traduire en frontières, modèles et architectures orientées événements.',
    },
  },
  {
    id: 'facilitation',
    slug: 'facilitation-workshops',
    icon: 'dice',
    tint: 'rose',
    title: { en: 'Facilitation & workshops', fr: 'Facilitation & ateliers' },
    topic: { en: 'Workshop or talk', fr: 'Atelier ou conférence' },
    body: {
      en: 'Serious games, story mapping, katas and visual thinking that get business, tech and leadership moving together.',
      fr: 'Serious games, story mapping, katas et pensée visuelle pour faire avancer ensemble métier, tech et direction.',
    },
  },
];

export const clients = [
  'EU Publications Office',
  'European Parliament',
  'BGL BNP Paribas',
  'Cargolux',
  'Banque de Luxembourg',
  'POST Luxembourg',
  'University of Luxembourg',
];

export interface Mission {
  client: string;
  period: L10n;
  tint: Tint;
  title: L10n;
  body: L10n;
}

/** Home page highlights. */
export const featuredMissions: Mission[] = [
  {
    client: 'EU Publications Office',
    period: { en: '2023 – now', fr: '2023 – auj.' },
    tint: 'mint',
    title: {
      en: 'Migrating strategic assets to a European sovereign cloud',
      fr: 'Migrer des actifs stratégiques vers un cloud souverain européen',
    },
    body: {
      en: 'Feasibility study, target architecture, refactoring, data and workload migration, high availability and recovery.',
      fr: 'Étude de faisabilité, architecture cible, refactoring, migration des données et des charges, haute disponibilité et reprise.',
    },
  },
  {
    client: 'European Parliament',
    period: { en: '2022', fr: '2022' },
    tint: 'sky',
    title: {
      en: 'Defining a cloud target architecture',
      fr: 'Définir une architecture cloud cible',
    },
    body: {
      en: 'A target architecture across Azure and AWS, balancing security, governance and operations.',
      fr: 'Une architecture cible sur Azure et AWS, équilibrant sécurité, gouvernance et exploitation.',
    },
  },
  {
    client: 'Cargolux',
    period: { en: '2019 – 2023', fr: '2019 – 2023' },
    tint: 'peach',
    title: {
      en: "Moving an airline's IT to Azure",
      fr: "Migrer l'IT d'une compagnie aérienne vers Azure",
    },
    body: {
      en: 'Cloud architecture, Azure DevOps rollout, portfolio governance and coaching of IT Ops and delivery teams.',
      fr: "Architecture cloud, déploiement d'Azure DevOps, gouvernance du portefeuille et coaching des équipes IT Ops et delivery.",
    },
  },
];

export interface Stat {
  value: L10n;
  label: L10n;
  big: boolean;
}

export const stats: Stat[] = [
  {
    value: { en: '25', fr: '25' },
    label: { en: 'years in software, since 2001', fr: 'ans dans le logiciel, depuis 2001' },
    big: true,
  },
  {
    value: { en: '7', fr: '7' },
    label: {
      en: 'years as CTO and head of a software factory',
      fr: "ans comme CTO et responsable d'une software factory",
    },
    big: true,
  },
  {
    value: { en: 'Certified', fr: 'Certifié' },
    label: {
      en: 'Azure, AWS, Clever Cloud, DevOps, ITIL',
      fr: 'Azure, AWS, Clever Cloud, DevOps, ITIL',
    },
    big: false,
  },
  {
    value: { en: 'EN · FR', fr: 'FR · EN' },
    label: {
      en: 'working languages: French (native) and English (fluent)',
      fr: 'langues de travail : français (natif) et anglais (courant)',
    },
    big: false,
  },
];

export const ventures = {
  playfulLearner: {
    url: 'https://playfullearner.com',
    role: { en: 'Founder', fr: 'Fondateur' },
    body: {
      en: 'Workshops, talks and immersive experiences to rediscover curiosity and intrinsic motivation.',
      fr: 'Ateliers, conférences et expériences immersives pour retrouver curiosité et motivation intrinsèque.',
    },
  },
  play14: {
    url: 'https://play14.org',
    role: { en: 'Co-founder · since 2014', fr: 'Cofondateur · depuis 2014' },
    body: {
      en: 'A worldwide movement using play to learn, share and create, with thousands of participants.',
      fr: 'Un mouvement mondial qui utilise le jeu pour apprendre, partager et créer, avec des milliers de participants.',
    },
  },
};
