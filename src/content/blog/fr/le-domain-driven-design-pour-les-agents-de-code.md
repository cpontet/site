---
title: 'Le Domain-Driven Design pour les agents de code'
description: 'Un agent de code comble chaque trou de votre domaine avec une valeur par défaut plausible. Ce que la communauté DDD apprend de l’IA, et la boucle en quatre étapes que je mets en place : découvrir avec des personnes, distiller dans le dépôt, piloter par des exemples, détecter la dérive.'
date: '2027-01-07'
lang: fr
tags: [ddd, eventstorming, domain-modelling, agentic-ai, coding-agents]
draft: true
translationOf: en/domain-driven-design-for-coding-agents
---

Sur la refonte d’une grande plateforme web publique, que j’ai décrite dans
[un article précédent](/fr/blog/au-coeur-d-une-software-factory-agentique), un agent de code a un
jour écrit une clause de recherche qui paraissait parfaitement raisonnable. Elle respectait la
syntaxe du moteur de recherche, et elle excluait une catégorie de documents d’une manière qui
semblait juste. Aucun code du système existant ne l’avait jamais utilisée. Elle a fait passer les
résultats d’une requête courante de 1 824 à 2.

La correction n’a pas été un meilleur modèle. Ce fut une règle : les agents doivent utiliser le
vocabulaire du domaine, et ne pas inventer de concept ni de clause de requête pour quelque chose
que le domaine nomme déjà. Cette règle, c’est du Domain-Driven Design, appliqué à un nouveau type
de membre d’équipe.

Cet article regarde ce que la communauté DDD apprend de l’IA, ce que nous avions déjà en place sur
ce projet, ce qui manquait, et la boucle que je mets en place pour combler ce manque. Les citations
sont traduites de l’anglais.

## Ce que la communauté DDD constate

