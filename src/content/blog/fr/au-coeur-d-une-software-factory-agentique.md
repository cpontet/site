---
title: 'Au cœur d’une software factory agentique'
description: 'Comment une petite équipe du secteur public a organisé agents de code, backlog et points de contrôle en une factory, et ce qui a mal tourné en chemin.'
date: '2026-10-29'
lang: fr
tags: [agentic-ai, software-factory, delivery, public-sector]
draft: false
featured: true
translationOf: en/agentic-software-factory
---

Les agents de code ont rendu le code bon marché. Pourtant, si la plupart des équipes
écrivent du logiciel plus vite, elles ne le livrent pas plus vite. Le code arrive en quelques
minutes, puis attend un affinage, une revue, une campagne de tests, une approbation. Le goulot d’étranglement s’est
déplacé de l’écriture du code vers tout ce qui l’entoure : décider quoi construire, et vérifier
que c’est bien construit.

Ces derniers mois, j’ai travaillé avec une petite équipe qui a pris ce constat au sérieux. Nous
réécrivons une grande plateforme web du secteur public. La nouvelle version doit faire tout ce
que fait l’ancienne (en mieux), et la remplace user story après user story, avec une échéance
fixe, pendant que l’ancien site reste en ligne. Nous avons organisé le travail comme une
software factory agentique. Cet article explique ce que cela veut dire, comment nous l’avons mise
en place et ce qui a cassé en chemin.

## Qu’est-ce qu’une software factory agentique ?

Voici comment je la définis, à partir de ce que nous avons construit :

> Une software factory agentique est un système de livraison dans lequel des agents de code
> font le travail de production répétable, tandis que les personnes portent l’intention, le
> jugement et l’acceptation. Elle prend en entrée du travail spécifié et produit en sortie du
> logiciel vérifié et traçable, grâce à des règles appliquées pendant que le travail se fait.
> Chaque défaut qu’elle laisse passer devient une nouvelle règle.

Chaque partie de cette phrase compte.

- **Un système de livraison, pas un outil.** Un assistant de code aide un développeur à écrire
  plus vite. Une factory couvre tout le chemin, d’une story sur le tableau jusqu’au logiciel
  accepté en production, et ce même chemin est suivi pour chaque changement.
- **Les agents produisent ; les personnes décident.** Le développeur cesse de taper l’essentiel
  du code et pilote le système qui le produit : il choisit le travail, relit le résultat et
  répond de ce qui est fusionné.
- **Du travail spécifié en entrée.** La factory ne prend pas des idées ou des souhaits. Elle
  prend des stories qui disent pour qui elles sont, ce qui est dans le périmètre et comment le
  succès sera vérifié.
- **Du logiciel vérifié et traçable en sortie.** Chaque changement peut être relié à l’exigence
  qui l’a demandé et aux tests qui le prouvent.
- **Des règles appliquées pendant le travail.** Pas des consignes qu’un relecteur pensera ou non
  à vérifier, mais des hooks, du code généré et des contrôles de CI que l’agent ne peut pas
  contourner.
- **Chaque défaut devient une règle.** C’est ce qui distingue une factory d’une collection de
  prompts : elle s’améliore à partir de ses propres erreurs.

La conséquence : écrire le code n’est plus la contrainte. Le vérifier, si. Quand la génération
ne coûte presque rien, une équipe livre aussi vite qu’elle peut vérifier, et l’essentiel de
l’effort de conception porte sur les points de contrôle. Mais on ne vérifie que par rapport à
quelque chose, et ce quelque chose, c’est l’exigence.

## Le travail se déplace vers l’amont, vers l’intention

Quand presque tout peut être construit en un après-midi, les questions difficiles ne portent
plus sur la manière de construire. Elles portent sur quoi construire, pour qui, et avec quel
niveau de qualité. Un agent construit exactement ce qui est écrit. Là où l’exigence se tait, il
ne s’arrête pas pour demander : il comble le vide avec un choix plausible, tiré de tout ce qu’il
a vu, qui correspond rarement aux besoins de vos utilisateurs. Une factory amplifie la qualité
de ce qu’on lui donne. Une story faible produit désormais un logiciel faible, simplement plus
vite.

L’effort remonte donc vers l’amont. Sur ce projet, l’affinage est l’endroit où les personnes
passent le temps que le code ne prend plus, et une story n’est pas prête tant qu’elle ne dit pas,
par écrit :

- **Qui et pourquoi.** Un type d’utilisateur nommé, choisi dans une liste fermée, ce qu’il veut
  et le bénéfice attendu.
- **Les limites.** Une courte description du contexte métier, de ce qui est dans le périmètre
  et, tout aussi important, de ce qui en est explicitement exclu.
