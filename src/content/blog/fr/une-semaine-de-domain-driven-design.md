---
title: 'Une semaine de Domain-Driven Design, un cinéma à la fois'
description: 'Cinq jours, une entreprise familiale de cinémas sur quatre époques, et aucun module qui commence par un cours magistral. Comment fonctionne mon nouveau cours de Domain-Driven Design, sans dévoiler l’intrigue.'
date: '2026-11-02'
lang: fr
tags: [ddd, eventstorming, domain-modelling, facilitation, training]
draft: false
translationOf: en/a-week-of-domain-driven-design
---

La plupart des cours de Domain-Driven Design commencent par les patterns. Entités, value objects,
agrégats, repositories : le vocabulaire d’abord, et ses raisons ensuite, s’il reste du temps. On
en repart capable de nommer les briques, sans trop savoir quand l’une ou l’autre compte.

Je voulais l’inverse. J’ai donc construit un cours de Domain-Driven Design de cinq jours pour les
développeurs. Il s’adresse à de bons programmeurs : à l’aise avec les objets, les tests et un IDE.
Ce que la plupart n’ont jamais fait, c’est passer trois jours à comprendre un métier avant d’en
écrire le code. C’est autour de cela que la semaine est construite.

## Un métier, quatre générations

Toute la semaine repose sur un seul domaine : une entreprise familiale de cinémas, racontée sur
quatre époques. Elle s’inspire librement de ma propre famille, qui a exploité des cinémas dans
l’est de la France des années 1950 jusqu’à la fin des années 1980. Je l’ai d’abord utilisée dans
un atelier, [EventStorming with the stars](/fr/talks/eventstorming-with-the-stars), et elle s’est
révélée une très bonne enseignante.

Chaque époque complique un peu plus le métier que la précédente :

- **Les années 1960.** Une grande salle, une caissière, un prix de billet fixe et quelques règles
  simples.
- **Les années 1970.** Un multiplexe. Plus d’écrans, plus de séances, une carte de fidélité, et un
  partenaire qui vend des glaces dans la salle.
- **Les années 1980.** Quatre cinémas dans quatre villes, et avec eux des taxes, des redevances et
  des distributeurs qui veulent chacun leur part de chaque billet.
- **Les années 1990 et après.** L’époque que ma famille n’a pas connue : le web, le mobile, le
  streaming. Les participants l’imaginent.

Personne n’a besoin d’apprendre un nouveau secteur pour suivre. Tout le monde a déjà acheté un
billet de cinéma. Et comme le métier se complique d’une époque à l’autre, les raisons du
Domain-Driven Design apparaissent d’elles-mêmes, au moment où on en a besoin.

## Découvrir d’abord, nommer ensuite

Le cours s’appuie sur *Training from the Back of the Room* de Sharon Bowman : une pédagogie
active, avec l’ordre habituel inversé. Concrètement, je m’impose deux règles toute la semaine.

D’abord, je ne parle jamais plus de dix à quinze minutes avant que les participants fassent
quelque chose de ce que j’ai dit : l’expliquer à un voisin, le dessiner, le mettre au mur, le
mettre dans le code.

Ensuite, aucun module ne commence par un cours magistral. Les participants essaient d’abord, avec ce
qu’ils savent déjà. Ce n’est qu’après que je donne un nom à ce qu’ils viennent de faire. Une équipe
protège une règle métier à l’intérieur d’une frontière qu’elle a tracée elle-même, et je peux
dire : vous venez de construire un agrégat. Un nom donné après l’expérience reste. Un nom donné
avant, c’est un terme de plus à apprendre par cœur.

## La forme de la semaine

Chaque jour ajoute une couche, et chaque équipe garde la même tranche du cinéma du début à la fin.

- **Jour 1 : le langage.** Pourquoi le logiciel devient difficile, et quelle part de cette
  difficulté vient d’une mauvaise compréhension du métier. Les équipes commencent un glossaire du
  cinéma, et découvrent combien de sens peut avoir un mot aussi simple que « billet ».
- **Jour 2 : l’EventStorming.** Un long mur, beaucoup de post-it orange, et toute l’histoire du
  cinéma posée sous forme d’événements. Puis nous avançons d’époque en époque et regardons la
  chronologie changer.
- **Jour 3 : les frontières.** Du mur à la context map. Quelles parties du cinéma sont son cœur,
  lesquelles peuvent s’acheter sur étagère, et comment les parties doivent se parler.
- **Jour 4 : le code.** Un kata évolutif. Les équipes modélisent les années 1960 dans le code, puis
  font évoluer leur modèle vers l’époque suivante à mesure que le métier change.
- **Jour 5 : l’architecture et la soutenance.** Les équipes repoussent la technique aux bords de
  leur code, puis présentent et défendent leur conception devant le groupe.

Nous modélisons pendant trois jours entiers avant d’écrire du code de production. C’est voulu :
c’est le sens du cours.

## Ce qui se passe dans le code

Je ne dévoilerai pas le kata ici, parce que certaines des personnes qui lisent ces lignes s’y
retrouveront. Mais je peux dire ce qu’il est fait pour montrer.

Chaque époque arrive avec de nouvelles règles métier, et le réflexe évident est de les ajouter au
modèle existant. Un champ de plus, une condition de plus. Le kata laisse les participants sentir où
cela mène, puis trouver un meilleur mouvement. La leçon de la semaine tient en une ligne : **un
modèle grandit en gagnant des frontières, pas du volume.**

Il y a aussi une règle que le cinéma ne peut jamais enfreindre, introduite dès la première époque
et portée jusqu’à la dernière, où elle devient bien plus difficile à tenir qu’il n’y paraît. Et à
un moment, une nouvelle époque arrive qui change tout pour le client, sans que le code du domaine
change d’une ligne. Les participants doivent comprendre pourquoi.

Le kata est écrit en TypeScript, et le même parcours existe en C# et en Kotlin : le langage n’est
jamais le sujet.

## Comment ça se termine

Le dernier jour, chaque équipe présente ce qu’elle a construit pendant la semaine : son glossaire,
son mur d’EventStorming, sa context map, son code. Puis les autres posent leurs questions, et ce
sont des questions de pourquoi, pas de quoi. Pourquoi cette frontière ? Pourquoi ce pattern ici et
pas là ? Une conception qu’on sait défendre est une conception qu’on a comprise.

Si vous souhaitez ce cours pour votre équipe ou votre école, ou un atelier plus court construit
sur le même cinéma, la page
[Domain-Driven Design & EventStorming](/fr/services/domain-driven-design-eventstorming) décrit ma
façon de travailler, et vous pouvez [me contacter](/fr/contact).
