import type { Lang } from '../i18n.js';
import type { L10n, Tint } from './profile.js';

export type TalkTopic = 'architecture' | 'facilitation' | 'agile' | 'sovereignty';
export type TalkFormat = 'talk' | 'quickie' | 'workshop' | 'meetup';

export const talkTopics: Record<TalkTopic, { label: L10n; tint: Tint }> = {
  architecture: { label: { en: 'Architecture & DDD', fr: 'Architecture & DDD' }, tint: 'sun' },
  facilitation: { label: { en: 'Facilitation & play', fr: 'Facilitation & jeu' }, tint: 'rose' },
  agile: { label: { en: 'Agile & craft', fr: 'Agile & craft' }, tint: 'sky' },
  sovereignty: { label: { en: 'Sovereignty', fr: 'Souveraineté' }, tint: 'mint' },
};

/** One time a talk was given. */
export interface TalkDelivery {
  /** YYYY-MM */
  date: string;
  event: string;
  place?: L10n;
  /** Language spoken. */
  lang: Lang;
  /** Title used at that event, when it differs from the talk's. */
  title?: string;
  /** The talk's video is the recording of this delivery. */
  recorded?: boolean;
}

export interface Talk {
  slug: string;
  title: string;
  /** Language of the title. */
  lang: Lang;
  topic: TalkTopic;
  format: TalkFormat;
  /** Hero lead, also the meta description. */
  summary: L10n;
  /** Longer description on the talk page, one string per paragraph. */
  body?: L10n[];
  /** Newest first. */
  deliveries: TalkDelivery[];
  /** YouTube video; `uploaded` (YYYY-MM-DD) feeds the VideoObject structured data. */
  video?: { id: string; seconds: number; uploaded: string };
  /** Source deck under resources/Talks, rendered by `bun run talks`. */
  slides?: string;
  /** Listed in "Talks I give today". */
  offer?: { title: L10n; summary: L10n };
}

const VDL = 'Voxxed Days Luxembourg';
const METTEG = 'Agile Mëtteg';
const lux = { en: 'Luxembourg', fr: 'Luxembourg' };
const online = { en: 'Online', fr: 'En ligne' };

