---
title: 'Sovereignty is not resilience'
description: 'A sovereign system you cannot leave is still fragile. Why I score sovereignty and portability separately, and how the two scores tell you what to do with each system.'
date: '2026-12-03'
lang: en
tags: [digital-sovereignty, sovereign-cloud, resilience, portability, public-sector]
draft: true
translationOf: fr/la-souverainete-n-est-pas-la-resilience
---

"Sovereign cloud" is often sold as the safe option. Move your workloads to a European provider,
the argument goes, and you are protected: from foreign law, from a trade dispute, from a vendor
that changes its terms overnight. Part of that is true. Sovereignty answers one question well:
who can control your system, and which law can compel access to it. It does not answer a second
one: what happens when that provider fails you, raises its prices, changes its licence or
disappears?

A system can be fully European and still impossible to leave. In that case you have changed who
you depend on, not whether you depend on them. This article explains why I treat sovereignty and
portability as two separate scores, and how I use them together to decide what to do with each
system.

## Where this comes from

Since December 2023 I have worked in the Architecture Competence Center of the Publications
Office of the European Union, the EU's official publisher. Among other work, I worked on moving
strategic assets to a European sovereign cloud: feasibility, target architecture, source
code analysis, data and workload migration strategies, and high availability, continuity and
recovery.

That last item is the point of this article. Choosing a sovereign provider took one decision.
Making the result as available and recoverable as the system it replaced was separate work, with
its own design and its own tests. Sovereignty did not bring resilience with it.

Two principles framed the work, and I still use them:

- **Software before hardware.** The hardware supply chain is global and slow to change. Software
  decides how data is processed, which formats it lives in and how easily it can move. That is
  where an organisation can act now.
- **Critical systems before commodities.** At the Publications Office, that meant the systems that
  store EU publications and give the public access to EU law, before email or office tools. Commodities matter, but they are easier to replace and less
  specific to the mission.

To compare options, I wrote two scales, from 0 to 10: one for sovereignty, one for portability. I
have since refined both into a method I call the [Digital Autonomy Score](https://github.com/cpontet/digital-autonomy-score) (DAS). It is open
source under the EUPL, and also ships as a Claude Code plugin that scans a codebase and drafts an
assessment.

## Two questions, two scores

**Sovereignty: can a foreign entity control, restrict or compel access to your technology?** DAS
scores it from three angles:

- **Legal and jurisdictional exposure**: where data is stored and processed, and which law
  governs the vendor. A US provider falls under the CLOUD Act wherever its servers are.
- **Technical autonomy**: whether you can run, modify and maintain the technology yourself.
- **Governance**: who controls the roadmap. A project steered by one company carries different
  risks from one steered by a foundation or a standards body.

Legal exposure weighs most, because legal compulsion overrides technical safeguards. The scale
runs from proprietary software under foreign jurisdiction (0) to ratified international standards
with several independent implementations (10).

For open source, the licence matters less than who can change it. MongoDB was under AGPL, a
strong copyleft licence, when it moved to a source-available licence in 2018; Terraform was under
MPL when HashiCorp did the same in 2023. Copyleft did not protect their users, because one company
held all the copyright and could relicense future versions. Linux can never be relicensed: its
copyright is spread across thousands of contributors. So DAS asks three questions, in this order:
can a single party relicense, who governs the roadmap, and only then, is the licence copyleft.
Copyleft counts where no one can relicense, because it then stops anyone from taking the project
closed.

**Portability: can you leave?** DAS scores it on five dimensions:

| Dimension           | Question                                                         | Weight |
| ------------------- | ---------------------------------------------------------------- | -----: |
| Code and runtime    | Can the software run on another platform?                        |    15% |
| Data                | Can you get all your data out, in a format others can use?       |    30% |
| APIs and integration | Do integrations use standard protocols or vendor SDKs?          |    20% |
| Operations          | Are the skills, tooling and alternative providers there?         |    20% |
| Migration           | What effort, time and risk would a move take?                    |    15% |

Data weighs most because it is where lock-in lives. Code can be rewritten; years of records in a
proprietary format, with their history and relationships, often cannot be moved.

## Docker is not portability

A common illusion is the container. "It runs in Docker, so we can move it." The
container moves; what it depends on may not. An application packaged in a container but wired to
a provider's proprietary database, queue or identity service is as locked in as before, only
better packaged.

That is why DAS scores a system layer by layer and keeps the weakest result for each dimension. A
portable front end on top of a database you cannot export gives a system you cannot export. And
if any single dimension scores 2 or less, the portability score is capped at 4, whatever the
other dimensions say.

## Four quadrants, four postures

Put the two scores on two axes and each system lands in one of four places.

| | **Low portability** | **High portability** |
| --- | --- | --- |
| **High sovereignty** | **Sovereign but brittle.** Modernise for portability. | **Sovereign and portable.** Maintain, and use as the reference pattern. |
| **Low sovereignty** | **Locked in and exposed.** Migrate or replace, urgently. | **Portable but exposed.** The easiest move: change provider. |

The top-left box is the one sovereignty debates tend to miss. It holds systems that are European,
sometimes even open source, but tied to one provider's deployment model, stored in formats only
that provider reads, or run by a team so small that its knowledge cannot be replaced. They pass a
sovereignty check. They would not survive that provider's failure, acquisition or price change.

Note also where a European proprietary vendor lands on the sovereignty scale: 3 out of 10. EU law
applies, which matters, but the source is closed and you depend on that company's continuity. "We
moved to a European SaaS" can be a step forward and a new lock-in at the same time.

The quadrant also tells you the order of work. Systems in the bottom-right are the quick wins:
they are already portable, so changing provider is mostly infrastructure work. Bottom-left
systems carry the most risk and need a plan, starting with a clear view of the exposure. Top-left
systems need engineering: open formats, standard interfaces, infrastructure as code, a second
provider that could run them.

## Three questions before a full assessment

A full assessment takes about half a day per system. Before that, three questions give a quick
ceiling on portability:

1. Can you export all your data today, in a standard format, without the vendor's help? If not,
   portability is 3 at most.
2. Are there at least three independent EU providers that could run this? If not, 5 at most.
3. Could your team migrate within twelve months on its existing budget? If not, 6 at most.

If the honest answer to the first question is "probably", count it as a no.

## Portability is the bridge, not the whole of resilience

Portability is what connects sovereignty to resilience: it is your ability to act when a
provider, a law or a contract turns against you. It is not the whole of resilience. Keeping a
service running through an outage, recovering from an incident, rehearsing a failover: these are
operational resilience, and DAS deliberately leaves them out. They need their own design and their
own tests, as they did in the Publications Office migration.

Regulation increasingly asks for both. DORA requires financial entities to have exit strategies
for ICT services that support critical functions. The Commission's
[Cloud Sovereignty Framework](/blog/eu-cloud-sovereignty-framework) names its third assurance
level "digital resilience", and scores portability and open standards explicitly. An exit plan
that has never been tested is a document, not a capability.

## What I take from it

- Score sovereignty and portability separately. One number hides the trade-off you need to see.
- Score the stack, not the product. The weakest layer sets the result.
- Treat data portability as the first test. If you cannot get the data out, nothing else moves.
- Do not let "sovereign" replace a resilience design. Ask the same availability and recovery
  questions of a European provider as of any other.
- Prefer what you can leave. It keeps every later decision, sovereign or not, open.

The scales, the assessment process and worked examples are all in the
[repository](https://github.com/cpontet/digital-autonomy-score). If you want to know where your own systems sit on these two axes,
[get in touch](/#contact).
