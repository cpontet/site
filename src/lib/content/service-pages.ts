import type { Post } from '../blog.js';
import { type Lang, localize } from '../i18n.js';
import type { ExperienceItem } from './experience.js';
import { type L10n, type Service, services } from './profile.js';

/**
 * Detail page of a service. Every page follows the same hierarchy, in this order:
 * hero (lead + at a glance) → when it helps → what I take on → [ecosystem] → ways to work
 * together → where I've done this → related writing → other services → contact.
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
  /** Optional: named tools, vendors or practices the service builds on, in 2–3 groups. */
  ecosystem?: {
    title: L10n;
    intro: L10n;
    groups: { title: L10n; items: { name: string; detail: L10n }[] }[];
    link?: { href: string; name: string; text: L10n };
  };
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
  agile: {
    lead: {
      en: 'Help teams and leaders change how they work, with practices that still hold once I have left.',
      fr: 'Aider les équipes et leurs responsables à changer leur façon de travailler, avec des pratiques qui tiennent après mon départ.',
    },
    format: {
      en: 'Training, team coaching, transformation support',
      fr: 'Formation, coaching d’équipe, accompagnement de transformation',
    },
    duration: {
      en: 'From a training session to several months',
      fr: 'D’une session de formation à plusieurs mois',
    },
    situations: [
      {
        en: 'Your teams adopted Scrum or Kanban, but delivery has not really changed.',
        fr: 'Vos équipes ont adopté Scrum ou Kanban, mais la livraison n’a pas vraiment changé.',
      },
      {
        en: 'A first agile attempt stalled, and people are sceptical about trying again.',
        fr: 'Une première démarche agile s’est enlisée, et les équipes doutent qu’une deuxième fasse mieux.',
      },
      {
        en: 'A move to the cloud or DevOps is changing roles and skills, and people need support.',
        fr: 'Un passage au cloud ou au DevOps change les rôles et les compétences, et les équipes ont besoin d’être accompagnées.',
      },
      {
        en: 'Leadership lacks a clear view of priorities and flow across the portfolio.',
        fr: 'La direction manque de visibilité sur les priorités et le flux à l’échelle du portefeuille.',
      },
    ],
    scope: [
      {
        title: { en: 'Team coaching', fr: 'Coaching d’équipe' },
        body: {
          en: 'Scrum, Kanban and Lean practices fitted to the team, with continuous improvement built in.',
          fr: 'Des pratiques Scrum, Kanban et Lean adaptées à l’équipe, avec l’amélioration continue intégrée.',
        },
      },
      {
        title: { en: 'Training', fr: 'Formation' },
        body: {
          en: 'Agile primers for everyone involved or affected, from delivery teams to management.',
          fr: 'Des formations d’initiation pour toutes les personnes concernées, des équipes de livraison à la direction.',
        },
      },
      {
        title: { en: 'Portfolio and governance', fr: 'Portefeuille et gouvernance' },
        body: {
          en: 'Visible priorities and flow from team level up to the product portfolio.',
          fr: 'Des priorités et un flux visibles, de l’équipe jusqu’au portefeuille de produits.',
        },
      },
      {
        title: { en: 'Change management', fr: 'Conduite du changement' },
        body: {
          en: 'Who is affected, which skills exist, and a development plan built with the people concerned.',
          fr: 'Qui est concerné, quelles compétences existent, et un plan de développement construit avec les personnes impliquées.',
        },
      },
      {
        title: { en: 'Technical practices', fr: 'Pratiques techniques' },
        body: {
          en: 'TDD, BDD, pair programming and continuous integration, so agility reaches the code.',
          fr: 'TDD, BDD, pair programming et intégration continue, pour que l’agilité atteigne le code.',
        },
      },
      {
        title: { en: 'Leadership coaching', fr: 'Coaching de dirigeants' },
        body: {
          en: 'Supporting managers as their role shifts towards teams that organise their own work.',
          fr: 'Accompagner les managers dont le rôle évolue vers des équipes qui organisent leur propre travail.',
        },
      },
    ],
    formats: [
      {
        label: { en: 'A few days', fr: 'Quelques jours' },
        title: { en: 'Training', fr: 'Formation' },
        body: {
          en: 'An agile primer or technical excellence modules, for teams and their management.',
          fr: 'Une initiation à l’agilité ou des modules d’excellence technique, pour les équipes et leur management.',
        },
      },
      {
        label: { en: 'Part-time, over months', fr: 'Temps partiel, sur plusieurs mois' },
        title: { en: 'Team coaching', fr: 'Coaching d’équipe' },
        body: {
          en: 'I work with one or several teams on their process, their practices and how they improve.',
          fr: 'Je travaille avec une ou plusieurs équipes sur leur processus, leurs pratiques et leur façon de s’améliorer.',
        },
      },
      {
        label: { en: 'Several months', fr: 'Plusieurs mois' },
        title: { en: 'Transformation support', fr: 'Accompagnement de transformation' },
        body: {
          en: 'Alongside the transformation team and the steering committee: coaching across teams and regular feedback to leadership.',
          fr: 'Aux côtés de l’équipe de transformation et du comité de pilotage : coaching transverse et retours réguliers à la direction.',
        },
      },
    ],
    proof: [
      {
        period: { en: '2023 – 2025', fr: '2023 – 2025' },
        title: { en: 'Trainer, agile & technical coach', fr: 'Formateur, coach agile & technique' },
        org: 'Banque de Luxembourg',
        body: {
          en: 'Technical excellence training (clean code, TDD, BDD, refactoring, technical debt), then agile and technical coaching of several teams.',
          fr: 'Formation à l’excellence technique (clean code, TDD, BDD, refactoring, dette technique), puis coaching agile et technique de plusieurs équipes.',
        },
      },
      {
        period: { en: '2021 – 2022', fr: '2021 – 2022' },
        title: { en: 'Senior consultant & agile coach', fr: 'Consultant senior & coach agile' },
        org: 'BGL BNP Paribas',
        body: {
          en: 'Change support for a cloud-first infrastructure strategy: affected populations, skills inventory and a skills development plan built with the teams.',
          fr: 'Accompagnement du changement pour une stratégie d’infrastructure orientée cloud : populations concernées, inventaire des compétences et plan de développement construit avec les équipes.',
        },
      },
      {
        period: { en: '2014 – 2015', fr: '2014 – 2015' },
        title: { en: 'Agile coach', fr: 'Coach agile' },
        org: 'Société Générale Bank & Trust',
        body: {
          en: 'Agile transformation of the IT department: facilitated the transformation initiative, coached project teams and reported to the steering committee.',
          fr: 'Transformation agile du département informatique : animation de la démarche de transformation, coaching des équipes projet et retours au comité de pilotage.',
        },
      },
    ],
    tags: ['agile', 'kanban', 'lean', 'change-management', 'agile-coaching'],
  },
  cloud: {
    lead: {
      en: 'Cloud architectures on Azure and AWS that your teams can build, run and afford.',
      fr: 'Des architectures cloud sur Azure et AWS que vos équipes peuvent construire, exploiter et financer.',
    },
    format: {
      en: 'Assessment, target architecture, hands-on delivery',
      fr: 'Diagnostic, architecture cible, mise en œuvre',
    },
    duration: {
      en: 'From a few days to several months',
      fr: 'De quelques jours à plusieurs mois',
    },
    situations: [
      {
        en: 'You are moving to the cloud and need a target architecture before the first migration.',
        fr: 'Vous passez au cloud et il vous faut une architecture cible avant la première migration.',
      },
      {
        en: 'Your cloud estate grew project by project, without shared foundations or conventions.',
        fr: 'Votre environnement cloud s’est construit projet par projet, sans socle ni conventions communes.',
      },
      {
        en: 'Infrastructure is set up by hand, so environments drift and nobody dares to touch them.',
        fr: 'L’infrastructure est configurée à la main, les environnements divergent et personne n’ose y toucher.',
      },
      {
        en: 'The cloud bill keeps growing and nobody can say which workload costs what.',
        fr: 'La facture cloud augmente et personne ne sait dire quelle application coûte quoi.',
      },
    ],
    scope: [
      {
        title: { en: 'Target architecture', fr: 'Architecture cible' },
        body: {
          en: 'On Azure, AWS or both, balancing security, governance and operations.',
          fr: 'Sur Azure, AWS ou les deux, en équilibrant sécurité, gouvernance et exploitation.',
        },
      },
      {
        title: { en: 'Landing zones', fr: 'Landing zones' },
        body: {
          en: 'Identity, networking and policies set up once, so every team starts on the same ground.',
          fr: 'Identité, réseau et politiques configurés une fois, pour que chaque équipe parte du même socle.',
        },
      },
      {
        title: { en: 'Infrastructure as Code', fr: 'Infrastructure as Code' },
        body: {
          en: 'Terraform or OpenTofu, Bicep, CloudFormation or the AWS CDK, deployed through pipelines, so every environment is reproducible and reviewed.',
          fr: 'Terraform ou OpenTofu, Bicep, CloudFormation ou AWS CDK, déployés par des pipelines, pour des environnements reproductibles et revus.',
        },
      },
      {
        title: { en: 'Migration', fr: 'Migration' },
        body: {
          en: 'Moving workloads to the cloud and integrating them with the systems that stay put.',
          fr: 'Migrer les applications vers le cloud et les intégrer aux systèmes qui restent en place.',
        },
      },
      {
        title: { en: 'FinOps', fr: 'FinOps' },
        body: {
          en: 'Costs visible per workload, with budgets and tagging from the first deployment.',
          fr: 'Des coûts visibles par application, avec budgets et étiquetage dès le premier déploiement.',
        },
      },
      {
        title: { en: 'Security and compliance', fr: 'Sécurité et conformité' },
        body: {
          en: 'Built into the platform design instead of checked after the fact.',
          fr: 'Intégrées à la conception de la plateforme plutôt que vérifiées après coup.',
        },
      },
    ],
    formats: [
      {
        label: { en: 'A few days', fr: 'Quelques jours' },
        title: { en: 'Assessment', fr: 'Diagnostic' },
        body: {
          en: 'A review of your current cloud set-up, with risks and next steps written down.',
          fr: 'Une revue de votre environnement cloud actuel, avec les risques et les prochaines étapes par écrit.',
        },
      },
      {
        label: { en: 'Weeks to months', fr: 'Quelques semaines à quelques mois' },
        title: { en: 'Target architecture', fr: 'Architecture cible' },
        body: {
          en: 'A target architecture and a roadmap that your teams and your management agree on.',
          fr: 'Une architecture cible et une feuille de route sur lesquelles vos équipes et votre direction s’accordent.',
        },
      },
      {
        label: { en: 'Several months', fr: 'Plusieurs mois' },
        title: { en: 'Hands-on delivery', fr: 'Mise en œuvre' },
        body: {
          en: 'I design and build with your team: landing zone, Infrastructure as Code, pipelines and the first workloads.',
          fr: 'Je conçois et je construis avec votre équipe : landing zone, Infrastructure as Code, pipelines et premières applications.',
        },
      },
    ],
    proof: [
      {
        period: { en: '2023 – now', fr: '2023 – auj.' },
        title: { en: 'Enterprise architect', fr: 'Architecte d’entreprise' },
        org: 'EU Publications Office',
        body: {
          en: 'Architecture and deployment of the BI@PP platform on Azure with Bicep, including its security and compliance. Cloud architecture and FinOps for the architecture competence center.',
          fr: 'Architecture et déploiement de la plateforme BI@PP sur Azure avec Bicep, y compris sa sécurité et sa conformité. Architecture cloud et FinOps pour le centre de compétence architecture.',
        },
      },
      {
        period: { en: '2022', fr: '2022' },
        title: { en: 'Cloud target architecture', fr: 'Architecture cloud cible' },
        org: 'European Parliament',
        body: {
          en: 'A target architecture across Azure and AWS, balancing security, governance and operations.',
          fr: 'Une architecture cible sur Azure et AWS, équilibrant sécurité, gouvernance et exploitation.',
        },
      },
      {
        period: { en: '2019 – 2023', fr: '2019 – 2023' },
        title: { en: 'Cloud architect & agile coach', fr: 'Architecte cloud & coach agile' },
        org: 'Cargolux',
        body: {
          en: 'Moving all IT workloads of an airline to Azure, with integration between existing systems, Azure DevOps for delivery, and training and coaching for IT Ops.',
          fr: 'Migration de toutes les charges IT d’une compagnie aérienne vers Azure, avec l’intégration des systèmes existants, Azure DevOps pour la livraison, et la formation et le coaching des équipes IT Ops.',
        },
      },
    ],
    tags: ['cloud', 'cloud-architecture', 'azure', 'aws', 'finops', 'infrastructure-as-code'],
  },
  sovereign: {
    lead: {
      en: 'Keep control of your applications and your data, with European providers, open-source building blocks and an architecture that can move when it has to.',
      fr: 'Gardez la maîtrise de vos applications et de vos données, avec des fournisseurs européens, des briques open source et une architecture capable de changer d’hébergeur quand il le faut.',
    },
    format: {
      en: 'Sovereignty assessment, feasibility study, migration',
      fr: 'Évaluation de souveraineté, étude de faisabilité, migration',
    },
    duration: {
      en: 'From a feasibility study to a full migration',
      fr: 'De l’étude de faisabilité à la migration complète',
    },
    situations: [
      {
        en: 'Your data sits with a provider subject to non-EU laws with cross-border reach, such as the US CLOUD Act.',
        fr: 'Vos données sont chez un fournisseur soumis à des lois non européennes à portée extraterritoriale, comme le CLOUD Act américain.',
      },
      {
        en: 'A tender or a regulator now asks about sovereignty, under NIS2, DORA or the EU Cloud Sovereignty Framework.',
        fr: 'Un appel d’offres ou un régulateur vous interroge désormais sur la souveraineté, au titre de NIS2, de DORA ou du cadre européen de souveraineté du cloud.',
      },
      {
        en: 'Your applications rely on one provider’s proprietary services, and leaving would mean rewriting them.',
        fr: 'Vos applications reposent sur les services propriétaires d’un seul fournisseur, et en partir voudrait dire les réécrire.',
      },
      {
        en: 'A price or licence change from a single vendor has shown how exposed you are.',
        fr: 'Un changement de prix ou de licence chez un seul éditeur a montré à quel point vous êtes exposé.',
      },
    ],
    scope: [
      {
        title: { en: 'Sovereignty assessment', fr: 'Évaluation de souveraineté' },
        body: {
          en: 'Classify each workload by the level it really needs, using the assurance levels of the EU Cloud Sovereignty Framework, instead of one rule for everything.',
          fr: 'Classer chaque application selon le niveau dont elle a réellement besoin, avec les niveaux d’assurance du cadre européen de souveraineté du cloud, plutôt qu’une règle unique.',
        },
      },
      {
        title: { en: 'Feasibility study', fr: 'Étude de faisabilité' },
        body: {
          en: 'Which European providers fit, which services they offer, and what each workload needs in order to move.',
          fr: 'Quels fournisseurs européens conviennent, quels services ils proposent, et ce qu’il faut à chaque application pour migrer.',
        },
      },
      {
        title: { en: 'Application portability', fr: 'Portabilité des applications' },
        body: {
          en: 'Containers, open standards and Infrastructure as Code, so a workload can run on more than one provider.',
          fr: 'Conteneurs, standards ouverts et Infrastructure as Code, pour qu’une application puisse tourner chez plus d’un fournisseur.',
        },
      },
      {
        title: { en: 'Open-source building blocks', fr: 'Briques open source' },
        body: {
          en: 'Proprietary managed services replaced by open-source equivalents that your team can run anywhere.',
          fr: 'Des services managés propriétaires remplacés par des équivalents open source que votre équipe peut exploiter partout.',
        },
      },
      {
        title: {
          en: 'Data and workload migration',
          fr: 'Migration des données et des applications',
        },
        body: {
          en: 'Source code analysis and refactoring, a data migration strategy and a cut-over plan per workload.',
          fr: 'Analyse et refactoring du code source, stratégie de migration des données et plan de bascule par application.',
        },
      },
      {
        title: { en: 'Continuity and exit', fr: 'Continuité et réversibilité' },
        body: {
          en: 'High availability, recovery, encryption keys under your control, and an exit plan that has been tested.',
          fr: 'Haute disponibilité, reprise, clés de chiffrement sous votre contrôle, et un plan de sortie testé.',
        },
      },
    ],
    ecosystem: {
      title: { en: 'European building blocks', fr: 'Des briques européennes' },
      intro: {
        en: 'No single sovereign product covers every need. I start from these options and choose per workload, based on the level of sovereignty it requires.',
        fr: 'Aucun produit souverain ne couvre à lui seul tous les besoins. Je pars de ces options et je choisis application par application, selon le niveau de souveraineté requis.',
      },
      groups: [
        {
          title: { en: 'European cloud providers', fr: 'Fournisseurs cloud européens' },
          items: [
            { name: 'Clever Cloud', detail: { en: 'PaaS · France', fr: 'PaaS · France' } },
            {
              name: 'Scaleway',
              detail: { en: 'IaaS & PaaS · France', fr: 'IaaS & PaaS · France' },
            },
            {
              name: 'OVHcloud',
              detail: { en: 'IaaS & PaaS · France', fr: 'IaaS & PaaS · France' },
            },
            { name: 'Outscale', detail: { en: 'IaaS · France', fr: 'IaaS · France' } },
            { name: 'IONOS', detail: { en: 'IaaS · Germany', fr: 'IaaS · Allemagne' } },
            {
              name: 'STACKIT',
              detail: { en: 'IaaS & PaaS · Germany', fr: 'IaaS & PaaS · Allemagne' },
            },
            {
              name: 'Infomaniak',
              detail: { en: 'Cloud & SaaS · Switzerland', fr: 'Cloud & SaaS · Suisse' },
            },
          ],
        },
        {
          title: { en: 'Open-source building blocks', fr: 'Briques open source' },
          items: [
            { name: 'Kubernetes', detail: { en: 'Containers', fr: 'Conteneurs' } },
            {
              name: 'OpenTofu',
              detail: { en: 'Infrastructure as Code', fr: 'Infrastructure as Code' },
            },
            { name: 'PostgreSQL', detail: { en: 'Database', fr: 'Base de données' } },
            { name: 'Keycloak', detail: { en: 'Identity and access', fr: 'Identités et accès' } },
            { name: 'Matrix', detail: { en: 'Secure messaging', fr: 'Messagerie sécurisée' } },
            {
              name: 'Nextcloud',
              detail: { en: 'Files and collaboration', fr: 'Fichiers et collaboration' },
            },
          ],
        },
      ],
      link: {
        href: 'https://european-alternatives.eu',
        name: 'European Alternatives',
        text: {
          en: 'lists European alternatives to everyday digital services, from email to analytics. A good place to start for the SaaS tools around your applications.',
          fr: 'recense des alternatives européennes aux services numériques du quotidien, de l’e-mail à l’analytique. Un bon point de départ pour les outils SaaS autour de vos applications.',
        },
      },
    },
    formats: [
      {
        label: { en: 'A few weeks', fr: 'Quelques semaines' },
        title: { en: 'Sovereignty assessment', fr: 'Évaluation de souveraineté' },
        body: {
          en: 'Your workloads classified by the level they need, the main dependencies and risks, and a roadmap.',
          fr: 'Vos applications classées selon le niveau requis, les principales dépendances et les risques, et une feuille de route.',
        },
      },
      {
        label: { en: 'Weeks to months', fr: 'Quelques semaines à quelques mois' },
        title: {
          en: 'Feasibility and target architecture',
          fr: 'Faisabilité et architecture cible',
        },
        body: {
          en: 'Provider comparison, target architecture and migration strategy, ready for a decision or a tender.',
          fr: 'Comparaison des fournisseurs, architecture cible et stratégie de migration, prêtes pour une décision ou un appel d’offres.',
        },
      },
      {
        label: { en: 'Several months', fr: 'Plusieurs mois' },
        title: { en: 'Migration', fr: 'Migration' },
        body: {
          en: 'With your teams: refactoring, data and workload migration, high availability and recovery.',
          fr: 'Avec vos équipes : refactoring, migration des données et des applications, haute disponibilité et reprise.',
        },
      },
    ],
    proof: [
      {
        period: { en: '2023 – now', fr: '2023 – auj.' },
        title: { en: 'Enterprise architect', fr: 'Architecte d’entreprise' },
        org: 'EU Publications Office',
        body: {
          en: 'Migration of strategic assets to a European sovereign cloud: feasibility study, target architecture, source code analysis and refactoring, governance, data and workload migration, high availability, continuity and recovery.',
          fr: 'Migration d’actifs stratégiques vers un cloud souverain européen : étude de faisabilité, architecture cible, analyse et refactoring du code source, gouvernance, migration des données et des applications, haute disponibilité, continuité et reprise.',
        },
      },
      {
        period: { en: '2022 – 2023', fr: '2022 – 2023' },
        title: { en: 'Agile coach & architect', fr: 'Coach agile & architecte' },
        org: 'LU-CIX Management G.I.E.',
        body: {
          en: 'Luxchat4Gov, secure messaging for Luxembourg government departments: a fork of the open-source Element client for the Matrix protocol, with CI/CD and releases for web, iOS, Android, Windows and macOS.',
          fr: 'Luxchat4Gov, messagerie sécurisée pour les administrations luxembourgeoises : un fork du client open source Element pour le protocole Matrix, avec CI/CD et publication pour le web, iOS, Android, Windows et macOS.',
        },
      },
    ],
    tags: ['sovereign-cloud', 'digital-sovereignty', 'open-source', 'portability'],
  },
  agentic: {
    lead: {
      en: 'Coding agents in your delivery process, with the specifications, tests and review gates that let you ship what they write.',
      fr: 'Des agents de code dans votre chaîne de livraison, avec les spécifications, les tests et les contrôles qui permettent de livrer ce qu’ils écrivent.',
    },
    format: {
      en: 'Assessment, 30-day pilot, factory set-up',
      fr: 'Diagnostic, pilote de 30 jours, mise en place de la factory',
    },
    duration: {
      en: 'From a few days to several months',
      fr: 'De quelques jours à plusieurs mois',
    },
    situations: [
      {
        en: 'Your developers use coding agents, but releases are no faster: the work now waits in review and testing.',
        fr: 'Vos développeurs utilisent des agents de code, mais les mises en production ne vont pas plus vite : le travail attend désormais en revue et en test.',
      },
      {
        en: 'The code agents write runs, but it duplicates logic, ignores your architecture and makes every next change harder.',
        fr: 'Le code écrit par les agents fonctionne, mais il duplique la logique, ignore votre architecture et rend chaque évolution plus difficile.',
      },
      {
        en: 'Your stories are too vague for an agent, which fills the gaps with plausible defaults.',
        fr: 'Vos user stories sont trop floues pour un agent, qui comble les vides avec des choix plausibles.',
      },
      {
        en: 'You want to start, but security, data location and cost need answers first.',
        fr: 'Vous voulez vous lancer, mais la sécurité, la localisation des données et les coûts demandent d’abord des réponses.',
      },
    ],
    scope: [
      {
        title: { en: 'Intent and requirements', fr: 'Intention et exigences' },
        body: {
          en: 'Stories with acceptance criteria that can fail and Gherkin examples, refined before anything is generated.',
          fr: 'Des user stories avec des critères d’acceptation vérifiables et des exemples Gherkin, affinées avant toute génération.',
        },
      },
      {
        title: { en: 'Factory set-up', fr: 'Mise en place de la factory' },
        body: {
          en: 'Rules files, specialised subagents, commands and skills, committed in the repository so everyone works the same way.',
          fr: 'Fichiers de règles, sous-agents spécialisés, commandes et skills, versionnés dans le dépôt pour que tout le monde travaille de la même façon.',
        },
      },
      {
        title: { en: 'Guardrails and gates', fr: 'Garde-fous et contrôles' },
        body: {
          en: 'Hooks, separate agents for tests and code, contract checks and CI gates that an agent cannot get past.',
          fr: 'Hooks, agents distincts pour les tests et le code, vérification des contrats et contrôles CI qu’un agent ne peut pas contourner.',
        },
      },
      {
        title: { en: 'Traceability', fr: 'Traçabilité' },
        body: {
          en: 'From story to scenario, test, code and merge request, with CI checking every link.',
          fr: 'De la user story au scénario, au test, au code et à la merge request, chaque lien vérifié par la CI.',
        },
      },
      {
        title: { en: 'Hosting, data and cost', fr: 'Hébergement, données et coûts' },
        body: {
          en: 'Models in an EU region where required, bounded access to code and secrets, and cost tracked per project.',
          fr: 'Des modèles dans une région européenne si nécessaire, un accès limité au code et aux secrets, et des coûts suivis par projet.',
        },
      },
      {
        title: { en: 'Team practices', fr: 'Pratiques d’équipe' },
        body: {
          en: 'New roles and review habits, and one rule above the others: you must be able to explain what you merge.',
          fr: 'De nouveaux rôles et de nouvelles habitudes de revue, et une règle au-dessus des autres : savoir expliquer ce que l’on fusionne.',
        },
      },
    ],
    ecosystem: {
      title: { en: 'What a factory is made of', fr: 'De quoi est faite une factory' },
      intro: {
        en: 'Agents do the repeatable production work. People own the intent, the judgement and the acceptance. These are the pieces that hold the two together.',
        fr: 'Les agents font le travail de production répétable. Les personnes gardent l’intention, le jugement et l’acceptation. Voici les pièces qui tiennent l’ensemble.',
      },
      groups: [
        {
          title: { en: 'Agent tooling', fr: 'Outillage des agents' },
          items: [
            { name: 'Claude Code', detail: { en: 'Coding agent', fr: 'Agent de code' } },
            {
              name: 'MCP',
              detail: { en: 'Agents connected to your tools', fr: 'Agents connectés à vos outils' },
            },
            {
              name: 'Subagents',
              detail: { en: 'One narrow job each', fr: 'Une tâche précise chacun' },
            },
            { name: 'Skills', detail: { en: 'Know-how, packaged', fr: 'Savoir-faire packagé' } },
            {
              name: 'Hooks',
              detail: { en: 'Rules enforced while it works', fr: 'Règles appliquées en continu' },
            },
          ],
        },
        {
          title: { en: 'Engineering practices', fr: 'Pratiques d’ingénierie' },
          items: [
            {
              name: 'Gherkin scenarios',
              detail: { en: 'Executable acceptance', fr: 'Acceptation exécutable' },
            },
            {
              name: 'Test-first',
              detail: {
                en: 'Tests written by another agent',
                fr: 'Tests écrits par un autre agent',
              },
            },
            {
              name: 'Contract-first API',
              detail: { en: 'One OpenAPI spec, both sides', fr: 'Une spec OpenAPI, deux côtés' },
            },
            {
              name: 'Isolated worktrees',
              detail: { en: 'One per story', fr: 'Un par user story' },
            },
            {
              name: 'ADRs',
              detail: {
                en: 'Decisions owned by people',
                fr: 'Décisions portées par des personnes',
              },
            },
          ],
        },
      ],
      link: {
        href: 'https://academy.claude.com/courses/ai-native-sdlc-playbook',
        name: 'The AI-native SDLC playbook',
        text: {
          en: 'from Anthropic describes six stages of an agent-assisted lifecycle, from plan to maintain. I use it as a shared map when a team starts.',
          fr: 'd’Anthropic décrit six étapes d’un cycle de vie assisté par des agents, de la planification à la maintenance. Je m’en sers comme carte commune quand une équipe démarre.',
        },
      },
    },
    formats: [
      {
        label: { en: 'A few days', fr: 'Quelques jours' },
        title: { en: 'Assessment', fr: 'Diagnostic' },
        body: {
          en: 'Where agents fit in your delivery, what slows you down today, and the guardrails your context requires.',
          fr: 'Où les agents trouvent leur place dans votre livraison, ce qui vous freine aujourd’hui, et les garde-fous que votre contexte exige.',
        },
      },
      {
        label: { en: '30 days', fr: '30 jours' },
        title: { en: 'Pilot', fr: 'Pilote' },
        body: {
          en: 'One team, one product area, one lane of the board. We measure cycle time and rework, and add a gate each time something goes wrong.',
          fr: 'Une équipe, un périmètre produit, une colonne du tableau. On mesure le temps de cycle et les reprises, et on ajoute un contrôle à chaque problème.',
        },
      },
      {
        label: { en: 'Several months', fr: 'Plusieurs mois' },
        title: { en: 'Factory set-up', fr: 'Mise en place de la factory' },
        body: {
          en: 'Alongside your team, from refinement to CI, until the factory runs without me.',
          fr: 'Aux côtés de votre équipe, de l’affinage à la CI, jusqu’à ce que la factory tourne sans moi.',
        },
      },
    ],
    proof: [
      {
        period: { en: '2026', fr: '2026' },
        title: { en: 'Agentic software factory', fr: 'Software factory agentique' },
        org: 'EU Publications Office',
        body: {
          en: 'Rewrite of a large public web platform, organised as an agentic software factory: Claude Code configured in the repository with 16 subagents, 27 commands and 12 hooks, CI gates and a knowledge graph. From April to October 2026: more than 1,000 merge requests and 34,000 automated tests.',
          fr: 'Refonte d’une grande plateforme web publique, organisée en software factory agentique : Claude Code configuré dans le dépôt avec 16 sous-agents, 27 commandes et 12 hooks, des contrôles CI et un graphe de connaissances. D’avril à octobre 2026 : plus de 1 000 merge requests et 34 000 tests automatisés.',
        },
      },
      {
        period: { en: '2019 – 2026', fr: '2019 – 2026' },
        title: { en: 'CTO', fr: 'CTO' },
        org: 'Agile Partner',
        body: {
          en: 'Member of the company’s AI task force: chose the tools, defined good practices and a starter harness for coding agents, and helped colleagues build their skills.',
          fr: 'Membre de la task force IA de l’entreprise : choix des outils, définition des bonnes pratiques et d’un harnais de démarrage pour les agents de code, et accompagnement de la montée en compétences des collègues.',
        },
      },
    ],
    tags: ['agentic-ai', 'software-factory', 'coding-agents', 'ai-native-sdlc'],
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
