---
title: 'Could MeluXina-AI train a sovereign model?'
description: 'Luxembourg is installing a 1,008-GPU AI supercomputer. What it could do as a node in a federated, open model like Tapestry, what would have to change in how compute is granted, and how organisations could use the result.'
date: '2026-11-12'
lang: en
tags: [sovereign-cloud, sovereign-ai, public-sector, cloud-architecture]
draft: true
translationOf: fr/meluxina-ai-peut-il-entrainer-un-modele-souverain
---

In [a previous article](/blog/is-tapestry-the-future-of-sovereign-ai) I looked at Project
Tapestry, the AI Alliance's plan to train one open model across many countries, each on its own
data and compute, sharing only the weights. My conclusion was that the idea could give Europe a
frontier-class model it controls, but that the project has no European participant and no
committed compute yet.

This article takes the practical side, with an example close to me. Luxembourg is installing
MeluXina-AI, a supercomputer for AI. Could it be a Tapestry node? What would it bring, what would
have to change, and how would organisations use the model that comes out of it?

The figures come from public sources as of the end of October 2026. The compute estimates are
mine and are orders of magnitude, not benchmarks.

## The model is only the top layer

Before looking at GPUs, it helps to remember what a sovereign model sits on. The
[EuroStack](https://www.euro-stack.info/) report, commissioned by the Bertelsmann Stiftung and
published in February 2025, describes the digital stack as seven layers: raw materials, chips,
networks, devices, cloud, software, and data and AI. It shows how few of them Europe controls,
proposes €300 billion over ten years to change that, and names "SovereignAI" and "DataCommons", a
federated data exchange, among its building blocks.

Tapestry fits the top of that stack well: data stays with its owners, and the result is a commons.
EuroStack is a useful reminder of its limits. The GPUs in every European node are American, and a
model trained on a stack that can be switched off from abroad is only sovereign at the top. It
also shows that the frame is not yet policy: the Commission's Technological Sovereignty Package
of 3 June 2026 did not include the binding "Buy European" rule that the industry coalition behind
[eurostack.eu](https://eurostack.eu/) had asked for.

## What Europe already has

- **Compute.** The EuroHPC Joint Undertaking runs 19
  [AI Factories](https://www.eurohpc-ju.europa.eu/ai-factories_en), and JUPITER is Europe's first
  exascale system. The
  [AI Gigafactories call](https://www.eurohpc-ju.europa.eu/call-tenders-selection-artificial-intelligence-gigafactory-consortia-and-establishment-ai_en)
  is open for up to seven sites of 25,000 to 100,000 H100 equivalents each; selection is expected
  in 2027.
- **Data.** The Alliance for Language Technologies (ALT-EDIC), the Language Data Space and the
  Common European Data Spaces already exist to pool data for AI. A federated model gives them a
  use where the data does not have to be handed over.
- **A base model.** Mistral Large 4 and the 400-billion-parameter EUROPA model funded by the
  Commission are candidates, if their licences allow derivatives to be trained and redistributed.
  OpenEuroLLM, delayed by lack of compute, shows what happens when a good model project does not
  get GPUs.
- **A legal frame, with gaps.** Under the AI Act, the provider of a general-purpose model built by
  a consortium is
  [typically "the coordinator or the consortium itself"](https://artificialintelligenceact.eu/gpai-guidelines-overview/).
  A frontier model would exceed the 10²⁵ threshold for systemic risk, where the open-source
  exemption no longer applies, so someone must take on those obligations. Whether weights
  trained on personal data are themselves personal data still needs an answer from the EDPB.

## MeluXina-AI in numbers

[MeluXina-AI](https://www.eurohpc-ju.europa.eu/eurohpc-ju-signs-contract-meluxina-ai-new-ai-optimised-supercomputer-luxembourg-ai-factory-2026-07-22_en)
is the core of the Luxembourg AI Factory. It will have 252 nodes and 1,008 NVIDIA Blackwell GPUs,
on two sites, Bissen and Bettembourg. It costs €112 million, shared between EuroHPC and the
Luxembourg State, and will be operated by [LuxProvide](https://www.luxprovide.lu/meluxina-ai/),
which already runs the MeluXina supercomputer. The contract was signed in July 2026 and
installation starts this autumn, so I expect it to be usable in 2027.

To compare it with frontier training, I count operations. With a realistic efficiency, the whole
machine running for a year would deliver about 3×10²⁵ operations, roughly what GPT-4 needed in
2022. A realistic allocation, a share of the machine for a few months, is closer to 10²³, the size
of the largest decentralised training runs so far. Tapestry's first proof of concept used 16
GPUs; MeluXina-AI has sixty times as many, each two to three times faster.

That makes it a strong node, not a frontier lab. Frontier runs in 2026 are estimated at several
times 10²⁶ operations. A few dozen machines like MeluXina-AI, in different countries, training the
same model, is what that scale would take. This is exactly the case Tapestry is designed for, and
exactly why Europe needs the AI Gigafactories on top of the AI Factories.

## What a consortium would need from it

The GPUs are not the hard part. How they are granted is.

1. **A European applicant.** EuroHPC access goes to organisations in the EU and associated
   countries. The AI Alliance is American, so the node would be run by a Luxembourg university,
   research centre or company, contributing on behalf of the consortium.
2. **Allocations that last.** Compute is granted per project, in node-hours, for a limited period,
   through calls for science, for industry and for start-ups. A consortium trains in rounds, each
   of which can run for a day or more, repeated over months. That needs a multi-year allocation
   with a predictable share of the machine.
3. **Network access.** Each node exchanges weights with a coordinator over the internet. Tapestry's
   prototype uses the Flower framework, which needs outbound connections from the compute nodes.
   Supercomputing centres often restrict these. It is the first technical question to ask the
   operator.
4. **Terms that fit both outputs.** Some access tracks expect results to be published, which
   suits an open shared model. Others, for proprietary work, come with different conditions. A
   node that trains both the shared base and private derivatives needs terms that cover both.
5. **A coordinator under European jurisdiction.** The reference coordinator runs in the AI
   Alliance's AWS account today. A European node should send its weights to a coordinator it can
   trust, or run one.

None of these is hard to change. They are decisions for EuroHPC, LuxProvide and the Luxembourg
government, and someone has to ask for them.

## What Luxembourg would bring

A node is worth more than its GPUs if it brings data nobody else has. Luxembourg has some:

- **Languages.** Luxembourgish, which few models handle well, and an administration that works in
  three languages, with legislation, parliamentary records and public broadcasting archives that
  could be contributed or used locally.
- **Finance.** One of Europe's main financial centres, with regulatory and fund documentation in
  several languages, and institutions that need models they can audit.
- **European institutions.** Several EU bodies are based in Luxembourg, with multilingual
  corpora of their own.
- **Jurisdiction.** A node under Luxembourg law, outside the reach of the CLOUD Act, for the data
  that cannot go anywhere else.

It would also be the first European node in a consortium that today is Indian, Australian and
American.

## How organisations could use it

Suppose the infrastructure follows: European nodes exist, the shared model is a credible
open-weight model, and sovereign derivatives can be hosted on European clouds. Here is how
different organisations would use it.

**An EU institution or national administration.** It contributes continued pre-training on
documents it controls: legislation, case law, translations, procedures, in all its working
languages. Public documents can go into the shared base. Internal documents go only into its
sovereign derivative, trained on the same national node, used for drafting, translation and
search, and hosted in its own data centre or on a cloud with a high assurance level under the
Commission's [Cloud Sovereignty Framework](/blog/eu-cloud-sovereignty-framework). It gets a model
that speaks its languages and knows its procedures, without its documents leaving its control.

**A bank or fund administrator.** It probably does not contribute customer data to the shared
base: the leakage risk is not acceptable. It contributes, if anything, through a sector derivative
trained with other financial institutions on regulatory and product documentation. What it gains
is a model it can audit, version and run itself, with a credible exit plan. Under DORA, replacing a
dependency on one US model API with open weights that several European providers can host is a
concentration risk it can actually reduce.

**A hospital network.** Patient data never leaves the hospitals. Each one trains on its own node,
and only weight updates go to a health derivative shared by the network, with differential privacy
and secure aggregation switched on: here, the privacy measures that Tapestry treats as later steps
become mandatory. The result is a clinical model trained on European practice and languages,
which no hospital could train alone.

**A company with no data to contribute.** Most companies will not train anything. They will call a
sovereign derivative through an OpenAI-compatible endpoint at a European provider (OVHcloud,
Scaleway, STACKIT, IONOS, Clever Cloud and others already host or serve open-weight models), or run
it in their own environment. The benefit for them is not ideological: it is a model good enough
for their use cases, whose terms cannot change overnight.

## What to do now

None of this needs the model to exist yet. An organisation can:

- inventory the data that could be worth contributing, with its licence and sensitivity, as the
  Tapestry catalogue requires;
- separate what could go into a shared base from what may only go into a private derivative;
- build applications behind a model-agnostic interface, so that switching from a US API to an
  open-weight model is a configuration change, not a project;
- write evaluation sets in its own languages and domains, to judge any model on its work rather
  than on public benchmarks;
- for public bodies and research centres in Luxembourg: start the conversation with LuxProvide and
  the AI Factory about long-running, multi-party allocations before MeluXina-AI opens.

Luxembourg is small, which is the point. If a country of 680,000 people can run a useful node in a
shared frontier model, the argument that sovereign AI is only for large states stops holding.

If you are working out what sovereign AI could mean for your organisation, from data inventory to
hosting an open-weight model on European infrastructure, [get in touch](/#contact).
