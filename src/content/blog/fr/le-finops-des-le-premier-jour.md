---
title: 'Le FinOps dès le premier jour'
description: 'Les coûts cloud se maîtrisent le plus facilement avant la mise en service de la première charge de travail. Quatre choses que j’ai mises en place dès le premier déploiement d’une plateforme de données à l’Office des publications de l’UE : une estimation, des tags dans le code, des budgets, et ne payer que ce qui tourne.'
date: '2026-10-31'
lang: fr
tags: [finops, cloud-architecture, infrastructure-as-code, public-sector]
draft: false
translationOf: en/finops-from-day-one
---

Dans la plupart des organisations, le FinOps commence par une surprise sur la facture. Quelqu’un
aux finances demande pourquoi le cloud coûte deux fois plus que prévu, et l’équipe passe des
semaines à retrouver quelle ressource appartient à quel projet, qui l’a créée, et si on peut
l’arrêter.

À ce stade, c’est la manière coûteuse de faire. Il faut ajouter des tags sur des centaines de
ressources dont les responsables sont partis. Les budgets sont fixés après coup, ils suivent donc
ce qui est déjà dépensé plutôt que ce qui était prévu. Et chaque économie devient une
négociation avec une équipe qui a d’autres priorités.

Le bon moment, c’est avant la mise en service de la première charge de travail. À l’Office des
publications de l’Union européenne, j’ai conçu et déployé une plateforme de données dans le
cloud, avec toute l’infrastructure décrite en Infrastructure as Code. Le FinOps faisait partie du
travail dès le premier déploiement, au même titre que la conformité et la sécurité. Cet article
décrit ce que nous avons mis en place, et pourquoi chaque élément coûte peu au départ et
beaucoup plus tard.

> Le FinOps n’est pas une réflexion après coup. C’est une étape obligatoire à intégrer dans
> votre processus dès le départ.

## 1. Une estimation avant de construire

Le premier document de coûts s’écrit avant qu’une seule ressource existe : une estimation par
environnement, intégrée à l’architecture cible. Le développement, les tests et la production
ont rarement besoin de la même taille, et l’estimation en fait une décision plutôt qu’une copie
de la production.

La valeur tient moins au chiffre qu’aux hypothèses écrites à côté : combien d’heures un pool de
calcul tourne par jour, quel volume de données est stocké, combien de temps les logs sont
conservés. Quand la vraie facture arrive, ce sont ces hypothèses qui servent de référence. Un
écart a alors une explication, comme un pool qui tourne plus longtemps que prévu, au lieu d’être
un dépassement flou.

Pour une plateforme de données, c’est en général le calcul qui coûte le plus, et il est facturé
tant qu’il tourne, que quelqu’un l’utilise ou non. C’est la ligne de l’estimation à surveiller
de plus près.

## 2. Des tags dans le code, imposés par des politiques

Un rapport de coûts ne vaut que par les tags posés sur les ressources. Une vue des coûts par
projet ou par responsable ne fonctionne plus dès que quelques ressources n’ont pas de tag, et
cela arrive vite quand les tags sont ajoutés à la main.

Les tags vivaient donc dans les modules d’Infrastructure as Code. Chaque ressource déployée par ces modules recevait
le même ensemble, par exemple responsable, environnement et centre de coûts, sans que personne
ait à y penser. Une politique cloud vérifiait ensuite la règle sur tout le périmètre, y compris ce qui
était créé en dehors des templates. Une ressource sans les tags requis apparaît comme non
conforme et, selon l’effet de la politique, sa création peut aussi être bloquée.

J’ai aussi mis en place des politiques qui copient automatiquement les tags d’un groupe de
ressources sur les ressources qu’il contient. Une ressource créée à la main, ou par un service de
lui-même, hérite alors de son responsable, de son environnement et de son centre de coûts sans
que personne ait à les ajouter.

C’est l’élément qui coûte le plus cher à ajouter plus tard. Sur une nouvelle plateforme, poser
les tags est un petit travail sur les modules. Sur un environnement existant, il faut d’abord
trouver un responsable pour chaque ressource.

## 3. Des budgets et des alertes dès le premier déploiement

Les budgets et les alertes ont été mis en place avec le premier déploiement, pas après le premier
mois coûteux. Un budget cloud sur un compte ou un groupe de ressources envoie une alerte
quand les dépenses atteignent une part du budget, et il peut aussi alerter sur la prévision,
avant que l’argent ne soit réellement dépensé.

