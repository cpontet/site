---
title: 'MeluXina-AI peut-il entraîner un modèle souverain ?'
description: 'Le Luxembourg installe un supercalculateur IA de 1 008 GPU. Ce qu’il pourrait apporter comme nœud d’un modèle ouvert et fédéré comme Tapestry, ce qui devrait changer dans l’attribution du calcul, et comment les organisations pourraient utiliser le résultat.'
date: '2026-11-12'
lang: fr
tags: [sovereign-cloud, sovereign-ai, public-sector, cloud-architecture]
draft: true
translationOf: en/could-meluxina-ai-train-a-sovereign-model
---

Dans [un article précédent](/fr/blog/tapestry-avenir-de-l-ia-souveraine), je me suis penché sur
le projet Tapestry, le plan de l’AI Alliance pour entraîner un modèle ouvert entre de nombreux
pays, chacun sur ses propres données et sa propre puissance de calcul, en ne partageant que les
poids. Ma conclusion : l’idée pourrait donner à l’Europe un modèle de niveau frontière qu’elle
contrôle, mais le projet n’a encore ni participant européen ni calcul engagé.

Cet article aborde le côté pratique, avec un exemple proche de moi. Le Luxembourg installe
MeluXina-AI, un supercalculateur dédié à l’IA. Pourrait-il être un nœud Tapestry ? Qu’apporterait-il,
que faudrait-il changer, et comment des organisations utiliseraient-elles le modèle qui en sortirait ?

Les chiffres viennent de sources publiques, à la fin d’octobre 2026. Les estimations de calcul
sont les miennes : ce sont des ordres de grandeur, pas des mesures.

## Le modèle n’est que la couche du dessus

