---
title: 'Le story mapping d’un backlog en une journée'
description: 'Un backlog à plat cache le parcours utilisateur et transforme chaque version en négociation. Comment j’anime un atelier de story mapping d’une journée, et ce qu’il a apporté quand Restena a refondu My.lu, l’application de gestion des noms de domaine .lu.'
date: '2026-11-26'
lang: fr
tags: [story-mapping, facilitation, product-discovery, agile]
draft: true
translationOf: en/story-mapping-a-backlog-in-a-day
---

La plupart des backlogs dont j’hérite sont des listes. Des centaines d’éléments, triés par
priorité, chacun raisonnable pris isolément. Ce que la liste ne montre pas, c’est la raison d’être
du produit : le parcours de quelqu’un qui cherche à accomplir quelque chose. On ne voit pas quelles
étapes manquent, lesquelles ne comptent que plus tard, ni ce que serait la plus petite version
utile. Chaque réunion de planification devient alors une négociation, élément par élément.

Une story map remet le parcours au centre. J’ai animé des ateliers de story mapping de nombreuses
fois, pour des startups, des entreprises industrielles et des organismes publics. Cet article décrit
le format que j’utilise pour construire une première carte en une journée, et ce qu’il a apporté
sur un projet : la refonte de My.lu chez Restena.

## Ce qu’est une story map

Jeff Patton a décrit la technique dans
[User Story Mapping](https://jpattonassociates.com/story-mapping/) (O’Reilly, 2014). La carte se
lit dans deux directions :

- **De gauche à droite, le parcours.** Les grandes activités par lesquelles passe un utilisateur,
  dans l’ordre, et sous chacune les étapes qui la composent. Cette ligne est la colonne vertébrale :
  lue à voix haute, elle doit sonner comme une histoire.
- **De haut en bas, le détail et la priorité.** Sous chaque étape, les stories qui la réalisent,
  les plus essentielles en haut.

On trace ensuite des lignes horizontales à travers la carte. Tout ce qui se trouve au-dessus de la
première ligne constitue la première version : une tranche fine qui traverse tout le parcours, et
non une version complète de la première activité. Ce seul changement, passer de « terminer la
première fonctionnalité » à « couvrir finement tout le parcours », fait l’essentiel de la valeur.

## Avant la journée

Une journée suffit seulement si la préparation est faite.

- **Les bonnes personnes.** Quelqu’un qui décide pour le produit, des personnes qui connaissent les
  utilisateurs, celles qui vont le construire. Entre cinq et dix, c’est une bonne taille. Sans le
  décideur, la carte devient une liste de souhaits ; sans ceux qui construisent, les tranches ne
  sont pas réalistes.
- **Un objectif pour la journée.** Par exemple : « une carte du parcours de l’utilisateur principal,
  et une première version que nous serions prêts à livrer ». Écrivez-le au mur.
- **Ce que l’on sait déjà.** Recherche utilisateur, tickets de support, backlog actuel, données
  d’usage. L’atelier trie et complète la connaissance ; il ne la remplace pas.
- **Un mur, ou un tableau.** En salle, un long mur et des post-it fonctionnent le mieux. À distance,
  un tableau blanc en ligne avec une grille préparée.

## La journée

Voici le déroulé que j’utilise. Les durées varient ; l’ordre, non.

1. **Cadrer (30 minutes).** L’objectif, les utilisateurs pour lesquels on construit la carte, et
   les règles : une idée par post-it, des verbes pour les étapes, pas encore de débat sur les
   solutions.
2. **Raconter l’histoire (1 heure).** Chacun écrit en silence les étapes par lesquelles passe un
   utilisateur, du premier contact jusqu’au moment où son besoin est satisfait. On fusionne ensuite
   les post-it en une seule ligne, de gauche à droite. Les doublons disparaissent, les trous
   apparaissent.
3. **Trouver la colonne vertébrale (45 minutes).** On regroupe les étapes sous quelques activités et
   on les nomme. C’est souvent là qu’apparaît le premier vrai désaccord, et il est utile : chacun
   découvre qu’il n’avait pas le même produit en tête.
4. **Détailler (1 h 30).** Sous chaque étape, les stories : ce que le produit doit faire pour que
   l’étape fonctionne. C’est là qu’entre le backlog existant : chaque élément trouve sa place sous
   une étape, ou disparaît s’il n’en a pas.
5. **Parcourir la carte (30 minutes).** Quelqu’un lit le parcours à voix haute, étape par étape,
   comme un utilisateur le vivrait. Les étapes manquantes sautent aux yeux. Celles qui n’existent
   qu’à cause du fonctionnement du système actuel aussi.
6. **Découper (1 h 30).** On trace la première ligne : le minimum qui permet à un utilisateur de
   traverser tout le parcours, même mal. Puis la suivante. Chaque tranche reçoit un nom et un
   résultat attendu, pas seulement une date.
7. **Conclure (30 minutes).** Ce que l’on a appris, ce qu’il reste à découvrir, et qui fait quoi
   ensuite.

En fin de journée, l’équipe a une carte au mur, une première version sur laquelle elle s’accorde,
et une liste de questions ouvertes. Le backlog n’est plus une liste ; c’est la carte, lue de haut
en bas.

## Restena et My.lu

[Restena](https://www.restena.lu) est la fondation qui gère le registre .lu et fournit des services
réseau à la recherche et à l’éducation au Luxembourg. My.lu est son application de gestion des noms
de domaine .lu. Après la refonte de son site, Restena voulait refondre My.lu : la rendre plus
intuitive pour ses utilisateurs, moderniser son visuel et son ergonomie, et mieux l’intégrer dans
l’univers des bureaux d’enregistrement.

Entre septembre 2022 et février 2023, l’équipe dont je faisais partie a pris en charge la recherche
UX, le design, le développement front-end, la gouvernance des API et la plateforme
d’authentification. J’ai animé le story mapping, mis en place l’infrastructure et la chaîne de
livraison, et travaillé sur l’authentification entre le front-end Angular et Keycloak.

<!-- TODO(cedric): deux ou trois faits concrets sur l’atelier : qui était dans la salle, combien de
temps il a duré, la colonne vertébrale obtenue (activités principales), une surprise ou un désaccord
révélé par la carte, et le contenu de la première tranche. Supprimer ce commentaire une fois
complété. -->

Un choix de livraison s’accorde bien avec une story map : le front-end a été développé contre une
API simulée, construite avec Mockoon, pour ne pas attendre le back-end. Une tranche de la carte peut
alors être construite et montrée pendant que la vraie API est encore en conception.

## Ce qui fait que ça marche

- **Cartographier le parcours, pas le système.** Si la colonne vertébrale ressemble à un menu
  d’écrans, repartez de ce que l’utilisateur cherche à faire.
- **Découper en travers, pas en profondeur.** Une première version qui couvre finement chaque
  activité en apprend davantage qu’une version qui termine parfaitement la première.
- **Garder la carte vivante.** Une carte roulée après l’atelier est une jolie photo. Une carte qui
  reste au mur et que l’on met à jour à chaque planification, c’est le backlog.
- **Laisser les désaccords s’exprimer au mur.** Les moments les plus utiles sont ceux où deux
  personnes placent le même post-it à des endroits différents. C’est une conversation que la liste
  aurait cachée jusqu’à la fin du développement.

Le story mapping fait partie des [ateliers que j’anime](/fr/services/facilitation-workshops). Si
votre backlog est devenu une liste que plus personne ne sait lire,
[contactez-moi](/fr#contact).