- **Des critères d’acceptation qui peuvent échouer.** Chacun précis, mesurable et testable,
  couvrant le cas nominal, les cas d’erreur (saisie invalide, données manquantes, service
  indisponible) et les cas limites (aucun résultat, valeurs maximales, caractères spéciaux).
- **Le niveau de qualité attendu.** Les exigences non fonctionnelles font partie de la story, ce
  ne sont pas des ajouts tardifs : un temps de réponse, un niveau d’accessibilité, les tailles
  d’écran à prendre en charge. Si personne ne les énonce, l’agent ne les inventera pas.
- **Des exemples.** Des scénarios en Gherkin, au moins un par critère plus un cas négatif,
  déclaratifs plutôt que liés à l’interface, avec des données d’exemple concrètes.
- **Ce qu’elle remplace.** Pour une réécriture, une référence au comportement existant que la
  story doit reproduire, ou une mention explicite qu’il s’agit d’une nouveauté.

Les agents aident ici aussi, mais comme critiques plutôt que comme auteurs. La commande
d’affinage confronte la story aux documents fonctionnels de l’ancien système, cherche les
doublons et les contradictions dans tout le backlog, et évalue la qualité des scénarios. La
commande de développement refait une partie de ces vérifications avant de démarrer : est-ce déjà
construit, cela contredit-il une autre story, s’agit-il de parité avec l’existant ou d’un
nouveau périmètre, et dans ce cas, peut-on le rattacher à une maquette validée ? Le moindre
signal d’alerte arrête la construction et renvoie la décision à une personne.

Une fois rédigé, un scénario est un engagement. Il est soit construit, soit retiré avec une
justification écrite, sinon la CI bloque la fusion. Cela a fermé une vraie faille : une story
pouvait être affinée avec huit scénarios, livrée avec trois, et clôturée au vert.

Les rôles qui comptent le plus changent en conséquence. Le product owner et l’analyste métier ne
sont plus en amont du vrai travail : ce qu’ils écrivent est la véritable matière première de la
factory. Et les compétences qui font une bonne exigence (demander pourquoi, trouver le cas
limite, s’accorder sur un exemple) sont celles qui font un bon facilitateur.

## La factory en une page

Notre version repose sur trois idées.

- **Les personnes portent l’intention, le jugement et l’acceptation.** Un product owner affine
  et accepte, un développeur pilote les agents et répond de ce qui est fusionné, un relecteur
  relit, des testeurs métier valident.
- **Les agents font le travail de production répétable.** Écrire les tests, implémenter,
  relire, analyser l’ancien code, mettre à jour le tableau.
- **Les règles s’appliquent pendant que l’agent travaille, pas lors de la revue.** Hooks, code
  généré et contrôles de CI détectent les problèmes avant qu’une personne ait à le faire.

L’outillage est Claude Code, configuré dans le dépôt lui-même : fichiers de règles,
16 sous-agents spécialisés, 27 commandes, 27 skills et 12 hooks, tous versionnés pour que
chaque développeur dispose de la même factory.

## Une seule source de vérité, traçable de bout en bout

Le backlog vit dans GitLab et nulle part ailleurs. Epics, stories, critères d’acceptation,
scénarios Gherkin, statuts et affectations s’y trouvent tous. Les agents le lisent et le
mettent à jour via l’API, avec des commandes que nous avons écrites : il n’existe aucun suivi
parallèle susceptible de diverger.

Chaque story a un identifiant stable, et chaque scénario de test un identifiant permanent qui en
dérive. Un numéro de scénario n’est jamais réutilisé : supprimer un scénario retire son numéro.
On obtient ainsi une chaîne de l’exigence au code que la CI peut vérifier :

```text
Story  US-AREA-NNN
  └─ Critères d’acceptation
       └─ Scénario Gherkin  @US-AREA-NNN-01
            └─ Test + code + merge request
```

Un graphe de connaissances couvrant le backlog, le code, l’ancien code et la documentation permet
à un agent de demander quelles stories touchent un morceau de code, ou comment l’ancien système
faisait quelque chose, avant de modifier quoi que ce soit.

<figure>
  <img src="/blog/software-factory/docs-graph.webp" width="1200" height="1156" loading="lazy" decoding="async" class="w-full h-auto rounded-2xl" alt="Un graphe en réseau sur fond sombre : des centaines de points colorés, chacun un document ou un concept, reliés par des traits fins. La plupart forment un amas central dense autour de quelques grands nœuds ; de plus petits groupes de documents liés l’entourent, et quelques points isolés restent à l’écart." />
  <figcaption>Le graphe de connaissances de la documentation du projet. Chaque point est un document ou un concept, chaque couleur un groupe d’éléments étroitement liés.</figcaption>
</figure>

## Les commandes déplacent les cartes

