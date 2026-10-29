---
title: 'EventStorming, du big picture au code'
description: 'Cinq courtes vidéos sur les trois niveaux d’EventStorming et la notation qui les relie.'
date: '2026-10-15'
lang: fr
tags: [eventstorming, ddd, facilitation]
draft: false
translationOf: en/eventstorming-from-big-picture-to-code
---

EventStorming est un format d’atelier créé par Alberto Brandolini. Les personnes qui connaissent
le métier et celles qui construisent le logiciel se retrouvent devant le même mur, écrivent ce
qui se passe dans le domaine sur des post-it orange, et les ordonnent jusqu’à ce qu’ils racontent
une seule histoire. C’est le moyen le plus rapide que je connaisse pour construire une
compréhension partagée d’un domaine avant d’écrire la moindre ligne de code.

C’est aussi une méthode facile à mal comprendre. Certaines équipes font une seule session,
prennent le mur en photo et s’arrêtent là. D’autres passent directement aux agrégats et ratent
les conversations qui font toute la valeur de l’exercice. EventStorming fonctionne à trois
niveaux, chacun regardant de plus près les mêmes événements. J’ai réalisé cinq courtes vidéos
animées pour les expliquer, avec un cinéma comme domaine d’exemple. Chacune dure environ une
minute. La narration est en anglais, avec des sous-titres en français.

## Trois niveaux, les mêmes événements

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/levels.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/levels.mp4" type="video/mp4" />
    <track kind="subtitles" srclang="fr" label="Français" src="/blog/eventstorming/levels.fr.vtt" default />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/levels.en.vtt" />
  </video>
  <figcaption>Les trois niveaux d’EventStorming (35 s).</figcaption>
</figure>

- **Big Picture** : tous les événements métier de l’entreprise, les points chauds, et les
  endroits où les bounded contexts commencent à apparaître.
- **Process Modelling** : ajoute les commandes, les policies, les read models et les systèmes
  externes, pour montrer comment le travail circule réellement.
- **Software Design** : fait apparaître les agrégats et leurs invariants, prêts à devenir du
  code.

Chaque niveau ajoute du détail sans ajouter de bruit. On zoome sur une partie du mur ; on
n’empile pas davantage de notation par-dessus.

## Big Picture

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/big-picture.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/big-picture.mp4" type="video/mp4" />
    <track kind="subtitles" srclang="fr" label="Français" src="/blog/eventstorming/big-picture.fr.vtt" default />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/big-picture.en.vtt" />
  </video>
  <figcaption>Un atelier Big Picture, étape par étape (64 s).</figcaption>
</figure>

Le Big Picture commence volontairement dans le chaos. Chacun écrit des événements métier (domain
events), au passé et dans la langue du métier : « Billet acheté », pas « Acheter un billet ». Pas
encore de discussion. Ensuite, le groupe impose la ligne du temps, en faisant glisser les
événements de gauche à droite jusqu’à ce qu’ils forment une seule histoire.

À partir de là, le mur s’enrichit :

- **Les points chauds** (hotspots, en rose vif) capturent les questions, les conflits et les
  inconnues. On les marque ; on ne les résout pas sur le moment.
- **Les personnes** montrent qui déclenche chaque événement.
- **Les événements pivots** se placent sur les lignes où une partie de l’entreprise passe la main
  à la suivante. Ce sont les premiers indices des bounded contexts.
- **Un récit métier** parcourt le mur comme une seule histoire, ce qui révèle vite les trous.
- **Le vote par flèches** permet à chacun de pointer le problème qui fait le plus mal. On obtient
  une priorité sans réunion.
- **Suivre l’argent** montre où la valeur se crée ou se perd, en argent, en confiance ou en
  temps.

L’objectif : un maximum de connaissance partagée avec un minimum de notation.

## Process Modelling

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/process-modeling.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/process-modeling.mp4" type="video/mp4" />
    <track kind="subtitles" srclang="fr" label="Français" src="/blog/eventstorming/process-modeling.fr.vtt" default />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/process-modeling.en.vtt" />
  </video>
  <figcaption>Process Modelling : une chaîne de commandes et d’événements (50 s).</figcaption>
</figure>

Le Process Modelling réduit le périmètre à une seule fonctionnalité. On place la commande qui la
déclenche et l’état final qu’elle doit atteindre : un événement métier et le read model qu’il
laisse derrière lui. Le flux entre les deux, c’est ce que l’atelier découvre.

On le découvre en suivant les couleurs dans l’ordre. Une commande s’exécute sur un système et
produit un événement. Une policy transforme cet événement en commande suivante : « chaque fois
que ceci arrive, faire cela ». La chaîne se répète jusqu’à l’état final. Pas encore d’agrégat :
il arrive au niveau suivant.

## Software Design

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/software-design.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/software-design.mp4" type="video/mp4" />
    <track kind="subtitles" srclang="fr" label="Français" src="/blog/eventstorming/software-design.fr.vtt" default />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/software-design.en.vtt" />
  </video>
  <figcaption>Software Design : agrégats et process managers (54 s).</figcaption>
</figure>

Le Process Modelling dit quelles commandes mènent à quels événements, mais pas ce qui fait
respecter les règles. Au niveau Software Design, l’agrégat apparaît : une frontière de cohérence
qui reçoit une commande, décide et émet l’événement. Le Software Design, c’est le Process
Modelling plus l’agrégat.

Quand un comportement couvre plusieurs agrégats, un process manager le coordonne. Il réagit à
l’événement d’un agrégat, envoie une commande au suivant, attend l’événement de celui-ci, et fait
avancer son propre état jusqu’à ce que le processus soit terminé. À ce stade, le mur est proche
d’une spécification pour le code.

## La grammaire

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/grammar.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/grammar.mp4" type="video/mp4" />
    <track kind="subtitles" srclang="fr" label="Français" src="/blog/eventstorming/grammar.fr.vtt" default />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/grammar.en.vtt" />
  </video>
  <figcaption>Toute la notation en une image (46 s).</figcaption>
</figure>

Les trois niveaux partagent une même grammaire, et elle tient en une phrase :

- Un **acteur** émet une **commande**, une intention (bleu, à l’impératif).
- La commande arrive sur un **agrégat**, ou sur un **système externe** que l’on ne contrôle pas.
- L’un ou l’autre produit un **événement métier**, quelque chose qui s’est produit (orange, au
  passé).
- Les événements mettent à jour des **read models**, l’information que les gens voient à l’écran.
- Les événements déclenchent aussi des **policies**, qui émettent la commande suivante.

Lisez-la à voix haute : quand un billet est acheté, la policy de fidélité demande au système
d’attribuer des points.

## Pour aller plus loin

Les ressources d’Alberto Brandolini sur [eventstorming.com](https://www.eventstorming.com) font
référence, et son livre *Introducing EventStorming* décrit les formats en détail. Si vous
voulez organiser une session avec votre équipe, ou avez besoin d’un facilitateur,
[contactez-moi](/fr#contact).