Le budget n’arrête rien à lui seul. Son rôle est de s’assurer que la bonne personne apprend une
dérive en quelques jours plutôt qu’à la fin du trimestre. Cela ne fonctionne que si l’alerte
arrive à quelqu’un qui est responsable de la charge de travail et peut agir, pas seulement à une
boîte aux lettres partagée.

L’estimation de l’étape 1 donne le montant de départ. Sans elle, le premier budget est une
supposition, et la première alerte est soit ignorée, soit trop tardive.

## 4. Ne payer que ce qui tourne

Une grande partie des dépenses cloud vient de ressources qui tournent quand personne ne s’en
sert. Sur la plateforme de données, les pools de calcul, comme les pools Spark, étaient mis en
pause quand ils n’étaient pas nécessaires, et les environnements de développement et de test
étaient réduits ou arrêtés en dehors des heures de travail.

La mise en pause est une réponse. L’autre consiste à choisir des services qui ne facturent pas
la capacité inutilisée. Les bases de données SQL tournaient en mode serverless : la capacité
suit la charge, et on paie ce qui est utilisé plutôt qu’une taille réservée en permanence. Pour
une plateforme de données, où la plupart des requêtes arrivent par vagues, la différence est
importante.

Les règles de mise en pause sont simples à écrire et faciles à oublier. Elles ont donc leur place dans la
conception dès le départ, à côté de l’estimation. Si l’estimation suppose qu’un pool tourne dix
heures par jour, la plateforme doit le rendre vrai. Sinon, l’estimation et la facture
divergent dès le premier mois.

## Pourquoi c’est encore plus important dans le secteur public

D’abord, c’est de l’argent public. Chaque euro dépensé pour un pool de calcul inutilisé ou une
base de données surdimensionnée est l’argent des contribuables, et une institution publique a le
devoir de le dépenser avec soin. La maîtrise des coûts n’y est pas un exercice d’optimisation.
Elle fait partie de la mission.

Ensuite, les institutions publiques travaillent en général avec des budgets annuels fixés longtemps à
l’avance. Des coûts cloud imprévus ne peuvent pas simplement être absorbés par les recettes du
mois suivant. La prévisibilité compte autant que le montant : les finances ont besoin d’un
chiffre sur lequel planifier, et d’un moyen de voir tôt quand il bouge.

Les quatre éléments ci-dessus apportent exactement cela. L’estimation donne le plan, les tags
rattachent les coûts à un projet, les budgets signalent une dérive tôt, et le fait de ne payer
que ce qui tourne garde la plateforme proche de ses hypothèses.

## Et ensuite : une pratique continue

Ces quatre éléments sont un point de départ, pas une pratique FinOps à eux seuls. Le FinOps ne
se met pas en place une fois pour être oublié ensuite. L’usage change, les prix changent, de
nouveaux services apparaissent, et une plateforme bien dimensionnée au lancement dérive en
quelques mois. Le travail tourne en boucle :

- **Revoir et analyser.** Regarder les coûts régulièrement avec les responsables des charges de
  travail, au regard de l’estimation et de ses hypothèses. Quelles lignes ont augmenté, et
  pourquoi ?
- **Identifier les améliorations.** Une ressource surdimensionnée, un pool qui tourne plus
  longtemps que nécessaire, un environnement que plus personne n’utilise, une charge stable qui
  coûterait moins cher avec une réservation.
- **Agir.** Redimensionner, mettre en pause, supprimer, s’engager. Puis vérifier à la revue
  suivante que le changement a eu l’effet attendu.
- **Changer de plateforme si nécessaire.** Parfois, le modèle de coûts d’un service ne
  correspond plus à son usage, et l’ajuster ne suffit pas. Migrer une charge de travail vers un
  autre service, ou vers une autre architecture, fait alors aussi partie du FinOps, pas
  seulement de l’architecture.

Le [FinOps Framework](https://www.finops.org/framework/) décrit la même boucle en trois phases :
informer, optimiser et opérer.

Rien de tout cela ne fonctionne sans les fondations, et les fondations coûtent le moins cher le
premier jour.

## Par où commencer

Si vous vous apprêtez à déployer une nouvelle plateforme, ou si votre facture cloud a déjà
augmenté plus vite que prévu, la page [Architecture cloud](/fr/services/cloud-architecture)
décrit ma façon de travailler. Ou [contactez-moi](/fr#contact) et dites-moi ce que votre facture
actuelle n’explique pas.