Le tableau compte douze colonnes, chacune avec un responsable clair ou signalée comme une file
d’attente. Personne ne déplace les cartes à la main : ce sont les commandes qui le font, comme
effet de bord du travail lui-même. Le tableau est fiable parce qu’il est mis à jour par les
mêmes étapes que celles qui produisent le changement.

| Changement de colonne              | Commande          | Ce qu’elle fait                                                               |
| ---------------------------------- | ----------------- | ----------------------------------------------------------------------------- |
| À faire → Prête pour le dev        | `/refine-us`      | Confronte la story aux documents existants, aux doublons, vérifie les scénarios |
| Prête pour le dev → En cours       | `/feature-dev`    | Vérification de la story, branche, exploration, conception, puis tests d’abord |
| Avant la merge request             | `/self-review`    | Relecteurs locaux en parallèle : code, sécurité, tests, types, conception      |
| En cours → Prête pour la revue     | `/commit-push-mr` | Commit conventionnel, push, merge request depuis un modèle, mise à jour du statut |
| Sur la merge request               | `/review-mr`      | Revue sous plusieurs angles, constats notés, un seul fil à résoudre            |
| Acceptée → Terminée                | `/close-story`    | Clôt la story après l’acceptation métier                                       |

Affinage et développement ne se chevauchent jamais. La commande d’affinage ne touche ni au code
ni à git ; la commande de développement refuse une story qui n’a pas atteint la Definition of
Ready, et ne la réécrit jamais.

## Des rôles étroits, des responsabilités séparées

Chaque sous-agent a une seule mission et uniquement les outils nécessaires. La règle la plus
importante : **l’agent qui écrit le test en échec n’est pas celui qui le fait passer.** Un agent
ingénieur de test écrit les tests à partir du Gherkin et ne peut pas toucher au code de
production. L’agent ingénieur backend ou frontend les fait passer et n’a pas le droit
d’affaiblir un test. Avant toute conception, l’ingénieur de test liste les cas limites, et
chacun devient un test ou une décision consignée.

C’est la séparation des responsabilités, appliquée aux agents. Un modèle qui vérifie son propre
travail a tendance à le confirmer ; le signal qui décide si le travail tient doit venir
d’ailleurs.

L’API suit la même logique. Une seule spécification OpenAPI génère à la fois les contrôleurs
backend et les types frontend. La boucle est toujours la même : modifier le contrat, régénérer,
implémenter. Un code qui s’écarte du contrat fait échouer le build, si bien qu’un agent ne peut
pas inventer discrètement un endpoint.

Chaque story est construite dans son propre worktree git, pour que des agents travaillant en
parallèle ne se marchent pas dessus.

## Des garde-fous à trois moments

| Quand                        | Ce qui vérifie le travail                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Pendant que l’agent travaille | Hooks pour les tests d’abord, le lint et la sécurité des worktrees ; secrets illisibles pour l’agent ; permissions d’outils restreintes par agent |
| Avant la fusion              | Auto-revue locale, puis revue sous plusieurs angles avec un passage sécurité obligatoire ; seuls les constats à forte confiance sont publiés |
| En CI                        | Écarts au contrat d’API, cohérence de la documentation, identifiants et couverture des scénarios, analyse statique, analyse des dépendances |

Certaines choses restent humaines par conception : l’affinage, la revue de code, l’acceptation
et les décisions d’architecture, consignées sous forme d’ADR. Un agent peut rédiger une ADR ;
une personne porte le choix.

