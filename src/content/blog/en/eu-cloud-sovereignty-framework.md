---
title: 'Reading the EU Cloud Sovereignty Framework'
description: 'How the European Commission turns cloud sovereignty into eight objectives, five assurance levels and a weighted score.'
date: '2026-10-29'
lang: en
tags: [sovereign-cloud, architecture, public-sector]
draft: false
translationOf: fr/cadre-europeen-souverainete-cloud
---

"Sovereign cloud" has been used to mean almost anything: a data centre in Europe, a European
subsidiary, a contract clause, a label on a product page. The European Commission's
[Cloud Sovereignty Framework](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en?filename=Cloud-Sovereignty-Framework.pdf)
takes a different approach. It breaks sovereignty into criteria that a buyer can assess and
score in a tender.

The document is short: six pages, version 1.2.1, published in October 2025 by the
Directorate-General for Digital Services (DG DIGIT). It was written for a Commission cloud
procurement, but I think it is useful well beyond that. I work with EU institutions and public
bodies on cloud architecture, and this is the clearest public definition of what they mean by
sovereignty that I have seen.

## Two mechanisms: a minimum level and a score

The framework assesses each cloud service in two ways.

1. **A minimum assurance level per objective.** For each of eight sovereignty objectives, the
   tender sets a minimum Sovereignty Effectiveness Assurance Level (SEAL). A tender that does not
   reach the minimum on every objective is rejected. This is pass or fail.
2. **A Sovereignty Score.** Among the tenders that pass, a weighted score ranks the services by
   their sovereignty features. It counts towards the quality part of the award.

The assessment draws on answers to the tender questionnaire, supporting evidence and the
provider's public documentation. The document also says the results can be used after the
contract is signed, to decide which systems can run on which provider according to their risk
profile.

## Eight objectives

| #     | Objective                     | What it looks at                                                                        | Weight |
| ----- | ----------------------------- | --------------------------------------------------------------------------------------- | -----: |
| SOV-1 | Strategic                     | Where decision-making power, ownership and financing sit; protection against change of control | 15% |
| SOV-2 | Legal & jurisdictional        | Governing law, exposure to non-EU laws with cross-border reach, where IP is created     |    10% |
| SOV-3 | Data & AI                     | Who controls the encryption keys, data location, access visibility, AI under EU control |    10% |
| SOV-4 | Operational                   | Running and supporting the service from the EU, portability, documentation, skills      |    15% |
| SOV-5 | Supply chain                  | Origin of hardware, firmware and software, reliance on non-EU vendors, audit rights     |    20% |
| SOV-6 | Technology                    | Open APIs and standards, open licences, transparency of the design, EU computing capacity |  15% |
| SOV-7 | Security & compliance         | Certifications, GDPR, NIS2, DORA, security operations under EU jurisdiction, audits     |    10% |
| SOV-8 | Environmental sustainability  | Energy efficiency, circular hardware practices, emissions reporting, low-carbon energy  |     5% |

Each objective comes with a list of contributing factors. One sentence in the document matters
a lot: a material weakness in any single factor lowers the level recognised for the whole
objective. A provider cannot make up for a weak point with strong ones elsewhere.

## Five assurance levels

| Level  | Name                     | In short                                                                                  |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------- |
| SEAL-0 | No sovereignty           | Exclusive control by non-EU parties, under non-EU law                                     |
| SEAL-1 | Jurisdictional           | EU law applies on paper but is hard to enforce; non-EU parties keep exclusive control     |
| SEAL-2 | Data sovereignty         | EU law applies and is enforceable; material non-EU dependencies, indirect non-EU control  |
| SEAL-3 | Digital resilience       | EU actors have meaningful but not full influence; marginal non-EU control                 |
| SEAL-4 | Full digital sovereignty | Complete EU control, only EU law, no critical non-EU dependencies                         |

The names are telling. Data sovereignty, which is what most "sovereign" offers focus on, is
level 2 of 4. Above it, the questions are about who operates the service, who writes and ships
the software, and who could switch it off.

## How the score is computed

For each objective, the points obtained on its questions are divided by the maximum possible
points, then multiplied by the objective's weight. The eight results are added up to give a
score out of 100%.

The weights are worth a second look. Supply chain counts for 20%, the highest. Strategic,
operational and technology sovereignty count for 15% each. Legal and security count for only
10%, and the document explains why: the procurement procedure already has strong safeguards in
those areas. Together, supply chain, operations and technology make up half of the score.

## What I take from it

- **Location is not enough.** Hosting data in an EU region answers part of SOV-3. It says little
  about who operates the platform, who can push an update, or which law can compel access.
- **Keys belong to the customer.** SOV-3 asks that only the customer, not the provider, has
  effective control over cryptographic access to the data. Customer-managed keys held in a
  provider's own key service may not meet that bar.
- **Openness is a sovereignty feature.** Open standards, open licences, documented APIs and the
  ability to migrate are scored explicitly (SOV-4 and SOV-6). Portability is no longer just good
  architecture practice; it is part of the evaluation.
- **The weakest link sets the level.** Because one material weakness lowers the whole objective,
  a sovereignty assessment has to cover the full chain, down to firmware and subcontractors.
- **AI is in scope.** Where models are trained, hosted and governed is part of SOV-3, and EU
  computing capacity is part of SOV-6.

## Using it outside a Commission tender

Even if you never answer a Commission tender, the framework gives you a shared vocabulary. A
public body or a regulated company can use it to:

- classify workloads by the minimum SEAL they need, rather than applying one rule to everything;
- ask providers the same questions, using the contributing factors as a checklist;
- design for the levels they need: customer-held keys, open interfaces, infrastructure as code
  and tested exit plans make a higher level reachable later.

If you are working out what sovereignty means for your own systems, or preparing for a tender
that uses this framework, [get in touch](/#contact).
