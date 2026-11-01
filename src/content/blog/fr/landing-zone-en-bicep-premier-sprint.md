---
title: 'Une landing zone en Bicep : ce qui va dans le premier sprint'
description: 'Le premier sprint d’une plateforme cloud décide de ce qui sera bon marché ou coûteux à changer ensuite. Ce que j’y mets quand je construis sur Azure avec Bicep, et ce qui peut attendre.'
date: '2026-12-17'
lang: fr
tags: [cloud-architecture, azure, infrastructure-as-code, public-sector]
draft: true
translationOf: en/landing-zone-in-bicep-first-sprint
---

Une landing zone, c’est le terrain sur lequel atterrit une charge de travail cloud : les
souscriptions, les identités, le réseau, les politiques, les journaux et les budgets sur lesquels
chaque application s’appuie sans y penser. Microsoft en décrit une version complète dans son
[Cloud Adoption Framework](https://learn.microsoft.com/fr-fr/azure/cloud-adoption-framework/ready/landing-zone/),
selon huit domaines de conception. Lu seul, ce cadre laisse imaginer des mois de travail de
plateforme avant la première charge de travail.

La plupart des équipes n’ont pas des mois. Elles ont une première charge de travail à livrer, et une
plateforme à construire autour. Quand j’ai conçu et déployé une plateforme de données pour une
institution européenne, toute l’infrastructure était en Bicep dès le premier déploiement, avec la
conformité, la sécurité et la maîtrise des coûts. Cet article porte sur la question que tout projet
de ce type se pose dans son premier sprint : qu’est-ce qui doit être là dès le premier jour, et
qu’est-ce qui peut attendre ?

Ma règle est simple. **Mettre dans le premier sprint ce qui coûte cher à ajouter plus tard.** Le
reste peut suivre les charges de travail.

## 1. Structure et nommage

Les décisions les moins chères à prendre tôt, et les plus pénibles à changer, portent sur
l’organisation et le nommage des ressources.

- **Les périmètres.** Des groupes d’administration pour l’organisation, une souscription par
  environnement (ou par environnement et charge de travail), et des groupes de ressources qui
  suivent le cycle de vie de ce qu’ils contiennent. Déplacer des ressources entre souscriptions
  plus tard est possible, mais cela casse les attributions de rôles, les politiques et parfois les
  ressources elles-mêmes.
- **Une convention de nommage, dans le code.** Un module Bicep qui construit les noms à partir de
  quelques paramètres (charge de travail, environnement, région, type de ressource) évite que
  quiconque tape un nom à la main. Renommer des ressources plus tard revient souvent à les recréer.

## 2. Identités et accès

Les accès sont l’autre chose difficile à nettoyer après coup : les droits accordés
« temporairement » les premières semaines ont tendance à rester des années.

- **Des groupes, pas des personnes.** Les rôles sont attribués à des groupes Entra ID, au périmètre
  le plus restreint qui fonctionne. Personne n’est Owner d’une souscription par commodité.
- **Pas de droits d’administration permanents.** Les rôles élevés sont demandés au besoin, pour une
  durée limitée, par exemple avec Privileged Identity Management.
- **Pas de secrets dans les pipelines.** La chaîne de déploiement s’authentifie par fédération
  d’identité de charge de travail, et les applications utilisent des identités managées. Il n’y a
  alors aucun secret client à renouveler, à laisser fuiter ou à oublier.

## 3. Des politiques comme garde-fous

Azure Policy transforme des règles en quelque chose que la plateforme applique, au lieu de
quelque chose qu’un relecteur doit se rappeler. Dans le premier sprint, je veux une liste courte :

- **Les régions autorisées.** Pour un organisme public européen, uniquement des régions de l’UE.
  Cette seule ligne représente une bonne partie d’un engagement de résidence des données.
- **Des tags obligatoires, et leur héritage.** Les tags comme le propriétaire, l’environnement et
  le centre de coûts sont posés par les modules Bicep, exigés par une politique, et hérités du
  groupe de ressources quand une ressource est créée hors des modèles. J’ai expliqué pourquoi dans
  [Le FinOps dès le premier jour](/fr/blog/le-finops-des-le-premier-jour).
- **Des diagnostics envoyés vers un espace central.** Une politique qui configure les paramètres de
  diagnostic sur chaque nouvelle ressource garantit que les journaux existent le jour où vous en
  avez besoin, et pas à partir du lendemain de l’incident.

Commencez les politiques en mode audit, regardez ce qu’elles signalent, puis passez les plus
importantes en mode refus. Une politique de refus introduite sur une plateforme active bloque les
gens en plein travail ; introduite le premier jour, elle façonne simplement la manière de
construire.

## 4. Les décisions réseau difficiles à défaire

Tout le réseau n’a pas besoin d’exister dans le premier sprint, mais certaines décisions, si.

- **L’espace d’adressage.** Planifiez maintenant les plages IP de chaque environnement et des
  futures connexions vers l’on-premise ou d’autres clouds. Des plages qui se chevauchent sont l’une
  des erreurs les plus coûteuses à corriger.
- **L’accès privé aux données.** Pour une plateforme de données, décidez dès le départ si le
  stockage, les bases de données et les services d’analyse sont joints par des points de
  terminaison privés. Passer un service en production d’un accès public à un accès privé touche le
  DNS, les pare-feu, les pipelines et chaque client.

Un réseau hub-and-spoke complet avec un pare-feu central peut venir plus tard, quand il y aura plus
d’une charge de travail à connecter.

<!-- TODO(cedric): un ou deux choix concrets de la plateforme de données ici, si vous pouvez les
partager sans nommer le projet (par exemple points de terminaison privés dès le premier jour,
gestion du DNS, ce que vous avez reporté). Supprimer ce commentaire une fois complété. -->

## 5. Journaux, socle de sécurité et budgets

- **Un espace de journaux** pour la plateforme, avec une durée de rétention conforme à vos
  obligations.
- **Un socle de sécurité** : Microsoft Defender for Cloud activé sur les souscriptions, les secrets
  dans Key Vault, des paramètres de chiffrement choisis plutôt que laissés par défaut.
- **Des budgets et des alertes** sur chaque souscription, fixés à partir de l’estimation des coûts,
  envoyés aux personnes responsables de la charge de travail.

Rien de tout cela ne prend longtemps le premier jour. Tout cela est fastidieux à ajouter sur un
parc qui a grandi sans.

## 6. La chaîne de déploiement elle-même

La landing zone est du code, elle demande donc la même discipline de livraison qu’une application :

- **Des petits modules Bicep**, ou les [Azure Verified Modules](https://aka.ms/avm) quand ils
  conviennent, plutôt qu’un seul grand modèle.
- **Un aperçu avant chaque déploiement.** L’opération what-if de Bicep montre ce qui sera créé,
  modifié ou supprimé. La relire dans la pull request évite la plupart des surprises.
- **Pas de modification manuelle.** Si quelque chose doit être changé à la main en urgence, cela
  revient dans le code la même semaine. Sinon le code cesse de décrire la plateforme, et plus
  personne ne lui fait confiance.

## Ce qui peut attendre

- Un réseau hub-and-spoke complet, des pare-feu et la connectivité vers l’on-premise, jusqu’à ce
  qu’une charge de travail en ait besoin.
- Une seconde région et la reprise après sinistre, jusqu’à ce que les objectifs de reprise de la
  première charge de travail soient connus. Mais choisissez une paire de régions et un schéma de
  nommage qui leur laissent de la place.
- Une répartition fine des coûts et la refacturation, quand plus d’une équipe paie.
- L’essentiel du catalogue d’initiatives de politiques. Commencez par les quelques règles qui
  comptent, et ajoutez-en quand vous savez contre quoi vous vous protégez.

## Le premier sprint est une décision de conception

Une landing zone n’est jamais terminée, et c’est normal. Ce qui compte, c’est que le premier sprint
mette en place ce qui est bon marché maintenant et coûteux plus tard : la structure, les identités,
les garde-fous, les choix réseau difficiles à défaire, les journaux, les budgets et la chaîne de
déploiement. Le reste peut grandir avec les charges de travail.

Si vous êtes sur le point de construire une nouvelle plateforme sur Azure ou un autre cloud, la page
[Architecture cloud](/fr/services/cloud-architecture) décrit ma façon de travailler. Ou
[contactez-moi](/fr#contact).
