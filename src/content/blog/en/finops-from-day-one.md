---
title: 'FinOps from day one'
description: 'Cloud costs are easiest to control before the first workload runs. Four things I put in place with the first deployment of a data platform at the EU Publications Office: an estimate, tags in code, budgets, and paying only for what runs.'
date: '2026-10-31'
lang: en
tags: [finops, cloud-architecture, infrastructure-as-code, public-sector]
draft: false
translationOf: fr/le-finops-des-le-premier-jour
---

In most organisations, FinOps starts with a surprise on the bill. Someone in finance asks why
the cloud costs twice what was planned, and the team spends weeks working out which resource
belongs to which project, who created it, and whether it can be switched off.

By then, it is the expensive way to do it. Tags have to be added to hundreds of resources whose
owners have moved on. Budgets are set after the fact, so they follow what is already spent
rather than what was planned. And every saving is a negotiation with a team that has other
priorities.

The cheap moment is before the first workload runs. At the Publications Office of the European
Union, I designed and deployed a data platform in the cloud, with all the infrastructure as
code. FinOps was part of the work from the first deployment, along with
compliance and security. This post describes what we put in place, and why each item costs
little at the start and a lot later.

> FinOps is not an afterthought. It is a mandatory step to include in your process from the
> start.

## 1. An estimate before the build

The first cost document is written before any resource exists: an estimate per environment,
as part of the target architecture. Development, test and production rarely need the same
size, and the estimate makes that a decision rather than a copy of production.

The value is less in the number than in the assumptions written next to it: how many hours a
compute pool runs per day, how much data is stored, how long logs are kept. When the real bill
arrives, those assumptions are what you compare against. A gap then has an explanation, such as
a pool that runs longer than planned, instead of being a vague overrun.

For a data platform, compute is usually where the money goes, and it is billed while it runs,
whether anyone uses it or not. That is the line of the estimate to watch most closely.

## 2. Tags in code, enforced by policy

Cost reports are only as good as the tags on the resources. A cost view by project or owner
fails as soon as a few resources have no tag, and that happens quickly when tags are added by
hand.

So the tags lived in the Infrastructure as Code modules. Every resource deployed through them received the same
set, for example owner, environment and cost centre, without anyone having to think about it.
A cloud policy then checked the rule on the whole scope, including anything created outside the
templates. A resource without the required tags shows up as non-compliant, and depending on
the policy effect, it can also be blocked at creation.

I also set up policies that automatically copy the tags of a resource group to the resources it
contains. A resource created by hand, or by a service on its own, then inherits its owner,
environment and cost centre without anyone having to add them.

This is the item that costs most to add later. On a new platform, tagging is a small piece of
module work. On an existing estate, it means finding an owner for every resource first.

## 3. Budgets and alerts from the first deployment

Budgets and alerts were set up with the first deployment, not after the first expensive month.
A cloud budget on an account or a group of resources sends an alert when spend reaches a share
of the budget, and it can also alert on the forecast, before the money is actually spent.

The budget does not stop anything by itself. Its job is to make sure the right person hears
about a drift in days rather than at the end of the quarter. That only works if the alert goes
to someone who owns the workload and can act, not only to a shared mailbox.

The estimate from step 1 gives the starting amount. Without it, the first budget is a guess,
and the first alert is either ignored or comes too late.

## 4. Pay only for what runs

Much cloud spend comes from resources that run when nobody uses them. On the data platform,
compute pools, such as Spark pools, were paused when not needed, and development and test
environments were scaled down or stopped outside working hours.

Pausing is one answer. The other is to choose services that do not bill for idle capacity in
the first place. The SQL databases ran on a serverless tier: capacity follows the load, and you
pay for what is used rather than for a size reserved around the clock. For a data platform,
where most queries come in bursts, that difference is large.

Pause rules are simple to write down and easy to forget, so they belong in the design from the
start, next to the estimate. If the estimate assumes that a pool runs ten hours a day, the
platform has to make that true. Otherwise the estimate and the bill drift apart from the first
month.

## Why this matters more in the public sector

First, it is public money. Every euro spent on an idle compute pool or an oversized database is
taxpayers' money, and a public institution has a duty to spend it with care. Cost control is
not an optimisation exercise there. It is part of the mission.

Then, public institutions usually work with annual budgets that are set well in advance. Unexpected
cloud costs cannot simply be absorbed by next month's revenue. Predictability matters as much
as the amount: finance needs a number it can plan with, and a way to see early when it is
moving.

The four items above give exactly that. The estimate gives the plan, the tags make costs
traceable to a project, the budgets show a drift early, and paying only for what runs keeps the platform
close to its assumptions.

## What comes next: a continuous practice

These four items are a starting point, not a FinOps practice on their own. FinOps is not set up
once and forgotten. Usage changes, prices change, new services appear, and a platform that was
well sized at launch drifts within months. The work runs as a loop:

- **Review and analyse.** Look at the costs regularly with the workload owners, against the
  estimate and its assumptions. Which lines grew, and why?
- **Identify improvements.** A resource that is oversized, a pool that runs longer than needed,
  an environment nobody uses any more, a stable workload that would cost less with a
  reservation.
- **Act.** Resize, pause, delete, commit. Then check on the next review that the change had the
  expected effect.
- **Replatform if needed.** Sometimes the cost model of a service no longer fits how it is
  used, and tuning is not enough. Moving a workload to another service, or to another
  architecture, is then part of FinOps too, not only of architecture.

The [FinOps Framework](https://www.finops.org/framework/) describes the same loop in three
phases: inform, optimise and operate.

None of it works without the foundations, and the foundations are cheapest on the first day.

## Where to start

If you are about to deploy a new platform, or your cloud bill has already grown faster than
planned, the [Cloud architecture](/services/cloud-architecture) page describes how I work. Or
[get in touch](/#contact) and tell me what your current bill does not explain.
