---
title: 'La souveraineté n’est pas la résilience'
description: 'Un système souverain que l’on ne peut pas quitter reste fragile. Pourquoi je mesure séparément souveraineté et portabilité, et comment les deux scores disent quoi faire de chaque système.'
date: '2026-12-03'
lang: fr
tags: [digital-sovereignty, sovereign-cloud, resilience, portability, public-sector]
draft: true
translationOf: en/sovereignty-is-not-resilience
---

Le « cloud souverain » est souvent présenté comme l’option sûre. Passez chez un fournisseur
européen, dit l’argument, et vous êtes protégé : du droit étranger, d’un conflit commercial, d’un
fournisseur qui change ses conditions du jour au lendemain. C’est en partie vrai. La souveraineté
répond bien à une question : qui peut contrôler votre système, et quel droit peut obliger à y
donner accès. Elle ne répond pas à une seconde : que se passe-t-il quand ce fournisseur vous fait
défaut, augmente ses prix, change sa licence ou disparaît ?

Un système peut être entièrement européen et pourtant impossible à quitter. Dans ce cas, vous avez
changé de qui vous dépendez, pas le fait d’en dépendre. Cet article explique pourquoi je traite
souveraineté et portabilité comme deux scores distincts, et comment je les utilise ensemble pour
décider quoi faire de chaque système.

## D’où cela vient

Depuis décembre 2023, je travaille au centre de compétences en architecture de l’Office des
publications de l’Union européenne, l’éditeur officiel de l’UE. J’y ai notamment travaillé sur la
migration d’actifs stratégiques vers un cloud souverain européen : faisabilité, architecture cible,
analyse du code source, stratégies de migration des données et des charges de travail, et haute
disponibilité, continuité et reprise.

Ce dernier point est le sujet de cet article. Choisir un fournisseur souverain a demandé une
décision. Rendre le résultat aussi disponible et aussi récupérable que le système qu’il remplaçait
a été un travail à part, avec sa propre conception et ses propres tests. La souveraineté n’a pas
apporté la résilience avec elle.

Deux principes cadraient ce travail, et je les utilise encore :

- **Le logiciel avant le matériel.** La chaîne d’approvisionnement matérielle est mondiale et lente
  à évoluer. Le logiciel décide de la façon dont les données sont traitées, des formats dans
  lesquels elles vivent et de la facilité avec laquelle elles peuvent bouger. C’est là qu’une
  organisation peut agir maintenant.
- **Les systèmes critiques avant les commodités.** À l’Office des publications, cela voulait dire
  les systèmes qui conservent les publications de l’UE et donnent au public l’accès au droit de
  l’UE, avant la messagerie ou la bureautique. Les commodités comptent,
  mais elles sont plus faciles à remplacer et moins propres à la mission.