/** Newest first. Source: resources/Talks (decks, abstracts) and the CVs. */
export const talks: Talk[] = [
  {
    slug: 'play14-in-14-words',
    title: '#play14 in 14 words',
    lang: 'en',
    topic: 'facilitation',
    format: 'talk',
    summary: {
      en: 'What #play14 is, how its events work and why its community keeps growing, told in fourteen words, from "playful" to "non-profit".',
      fr: 'Ce qu’est #play14, comment se déroulent ses événements et pourquoi sa communauté continue de grandir, raconté en quatorze mots, de « playful » à « non-profit ».',
    },
    deliveries: [
      { date: '2026-03', event: 'GamiCon38v', place: online, lang: 'en', recorded: true },
    ],
    video: { id: '1k1neo2trkg', seconds: 921, uploaded: '2026-03-30' },
    slides: '2026-03 - GamiCon38v/Cedric Pontet - #play14 in 14 words.pdf',
  },
  {
    slug: 'digital-sovereignty-geopolitics',
    title: 'Géopolitique et souveraineté numérique : enjeux, implications et opportunités',
    lang: 'fr',
    topic: 'sovereignty',
    format: 'talk',
    summary: {
      en: 'What digital sovereignty means when you design a critical system: infrastructure, data, geopolitical risk, resilience to cyber threats and software independence.',
      fr: 'Ce que la souveraineté numérique implique quand on conçoit un système critique : infrastructures, données, risque géopolitique, résilience face aux cybermenaces et indépendance logicielle.',
    },
    body: [
      {
        en: 'Digital sovereignty is the ability of a state, an organisation or a person to control, protect and govern their data and digital infrastructure without excessive dependence on foreign players. The subject came back to the front of the stage in 2025, and with it many projects and budgets were reconsidered.',
        fr: 'La souveraineté numérique désigne la capacité des États, des organisations ou des individus à contrôler, protéger et gouverner leurs données et infrastructures numériques sans dépendance excessive envers des acteurs étrangers. Le sujet est revenu sur le devant de la scène en 2025, et avec lui beaucoup de projets et de budgets ont été remis en question.',
      },
      {
        en: 'I go through the stakes of strategic independence, what it implies for the architecture of information systems, in particular in the European institutions I work with, and the opportunities it opens for European players.',
        fr: 'Je fais le tour des enjeux de l’indépendance stratégique, de ses implications pour l’architecture des systèmes d’information, notamment au sein des institutions européennes avec lesquelles je travaille, et des opportunités qu’elle ouvre pour les acteurs européens.',
      },
    ],
    deliveries: [{ date: '2025-06', event: VDL, lang: 'fr', recorded: true }],
    video: { id: 'FwPGyBjfEn4', seconds: 3254, uploaded: '2025-07-29' },
    slides:
      '2025-06 - VoxxedDays/Sovereignty/Géopolitique et souveraineté numérique - enjeux, implications et opportunités.pptx',
    offer: {
      title: {
        en: 'Geopolitics and digital sovereignty: issues, implications and opportunities',
        fr: 'Géopolitique et souveraineté numérique : enjeux, implications et opportunités',
      },
      summary: {
        en: 'Infrastructure, data, software independence and geopolitical risk: what to weigh when you design a critical system.',
        fr: 'Infrastructures, données, indépendance logicielle et risque géopolitique : ce qu’il faut peser quand on conçoit un système critique.',
      },
    },
  },
  {
    slug: 'event-driven-vs-event-sourcing',
    title: 'Event-driven vs event sourcing : quelle est vraiment la différence ?',
    lang: 'fr',
    topic: 'architecture',
    format: 'talk',
    summary: {
      en: 'Two patterns that are often confused. A pragmatic definition of each, how they complement each other, and what to watch when you build them.',
      fr: 'Deux patterns souvent confondus. Une définition pragmatique de chacun, la façon dont ils se complètent, et les points d’attention quand on les met en œuvre.',
    },
    body: [
      {
        en: 'With microservices came a lot of talk about reactive programming and event-driven architecture, and event sourcing is often described as a pattern for distributed systems. In practice, the difference between the two is rarely clear.',
        fr: 'Avec les microservices, on parle beaucoup de reactive programming et d’architecture event-driven, et l’event sourcing est souvent présenté comme un pattern lié aux architectures distribuées. En pratique, la différence entre les deux est rarement claire.',
      },
      {
        en: 'I use concrete examples to show the benefits of both, and strategies of choreography and orchestration. Then the points that need care: distributed transactions, tracing and event versioning. Volunteers from the audience play the actors of restaurants around the world, so the difference is felt, not just explained.',
        fr: 'Des exemples concrets montrent les bénéfices des deux approches, ainsi que différentes stratégies de chorégraphie et d’orchestration. Puis les points d’attention : transactions distribuées, tracing et versioning des événements. Des volontaires du public jouent les acteurs de restaurants installés dans différents pays, pour que la différence se vive au lieu de s’expliquer.',
      },
    ],
    deliveries: [
      // TODO(cedric): the Voxxed Days speaker page lists this talk again in 2025; confirm.
      { date: '2025-06', event: VDL, lang: 'fr' },
      { date: '2024-06', event: VDL, lang: 'fr', recorded: true },
    ],
    video: { id: 'wdbO60CIMqM', seconds: 3109, uploaded: '2024-07-02' },
    slides: '2024-06 - Voxxed Days/Event-Driven vs Event Sourcing.pptx',
    offer: {
      title: { en: 'Event-driven vs event sourcing', fr: 'Event-driven vs event sourcing' },
      summary: {
        en: 'A pragmatic definition of both, how they complement each other, and what to watch: distributed transactions, tracing, versioning.',
        fr: 'Une définition pragmatique des deux, leur complémentarité, et les points d’attention : transactions distribuées, tracing, versioning.',
      },
    },
  },
  {
    slug: 'ddd-back-to-the-roots',
    title: 'Domain-Driven Design : retour aux sources',
    lang: 'fr',
    topic: 'architecture',
    format: 'talk',
    summary: {
      en: 'An introduction to Domain-Driven Design: why Eric Evans formalised it, what it brings to software development, and when it is overkill.',
      fr: 'Une introduction à Domain-Driven Design : pourquoi Eric Evans l’a formalisé, ce que la démarche apporte au développement logiciel, et quand elle est superflue.',
    },
    body: [
      {
        en: 'When I asked the Voxxed Days audience who knew Domain-Driven Design, few hands went up. So I went back to the roots. Beyond bounded contexts, ubiquitous language and aggregates, the goal is to understand why DDD was formalised in 2003–2004 and what it changes. The talk starts from an example: on your first day at a new bank, what is a customer?',
        fr: 'Quand j’ai demandé au public du Voxxed Days qui connaissait Domain-Driven Design, peu de mains se sont levées. J’ai donc fait un retour aux sources. Au-delà des bounded contexts, de l’ubiquitous language et des aggregates, l’objectif est de comprendre pourquoi DDD a été formalisé en 2003–2004 et ce que la démarche change. La session part d’un exemple : premier jour dans une nouvelle banque, qu’est-ce qu’un client ?',
      },
    ],
    deliveries: [{ date: '2023-06', event: VDL, lang: 'fr', recorded: true }],
    video: { id: 'x6YetdQYg5o', seconds: 3326, uploaded: '2023-07-02' },
    slides: '2023-06 - Voxxed Days/DDD - Back to the roots.pptx',
  },
  {
    slug: 'eventstorming-with-the-stars',
    title: 'EventStorming with the stars',
    lang: 'en',
    topic: 'facilitation',
    format: 'workshop',
    summary: {
      en: 'A hands-on EventStorming workshop that travels through four decades of my family’s cinema business, one model per generation.',
      fr: 'Un atelier EventStorming pratique qui traverse quatre décennies de l’entreprise de cinémas de ma famille, un modèle par génération.',
    },
    body: [
      {
        en: 'My great-grandfather, my grandfather and my father ran cinemas in the east of France, a family business from the 1950s until it was sold in the late 1980s. In this workshop, participants model four versions of the movie theatre domain, one per period. They see how the business grew more complex, what had to be managed differently, and what appeared or disappeared with each industry revolution.',
        fr: 'Mon arrière-grand-père, mon grand-père et mon père ont exploité des cinémas dans l’est de la France, une entreprise familiale des années 1950 jusqu’à sa vente à la fin des années 1980. Dans cet atelier, les participants modélisent quatre versions du domaine de l’exploitation de salles, une par période. Ils voient comment le métier s’est complexifié, ce qu’il a fallu gérer autrement, et ce qui est apparu ou a disparu à chaque révolution du secteur.',
      },
    ],
    deliveries: [{ date: '2022-09', event: 'XP Days Benelux', place: lux, lang: 'en' }],
    slides: '2022-09 - XP Days/EventStorming with the stars.pptx',
  },
  {
    slug: 'distributed-wars',
    title: 'Distributed Wars: these are not the boundaries you are looking for',
    lang: 'en',
    topic: 'architecture',
    format: 'talk',
    summary: {
      en: 'Before splitting a system into microservices, look at four kinds of boundaries: user journeys, business domains, teams and services.',
      fr: 'Avant de découper un système en microservices, regardez quatre types de frontières : parcours utilisateurs, domaines métier, équipes et services.',
    },
    body: [
      {
        en: 'As a technical coach, the first questions I get are about splitting a large system into microservices: API protocols, messaging, containers, orchestrators. They matter, but they are not where to start. Users care about the experience, business people think in domains and capabilities, and teams work best when they are cross-functional and focused.',
        fr: 'En tant que coach technique, les premières questions qu’on me pose portent sur le découpage d’un grand système en microservices : protocoles d’API, messaging, conteneurs, orchestrateurs. Elles comptent, mais ce n’est pas par là qu’il faut commencer. Les utilisateurs se soucient de leur expérience, le métier pense en domaines et en capacités, et les équipes travaillent mieux quand elles sont pluridisciplinaires et focalisées.',
      },
      {
        en: 'I propose four types of boundaries (user experience, functional, social and technical), the techniques and tools that help identify and visualise each one, and how they depend on each other.',
        fr: 'Je propose quatre types de frontières (expérience utilisateur, fonctionnelle, sociale et technique), les techniques et outils qui aident à identifier et visualiser chacune, et leurs interdépendances.',
      },
    ],
    deliveries: [
      {
        date: '2022-06',
        event: VDL,
        lang: 'fr',
        title: 'Distributed Wars : ce ne sont pas les frontières que vous recherchez',
        recorded: true,
      },
      { date: '2021-01', event: 'Lux Tech Community', place: online, lang: 'en' },
    ],
    video: { id: 'qIR8vPdlQe0', seconds: 2873, uploaded: '2022-07-01' },
    slides:
      '2022-06 - Voxxed Days/Distributed Wars - These are not the boundaries you are looking for.pptx',
  },
  {
    slug: 'resilience-agile-mindset',
    title: 'Resilience: how I overcame a private ordeal thanks to an agile mindset',
    lang: 'en',
    topic: 'agile',
    format: 'talk',
    summary: {
      en: 'A personal story: a fire at home in June 2020, and how an agile mindset helped my family and me move forward.',
      fr: 'Une histoire personnelle : un incendie chez nous en juin 2020, et comment un état d’esprit agile nous a aidés, ma famille et moi, à aller de l’avant.',
    },
    body: [
      {
        en: 'Responding to change over following a plan, keeping cognitive load under control, personal Kanban to keep track of what had to be rebuilt, and knowing yourself: what I learned about resilience when life went off plan.',
        fr: 'Répondre au changement plutôt que suivre un plan, garder la charge cognitive sous contrôle, un Kanban personnel pour suivre tout ce qu’il fallait reconstruire, et se connaître soi-même : ce que j’ai appris sur la résilience quand la vie est sortie du plan.',
      },
    ],
    // TODO(cedric): name of the event.
    deliveries: [{ date: '2021-04', event: 'Agile Resilience', place: online, lang: 'en' }],
    slides:
      '2021-04 - Agile Resilience/Resilience - How I overcame a private ordeal thanks to an agile mindset.pptx',
  },
  {
    slug: 'eventstorming-facilitation-skills',
    title: 'EventStorming: improving your facilitation skills',
    lang: 'en',
    topic: 'facilitation',
    format: 'talk',
    summary: {
      en: 'Twenty tips and five caveats for EventStorming facilitators, to run sessions that reach their goal.',
      fr: 'Vingt astuces et cinq mises en garde pour les facilitateurs d’EventStorming, pour des sessions qui atteignent leur objectif.',
    },
    body: [
      {
        en: 'EventStorming is a flexible workshop format for exploring complex business domains together. Running a session well takes facilitation skills that are not trivial. I share heuristics to become a better EventStorming facilitator, twenty tips to improve your facilitation and five things to avoid at all costs.',
        fr: 'EventStorming est un format d’atelier flexible pour explorer ensemble des domaines métier complexes. Bien animer une session demande des compétences de facilitation qui ne sont pas triviales. Je partage des heuristiques pour devenir un meilleur facilitateur d’EventStorming, vingt astuces pour améliorer sa facilitation et cinq choses à éviter à tout prix.',
      },
    ],
    deliveries: [
      { date: '2019-12', event: 'FlowCon', place: { en: 'Paris', fr: 'Paris' }, lang: 'en' },
    ],
    slides: '2019-12 - Flowcon/EventStorming - Improving your facilitation skills.pdf',
    offer: {
      title: {
        en: 'EventStorming: improving your facilitation skills',
        fr: 'EventStorming : améliorer votre technique de facilitation',
      },
      summary: {
        en: 'Twenty tips and five caveats for running EventStorming sessions that reach their goal.',
        fr: 'Vingt astuces et cinq mises en garde pour animer des sessions EventStorming qui atteignent leur objectif.',
      },
    },
  },
  {
    slug: 'eventstorming-super-hero-story',
    title: 'EventStorming: a super hero story',
    lang: 'en',
    topic: 'facilitation',
    format: 'talk',
    summary: {
      en: 'An introduction to EventStorming, from the big picture to software design, built on domain events written in the past tense.',
      fr: 'Une introduction à EventStorming, de la big picture au design logiciel, à partir de domain events conjugués au passé.',
    },
    body: [
      {
        en: 'EventStorming lets people explore complex business processes quickly and together. With the right people in the room, silos fall as the group builds a timeline of significant business events, written in the past tense. A low-cost format with an unlimited modelling surface, coloured sticky notes and an incremental notation: a communication tool and a learning opportunity.',
        fr: 'EventStorming permet d’explorer rapidement et collectivement des processus métier complexes. En invitant les bonnes personnes, on fait tomber les silos en construisant une ligne de temps d’événements significatifs pour le métier, conjugués au passé. Un format low cost, avec une surface de modélisation infinie, des post-its de couleur et une notation incrémentale : un outil de communication et une occasion d’apprendre.',
      },
    ],
    deliveries: [
      {
        date: '2019-11',
        event: 'Agile Grenoble',
        place: { en: 'Grenoble', fr: 'Grenoble' },
        lang: 'fr',
      },
      {
        date: '2019-06',
        event: VDL,
        lang: 'fr',
        title: 'EventStorming : au commencement était le verbe… au passé',
      },
    ],
    slides: '2019-11 - Agile Grenoble/EventStorming - A super hero story.pptx',
  },
  {
    slug: 'steel-in-the-cloud',
    title: 'Steel in the cloud',
    lang: 'en',
    topic: 'architecture',
    format: 'talk',
    summary: {
      en: 'Selling and shipping 40-tonne steel coils online: DDD and CQRS on Azure for more than 20,000 users in Europe and South America.',
      fr: 'Vendre et expédier en ligne des bobines d’acier de 40 tonnes : DDD et CQRS sur Azure pour plus de 20 000 utilisateurs en Europe et en Amérique du Sud.',
    },
    body: [
      {
        en: 'How we helped a client change its business model and its relationship with its customers with an online sales and order tracking system. The design decisions and trade-offs: DDD and CQRS where they make sense, Azure PaaS and messaging to integrate heterogeneous back-office systems, TypeScript from Angular to Node.js, and continuous delivery from the first sprint.',
        fr: 'Comment nous avons aidé un client à changer son modèle commercial et sa relation avec ses clients grâce à un système de vente et de suivi de commandes en ligne. Les décisions de conception et les compromis : DDD et CQRS là où ils ont du sens, PaaS et messaging Azure pour intégrer des back-offices hétérogènes, TypeScript d’Angular à Node.js, et livraison continue dès le premier sprint.',
      },
    ],
    deliveries: [
      { date: '2017-10', event: 'KanDDDinsky', place: { en: 'Berlin', fr: 'Berlin' }, lang: 'en' },
    ],
    slides: '2017-10 KanDDDinsky/Steel in the cloud.pptx',
  },
  {
    slug: 'how-your-brain-learns',
    title: 'Apprentissage : comment fonctionne notre cerveau',
    lang: 'fr',
    topic: 'facilitation',
    format: 'quickie',
    summary: {
      en: 'A quick talk on learning: cognitive science, learning models, neurogenesis and motivation.',
      fr: 'Un quick talk sur l’apprentissage : sciences cognitives, modèles d’apprentissage, neurogenèse et motivation.',
    },
    deliveries: [{ date: '2017-06', event: VDL, lang: 'fr', recorded: true }],
    video: { id: 'ste0glkNUiU', seconds: 947, uploaded: '2017-06-26' },
    slides: '2017-06 Voxxed Days/Voxxed Days 2017.pdf',
  },
  {
    slug: 'events-everywhere',
    title: 'Events everywhere: breaking monoliths and silos',
    lang: 'en',
    topic: 'architecture',
    format: 'talk',
    summary: {
      en: 'How events decouple applications into small independent components, and help business and technical people share one language.',
      fr: 'Comment les événements découplent les applications en petits composants indépendants, et aident métier et technique à partager un même langage.',
    },
    body: [
      {
        en: 'Microservices and actors are not new: they rely on loose coupling and high cohesion, ideas we have discussed for more than 30 years. Buying an expensive enterprise service bus does not make code more robust. A practical approach to messages and events makes an application easier to understand, maintain and evolve, and can even reveal business insights.',
        fr: 'Les microservices et les acteurs ne sont pas nouveaux : ils reposent sur le couplage faible et la forte cohésion, dont on parle depuis plus de 30 ans. Acheter un ESB coûteux ne rend pas le code plus robuste. Une approche pragmatique des messages et des événements rend une application plus facile à comprendre, à maintenir et à faire évoluer, et peut même révéler des opportunités métier.',
      },
    ],
    deliveries: [{ date: '2016-06', event: VDL, lang: 'fr', recorded: true }],
    video: { id: 'vntWNBKBFjg', seconds: 2730, uploaded: '2016-06-28' },
    slides: '2016-06 Voxxed Days/Events everywhere.pptx',
  },
  {
    slug: 'events-at-the-tip-of-your-fingers',
    title: 'Events at the tip of your fingers',
    lang: 'en',
    topic: 'architecture',
    format: 'talk',
    summary: {
      en: 'DDD, CQRS and event sourcing on rugged handheld devices for mail and parcel delivery, occasionally connected.',
      fr: 'DDD, CQRS et event sourcing sur des terminaux portables durcis pour la distribution du courrier et des colis, connectés par intermittence.',
    },
    body: [
      {
        en: 'A mail and parcel delivery company asked me to redesign the software its staff use to scan and track deliveries across the country. It had to run on industrial devices with Windows Mobile 6 and the .NET Compact Framework, stay fast in front of customers, and sync with central systems whenever a connection was available. Designing around events solved many of these constraints while keeping the implementation simple.',
        fr: 'Une entreprise de distribution de courrier et de colis m’a demandé de reconcevoir le logiciel que ses agents utilisent pour scanner et suivre les envois dans tout le pays. Il devait tourner sur des terminaux industriels sous Windows Mobile 6 et .NET Compact Framework, rester rapide devant le client, et se synchroniser avec les systèmes centraux dès qu’une connexion était disponible. Une conception fondée sur les événements a résolu beaucoup de ces contraintes en gardant une implémentation simple.',
      },
    ],
    deliveries: [
      {
        date: '2014-11',
        event: 'Build Stuff',
        place: { en: 'Vilnius', fr: 'Vilnius' },
        lang: 'en',
      },
    ],
    slides: '2014-11 BuildStuff/Events_at_the_tip_of_your_fingers.pptx',
  },
  {
    slug: 'from-chaos-to-kanban',
    title: 'From chaos to Scrum and then Kanban: 5 years of continuous improvement',
    lang: 'en',
    topic: 'agile',
    format: 'talk',
    summary: {
      en: 'With Yann Gensollen: how a team in Luxembourg moved from Scrum to Kanban through small, continuous improvements.',
      fr: 'Avec Yann Gensollen : comment une équipe au Luxembourg est passée de Scrum à Kanban par petites améliorations continues.',
    },
    deliveries: [
      { date: '2013-06', event: 'DARE', place: { en: 'Antwerp', fr: 'Anvers' }, lang: 'en' },
    ],
  },
  {
    slug: 'ddd-tackling-complexity',
    title: 'Domain-Driven Design: tackling complexity in the heart of software',
    lang: 'en',
    topic: 'architecture',
    format: 'meetup',
    summary: {
      en: 'An introduction to Domain-Driven Design and Eric Evans’ book, for an Agile Mëtteg lunch session.',
      fr: 'Une introduction à Domain-Driven Design et au livre d’Eric Evans, pour une session Agile Mëtteg.',
    },
    deliveries: [{ date: '2011-10', event: METTEG, place: lux, lang: 'en' }],
    slides: '2011-10-20 - DDD/DDD.pptx',
  },
  {
    slug: 'clean-code',
    title: 'Clean code',
    lang: 'en',
    topic: 'agile',
    format: 'meetup',
    summary: {
      en: 'What code is, why clean code matters, and how to achieve it: from the Agile and Software Craftsmanship manifestos to everyday practices.',
      fr: 'Ce qu’est le code, pourquoi un code propre compte, et comment y arriver : des manifestes Agile et Software Craftsmanship aux pratiques du quotidien.',
    },
    deliveries: [{ date: '2011-02', event: METTEG, place: lux, lang: 'en' }],
    slides: '2011-02-24 - Cleancode/AgileMetteg-CleanCode.pptx',
  },
  {
    slug: 'agile-architecture-programming',
    title: 'Agile architecture & programming',
    lang: 'en',
    topic: 'architecture',
    format: 'meetup',
    summary: {
      en: 'What agile development implies for architecture, design and coding practices, a few myths about architecture and agility, and practices that work.',
      fr: 'Ce que le développement agile implique pour l’architecture, la conception et les pratiques de code, quelques mythes sur l’architecture et l’agilité, et des pratiques qui marchent.',
    },
    deliveries: [
      { date: '2010-09', event: METTEG, place: lux, lang: 'en' },
      { date: '2010-05', event: METTEG, place: lux, lang: 'en' },
    ],
    slides: '2010-09-16 Architecture & Programming/AgileMetteg-6(Architecture&Programming).pptx',
  },
  {
    slug: 'who-is-the-scrum-master',
    title: 'Who is the Scrum Master?',
    lang: 'en',
    topic: 'agile',
    format: 'meetup',
    summary: {
      en: 'A short introduction to agile values, Scrum and the Scrum Master role, and what an agile transition means for project management.',
      fr: 'Une courte introduction aux valeurs agiles, à Scrum et au rôle de Scrum Master, et à ce qu’une transition agile change pour la gestion de projet.',
    },
    deliveries: [{ date: '2010-02', event: METTEG, place: lux, lang: 'en' }],
    slides: '2010-02-23 Scrum Master/AgileMetteg-1(ScrumMaster).pptx',
  },
  // TODO(cedric): titles missing for these speaker slots from the CV, so they are not listed yet:
  // Lean Kanban France, Paris (2017-11); Agile Grenoble (2022-11); XP Days Benelux (2023);
  // ICT Spring (2023-06, photos only in resources/Talks).
];

