---
title: 'L’excellence technique sans mandat'
description: 'On ne peut pas ordonner à une équipe d’écrire du meilleur code. Ce que j’ai appris en améliorant les pratiques d’ingénierie comme coach, consultant et CTO sans autorité sur les équipes : partir de la douleur, pratiquer plutôt que prêcher, et laisser les standards venir des équipes.'
date: '2026-12-10'
lang: fr
tags: [technical-excellence, cto, craftsmanship, agile-coaching]
draft: true
translationOf: en/technical-excellence-without-a-mandate
---

L’excellence technique est souvent annoncée d’en haut : un nouveau standard, une politique de revue
de code, un objectif de couverture de tests. Cela dure rarement. Les équipes se conforment là où
elles sont contrôlées, et le code en dessous change peu.

Pendant l’essentiel de ma carrière, j’ai travaillé sur les pratiques d’ingénierie sans avoir
l’autorité de les imposer : comme coach au sein de l’équipe d’un client, comme architecte appelé
sur un projet, et comme CTO d’une société de conseil. Je ne pouvais ordonner à personne d’écrire
des tests. Ce que je pouvais faire, c’était aider les équipes à en avoir envie, et le leur rendre
plus facile. Cet article décrit à quoi cela ressemble en pratique.

## Partir de là où ça fait mal

En 2014, j’ai accompagné une équipe de POST Luxembourg qui développait depuis plus de sept ans une
application de documentation du réseau téléphonique fixe. L’équipe venait de passer à Scrum, et
n’avait pas de vrai contrôle de source. Travailler sur plusieurs user stories en parallèle était
pénible, et elle le savait.

J’étais là comme coach Scrum, pour aider à adopter des pratiques d’ingénierie agiles comme le TDD
et le BDD. Mais une partie du travail n’avait rien à voir avec le TDD : nous avons migré le code
vers la plateforme centrale de contrôle de source, découplé le code suffisamment pour travailler
sur plusieurs stories en parallèle, et mis en place un build continu. Sans cela, les pratiques que
je venais accompagner n’avaient rien sur quoi s’appuyer.

La leçon que j’en ai tirée, et que de nombreuses équipes ont confirmée depuis : une pratique est
adoptée quand elle résout un problème que l’équipe ressent déjà. Commencez par ce problème, même si
ce n’est pas celui pour lequel vous êtes venu. Une fois que l’équipe sait que vous êtes là pour
lui faciliter le travail, la conversation suivante est beaucoup plus courte.

## Pratiquer plutôt que prêcher

Personne n’apprend le développement piloté par les tests sur une slide. On l’apprend en le faisant,
sur un problème assez petit pour essayer plusieurs approches en une heure, avec quelqu’un à côté de
soi. C’est à cela que servent les code katas : des exercices courts et répétables, en binôme ou en
groupe, où ce qui compte est le chemin, pas la solution.

Quand j’ai préparé un programme d’excellence technique pour une banque privée luxembourgeoise en
2023, les modules couvraient le clean code, les tests agiles (TDD, BDD et spécification par
l’exemple), la programmation en binôme, le refactoring, la dette technique, l’architecture
évolutive et le DevSecOps. Chaque module s’accompagnait de code katas, et trouver le bon kata pour
chaque module a représenté une grande partie de la préparation : un bon kata rend la pratique
évidente, un mauvais la fait passer pour un rituel.

Deux choses font la différence entre une formation et une habitude :

- **Passer ensuite au code de l’équipe.** Après le kata, appliquez la pratique à une vraie partie
  du code, idéalement une que l’équipe trouve pénible. Le kata enseigne le geste ; le vrai code
  montre qu’il fonctionne ici.
- **Travailler en binôme, puis tourner.** La programmation en binôme diffuse une pratique plus vite
  que n’importe quelle formation. Faire tourner les binômes la diffuse dans toute l’équipe.

## Faire grandir une communauté, pas un programme

Dans une grande organisation, les personnes qui se soucient des pratiques d’ingénierie sont
généralement réparties entre plusieurs équipes. Une communauté de pratique, ou guilde, leur donne
un lieu où se retrouver : un créneau régulier, ouvert à tous, où les développeurs partagent ce
qu’ils ont essayé, font un kata ensemble ou relisent une conception.

J’ai aidé à faire grandir de telles communautés à la BIL et chez Foyer, en parallèle d’un
accompagnement sur le Domain-Driven Design, CQRS et l’event sourcing. À la BIL, l’objectif affiché
était de rendre les équipes et leurs communautés autonomes sur leurs pratiques de développement et
leur apprentissage : autrement dit, de ne plus avoir besoin de coach.

Ce que j’ai vu aider :

- **Un créneau fixe et protégé.** Même jour, même heure, toutes les deux semaines ou tous les mois.
  Une communauté que l’on déplace au gré des livraisons meurt en silence.
- **Des sujets tirés du vrai travail.** Une décision de conception sur laquelle quelqu’un bloque, un
  refactoring qui s’est bien passé, un incident. Les sujets abstraits attirent moins de monde à
  chaque fois.
- **Une animation qui tourne.** Si un seul passionné anime toutes les sessions, la communauté dure
  aussi longtemps que lui.
- **Un soutien visible du management, sans appropriation.** Les managers peuvent protéger le temps
  et participer. Ils ne devraient pas fixer l’ordre du jour.

## Laisser les standards venir des équipes

Les standards sont utiles. Des conventions de code partagées, une définition de « terminé », des
architecture decision records, une chaîne d’intégration avec les mêmes contrôles pour tous : cela
fait gagner du temps et évite des discussions. Mais un standard écrit par quelqu’un d’extérieur à
l’équipe est une règle à contourner. Un standard écrit par l’équipe est une promesse que ses
membres se sont faite.

Mon rôle sur les standards consiste donc surtout à poser les questions et à tenir le stylo. Sur quoi
se dispute-t-on sans cesse en revue de code ? Qu’est-ce qui a cassé en production le trimestre
dernier, et qu’est-ce qui l’aurait détecté ? Les réponses deviennent le standard. Ensuite, on
automatise tout ce qui peut l’être, comme le formatage, le linting, les tests et les contrôles de
sécurité dans la chaîne d’intégration, pour que les revues puissent se concentrer sur la
conception.

## Quand on a le titre

De 2019 à 2026, comme CTO, j’avais le titre. Favoriser l’excellence technique voulait pourtant
toujours dire la même chose : organiser des formations et des ateliers, mettre à disposition les
bons outils et les bonnes plateformes, et soutenir chaque projet sur la qualité. L’approche n’a pas
changé. Elle a seulement touché plus d’équipes.

Je crois que c’est la vraie leçon. Même avec l’autorité, l’excellence ne se décrète pas. Elle grandit
quand une équipe voit une pratique résoudre son propre problème, a le temps de la pratiquer, et
s’approprie le standard qui en découle.

Si vous voulez élever le niveau d’ingénierie de vos équipes sans programme imposé d’en haut, la page
[CTO et conseil stratégique](/fr/services/cto-strategic-advisory) décrit ma façon de travailler. Ou
[contactez-moi](/fr#contact).
