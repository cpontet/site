---
title: 'Lire le cadre européen de souveraineté cloud'
description: 'Comment la Commission européenne traduit la souveraineté cloud en huit objectifs, cinq niveaux d’assurance et un score pondéré.'
date: '2026-10-22'
lang: fr
tags: [sovereign-cloud, architecture, public-sector]
draft: false
translationOf: en/eu-cloud-sovereignty-framework
---

« Cloud souverain » a fini par vouloir dire à peu près n’importe quoi : un centre de données en
Europe, une filiale européenne, une clause de contrat, une étiquette sur une page produit. Le
[Cloud Sovereignty Framework](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en?filename=Cloud-Sovereignty-Framework.pdf)
de la Commission européenne adopte une autre approche. Il décompose la souveraineté en critères
qu’un acheteur peut évaluer et noter dans un appel d’offres.

Le document est court : six pages, version 1.2.1, publié en octobre 2025 par la direction
générale des services numériques (DG DIGIT). Il est en anglais et a été écrit pour un marché
cloud de la Commission, mais je pense qu’il est utile bien au-delà. Je travaille avec des
institutions européennes et des organismes publics sur l’architecture cloud, et c’est la
définition publique la plus claire que j’aie vue de ce qu’ils entendent par souveraineté.

## Deux mécanismes : un niveau minimum et un score

Le cadre évalue chaque service cloud de deux façons.

1. **Un niveau d’assurance minimum par objectif.** Pour chacun des huit objectifs de
   souveraineté, l’appel d’offres fixe un niveau minimum, le SEAL (Sovereignty Effectiveness
   Assurance Level). Une offre qui n’atteint pas ce minimum sur chaque objectif est rejetée.
   C’est éliminatoire.
2. **Un score de souveraineté.** Parmi les offres retenues, un score pondéré classe les services
   selon leurs caractéristiques de souveraineté. Il compte dans la note qualité de l’attribution.

L’évaluation s’appuie sur les réponses au questionnaire de l’appel d’offres, les justificatifs
fournis et la documentation publique du fournisseur. Le document précise aussi que les résultats
peuvent servir après la signature du contrat, pour décider quels systèmes peuvent être déployés
chez quel fournisseur selon leur profil de risque.

## Huit objectifs

| #     | Objectif                        | Ce qui est évalué                                                                       | Poids |
| ----- | ------------------------------- | --------------------------------------------------------------------------------------- | ----: |
| SOV-1 | Stratégique                     | Où se situent le pouvoir de décision, l’actionnariat et le financement ; protection contre un changement de contrôle | 15 % |
| SOV-2 | Juridique et juridictionnel     | Droit applicable, exposition aux lois non européennes à portée extraterritoriale, lieu de création de la propriété intellectuelle | 10 % |
| SOV-3 | Données et IA                   | Qui contrôle les clés de chiffrement, localisation des données, visibilité des accès, IA sous contrôle européen | 10 % |
| SOV-4 | Opérationnel                    | Exploitation et support depuis l’UE, portabilité, documentation, compétences             | 15 % |
| SOV-5 | Chaîne d’approvisionnement      | Origine du matériel, du firmware et du logiciel, dépendance à des fournisseurs non européens, droits d’audit | 20 % |
| SOV-6 | Technologique                   | API et standards ouverts, licences libres, transparence de la conception, capacité de calcul européenne | 15 % |
| SOV-7 | Sécurité et conformité          | Certifications, RGPD, NIS2, DORA, opérations de sécurité sous juridiction européenne, audits | 10 % |
| SOV-8 | Durabilité environnementale     | Efficacité énergétique, économie circulaire du matériel, publication des émissions, énergie bas carbone | 5 % |

Chaque objectif est accompagné d’une liste de facteurs contributifs. Une phrase du document pèse
lourd : une faiblesse importante sur un seul facteur abaisse le niveau reconnu pour tout
l’objectif. Un fournisseur ne peut pas compenser un point faible par des points forts ailleurs.

## Cinq niveaux d’assurance