Avant de parler de GPU, il faut se rappeler sur quoi repose un modèle souverain. Le rapport
[EuroStack](https://www.euro-stack.info/), commandé par la Bertelsmann Stiftung et publié en
février 2025, décrit la pile numérique en sept couches : matières premières, puces, réseaux,
objets connectés, cloud, logiciel, et données et IA. Il montre combien l’Europe en contrôle peu,
propose 300 milliards d’euros sur dix ans pour y remédier, et cite parmi ses briques
« SovereignAI » et « DataCommons », un échange de données fédéré.

Tapestry correspond bien au sommet de cette pile : les données restent chez leurs détenteurs, et
le résultat est un bien commun. EuroStack en rappelle utilement les limites. Les GPU de chaque
nœud européen sont américains, et un modèle entraîné sur une pile qui peut être coupée depuis
l’étranger n’est souverain qu’en surface. Le rapport montre aussi que ce cadre n’est pas encore une
politique : le paquet sur la souveraineté technologique publié par la Commission le 3 juin 2026
n’a pas retenu la règle contraignante de « Buy European » que demandait la coalition
d’entreprises réunie autour d’[eurostack.eu](https://eurostack.eu/).

## Ce que l’Europe a déjà

- **Du calcul.** L’entreprise commune EuroHPC exploite 19
  [AI Factories](https://www.eurohpc-ju.europa.eu/ai-factories_en), et JUPITER est le premier
  système exaflopique européen. L’[appel AI Gigafactories](https://www.eurohpc-ju.europa.eu/call-tenders-selection-artificial-intelligence-gigafactory-consortia-and-establishment-ai_en)
  est ouvert pour jusqu’à sept sites de 25 000 à 100 000 équivalents H100 chacun ; la sélection est
  attendue en 2027.
- **Des données.** L’Alliance pour les technologies du langage (ALT-EDIC), l’espace européen des
  données linguistiques et les espaces européens communs de données existent déjà pour mettre des
  données au service de l’IA. Un modèle fédéré leur offre un usage où les données n’ont pas à être
  cédées.
- **Un modèle de base.** Mistral Large 4 et le modèle EUROPA de 400 milliards de paramètres financé
  par la Commission sont des candidats, si leurs licences permettent d’entraîner et de
  redistribuer des dérivés. OpenEuroLLM, retardé faute de calcul, montre ce qui arrive à un bon
  projet de modèle qui n’obtient pas de GPU.
- **Un cadre juridique, avec des trous.** Selon l’AI Act, le fournisseur d’un modèle d’IA à usage
  général construit par un consortium est
  [en général « le coordinateur ou le consortium lui-même »](https://artificialintelligenceact.eu/gpai-guidelines-overview/).
  Un modèle de frontière dépasserait le seuil de 10²⁵ opérations du risque systémique, où
  l’exemption open source ne s’applique plus : il faut donc que quelqu’un assume ces obligations.
  Quant à savoir si des poids entraînés sur des données personnelles sont eux-mêmes des données
  personnelles, la réponse doit encore venir du CEPD.

## MeluXina-AI en chiffres

[MeluXina-AI](https://www.eurohpc-ju.europa.eu/eurohpc-ju-signs-contract-meluxina-ai-new-ai-optimised-supercomputer-luxembourg-ai-factory-2026-07-22_en)
est le cœur de l’AI Factory luxembourgeoise. Il comptera 252 nœuds et 1 008 GPU NVIDIA Blackwell,
répartis sur deux sites, Bissen et Bettembourg. Il coûte 112 millions d’euros, partagés entre
EuroHPC et l’État luxembourgeois, et sera exploité par
[LuxProvide](https://www.luxprovide.lu/meluxina-ai/), qui fait déjà tourner le supercalculateur
MeluXina. Le contrat a été signé en juillet 2026 et l’installation commence cet automne : je
m’attends à ce qu’il soit utilisable en 2027.

Pour le comparer à un entraînement de frontière, je compte les opérations. Avec un rendement
réaliste, la machine entière tournant pendant un an fournirait environ 3×10²⁵ opérations, à peu
près ce qu’a demandé GPT-4 en 2022. Une allocation réaliste, une part de la machine pendant
quelques mois, se situe plutôt autour de 10²³, la taille des plus gros entraînements
décentralisés à ce jour. La première preuve de concept de Tapestry utilisait 16 GPU ; MeluXina-AI
en a soixante fois plus, chacun deux à trois fois plus rapide.

C’est donc un nœud solide, pas un laboratoire de frontière. Les entraînements de frontière de 2026
sont estimés à plusieurs fois 10²⁶ opérations. Il faudrait quelques dizaines de machines comme
MeluXina-AI, dans des pays différents, entraînant le même modèle, pour atteindre cette échelle.
C’est exactement le cas pour lequel Tapestry est conçu, et exactement la raison pour laquelle
l’Europe a besoin des AI Gigafactories en plus des AI Factories.

## Ce qu’un consortium aurait besoin d’obtenir

Les GPU ne sont pas le plus difficile. La façon dont ils sont attribués, si.

1. **Un demandeur européen.** L’accès EuroHPC est réservé aux organisations de l’UE et des pays
   associés. L’AI Alliance est américaine : le nœud serait donc porté par une université, un centre
   de recherche ou une entreprise luxembourgeoise, qui contribuerait pour le compte du consortium.
2. **Des allocations qui durent.** Le calcul est attribué par projet, en heures-nœuds, pour une
   durée limitée, via des appels pour la science, pour l’industrie et pour les start-up. Un
   consortium s’entraîne par tours, chacun pouvant durer une journée ou plus, répétés pendant des
   mois. Il lui faut une allocation pluriannuelle, avec une part prévisible de la machine.
3. **Un accès réseau.** Chaque nœud échange des poids avec un coordinateur via internet. Le
   prototype de Tapestry utilise le framework Flower, qui a besoin de connexions sortantes depuis
   les nœuds de calcul. Les centres de supercalcul les restreignent souvent. C’est la première
   question technique à poser à l’exploitant.
4. **Des conditions adaptées aux deux résultats.** Certaines voies d’accès demandent que les
   résultats soient publiés, ce qui convient à un modèle partagé ouvert. D’autres, pour des
   travaux propriétaires, ont d’autres conditions. Un nœud qui entraîne à la fois la base partagée
   et des dérivés privés a besoin de conditions qui couvrent les deux.
5. **Un coordinateur sous juridiction européenne.** Le coordinateur de référence tourne aujourd’hui
   dans le compte AWS de l’AI Alliance. Un nœud européen devrait envoyer ses poids à un
   coordinateur de confiance, ou en faire tourner un.

Rien de tout cela n’est difficile à changer. Ce sont des décisions d’EuroHPC, de LuxProvide et du
gouvernement luxembourgeois, et il faut que quelqu’un les demande.

## Ce que le Luxembourg apporterait

Un nœud vaut plus que ses GPU s’il apporte des données que personne d’autre n’a. Le Luxembourg en a :

- **Des langues.** Le luxembourgeois, que peu de modèles maîtrisent, et une administration qui
  travaille en trois langues, avec une législation, des débats parlementaires et des archives de
  radiodiffusion publique qui pourraient être contribués ou utilisés localement.
- **La finance.** L’une des principales places financières d’Europe, avec une documentation
  réglementaire et de fonds en plusieurs langues, et des institutions qui ont besoin de modèles
  qu’elles peuvent auditer.
- **Les institutions européennes.** Plusieurs organes de l’UE sont installés au Luxembourg, avec
  leurs propres corpus multilingues.
- **La juridiction.** Un nœud soumis au droit luxembourgeois, hors de portée du CLOUD Act, pour les
  données qui ne peuvent aller nulle part ailleurs.

Ce serait aussi le premier nœud européen d’un consortium aujourd’hui indien, australien et
américain.

## Comment les organisations pourraient l’utiliser

Supposons que l’infrastructure suive : des nœuds européens existent, le modèle partagé est un
modèle à poids ouverts crédible, et les dérivés souverains peuvent être hébergés sur des clouds
européens. Voici comment différentes organisations s’en serviraient.

**Une institution européenne ou une administration nationale.** Elle contribue au pré-entraînement
continu avec des documents qu’elle contrôle : législation, jurisprudence, traductions, procédures,
dans toutes ses langues de travail. Les documents publics peuvent aller dans la base partagée. Les
documents internes ne vont que dans son dérivé souverain, entraîné sur le même nœud national,
utilisé pour la rédaction, la traduction et la recherche, et hébergé dans son propre centre de
données ou sur un cloud de niveau d’assurance élevé selon le
[cadre de souveraineté cloud](/fr/blog/cadre-europeen-souverainete-cloud) de la Commission. Elle
obtient un modèle qui parle ses langues et connaît ses procédures, sans que ses documents
échappent à son contrôle.

**Une banque ou un administrateur de fonds.** Elle ne verse probablement pas de données clients
dans la base partagée : le risque de fuite n’est pas acceptable. Elle contribue, le cas échéant,
via un dérivé sectoriel entraîné avec d’autres établissements financiers sur de la documentation
réglementaire et produit. Ce qu’elle y gagne : un modèle qu’elle peut auditer, versionner et
exploiter elle-même, avec un plan de sortie crédible. Sous DORA, remplacer la dépendance à une API
de modèle américaine par des poids ouverts que plusieurs fournisseurs européens peuvent héberger,
c’est un risque de concentration qu’elle peut réellement réduire.

**Un réseau hospitalier.** Les données des patients ne quittent jamais les hôpitaux. Chacun
entraîne sur son propre nœud, et seules les mises à jour de poids vont vers un dérivé santé
partagé par le réseau, avec confidentialité différentielle et agrégation sécurisée activées : ici,
les protections que Tapestry repousse à plus tard deviennent obligatoires. Le résultat est un
modèle clinique entraîné sur la pratique et les langues européennes, qu’aucun hôpital n’aurait pu
entraîner seul.

**Une entreprise sans données à contribuer.** La plupart des entreprises n’entraîneront rien.
Elles appelleront un dérivé souverain via une API compatible OpenAI chez un fournisseur européen
(OVHcloud, Scaleway, STACKIT, IONOS, Clever Cloud et d’autres hébergent ou servent déjà des modèles
à poids ouverts), ou l’exploiteront dans leur propre environnement. Le bénéfice pour elles n’est
pas idéologique : c’est un modèle assez bon pour leurs cas d’usage, dont les conditions ne peuvent
pas changer du jour au lendemain.

## Ce qu’on peut faire dès maintenant

Rien de tout cela n’exige que le modèle existe déjà. Une organisation peut :

- inventorier les données qui pourraient valoir la peine d’être contribuées, avec leur licence et
  leur sensibilité, comme l’exige le catalogue de Tapestry ;
- séparer ce qui pourrait aller dans une base partagée de ce qui ne peut aller que dans un dérivé
  privé ;
- construire ses applications derrière une interface indépendante du modèle, pour que passer d’une
  API américaine à un modèle à poids ouverts soit un changement de configuration, pas un projet ;
- écrire des jeux d’évaluation dans ses propres langues et domaines, pour juger n’importe quel
  modèle sur son travail plutôt que sur des benchmarks publics ;
- pour les organismes publics et les centres de recherche au Luxembourg : ouvrir dès maintenant la
  discussion avec LuxProvide et l’AI Factory sur des allocations longues et multipartites, avant
  l’ouverture de MeluXina-AI.

Le Luxembourg est petit, et c’est justement l’intérêt. Si un pays de 680 000 habitants peut faire
tourner un nœud utile dans un modèle de frontière partagé, l’argument selon lequel l’IA souveraine
est réservée aux grands États ne tient plus.

Si vous cherchez ce que l’IA souveraine pourrait signifier pour votre organisation, de
l’inventaire des données à l’hébergement d’un modèle à poids ouverts sur une infrastructure
européenne, [parlons-en](/fr#contact).
