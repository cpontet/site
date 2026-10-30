---
title: 'Kanban pour les équipes IT Ops qui passent au cloud'
description: 'Une migration vers le cloud ne met pas l’exploitation en pause. Pourquoi j’utilise Kanban plutôt que Scrum avec les équipes d’exploitation, et comment des tableaux d’équipe et un tableau de portefeuille peuvent porter à la fois les incidents, les changements et les livraisons de packages.'
date: '2026-10-08'
lang: fr
tags: [kanban, agile-coaching, change-management, cloud, azure]
draft: false
translationOf: en/kanban-for-it-ops-moving-to-the-cloud
---

Quand une organisation passe au cloud, l’attention va surtout à l’architecture cible et au plan
de migration. L’équipe d’exploitation en reçoit moins, alors que c’est son travail qui change le
plus. Elle doit continuer à faire tourner les systèmes existants et apprendre une nouvelle
plateforme en même temps, souvent avec les mêmes personnes.

De 2019 à 2023, j’ai travaillé avec Cargolux, qui a décidé de migrer toutes ses charges IT vers
Azure. J’y intervenais comme architecte cloud et coach agile. Une partie de la mission consistait
à former et accompagner les équipes IT Ops, et l’approche que nous avons utilisée avec elles
était Kanban, pas Scrum. Cet article explique pourquoi, et à quoi ressemblait la mise en place.

## Le travail d’exploitation ne tient pas dans un sprint

Scrum fonctionne bien pour une équipe qui peut planifier deux semaines de travail et protéger ce
plan. Une équipe d’exploitation ne le peut pas. Son travail arrive sous plusieurs formes à la
fois :

- **Les incidents**, qui ne peuvent pas attendre le sprint suivant.
- **Les demandes** des utilisateurs et des autres équipes, chacune avec son délai attendu.
- **Les changements** : correctifs, montées de version, configuration, nouvelles intégrations.
- **Les livraisons de packages**, souvent liées à une date ou à une fenêtre de changement.
- **Le travail de migration**, le projet qui doit tout déplacer vers le cloud.

Mettez tout cela dans un sprint, et le premier incident sérieux casse l’engagement. Après
quelques sprints de ce type, l’équipe ne croit plus au plan, et la revue de sprint devient la
liste des raisons pour lesquelles le travail prévu n’a pas été fait.

Kanban part d’ailleurs. Pas de timebox, pas d’engagement sur un lot de travail. L’équipe rend
son travail visible, se met d’accord sur des règles pour la façon dont il entre et avance, et
améliore ces règles avec le temps. Kanban part aussi de ce que l’équipe fait aujourd’hui, ce
qui compte pour une équipe à qui l’on demande déjà de changer d’outils, de plateforme et une
partie de son métier.

## Un tableau par équipe, et un pour le portefeuille

Le travail était réparti entre plusieurs équipes de mise en œuvre, comme Flight Ops,
Maintenance & Engineering ou Operations. Chaque équipe avait son propre tableau dans Azure DevOps, qui
montrait tout son travail : l’exploitation et le changement ensemble. C’est le point le plus
important. Quand le travail de migration vit dans un plan projet et les incidents dans l’outil
de tickets, personne ne voit que les mêmes personnes doivent faire les deux. Sur un seul
tableau, l’arbitrage devient visible, et il peut être discuté avec la direction au lieu d’être
absorbé en silence par l’équipe.

Au-dessus des tableaux d’équipe, un tableau de portefeuille suivait le travail de chaque équipe
à un niveau plus global. La direction voyait où en était chaque équipe sur ses changements sans
lire chaque carte, et les équipes gardaient leur propre tableau pour le détail du quotidien.

Une grande partie du travail a consisté à relier entre eux des éléments de backlog de tableaux
différents. Une migration reste rarement à l’intérieur d’une seule équipe : une application ne
bouge que lorsque le réseau, une intégration ou le changement d’une autre équipe est prêt. Relier
ces éléments rendait les dépendances visibles, pour pouvoir les suivre et repérer un élément
bloqué avant qu’il ne retienne le suivant.

Les incidents et les demandes continuaient d’arriver par ServiceNow, qui restait l’outil des
utilisateurs et des niveaux de service. Nous avons intégré le processus aux tickets ServiceNow
pour que l’équipe n’ait pas à regarder à deux endroits pour savoir ce qu’elle avait à faire. Le
tableau ne remplaçait pas l’outil de tickets. Il montrait le travail de l’équipe comme un flux,
ce qu’une file de tickets ne fait pas.

## Les classes de service : rendre les priorités explicites

Quand l’exploitation et le changement partagent un tableau, la question suivante est de savoir ce qui passe en premier.
Sans règles explicites, la réponse est « ce qui fait le plus de bruit », et le travail de
migration perd toujours.