/** Rendered slides of a talk, from talk-assets.json (`bun run talks`). */
export interface SlideDeck {
  pages: number;
  /** Size of each slide image, in px. */
  width: number;
  height: number;
  pdfBytes: number;
}

/** Talks with a page of their own: the ones with a video or slides. */
export const talksWithPage = talks.filter((t) => t.video || t.slides);

export function getTalk(slug: string): Talk | undefined {
  return talksWithPage.find((t) => t.slug === slug);
}

export type MediaKind = 'podcast' | 'meetup' | 'interview' | 'portrait' | 'video';

export interface MediaItem {
  kind: MediaKind;
  outlet: string;
  /** YYYY-MM, or YYYY when the month is unknown. */
  date: string;
  title: string;
  lang: Lang;
  summary: L10n;
  href: string;
  /** Where the link goes: names the platform in the call to action. */
  platform: 'spotify' | 'youtube' | 'paperjam' | 'itnation';
}

/** Podcasts, interviews and press, newest first. */
export const media: MediaItem[] = [
  {
    kind: 'podcast',
    outlet: 'Professor Game',
    date: '2024-06',
    title: 'Facilitating games for learning (episode 149)',
    lang: 'en',
    summary: {
      en: 'On #play14, game-based learning and facilitation.',
      fr: 'Sur #play14, l’apprentissage par le jeu et la facilitation.',
    },
    href: 'https://open.spotify.com/episode/4wBTRGN1NgxScEK6tbsBtN',
    platform: 'spotify',
  },
  {
    kind: 'meetup',
    outlet: 'Avanscoperta',
    date: '2020-09',
    title: 'Agile stories from the trenches',
    lang: 'en',
    summary: {
      en: 'With Guy Fabien: client cases where the problem turned out to be something else, and how agile helped.',
      fr: 'Avec Guy Fabien : des cas clients où le problème était en fait ailleurs, et comment l’agilité a aidé.',
    },
    href: 'https://www.youtube.com/watch?v=Ntoo-p219BY',
    platform: 'youtube',
  },
  {
    kind: 'video',
    outlet: '#play14 London',
    date: '2018',
    title: 'Event Storming in one minute',
    lang: 'en',
    summary: {
      en: 'A short introduction to EventStorming, filmed at #play14 London.',
      fr: 'Une courte introduction à EventStorming, filmée à #play14 Londres.',
    },
    href: 'https://www.youtube.com/watch?v=Dw4runS6Ub8',
    platform: 'youtube',
  },
  {
    kind: 'interview',
    outlet: 'Paperjam',
    date: '2018-07',
    title: '« Le cloud est un accélérateur d’usages et de business ! »',
    lang: 'fr',
    summary: {
      en: 'What moving to the cloud means for start-ups, SMEs and large organisations, and how to prepare.',
      fr: 'Ce que le passage au cloud représente pour les start-up, les PME et les grands comptes, et comment s’y préparer.',
    },
    href: 'https://paperjam.lu/article/questions-le-cloud-est-un-accelerateur-dusages-et-de-business',
    platform: 'paperjam',
  },
  {
    kind: 'portrait',
    outlet: 'ITnation',
    date: '2012-10',
    title: 'Portrait de Cédric Pontet, Software Architect at Agile Partner SA',
    lang: 'fr',
    summary: {
      en: 'Sticky notes, agile values and why agility is a framework, not a dogma.',
      fr: 'Post-it, valeurs agiles et pourquoi l’agilité est un cadre, pas un dogme.',
    },
    href: 'https://itnation.lu/news/portrait-cedric-pontet-software-architect-at-agile-partner-sa/',
    platform: 'itnation',
  },
];

export const youtubePlaylist = 'https://www.youtube.com/playlist?list=PLVEt-PRnoNgo';
export const voxxedSpeakerPage = 'https://www.voxxeddays.com/speaker/cedric-pontet';

/** "47:53" or "1:23:11". */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}