Les conventions de l’équipe reprennent une formule de l’article de Codurance
[Software craftsmanship in the AI era](https://www.codurance.com/publications/software-craftsmanship-in-the-ai-era) :
« l’IA est le moteur, le craftsmanship est la boussole ». Elles la traduisent en sept règles. La
plupart sont appliquées par des contrôles automatiques. La dernière ne l’est pas, et c’est elle
qui tient toutes les autres : **vous devez pouvoir expliquer ce que vous fusionnez.** Si vous ne
pouvez pas dire ce que fait le code, pourquoi il se trouve dans cette couche et ce qui se passe à
ses limites, vous n’en êtes pas encore l’auteur.

La raison, c’est ce que les conventions appellent la boucle d’entropie. Un agent génère un gros
changement dans un code aux frontières floues ; le relecteur ne peut pas vraiment évaluer
quarante fichiers et approuve quand même ; plus personne n’a en tête le modèle de ce qui a été
fusionné ; le prompt suivant lit ce code comme contexte et en reproduit la forme. Le mauvais code
produit du mauvais code, et un agent le fait à la vitesse de la machine.

## Garder l’état du travail sous les yeux

L’équipe a aussi écrit onze petites extensions pour Claude Code qui affichent l’état du travail
dans la session : une carte montrant la story en cours et sa progression pendant une
construction, un radar des merge requests ouvertes et des pipelines, un contrôle préalable qui
prédit quels contrôles de CI un changement ferait échouer et lance localement les moins coûteux,
la quality gate de l’analyse statique dans la barre d’état, le stand-up sous forme de carte, et
des tableaux de bord de consommation de tokens et de coûts. Chacune lit un système réel. L’idée
est de voir un problème avant la revue, pas après.

## Où tournent les modèles

Pour un client du secteur public, c’est la première question. Les modèles passent par un service
d’IA managé dans une région de l’UE, au sein d’un compte cloud fourni par l’institution, avec une
répartition des coûts par projet. Le code et les données accessibles à l’agent sont bornés par le
dépôt et par ce que les hooks et les permissions autorisent ; les secrets sont hors de portée.

## Ce qui a mal tourné, et ce que nous avons changé

La partie la plus utile du dispositif est la liste des échecs qui l’ont façonné.

- **Des agents ont modifié la mauvaise branche ou le mauvais worktree.** Désormais, chaque story
  a son propre worktree isolé, avec des chemins absolus fixés.
- **Les tests passaient, le comportement était faux.** Désormais, une correction n’est terminée
  qu’après redémarrage de la vraie application et vérification en conditions réelles. Des tests
  au vert ne sont pas une preuve.
- **Un agent a inventé une logique de recherche.** Il a écrit une clause de requête d’apparence
  plausible qu’aucun code existant n’avait jamais utilisée, et fait passer les résultats d’une
  requête courante de 1 824 à 2. Désormais, des tests de parité tournent contre le service de
  recherche réel et l’ancien site, et les agents doivent employer le vocabulaire propre au
  domaine.
- **Des agents en parallèle et des hooks se sont marché dessus.** Désormais, nous ne commitons
  qu’entre deux vagues d’agents.
- **La documentation devenait obsolète.** Désormais, un contrôle de CI échoue sur tout lien ou
  chemin de fichier qui ne mène nulle part.
- **L’effort de revue s’est déplacé vers les personnes.** Quelqu’un doit lire ce qui est
  fusionné. C’est le principal coût de l’approche, et nous l’acceptons.

Chaque échec est devenu une règle, un hook ou un contrôle. C’est ce qui en fait une factory
plutôt qu’une collection de prompts : elle apprend de ses propres défauts.

## Correspondance avec l’AI-native SDLC

Le cours d’Anthropic
[AI-native SDLC playbook](https://academy.claude.com/courses/ai-native-sdlc-playbook) décrit six
étapes d’un cycle de vie assisté par des agents. Notre dispositif s’y rattache ainsi.

| Étape        | Ce que nous faisons                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| Planifier    | Stories affinées jusqu’à la Definition of Ready ; intention exprimée en critères d’acceptation et en Gherkin |
| Concevoir    | API pilotée par le contrat ; décisions consignées en ADR                                               |
| Construire   | Règles dans des fichiers `CLAUDE.md` ; skills ; sous-agents dans des worktrees isolés ; tests avant le code |
| Tester       | Des milliers de scénarios aux identifiants permanents ; plusieurs niveaux de tests en CI ; boucles de retour pour l’agent |
| Déployer     | Revue automatisée sous plusieurs angles ; hooks comme points d’approbation ; skills de release          |
| Maintenir    | Préparation du quotidien et des revues ; rapports de tests, de qualité et de consommation              |

En chiffres, d’avril à octobre 2026 : plus de 2 000 éléments de travail créés, plus de 1 000 merge
requests et plus de 34 000 tests automatisés.

## Par où commencer

Inutile d’avoir seize agents dès le premier jour. Le cours propose six pratiques sans
prérequis, et ce sont celles par lesquelles je commencerais :

1. **Capturer l’intention.** Écrire le besoin, les limites et la qualité attendue avant de
   générer quoi que ce soit. C’est là qu’il faut investir en premier.
2. **Le mode plan.** S’accorder sur le plan avant toute ligne de code.
3. **Un fichier de règles.** `CLAUDE.md` : les règles du projet que l’agent voit toujours.
4. **Des skills.** Empaqueter le savoir-faire que l’on répète.
5. **Des boucles de retour.** Donner à l’agent des tests qu’il peut lancer lui-même.
6. **Des hooks.** Des points de contrôle automatiques pour les règles qui doivent toujours tenir.

Ensuite, choisissez une équipe, un domaine fonctionnel et une colonne du tableau pendant trente
jours, et mesurez le temps de cycle et les reprises. Ajoutez un contrôle chaque fois que quelque
chose tourne mal.

Si vous voulez mettre en place quelque chose de comparable, avec les garde-fous qu’exige votre
contexte, [contactez-moi](/fr#contact).