Kanban y répond avec les classes de service. Chaque type de travail a sa propre règle :

- **Urgent** pour les incidents qui touchent l’activité : il passe en tête, et quelqu’un arrête
  ce qu’il fait pour le prendre.
- **Date fixe** pour le travail lié à une échéance, comme une livraison de package dans une
  fenêtre de changement : il doit démarrer assez tôt pour finir à temps.
- **Standard** pour la plupart des changements et des demandes : premier arrivé, premier servi.
- **Intangible** pour le travail sans échéance visible mais avec un vrai coût du retard :
  automatisation, documentation, formation. C’est le premier à disparaître quand personne ne le
  protège.

La valeur tient moins aux noms qu’à l’accord. L’équipe et ses responsables décident ensemble de
ce qui compte comme urgent, et cette décision est écrite à côté du tableau. Quand un responsable
demande pourquoi un changement est en retard, la réponse est sur le tableau : trois incidents
urgents sont passés cette semaine-là.

## Des backlogs pour le changement, des tâches pour les livraisons

Les changements étaient trop gros pour tenir sur le tableau en une seule carte. Chaque
changement, comme la migration d’une application ou l’ajout d’une intégration, avait son propre
backlog de mise en œuvre. Les éléments de ces backlogs entraient sur le tableau de l’équipe
quand l’équipe avait de la capacité, pas quand le responsable du backlog le souhaitait. Le
tableau restait lisible, et le changement ne noyait pas le flux.

Les livraisons de packages suivaient la même logique avec plus de structure : des tâches de
livraison sur le tableau, un suivi jusqu’à ce que la livraison soit terminée, et un plan de test
pour chaque livraison. Le plan de test compte pour une équipe d’exploitation. Il transforme
« on l’a installé, ça a l’air de marcher » en une liste de vérifications que quelqu’un d’autre
peut rejouer à la livraison suivante.

## La formation en parallèle du tableau

Passer au cloud change aussi la nature du travail. Une demande de serveur devient quelques
lignes d’infrastructure as code, revues et déployées par un pipeline. Une configuration manuelle
devient une politique. Les équipes d’exploitation avaient besoin d’être formées à Azure et à
l’infrastructure as code, et cette formation faisait partie de la mission, en parallèle du
coaching Kanban.

Nous maintenions aussi les politiques Azure sous forme de code, et gardions les artefacts du
projet dans git à côté. Pour beaucoup de personnes de l’exploitation, git était un nouvel outil,
et elles ont été formées à l’utiliser dans leur travail quotidien. Un changement de politique
suivait alors le même chemin que n’importe quel autre changement : un commit, une revue, un
déploiement, avec un historique que chacun pouvait lire.

Les deux se renforcent. Kanban rend l’apprentissage visible comme du travail, au lieu d’une
chose qu’on attend des gens le soir. Et l’infrastructure as code produit des éléments de travail
qui trouvent naturellement leur place sur un tableau : un changement, une revue, un déploiement,
chacun une étape du flux.

## Quand Scrum garde du sens

Ce n’est pas un réquisitoire contre Scrum. Une équipe dédiée à la migration, avec un périmètre
planifié et protégée des incidents, peut très bien travailler en sprints. La difficulté, c’est
l’équipe qui fait les deux. Pour celle-là, je préfère rendre les interruptions visibles et les
gérer plutôt que faire comme si elles n’allaient pas arriver.

## Les signaux à surveiller

Quelques signes qu’un Kanban pour l’exploitation ne fonctionne pas :

- le tableau est une copie de la file de tickets, sans colonnes qui reflètent la façon dont le
  travail avance réellement ;
- presque tout est classé urgent, si bien que la classe ne veut plus rien dire ;
- le travail de migration et d’amélioration n’avance jamais, et personne ne le signale ;
- le tableau est mis à jour avant la réunion hebdomadaire plutôt que pendant le travail.

Et quelques signes qu’il fonctionne : l’équipe sait dire sur quoi elle travaille et sur quoi
elle ne travaille pas, l’arbitrage entre exploitation et changement est discuté avec la
direction, et le travail d’amélioration continue d’avancer même pendant une semaine chargée.

## Par où commencer

Si votre équipe d’exploitation s’apprête à prendre en charge une migration vers le cloud, ou si
elle y est déjà, la page [Coaching agile & transformation](/fr/services/agile-coaching) décrit
ma façon de travailler avec les équipes, et [Architecture cloud](/fr/services/cloud-architecture)
couvre le côté plateforme. Ou [contactez-moi](/fr#contact) et racontez-moi comment le travail
arrive aujourd’hui dans votre équipe.