[Alberto Brandolini](https://blog.avanscoperta.it/2026/08/27/code-is-still-a-side-effect/), qui a
créé l’EventStorming, est un ami ; il m’a invité plusieurs fois à l’Avanscoperta Retreat et à
l’EventStorming Summit. Il code avec des agents tous les jours, et il dit clairement où ils aident
et où ils n’aident pas. Sa vieille formule, « le développement logiciel est un processus
d’apprentissage, le code qui fonctionne en est un effet de bord », n’a pas changé. Ce qui a changé,
c’est la vitesse à laquelle arrive l’effet de bord.

Son avertissement porte sur la découverte. Demandez à une IA d’extraire un glossaire des photos
d’un mur d’EventStorming et vous obtenez quelque chose de plausible, sans le raisonnement derrière
les choix : « vous venez juste de produire du bruit plus vite ». Construire un modèle cohérent,
c’est là que se fait l’apprentissage, et cela doit se passer dans la tête des gens. En revanche, il
fait des bounded contexts « un citoyen de première classe du harnais de l’IA » : une courte vision
du domaine, puis un fichier par bounded context avec son propre glossaire et les termes qui y sont
interdits, chargé uniquement quand l’agent travaille dans ce contexte. Son nouvel atelier,
[AI-powered Domain-Driven Design](https://www.avanscoperta.it/en/training/ai-powered-domain-driven-design/),
commence toujours par un Big Picture EventStorming entre humains.

D’autres arrivent à des conclusions proches par d’autres chemins :

- **Eric Evans** traite le modèle lui-même comme un contexte à cartographier :
  « [les LLM sont aussi des bounded contexts](https://www.domainlanguage.com/articles/context-mapping-an-ai-based-component/) »,
  et un composant d’IA a besoin d’une couche anticorruption comme n’importe quel système externe.
  Il distingue aussi la classification, qu’un LLM sait faire selon un schéma figé, de la
  modélisation, la création du schéma, qui demande toujours des personnes.
- **Vaughn Vernon** constate que des agents livrés à eux-mêmes produisent des modèles de domaine
  décevants : [l’agent « retombe rapidement et de lui-même dans le CRUD »](https://wso2.com/library/conference/2026/05/this-is-your-agent-on-domain-driven-design),
  même avec des consignes. Les modèles de domaine bien conçus sont rares dans le code dont les
  agents ont appris.
- **Mathias Verraes** a observé que
  [donner un modèle de domaine à l’agent avant de lui demander du code](https://verraes.net/2026/07/software-design-in-the-agentic-age/)
  donnait une meilleure structure de code et de meilleurs schémas de base de données.
- **Annegret Junker** a construit trois fois la même petite application avec un agent, à partir de
  descriptions du domaine de plus en plus précises. Sa conclusion :
  « [ils échouent parce qu’ils n’ont pas accès à votre domaine](https://www.codecentric.de/en/knowledge-hub/blog/from-stories-to-code-how-domain-storytelling-and-eventstorming-give-llms-the-context-they-need) ».

La recherche est encore mince, mais cohérente. Une
[étude de cas industrielle publiée en mars 2026](https://arxiv.org/abs/2603.26244) a testé un
cadre de prompts pour le DDD sur une vraie plateforme d’entreprise. Les premières étapes, un
glossaire, un EventStorming simulé et un découpage en bounded contexts, ont produit des artefacts
utiles, et les auteurs décrivent l’approche comme « un partenaire d’entraînement collaboratif »
plutôt qu’un moyen d’automatiser le travail. Tous les modèles ont proposé des bounded contexts plus
fins que ceux réellement utilisés par l’entreprise, et de petites erreurs se sont accumulées
jusqu’à rendre inutilisables les étapes suivantes, les agrégats et l’architecture technique.

Le fil conducteur : l’IA est une bonne assistante pour produire et vérifier des artefacts, et un
piètre substitut aux conversations qui créent un modèle partagé. Et quel que soit le modèle dont
vous disposez, l’agent n’en profite que s’il peut le lire.

## Ce que nous avions déjà

Sur la refonte, la structure était là dès le départ :

- **Un module par sous-domaine.** Le backend est un monolithe modulaire de plus de vingt modules,
  chacun aligné sur un sous-domaine métier, avec ses propres données et une interface de service.
- **De l’hexagonal dans chaque module.** Domaine, application et adaptateurs sont des paquets
  séparés. Des tests d’architecture cassent le build si le domaine dépend d’un adaptateur ou du
  framework.
- **Des noms vérifiés par le build.** Des linters contrôlent le nommage dans le contrat d’API et le
  backend. Les abréviations propres au domaine sont listées comme des noms de premier rang, qu’il
  ne faut pas « développer » en quelque chose de plus lisible mais de faux.
- **Des règles pour les agents.** Une convention impose aux agents d’utiliser le vocabulaire du
  domaine dans le code et dans les prompts, établit qu’un humain décide où va le code et consigne
  cette décision, et recommande de demander à l’agent les cas limites avant qu’il écrive le code.

Ce qui nous manquait, c’était la langue elle-même, sous une forme qu’un agent peut charger. Notre
guide DDD expliquait bien les bounded contexts et les glossaires, avec des exemples de manuel. Les
termes propres au projet vivaient dans la tête des gens, dans le code existant, dans les fichiers
de règles et dans des centaines de notes que les agents s’étaient écrites à eux-mêmes. La règle
« utiliser le vocabulaire du domaine » renvoyait à un vocabulaire qui n’était réuni nulle part.

## Une boucle en quatre étapes

Voici l’approche que je mets en place. Ce n’est pas un nouveau DDD ; c’est le DDD avec un passage
de relais explicite aux agents à chaque étape.

### 1. Découvrir avec des personnes

L’EventStorming et les autres ateliers de découverte restent humains. L’intérêt d’une session Big
Picture n’est pas le mur ; c’est le moment où deux personnes se rendent compte qu’elles ne mettent
pas la même chose derrière le même mot. Un agent ne peut pas vivre ce moment à votre place.

L’IA peut tout de même aider autour de l’atelier : préparer des questions avant de rencontrer les
experts métier ou, comme certains praticiens le proposent, jouer un expert métier junior qui a le
droit de se tromper, et dont les suggestions sont signalées comme telles. Elle produit des
questions, pas des réponses.

### 2. Distiller dans le dépôt

Après chaque atelier, l’équipe écrit ce qu’elle a appris, à la main, dans des fichiers que l’agent
peut lire :

- **Une vision du domaine** : à quoi sert le système, les sous-domaines, et les bounded contexts
  en une ligne chacun.
- **Un fichier par bounded context** : sa raison d’être, son glossaire (terme métier, terme dans le
  code, définition), les termes qui y sont interdits et pourquoi, ses règles et invariants, et les
  événements qu’il publie.
- **La context map** : qui dépend de qui, et les règles de traduction à chaque frontière.

Les fichiers vivent à côté du code, et l’agent ne charge que le contexte dans lequel il travaille.
Un glossaire court par contexte vaut mieux qu’un long fichier d’instructions : il coûte moins de
tokens, et il ne mélange pas deux sens du même mot.

Écrire ces fichiers, c’est le travail de cohérence sur lequel Brandolini insiste. Un agent peut
proposer un brouillon à partir du code ; une personne qui était dans l’atelier décide de ce qui
y entre.

### 3. Piloter par des exemples dans la langue du domaine

Les stories arrivent à l’agent déjà spécifiées, comme le décrivait
[l’article sur la software factory](/fr/blog/au-coeur-d-une-software-factory-agentique) : des
critères d’acceptation qui peuvent échouer, et des scénarios écrits dans le vocabulaire du bounded
context auquel ils appartiennent. Le test vient avant le code, et l’agent travaille dans un seul
contexte à la fois.

C’est là que spécification et modèle de domaine se rejoignent. Un scénario qui utilise les termes
du contexte est à la fois un test et une leçon de langue. Un scénario aux mots vagues apprend des
mots vagues à l’agent.

### 4. Détecter la dérive

La langue dérive : un nouveau synonyme apparaît dans une pull request, un concept franchit une
frontière, un terme interdit revient. C’est là que les agents sont vraiment bons, parce que
comparer des artefacts ne leur coûte presque rien et ennuie les humains.

- Un agent relit chaque changement au regard du glossaire et des frontières du contexte qu’il
  touche, et signale les nouveaux termes, les termes interdits et les imports d’un contexte à
  l’autre.
- Les tests d’architecture attrapent déjà les violations structurelles ; la vérification du
  glossaire attrape les violations sémantiques.
- Ce que l’agent trouve revient à l’équipe, comme matière pour la prochaine session de
  modélisation. Il ne réécrit pas le glossaire de lui-même.

## Ce qui reste humain

- **Décider des frontières.** Les agents ont tendance à découper les contextes trop finement et
  partagent volontiers des modèles entre eux. L’emplacement d’une frontière est une décision de
  conception, consignée par une personne.
- **Créer la langue.** Un agent peut lister des termes candidats ; l’équipe décide de ce que veut
  dire un mot, avec les personnes qui l’emploient.
- **Expliquer ce qui est fusionné.** Si personne dans l’équipe ne peut expliquer un changement
  sans le relire, le modèle a cessé de vivre dans l’équipe, quoi que disent les fichiers.

Brandolini le résume mieux que moi : « protéger l’apprentissage, construire une cohérence
explicite, profiter du code assisté par l’IA, dans un harnais conscient du domaine ». La boucle
ci-dessus est ma tentative de rendre cela concret sur un vrai projet. Je raconterai ce qui marche
et ce qui ne marche pas.

Si vous voulez amener le Domain-Driven Design dans une équipe qui travaille avec des agents de
code, les pages [Domain-Driven Design & EventStorming](/fr/services/domain-driven-design-eventstorming)
et [software factory agentique](/fr/services/agentic-software-factory) décrivent ma façon de
travailler. Ou [contactez-moi](/fr#contact).
