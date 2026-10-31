---
title: 'Tapestry est-il l’avenir de l’IA souveraine ?'
description: 'L’AI Alliance veut que des pays et des organisations entraînent ensemble un modèle ouvert de niveau frontière, sans partager leurs données. Pourquoi l’idée pourrait changer la donne pour l’Europe et les pays hors États-Unis et Chine, et ce qui lui barre la route aujourd’hui.'
date: '2026-11-05'
lang: fr
tags: [digital-sovereignty, sovereign-ai, open-source, public-sector]
draft: true
translationOf: en/is-tapestry-the-future-of-sovereign-ai
---

La plupart des projets d’« IA souveraine » que je vois en Europe aboutissent au même compromis : un
modèle qui tourne sur une infrastructure européenne, sous contrôle européen, et nettement moins
bon que ce que vendent Anthropic, OpenAI ou Google. La souveraineté devient alors un coût que
chaque équipe doit justifier face à un meilleur produit, à un appel d’API près. Ce n’est pas une
position tenable.

Le [projet Tapestry](https://thealliance.ai/projects/tapestry), lancé par l’AI Alliance en avril
2026, part d’une autre question : et si de nombreux pays et organisations pouvaient entraîner
ensemble un seul modèle ouvert, chacun sur ses propres données et sa propre puissance de calcul,
sans jamais céder ces données ? Je pense que cette idée mérite plus d’attention qu’elle n’en
reçoit en Europe, et plus d’esprit critique que l’annonce n’en montre. Cet article fait les deux.
Un second regarde ce qu’il faudrait en pratique, avec le nouveau supercalculateur IA du
Luxembourg comme exemple.

Je ne suis pas impliqué dans Tapestry. Tout ce qui suit vient des pages publiques du projet, de
son [dépôt GitHub](https://github.com/The-AI-Alliance/tapestry) et de travaux publiés, à la fin
d’octobre 2026.

## L’écart est une facture, pas un problème de talent

Les modèles de frontière coûtent cher à cause du calcul. Epoch AI estime que GPT-4 a demandé
environ 2×10²⁵ opérations d’entraînement en 2022. Les plus gros entraînements de 2025 et 2026
sont estimés à plusieurs fois 10²⁶, dans des centres de données qui hébergent désormais
l’équivalent de 750 000 à plus d’un million de GPU H100 chacun
([Epoch AI, centres de données](https://epoch.ai/data/data-centers)). Un seul entraînement coûte
des centaines de millions de dollars, sans compter les salaires, les essais ratés et le
post-entraînement.

Les modèles à poids ouverts ne sont pas loin derrière. Epoch mesure un écart d’environ quatre
mois entre les meilleurs modèles ouverts et les meilleurs modèles fermés en 2026
([Epoch AI](https://epoch.ai/data-insights/open-closed-eci-gap)). Mais regardez qui mène côté
ouvert : Kimi, GLM, DeepSeek, Qwen, MiniMax. Les meilleurs modèles ouverts sont chinois, entraînés
de façon centralisée sur des grappes chinoises. La position de l’Europe s’est améliorée en un an,
avec Mistral qui a publié le 29 octobre les poids de Large 4 (environ mille milliards de
paramètres), mais une entreprise ne peut pas porter un continent.

Aucun pays hors des États-Unis et de la Chine ne peut payer seul des entraînements de frontière
année après année, et très peu le souhaitent. La question est de savoir s’ils peuvent les payer
ensemble, sans que l’un d’eux, ou une entreprise, finisse par en prendre le contrôle.

## Ce que propose Tapestry

Le projet parle d’« entraînement en consortium ». Le principe, tel que décrit dans le dépôt :

1. **Un modèle de base partagé.** Les participants (laboratoires nationaux, universités,
   entreprises) entraînent chacun localement sur leurs propres données, puis envoient les poids
   mis à jour du modèle à un coordinateur.
2. **Les poids circulent, pas les données.** Le coordinateur fait la moyenne des poids reçus,
   pondérée par leur qualité, et renvoie le modèle fusionné pour le tour suivant. Les corpus bruts
   ne sont jamais envoyés ; les contributeurs décrivent seulement leurs jeux de données dans un
   catalogue.
3. **Des dérivés souverains.** Sur la base partagée, chaque participant peut construire son
   propre modèle avec des données privées et son propre post-entraînement. Ce dérivé lui
   appartient : il peut le garder, le concéder sous licence ou le vendre.
4. **Un bien commun ouvert.** Le plan de travail et les exigences actuelles prévoient de publier
   le modèle partagé en poids ouverts sous Apache 2.0, avec le code sous Apache 2.0 et les données
   contribuées sous CDLA-Permissive-2.0.

Les organisateurs le résument ainsi : « contribution décentralisée, intégration technique
centralisée, gouvernance de confiance ». Yann LeCun en est le conseiller scientifique en chef. Les
premiers partenaires sont BharatGen (Inde), l’université Monash (Australie), Flower Labs, Aitomatic
et l’université Stony Brook, rejoints par OpenMined, Common Crawl et la GSMA pour la prochaine
étape.

Ce qui existe aujourd’hui est modeste, et l’équipe le dit. Le Milestone Zero, terminé le
1er septembre 2026, a mené deux preuves de concept : deux sites qui ajustent des modèles de 3 et
7 milliards de paramètres sur des tranches séparées d’un jeu de données et fusionnent leurs
modifications, et un pré-entraînement continu sur deux sites cloud, Sydney et la Virginie, avec
16 GPU H100 et 12 milliards de tokens. Leur propre dépôt l’écrit sans détour : aucune des
architectures envisagées n’a été validée à l’échelle de la frontière avec des données
culturellement hétérogènes.

## Pourquoi cela pourrait changer la donne

Malgré ce début modeste, je pense que l’architecture répond à la bonne question. Trois choses la
distinguent de tous les projets de modèle souverain que je connais.

**Le calcul peut se louer sans céder les données.** Avec Tapestry, un participant peut entraîner
sur n’importe quelle infrastructure à sa disposition, et seuls les poids obtenus en sortent. L’actif
qui compte, le corpus, n’est jamais publié ni mis en commun. Cela sépare deux choses que les débats
sur la souveraineté confondent souvent : où se trouvent les GPU, et qui contrôle les données et le
modèle final. Un ministère, une université ou une entreprise peut contribuer sans construire
d’abord une grappe de 100 000 GPU.

**L’avantage des données change de camp.** Les laboratoires de frontière ont déjà utilisé
l’essentiel du web public. Ce qu’ils ne peuvent pas obtenir, c’est tout ce qui n’arrive jamais sur
le web : jurisprudence et actes administratifs en 24 langues, archives statistiques, documentation
technique des secteurs réglementés, archives des radiodiffuseurs nationaux, langues parlées par
quelques millions de personnes. Dans le modèle actuel, la seule façon de faire entrer ce savoir
dans un modèle de frontière est de le confier à une entreprise américaine ou chinoise. Tapestry
propose de l’utiliser tout en le gardant.

**Le coût est partagé et personne ne possède le résultat.** L’Inde, les États membres de l’UE, le
Japon, la Corée, l’Australie, le Canada, les pays du Golfe, le Brésil : aucun ne peut justifier
seul un entraînement à 300 millions de dollars chaque année, mais ensemble ils le pourraient.
Comme la base est ouverte et que le coordinateur doit être un rôle gouverné, pas un propriétaire,
aucun participant ne peut couper les autres ni changer la licence après coup. Le projet appelle
cela l’« anti-capture » et le formule ainsi : faire respecter la souveraineté par l’architecture,
pas seulement par des règles.

Le principe laisse aussi le choix du point de départ. La base n’a pas besoin d’être entraînée de
zéro : l’étape d’agrégation peut reprendre n’importe quel modèle ouvert et poursuivre son
entraînement. L’Europe pourrait partir d’une base européenne ouverte, comme Mistral Large 4 ou le
modèle de 400 milliards de paramètres financé par la Commission dans son
[Frontier AI Grand Challenge](https://digital-strategy.ec.europa.eu/en/news/commission-selects-europa-consortium-winner-frontier-ai-grand-challenge-project-build-european-open),
et utiliser le consortium pour ajouter ce qu’aucun laboratoire n’a seul : les données.

## Là où ça casse aujourd’hui

Voilà la promesse. Voici ce qui doit être vrai pour qu’elle tienne, et où en sont les preuves.

### L’échelle de la frontière n’a pas été démontrée

La recherche sur l’entraînement entre sites distants est sérieuse. [DiLoCo](https://arxiv.org/abs/2311.08105),
de Google DeepMind, a égalé un entraînement classique en communiquant 500 fois moins, et des
travaux ultérieurs ont montré que l’approche passe à l’échelle de façon prévisible. En pratique,
le plus gros modèle pré-entraîné entre sites indépendants à ce jour est Covenant-72B (mars 2026,
environ 1 100 milliards de tokens). Prime Intellect a entraîné INTELLECT-1 (10 milliards de
paramètres) sur trois continents en 2024, puis a ramené ses travaux plus ambitieux sur une seule
grappe.

Epoch AI estime que les entraînements décentralisés sont
[environ 1 000 fois en dessous de la frontière](https://epoch.ai/gradient-updates/how-far-can-decentralized-training-over-the-internet-scale)
en calcul. Ils progressent plus vite, mais Epoch conclut qu’il est peu probable que des acteurs
décentralisés réunissent une puissance de calcul de frontière d’ici la fin de la décennie.
L’algorithme n’est pas le goulot d’étranglement. Les GPU le sont.

Tapestry ne supprime donc pas le besoin de grandes grappes. Il permet à plusieurs grandes
grappes, détenues par des pays différents, d’entraîner un seul modèle au lieu de plusieurs modèles
médiocres. C’est précieux, mais seulement si ces grappes existent.

### La convergence avec des données très différentes reste ouverte

Faire la moyenne de modèles fonctionne bien quand les sites voient des données semblables. Sinon,
les modèles divergent et la fusion les dégrade. Des travaux de Flower Labs et d’autres montrent que
le pré-entraînement résiste assez bien à cela jusqu’à 7 milliards de paramètres, et FlexOlmo, d’Ai2,
fusionne des experts entraînés par des détenteurs de données distincts. Mais tous les résultats
publiés portent sur une poignée de participants aux différences simulées, pas sur des dizaines de
pays aux langues et aux valeurs différentes.

Le Milestone Zero a aussi constaté que fusionner moins souvent dégradait les résultats d’environ un
tiers, et qu’un ajustement culturel modifiait les réponses d’un modèle à des enquêtes de valeurs
sans changer son comportement. L’équipe a publié les deux résultats, ce que j’apprécie. Ils
montrent que « chacun ajoute ses données et le modèle converge » est un programme de recherche,
pas un acquis.

### Les poids peuvent faire fuiter des données

C’est la partie de la promesse que je contesterais en premier. Partager des poids plutôt que des
données ne revient pas à garder les données confidentielles. Un modèle mémorise une partie de ce
qu’il voit, d’autant plus qu’il est grand et que le texte est répété
([Carlini et al.](https://arxiv.org/abs/2202.07646)). Si le modèle partagé est publié en poids
ouverts, ce qu’il a mémorisé l’est aussi. Les attaques qui testent si un document faisait partie
des données d’entraînement fonctionnent bien sur des modèles ajustés, et plus encore quand
l’attaquant dispose du modèle de base, ce qui, dans Tapestry, est le cas de tout le monde. Il
existe des protections formelles, mais elles coûtent cher : VaultGemma, de Google, entraîné avec
une confidentialité différentielle, a des performances proches de celles des modèles de 2019.

Les documents de Tapestry sont honnêtes sur ce point. La protection de la vie privée est prévue
par paliers, des accords juridiques à la confidentialité différentielle, l’agrégation sécurisée et
l’informatique confidentielle, et seuls les premiers paliers sont dans le périmètre actuel. Une
question reste ouverte dans leur liste : en droit européen, envoyer des poids entraînés sur des
données personnelles constitue-t-il un transfert de données personnelles ?

### Les données passent quand même par les GPU de quelqu’un

L’argument « entraînez n’importe où, ne partagez que les poids » a une seconde limite. Pendant
l’entraînement, les données sont déchiffrées dans la mémoire des GPU qui les traitent. Si ces GPU
appartiennent à un hyperscaler américain, les données sont à portée du CLOUD Act pendant ce temps,
où que se trouve le centre de données. Le directeur des affaires juridiques de Microsoft France
[a déclaré sous serment au Sénat en juin 2025](https://www.sdxcentral.com/news/microsoft-tells-french-lawmakers-it-cant-protect-user-data-from-us-demands/)
qu’il ne pouvait pas garantir que des données françaises ne seraient jamais transmises aux
autorités américaines. L’informatique confidentielle sur les GPU récents réduit cette exposition,
mais ses racines de confiance sont américaines, et aucun tribunal n’a encore dit si elle suffit.

Les preuves de concept ont tourné sur AWS, et le coordinateur de référence tourne dans le compte
AWS de l’AI Alliance. Cela convient pour des expériences sur des données publiques. Pour des
données sensibles, je tracerais la ligne autrement que le slogan : **l’infrastructure qui entraîne
le modèle partagé peut appartenir à n’importe qui, mais le nœud qui touche vos données sensibles
doit relever de votre juridiction.** Cela reste un grand changement. Il ne vous faut pas une grappe
souveraine de frontière ; il vous faut un nœud souverain de quelques centaines de GPU.

### Il manque la gouvernance, l’argent et l’Europe

À ce jour, le projet n’a ni entité juridique, ni cadre de données signé, ni budget publié, ni
engagement de calcul au-delà de crédits cloud. Le plan de travail visait des nœuds européens et
japonais pour l’été ; je n’en ai trouvé aucune trace. En octobre, l’étape suivante a été recentrée
sur de la recherche augmentée fédérée (RAG) entre deux partenaires, et l’entraînement au niveau
des poids a été repoussé à l’étape d’après.

Le plus frappant pour un lecteur européen : aucune organisation européenne n’a rejoint le projet
publiquement. Des équipes de recherche européennes ont participé au premier atelier, à Paris, mais
le consortium est aujourd’hui indien, australien et américain.

## Ce que l’Europe devrait apporter

L’Europe a la plupart des pièces : 19
[AI Factories](https://www.eurohpc-ju.europa.eu/ai-factories_en) EuroHPC et jusqu’à sept AI
Gigafactories en cours de sélection, des structures de partage de données comme l’Alliance pour
les technologies du langage, des modèles de base européens ouverts, et un AI Act qui dit déjà qui
est le fournisseur d’un modèle de consortium. Elle a aussi un cadre pour l’ensemble de la question,
la proposition [EuroStack](https://www.euro-stack.info/), qui rappelle qu’un modèle n’est que la
couche supérieure d’une pile que l’Europe contrôle peu. Ce qui manque, c’est le lien entre ces
pièces, et la décision de rejoindre un bien commun ouvert plutôt que d’en construire un parallèle.

Dans un second article, je prends l’une de ces pièces, le supercalculateur MeluXina-AI au
Luxembourg, et j’examine ce qu’il faudrait pour en faire un nœud Tapestry, et comment des
organisations pourraient utiliser le résultat.

## Ma réponse

Tapestry est-il l’avenir de l’IA souveraine ? Je pense que l’idée l’est. Entraîner ensemble un
modèle ouvert, chacun sur ses données et son infrastructure, et ne partager que le résultat, est
la première approche que je vois qui pourrait donner aux pays hors des États-Unis et de la Chine un
modèle de frontière sans leur demander de faire confiance à une seule entreprise ou à un seul
gouvernement. Elle remplace la question « avons-nous les moyens d’un laboratoire de frontière ? »
par « pouvons-nous nous mettre d’accord pour en partager un ? », et c’est une question à laquelle
l’Europe sait répondre.

Le projet, en l’état, n’y est pas. Il a montré que la mécanique fonctionne sur de petits modèles,
il n’a pas montré que le modèle converge à grande échelle, il n’a pas résolu les fuites par les
poids, et il n’a ni participant européen ni calcul engagé. Une partie de cela est normale pour un
projet de sept mois. Une autre dépend de décisions que seuls les gouvernements peuvent prendre.

Ce que je surveillerai en 2027 :

- le premier modèle de base Tapestry, sa taille et sa licence ;
- le premier nœud européen, et s’il tourne sur une infrastructure EuroHPC ;
- l’agrégation sécurisée et la confidentialité différentielle en service, pas sur la feuille de
  route ;
- un entraînement en consortium de l’ordre de 10²⁴ opérations ou plus, qui le placerait parmi les
  modèles ouverts sérieux ;
- si les AI Gigafactories réservent de la capacité à des modèles ouverts et multinationaux, et pas
  seulement à des entreprises isolées.

Si vous cherchez ce que l’IA souveraine pourrait signifier pour votre organisation,
[parlons-en](/fr#contact).