Pour comparer les options, j’ai écrit deux échelles de 0 à 10 : une pour la souveraineté, une pour
la portabilité. Je les ai depuis affinées en une méthode que j’appelle le
[Digital Autonomy Score](https://github.com/cpontet/digital-autonomy-score) (DAS). Elle est open source sous licence EUPL, et existe aussi sous
forme de plugin Claude Code qui analyse un code source et prépare une évaluation.

## Deux questions, deux scores

**Souveraineté : une entité étrangère peut-elle contrôler, restreindre ou obliger à donner accès à
votre technologie ?** Le DAS la mesure sous trois angles :

- **L’exposition juridique** : où les données sont stockées et traitées, et quel droit régit le
  fournisseur. Un fournisseur américain relève du CLOUD Act, où que se trouvent ses serveurs.
- **L’autonomie technique** : pouvez-vous exploiter, modifier et maintenir la technologie vous-même ?
- **La gouvernance** : qui contrôle la feuille de route. Un projet piloté par une seule entreprise
  ne présente pas les mêmes risques qu’un projet piloté par une fondation ou un organisme de
  normalisation.

L’exposition juridique pèse le plus, parce qu’une contrainte légale l’emporte sur les protections
techniques. L’échelle va du logiciel propriétaire sous juridiction étrangère (0) aux standards
internationaux ratifiés avec plusieurs implémentations indépendantes (10).

En open source, la licence compte moins que la question de savoir qui peut la changer. MongoDB
était sous AGPL, une licence copyleft forte, quand il est passé à une licence « source available »
en 2018 ; Terraform était sous MPL quand HashiCorp a fait de même en 2023. Le copyleft n’a pas
protégé leurs utilisateurs, parce qu’une seule entreprise détenait tous les droits d’auteur et
pouvait changer la licence des versions suivantes. Linux, lui, ne pourra jamais changer de licence :
ses droits d’auteur sont répartis entre des milliers de contributeurs. Le DAS pose donc trois
questions, dans cet ordre : un acteur unique peut-il changer la licence, qui gouverne la feuille de
route, et seulement ensuite, la licence est-elle copyleft. Le copyleft compte là où personne ne peut
changer la licence, parce qu’il empêche alors quiconque de refermer le projet.

**Portabilité : pouvez-vous partir ?** Le DAS la mesure sur cinq dimensions :

| Dimension                | Question                                                                 | Poids |
| ------------------------ | ------------------------------------------------------------------------ | ----: |
| Code et exécution        | Le logiciel peut-il tourner sur une autre plateforme ?                   |  15 % |
| Données                  | Pouvez-vous récupérer toutes vos données, dans un format réutilisable ?  |  30 % |
| API et intégration       | Les intégrations utilisent-elles des protocoles standard ou des SDK propriétaires ? | 20 % |
| Exploitation             | Les compétences, l’outillage et d’autres fournisseurs existent-ils ?     |  20 % |
| Migration                | Quels effort, délai et risque un déménagement demanderait-il ?           |  15 % |

Les données pèsent le plus, parce que c’est là que se loge l’enfermement. Le code peut être réécrit ;
des années d’enregistrements dans un format propriétaire, avec leur historique et leurs relations,
souvent pas.

## Docker n’est pas la portabilité

Une illusion courante est le conteneur. « Ça tourne dans Docker, donc on peut le déplacer. » Le
conteneur se déplace ; ce dont il dépend, pas forcément. Une application empaquetée dans un
conteneur mais branchée sur la base de données, la file de messages ou le service d’identité
propriétaire d’un fournisseur est aussi enfermée qu’avant, simplement mieux emballée.

C’est pourquoi le DAS évalue un système couche par couche et retient, pour chaque dimension, le
résultat le plus faible. Une interface portable au-dessus d’une base de données que l’on ne peut pas
exporter donne un système que l’on ne peut pas exporter. Et si une seule dimension obtient 2 ou
moins, le score de portabilité est plafonné à 4, quoi qu’en disent les autres.

## Quatre quadrants, quatre postures

Placez les deux scores sur deux axes, et chaque système tombe dans l’une de quatre cases.

| | **Faible portabilité** | **Forte portabilité** |
| --- | --- | --- |
| **Forte souveraineté** | **Souverain mais fragile.** Moderniser pour la portabilité. | **Souverain et portable.** Maintenir, et en faire le modèle de référence. |
| **Faible souveraineté** | **Enfermé et exposé.** Migrer ou remplacer, en urgence. | **Portable mais exposé.** Le déménagement le plus simple : changer de fournisseur. |

La case en haut à gauche est celle que les débats sur la souveraineté oublient. On y trouve des
systèmes européens, parfois même open source, mais liés au modèle de déploiement d’un fournisseur,
stockés dans des formats que lui seul lit, ou exploités par une équipe si petite que son savoir est
irremplaçable. Ils passent un contrôle de souveraineté. Ils ne survivraient pas à la défaillance, au
rachat ou à la hausse de prix de ce fournisseur.

Notez aussi où un éditeur propriétaire européen se situe sur l’échelle de souveraineté : 3 sur 10.
Le droit de l’UE s’applique, ce qui compte, mais le code est fermé et vous dépendez de la pérennité
de cette entreprise. « Nous sommes passés à un SaaS européen » peut être à la fois un progrès et un
nouvel enfermement.

Le quadrant donne aussi l’ordre du travail. Les systèmes en bas à droite sont les gains rapides :
ils sont déjà portables, changer de fournisseur relève surtout de l’infrastructure. Ceux en bas à
gauche portent le plus de risque et demandent un plan, en commençant par une vue claire de
l’exposition. Ceux en haut à gauche demandent de l’ingénierie : formats ouverts, interfaces
standard, infrastructure as code, un second fournisseur capable de les faire tourner.

## Trois questions avant une évaluation complète

Une évaluation complète prend environ une demi-journée par système. Avant cela, trois questions
donnent un plafond rapide à la portabilité :

1. Pouvez-vous exporter toutes vos données aujourd’hui, dans un format standard, sans l’aide du
   fournisseur ? Sinon, la portabilité vaut 3 au plus.
2. Existe-t-il au moins trois fournisseurs européens indépendants capables de faire tourner ce
   système ? Sinon, 5 au plus.
3. Votre équipe pourrait-elle migrer en moins de douze mois avec son budget actuel ? Sinon, 6 au
   plus.

Si la réponse honnête à la première question est « probablement », comptez-la comme un non.

## La portabilité est le pont, pas toute la résilience

La portabilité relie la souveraineté à la résilience : c’est votre capacité à agir quand un
fournisseur, une loi ou un contrat se retourne contre vous. Ce n’est pas toute la résilience.
Maintenir un service pendant une panne, se remettre d’un incident, répéter une bascule : cela relève
de la résilience opérationnelle, que le DAS laisse volontairement de côté. Elle demande sa propre
conception et ses propres tests, comme dans la migration de l’Office des publications.

La réglementation demande de plus en plus les deux. DORA impose aux entités financières des
stratégies de sortie pour les services TIC qui soutiennent des fonctions critiques. Le
[cadre européen de souveraineté cloud](/fr/blog/cadre-europeen-souverainete-cloud) de la Commission
appelle son troisième niveau d’assurance « résilience numérique », et note explicitement la
portabilité et les standards ouverts. Un plan de sortie jamais testé est un document, pas une
capacité.

## Ce que j’en retiens

- Mesurer séparément souveraineté et portabilité. Un seul chiffre cache l’arbitrage qu’il faut voir.
- Évaluer la pile, pas le produit. La couche la plus faible fixe le résultat.
- Faire de la portabilité des données le premier test. Si les données ne sortent pas, rien d’autre
  ne bouge.
- Ne pas laisser « souverain » remplacer une conception de la résilience. Poser les mêmes questions
  de disponibilité et de reprise à un fournisseur européen qu’à n’importe quel autre.
- Préférer ce que l’on peut quitter. Cela garde ouvertes toutes les décisions suivantes, souveraines
  ou non.

Les échelles, la démarche d’évaluation et des exemples détaillés sont dans le
[dépôt](https://github.com/cpontet/digital-autonomy-score) (en anglais). Si vous voulez savoir où se situent vos propres systèmes sur ces deux
axes, [contactez-moi](/fr#contact).
