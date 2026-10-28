import type { L10n, Tint } from './profile.js';

export interface ExperienceItem {
  period: L10n;
  current?: boolean;
  title: L10n;
  org: string | L10n;
  body?: L10n;
}

/** Selected missions — source: resources/ CVs. The full list lives in the PDF CV. */
export const experience: ExperienceItem[] = [
  {
    period: { en: '2026 – now', fr: '2026 – auj.' },
    current: true,
    title: { en: 'Freelance CTO & cloud architect', fr: 'CTO freelance & architecte cloud' },
    org: { en: 'Independent · Remote', fr: 'Indépendant · À distance' },
  },
  {
    period: { en: '2023 – now', fr: '2023 – auj.' },
    title: { en: 'Enterprise architect', fr: "Architecte d'entreprise" },
    org: 'EU Publications Office',
    body: {
      en: 'Sovereign cloud migration of strategic assets, Data Value Chain target architecture with AI and knowledge-graph services, BI@PP on Azure with Bicep. Workshop facilitation and FinOps.',
      fr: "Migration d'actifs stratégiques vers un cloud souverain, architecture cible de la Data Value Chain avec services d'IA et de graphes de connaissances, BI@PP sur Azure avec Bicep. Facilitation d'ateliers et FinOps.",
    },
  },
  {
    period: { en: '2019 – 2026', fr: '2019 – 2026' },
    title: { en: 'CTO', fr: 'CTO' },
    org: 'Agile Partner',
    body: {
      en: 'Technical strategy, technical excellence and new service offers. Before that, head of the software factory (2017–2019) and delivery manager (2015–2017).',
      fr: 'Stratégie technique, excellence technique et nouvelles offres de services. Auparavant, responsable de la software factory (2017–2019) et delivery manager (2015–2017).',
    },
  },
  {
    period: { en: '2019 – 2023', fr: '2019 – 2023' },
    title: { en: 'Cloud architect & agile coach', fr: 'Architecte cloud & coach agile' },
    org: 'Cargolux',
    body: {
      en: 'Moving all IT workloads to Azure: Azure DevOps, portfolio governance, IT Ops training and coaching.',
      fr: 'Migration de toutes les charges IT vers Azure : Azure DevOps, gouvernance du portefeuille, formation et coaching IT Ops.',
    },
  },
  {
    period: { en: '2022', fr: '2022' },
    title: { en: 'Cloud target architecture', fr: 'Architecture cloud cible' },
    org: 'European Parliament',
  },
  {
    period: { en: '2005 – 2019', fr: '2005 – 2019' },
    title: { en: 'Architect, developer & coach', fr: 'Architecte, développeur & coach' },
    org: 'POST Luxembourg, Dennemeyer, Aperam, Deloitte, ING, BGL BNP Paribas, BIL, Foyer, TadaWeb',
    body: {
      en: 'Domain-Driven Design and CQRS architectures, .NET systems and agile transformations.',
      fr: 'Architectures Domain-Driven Design et CQRS, systèmes .NET et transformations agiles.',
    },
  },
  {
    period: { en: '2001 – 2005', fr: '2001 – 2005' },
    title: { en: 'Developer & consultant', fr: 'Développeur & consultant' },
    org: 'Arthur Andersen, P&T Luxembourg',
  },
];

export interface Expertise {
  tint: Tint;
  title: L10n;
  body: L10n;
}

export const expertise: Expertise[] = [
  {
    tint: 'peach',
    title: { en: 'Technology leadership', fr: 'Direction technique' },
    body: {
      en: 'CTO 2019–2026, head of a software factory before that. Strategy, governance, hiring, technical excellence.',
      fr: "CTO de 2019 à 2026, responsable d'une software factory auparavant. Stratégie, gouvernance, recrutement, excellence technique.",
    },
  },
  {
    tint: 'sky',
    title: { en: 'Cloud & sovereign cloud', fr: 'Cloud & cloud souverain' },
    body: {
      en: 'Azure, AWS, European sovereign cloud, Bicep, FinOps. Target architectures for the EU Publications Office and the European Parliament.',
      fr: "Azure, AWS, cloud souverain européen, Bicep, FinOps. Architectures cibles pour l'Office des publications de l'UE et le Parlement européen.",
    },
  },
  {
    tint: 'sun',
    title: {
      en: 'Domain-Driven Design & EventStorming',
      fr: 'Domain-Driven Design & EventStorming',
    },
    body: {
      en: 'Domain-Driven Design, CQRS and event sourcing since 2008 (POST Luxembourg, Aperam, VitisLife); EventStorming and Domain-Driven Design coaching at BIL, Foyer and TadaWeb. KanDDDinsky speaker.',
      fr: 'Domain-Driven Design, CQRS et event sourcing depuis 2008 (POST Luxembourg, Aperam, VitisLife) ; EventStorming et coaching Domain-Driven Design chez BIL, Foyer et TadaWeb. Orateur à KanDDDinsky.',
    },
  },
  {
    tint: 'lilac',
    title: { en: 'Agentic AI', fr: 'IA agentique' },
    body: {
      en: 'Coding agents, MCP and agentic delivery pipelines, plus AI services in data platforms (knowledge graphs).',
      fr: "Agents de code, MCP et chaînes de livraison agentiques, ainsi que des services d'IA dans les plateformes de données (graphes de connaissances).",
    },
  },
  {
    tint: 'mint',
    title: { en: 'Delivery & DevOps', fr: 'Delivery & DevOps' },
    body: {
      en: 'Azure DevOps, CI/CD, Agile, Kanban, Lean. Agile coaching from team to portfolio level.',
      fr: "Azure DevOps, CI/CD, Agile, Kanban, Lean. Coaching agile de l'équipe au portefeuille.",
    },
  },
  {
    tint: 'rose',
    title: { en: 'Facilitation', fr: 'Facilitation' },
    body: {
      en: 'Serious games, story mapping, sketchnoting, code katas. Founder of Playful Learner, co-founder of #play14.',
      fr: 'Serious games, story mapping, sketchnoting, code katas. Fondateur de Playful Learner, cofondateur de #play14.',
    },
  },
];

export const certifications = [
  'Azure Solutions Architect · AZ-305',
  'Azure DevOps Engineer · AZ-400',
  'Azure Administrator · AZ-104',
  'AWS Certified Cloud Practitioner',
  'Clever Cloud · Cloud Concepts 101',
  'DevOps Foundation · ITIL 4',
  'Certified Scrum Master',
];

export const talks = [
  'Voxxed Days Luxembourg · 2016–2025',
  'FlowCon Paris · 2025',
  'XP Days Benelux · 2022, 2023',
  'Agile Grenoble · 2022',
  'KanDDDinsky · 2017',
  'Build Stuff · 2014',
];
