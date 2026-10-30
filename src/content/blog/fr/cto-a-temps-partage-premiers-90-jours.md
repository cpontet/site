---
title: 'Ce que fait un CTO à temps partagé pendant ses 90 premiers jours'
description: 'Écouter et cartographier, décider et écrire, puis installer des habitudes qui tiennent sans moi : comment je passe les trois premiers mois comme CTO à temps partagé, et ce qu’un dirigeant doit en retirer.'
date: '2026-10-30'
lang: fr
tags: [cto, tech-strategy, architecture-governance]
draft: false
translationOf: en/fractional-cto-first-90-days
---

Un CTO à temps partagé est un responsable technique que vous engagez à temps partiel : un ou
deux jours par semaine, pendant plusieurs mois, comme membre de votre équipe de direction et non
comme auditeur extérieur. C’est pertinent quand vous avez besoin d’une direction technique, mais
pas encore d’un dirigeant à temps plein, ou pendant que vous en cherchez un.

Le risque avec tout nouveau CTO, à temps partagé ou non, est qu’il arrive avec un cadre tout
prêt et commence à l’installer dès la première semaine. J’ai été CTO d’une société de conseil
pendant sept ans, et responsable de sa software factory auparavant, et j’ai travaillé avec de
nombreuses organisations clientes, dans le secteur public comme dans le privé. D’après mon
expérience, les changements qui durent sont ceux qui partent de la façon dont l’organisation
fonctionne déjà.

Je découpe donc les 90 premiers jours en trois phases. Chacune produit un résultat clair, pour
que vous puissiez juger le travail à chaque étape, et l’arrêter s’il n’est pas utile.

## Avant le premier jour : une question et un sponsor

Un CTO à temps partagé a peu de temps, la mission a donc besoin d’un objet précis. Avant de
commencer, nous nous mettons d’accord sur trois points :

- **La question.** Par exemple : « Notre plateforme peut-elle absorber deux ans de croissance ? »,
  « Pourquoi chaque mise en production prend-elle un mois ? » ou « Devons-nous développer ce
  produit en interne ? ».
- **Un sponsor.** En général le dirigeant. Une personne à qui je rends compte, qui peut décider
  et ouvrir des portes.
- **Un rythme.** Des jours fixes, un point hebdomadaire avec le sponsor, et un bilan au jour 90.

## Jours 1 à 30 : écouter et cartographier

Le premier mois sert à comprendre, pas à changer. Je parle avec les gens et je lis ce que
l’organisation produit.

**Les entretiens.** L’équipe de direction, chaque tech lead, quelques développeurs,
l’exploitation, les product owners et, si possible, quelques clients ou utilisateurs. Je pose
les mêmes questions à tout le monde : ce qui fonctionne, ce qui vous ralentit, ce qui vous
inquiète, ce que vous changeriez en premier. Les écarts entre les réponses sont souvent plus
utiles que les réponses elles-mêmes.

**La lecture.** Le code et son historique, les pipelines de livraison, le journal des
incidents, la facture cloud, les principaux contrats fournisseurs, les feuilles de route
existantes. Chacun montre comment le travail se fait réellement, ce qui ne correspond pas
toujours à la façon dont il est décrit.

**La cartographie.** Je dessine une carte de la chaîne de valeur, souvent sous forme de Wardley
Map : ce dont vos clients ont besoin, les composants qui y répondent, et la maturité de chacun.
Elle montre où vous construisez ce qui vous distingue, et où vous construisez ce que vous
pourriez simplement acheter ou louer.

Les seuls changements que je fais dans cette phase concernent la sécurité : une sauvegarde
jamais testée, un accès à la production partagé par tous, une clé jamais renouvelée.

**Ce que vous obtenez :** un diagnostic écrit et court, quelques pages au plus. Ce qui fonctionne
et doit être protégé, ce qui est risqué, et ce qui reste inconnu.

## Jours 31 à 60 : décider et écrire

Le deuxième mois transforme le diagnostic en décisions. Le rôle d’un CTO n’est pas de prendre
toutes les décisions techniques, mais de s’assurer que les plus importantes sont prises, une
seule fois, et par écrit.

**Une stratégie technique sur une page.** Deux ou trois objectifs métier, et ce qu’ils
impliquent pour la plateforme, les équipes et le budget. Les arbitrages figurent aussi sur la
page : ce que nous ne ferons pas, et pourquoi. Une stratégie qui n’exclut rien est une liste de
souhaits.

**Quelques principes d’architecture.** Courts, partagés avec les équipes et vérifiés lors des
revues. Cinq principes appliqués valent mieux que trente dont personne ne se souvient.

**Les premiers enregistrements de décision.** Une page par choix important : le contexte, les
options étudiées, la décision et ses conséquences. Quand quelqu’un demandera dans deux ans
pourquoi le système ressemble à cela, la réponse sera là.

**Une ou deux corrections visibles.** En général le problème qui est revenu dans la plupart des
entretiens : un processus de mise en production, un environnement de test, un composant sans
responsable. Le régler tôt montre que l’écoute a mené à quelque chose.

**Ce que vous obtenez :** la stratégie, les principes, les premiers enregistrements de décision,
et une courte liste de priorités validée avec l’équipe de direction.

## Jours 61 à 90 : installer et transmettre

Un CTO à temps partagé n’est pas là tous les jours. Ce que je mets en place doit fonctionner les
jours où je suis absent, et après mon départ. Le troisième mois porte sur les habitudes et les
personnes.

**Des habitudes qui tournent sans moi.** Une revue d’architecture avant de construire, pas
après. Une communauté de pratique où les développeurs se forment entre eux. Un suivi régulier
des coûts cloud avec les équipes qui les génèrent. Des règles d’usage pour les agents de code et
les outils d’IA, pour que toutes les équipes les utilisent selon les mêmes règles.

**Les personnes.** J’accompagne les tech leads qui porteront ces habitudes. Si le diagnostic a
révélé un rôle manquant, j’aide à rédiger le profil et je participe aux entretiens techniques.

**Une décision au jour 90.** Nous faisons le bilan de la mission avec le sponsor. Trois issues
honnêtes sont possibles : continuer au même rythme, réduire à quelques jours par mois, ou
arrêter parce que l’organisation a désormais ce dont elle a besoin. Les trois conviennent.

**Ce que vous obtenez :** des habitudes avec des responsables nommés, des tech leads qui les
font vivre, et une décision claire sur la suite.

## Ce qu’un dirigeant doit surveiller

Quelques signes que les 90 premiers jours se passent mal :

- une proposition de réécrire le système dès le premier mois ;
- de nouveaux outils avant que quiconque ait regardé comment les outils actuels sont utilisés ;
- toutes les décisions qui passent par le CTO, si bien que rien n’avance les jours où il est
  absent ;
- une stratégie qui ne parle que de technologie, sans vos objectifs métier.

Et quelques signes qu’ils se passent bien : les équipes savent expliquer les priorités avec
leurs propres mots, les décisions sont écrites, et les échanges en comité de direction ont plus
de substance technique qu’avant.

## Par où commencer

Si vous vous demandez si un CTO à temps partagé correspond à votre situation, la page
[CTO & conseil stratégique](/fr/services/cto-strategic-advisory) décrit les formats que je
propose. Ou [contactez-moi](/fr#contact) et dites-moi à quelle question vous voudriez une
réponse en premier.
