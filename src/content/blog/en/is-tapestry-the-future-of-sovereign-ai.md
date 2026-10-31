---
title: 'Is Tapestry the future of sovereign AI?'
description: 'The AI Alliance wants countries and organisations to train one open frontier model together without sharing their data. Why I think the idea could change the game for Europe and other countries outside the US and China, and what stands in its way today.'
date: '2026-11-05'
lang: en
tags: [digital-sovereignty, sovereign-ai, open-source, public-sector]
draft: true
translationOf: fr/tapestry-avenir-de-l-ia-souveraine
---

Most "sovereign AI" plans I see in Europe end up with the same compromise: a model that runs on
European infrastructure, under European control, and that is clearly weaker than what
Anthropic, OpenAI or Google sell. Sovereignty then becomes a cost that each team has to justify
against a better product one API call away. That is not a sustainable position.

[Project Tapestry](https://thealliance.ai/projects/tapestry), launched by the AI Alliance in April
2026, starts from a different question: what if many countries and organisations could train one
open model together, each on its own data and its own compute, without ever handing that data
over? I think that idea deserves more attention than it gets in Europe, and more scrutiny than the
announcement gives it. This article does both. A second one looks at what it would take in
practice, with Luxembourg's new AI supercomputer as an example.

I am not involved in Tapestry. Everything below comes from the project's public pages, its
[GitHub repository](https://github.com/The-AI-Alliance/tapestry) and published research, as of
the end of October 2026.

## The gap is a bill, not a talent problem

Frontier models are expensive because of compute. Epoch AI estimates that GPT-4 needed about
2×10²⁵ operations to train in 2022. The largest runs of 2025 and 2026 are estimated at several
times 10²⁶, on data centres that now hold the equivalent of 750,000 to more than a million H100
GPUs each ([Epoch AI, data centres](https://epoch.ai/data/data-centers)). A single training run
costs hundreds of millions of dollars, before salaries, failed runs and post-training.

Open-weight models are not far behind. Epoch measured a gap of about four months between the
best open and the best closed models in 2026
([Epoch AI](https://epoch.ai/data-insights/open-closed-eci-gap)). But look at who leads the open
side: Kimi, GLM, DeepSeek, Qwen, MiniMax. The best open models are Chinese, trained centrally on
Chinese clusters. Europe's position is better than a year ago, with Mistral releasing the weights
of Large 4 (around a trillion parameters) on 29 October, but one company cannot carry a continent.

No single country outside the US and China can pay for frontier runs year after year, and very
few want to. The question is whether they can pay for them together, without one of them, or one
company, ending up in control.

## What Tapestry proposes

The project calls it "consortium training". The design, as described in the repository:

1. **A shared base model.** Participants (national labs, universities, companies) each run
   training locally on their own data, then send their updated model weights to a coordinator.
2. **Weights move, data does not.** The coordinator averages the weights it receives, weighted by
   quality, and sends the merged model back for the next round. Raw corpora are never shipped;
   contributors only describe their datasets in a catalogue.
3. **Sovereign derivatives.** On top of the shared base, each participant can build its own model
   with private data and post-training. That derivative stays theirs: they can keep it, license it
   or sell it.
4. **An open commons.** The draft plan and the current requirements say the shared model will be
   released as open weights under Apache 2.0, with code under Apache 2.0 and contributed data
   under CDLA-Permissive-2.0.

The organisers sum it up as "decentralised contribution, centralised technical integration,
trusted governance". Yann LeCun is the project's chief science advisor. The first partners are
BharatGen (India), Monash University (Australia), Flower Labs, Aitomatic and Stony Brook
University, with OpenMined, Common Crawl and the GSMA joining for the next milestone.

What exists today is modest, and the team says so. Milestone Zero, completed on 1 September 2026,
ran two proofs of concept: two sites tuning 3B and 7B models on separate slices of a dataset and
merging their changes, and a continued pre-training run on two cloud sites, Sydney and Virginia,
with 16 H100 GPUs and 12 billion tokens. Their own repository says it plainly: none of the
candidate architectures "have been validated at frontier scale with culturally non-IID data".

## Why it could change the game

Despite the small start, I think the architecture answers the right question. Three things make
it different from every sovereign model project I know.

**Compute becomes rentable without giving up the data.** In Tapestry, a participant can train on
any infrastructure it can get, and only the resulting weights leave. The asset that matters, the
corpus, is never published or pooled. This separates two things that sovereignty debates usually
mix up: where the GPUs are, and who controls the data and the final model. A ministry, a
university or a company can contribute without first building a 100,000-GPU cluster.

**The data advantage changes sides.** The frontier labs have already used most of the public
web. What they cannot get is everything that never reaches the web: case law and administrative
records in 24 languages, statistical archives, technical documentation in regulated industries,
national broadcasting archives, languages with a few million speakers. Under the current model,
the only way to put that knowledge into a frontier model is to hand it to a US or Chinese company.
Tapestry offers a way to use it while keeping it.

**The cost is shared and nobody owns the result.** India, the EU member states, Japan, Korea,
Australia, Canada, the Gulf states, Brazil: none can justify a 300-million-dollar run alone every
year, but together they could. Because the base is open and the coordinator is meant to be a
governed role, not an owner, no participant can switch the others off or change the licence
later. The project calls it "anti-capture", and puts it this way: "enforce the notion of
sovereignty through the architecture and not just policy".

The design is also flexible about where it starts. The base does not have to be trained from
scratch: the aggregation step can take any open model and continue its training. Europe could
start from an open European base, such as Mistral Large 4 or the 400-billion-parameter model the
Commission funded through its
[Frontier AI Grand Challenge](https://digital-strategy.ec.europa.eu/en/news/commission-selects-europa-consortium-winner-frontier-ai-grand-challenge-project-build-european-open),
and use the consortium to add what no single lab has: the data.

## Where it breaks today

That is the promise. Here is what has to be true for it to hold, and where the evidence stands.

### Frontier scale has not been shown

The research on training across distant sites is real. Google DeepMind's
[DiLoCo](https://arxiv.org/abs/2311.08105) matched normal training while communicating 500 times
less, and later work showed it scales predictably with model size. In practice, the largest model
pretrained across independent sites so far is Covenant-72B (March 2026, about 1.1 trillion
tokens). Prime Intellect trained INTELLECT-1 (10B) across three continents in 2024, then moved
its larger work back to a single cluster.

Epoch AI estimates that decentralised runs are
[about 1,000 times below the frontier](https://epoch.ai/gradient-updates/how-far-can-decentralized-training-over-the-internet-scale)
in compute. Their growth is faster, but Epoch's conclusion is that decentralised developers are
unlikely to gather frontier amounts of compute this decade. The algorithm is not the bottleneck.
The GPUs are.

So Tapestry does not remove the need for large clusters. It lets several large clusters, owned
by different countries, train one model instead of several mediocre ones. That is valuable, but
only if those clusters exist.

### Convergence with very different data is an open question

Averaging models works well when sites see similar data. When they do not, models drift apart
and merging degrades them. Research from Flower Labs and others shows that pretraining is fairly
resilient to this up to 7B parameters, and Ai2's FlexOlmo merges experts trained by separate data
owners. But every published result uses a handful of parties with simulated differences, not
dozens of countries with different languages and values.

Milestone Zero also found that merging less often made results about a third worse, and that
cultural tuning moved a model's answers to value surveys without changing how it behaved. The
team reported both, which I appreciate. They show that "everyone adds their data and the model
converges" is a research programme, not a given.

### Weights can leak data

This is the part of the promise I would challenge first. Sharing weights instead of data is not
the same as keeping data confidential. A model memorises part of what it sees, more so as it
grows and when text is repeated ([Carlini et al.](https://arxiv.org/abs/2202.07646)). If the
shared model is published as open weights, whatever it memorised is published too. Attacks that
test whether a document was in the training set work well against fine-tuned models, and they
are easier when the attacker has the base model, which in Tapestry everyone has. Formal
protection exists but is costly: Google's VaultGemma, trained with differential privacy, performs
roughly like models from 2019.

Tapestry's own documents are honest about this. Privacy is planned in tiers, from legal
agreements to differential privacy, secure aggregation and confidential computing, and only the
first tiers are in scope for now. One question is still open in their list: under EU law, is
sending weights trained on personal data a transfer of personal data?

### The data still sits on someone's GPUs

The argument "train anywhere, share only weights" has a second limit. While a model trains, the
data is decrypted in the memory of the GPUs that process it. If those GPUs belong to a US
hyperscaler, the data is within reach of the CLOUD Act for that time, wherever the data centre
is. Microsoft France's director of legal affairs
[told the French Senate under oath in June 2025](https://www.sdxcentral.com/news/microsoft-tells-french-lawmakers-it-cant-protect-user-data-from-us-demands/)
that he could not guarantee French data would never be handed to US authorities. Confidential
computing on recent GPUs reduces this exposure, but its roots of trust are American, and no court
has yet ruled on whether it is enough.

The proofs of concept ran on AWS, and the reference coordinator runs in the AI Alliance's AWS
account. That is fine for experiments on public data. For sensitive data, I would draw the line
differently from the slogan: **the infrastructure that trains the shared model can be anyone's,
but the node that touches your sensitive data must be under your jurisdiction.** That is still a
big change. You do not need a sovereign frontier cluster; you need a sovereign node of a few
hundred GPUs.

### Governance, money and Europe are missing

As of today there is no legal entity for the project, no signed data framework, no published
budget, and no compute commitment beyond cloud credits. The draft plan aimed for European and
Japanese nodes by the summer; I found no trace of them. In October the next milestone was
refocused on federated retrieval (RAG) between two partners, and weight-level training moved to
the milestone after.

Most striking for a European reader: no European organisation has publicly joined. European
research groups attended the first workshop in Paris, but the consortium today is Indian,
Australian and American.

## What Europe would have to bring

Europe has most of the pieces: 19 EuroHPC
[AI Factories](https://www.eurohpc-ju.europa.eu/ai-factories_en) and up to seven AI Gigafactories
under selection, data-sharing structures such as the Alliance for Language Technologies, open
European base models, and an AI Act that already says who the provider of a consortium model is.
It also has a frame for the whole question, the [EuroStack](https://www.euro-stack.info/)
proposal, which reminds us that a model is only the top layer of a stack Europe mostly does not
control. What is missing is the connection between these pieces, and a decision to join an open
commons rather than build a parallel one.

In a second article, I take one of those pieces, Luxembourg's MeluXina-AI supercomputer, and
work through what it would take to make it a Tapestry node, and how organisations could use the
result.

## My answer

Is Tapestry the future of sovereign AI? I think the idea is. Training one open model together,
each on our own data and infrastructure, and sharing only the result, is the first approach I
have seen that could give countries outside the US and China a frontier model without asking
them to trust a single company or a single government. It turns the question from "can we afford
a frontier lab?" into "can we agree on how to share one?", which is a question Europe knows how to
answer.

The project, as it stands, is not there. It has shown that the mechanics work on small models,
it has not shown that the model converges at scale, it has not solved leakage through weights,
and it has no European participant and no committed compute. Some of that is normal for a
seven-month-old project. Some of it depends on decisions only governments can take.

What I will watch in 2027:

- the first Tapestry base model, its size and its licence;
- the first European node, and whether it runs on EuroHPC infrastructure;
- secure aggregation and differential privacy in use, not on the roadmap;
- a consortium run in the 10²⁴ range or above, which would put it among serious open models;
- whether the AI Gigafactories reserve capacity for open, multi-country models rather than only
  for single companies.

If you are working out what sovereign AI could mean for your organisation, [get in touch](/#contact).