| Niveau | Nom                                                  | En résumé                                                                                |
| ------ | ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| SEAL-0 | Pas de souveraineté (No Sovereignty)                 | Contrôle exclusif par des acteurs non européens, sous droit non européen                 |
| SEAL-1 | Souveraineté juridictionnelle (Jurisdictional)       | Le droit européen s’applique sur le papier mais est difficile à faire valoir ; contrôle exclusif non européen |
| SEAL-2 | Souveraineté des données (Data Sovereignty)          | Droit européen applicable et opposable ; dépendances non européennes importantes, contrôle indirect non européen |
| SEAL-3 | Résilience numérique (Digital Resilience)            | Les acteurs européens ont une influence réelle mais pas totale ; contrôle non européen marginal |
| SEAL-4 | Souveraineté numérique complète (Full Digital Sovereignty) | Contrôle européen complet, uniquement le droit européen, aucune dépendance critique non européenne |

Les noms sont parlants. La souveraineté des données, sur laquelle se concentrent la plupart des
offres « souveraines », n’est que le niveau 2 sur 4. Au-delà, les questions portent sur qui
exploite le service, qui écrit et livre le logiciel, et qui pourrait le couper.

## Comment le score est calculé

Pour chaque objectif, les points obtenus sur ses questions sont divisés par le maximum possible,
puis multipliés par le poids de l’objectif. La somme des huit résultats donne un score sur
100 %.

Les poids méritent qu’on s’y arrête. La chaîne d’approvisionnement compte pour 20 %, le poids le
plus élevé. Les souverainetés stratégique, opérationnelle et technologique comptent pour 15 %
chacune. Le juridique et la sécurité ne comptent que pour 10 %, et le document explique
pourquoi : la procédure de marché contient déjà des garde-fous importants dans ces domaines.
Ensemble, chaîne d’approvisionnement, exploitation et technologie représentent la moitié du
score.

## Ce que j’en retiens

- **La localisation ne suffit pas.** Héberger ses données dans une région européenne répond à une
  partie de SOV-3. Cela dit peu de choses sur qui exploite la plateforme, qui peut pousser une
  mise à jour, ou quel droit peut contraindre à l’accès.
- **Les clés appartiennent au client.** SOV-3 demande que seul le client, et non le fournisseur,
  ait le contrôle effectif de l’accès cryptographique aux données. Des clés gérées par le client
  mais stockées dans le service de clés du fournisseur peuvent ne pas suffire.
- **L’ouverture est une caractéristique de souveraineté.** Standards ouverts, licences libres, API
  documentées et capacité à migrer sont notés explicitement (SOV-4 et SOV-6). La portabilité
  n’est plus seulement une bonne pratique d’architecture : elle fait partie de l’évaluation.
- **Le maillon le plus faible fixe le niveau.** Comme une seule faiblesse importante abaisse tout
  l’objectif, une évaluation de souveraineté doit couvrir toute la chaîne, jusqu’au firmware et
  aux sous-traitants.
- **L’IA est concernée.** Le lieu où les modèles sont entraînés, hébergés et gouvernés fait partie
  de SOV-3, et la capacité de calcul européenne fait partie de SOV-6.

## L’utiliser en dehors d’un marché de la Commission

Même si vous ne répondez jamais à un appel d’offres de la Commission, ce cadre donne un
vocabulaire commun. Un organisme public ou une entreprise régulée peut s’en servir pour :

- classer ses charges de travail selon le SEAL minimum dont elles ont besoin, plutôt que
  d’appliquer une seule règle à tout ;
- poser les mêmes questions à tous les fournisseurs, en utilisant les facteurs contributifs comme
  liste de contrôle ;
- concevoir pour les niveaux visés : clés détenues par le client, interfaces ouvertes,
  infrastructure as code et plans de sortie testés rendent un niveau plus élevé atteignable plus
  tard.

Si vous cherchez à définir ce que la souveraineté signifie pour vos propres systèmes, ou si vous
préparez une réponse à un appel d’offres qui utilise ce cadre, [contactez-moi](/fr#contact).
