---
title: 'A landing zone in Bicep: what goes in the first sprint'
description: 'The first sprint of a cloud platform decides what will be cheap or expensive to change later. What I put in it when building on Azure with Bicep, and what can safely wait.'
date: '2026-12-17'
lang: en
tags: [cloud-architecture, azure, infrastructure-as-code, public-sector]
draft: true
translationOf: fr/landing-zone-en-bicep-premier-sprint
---

A landing zone is the ground a cloud workload lands on: the subscriptions, identities, network,
policies, logs and budgets that every application relies on without thinking about them. Microsoft
describes a full one in its
[Cloud Adoption Framework](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/),
across eight design areas. Read on its own, that framework suggests months of platform work before
the first workload.

Most teams do not have months. They have a first workload to deliver, and a platform to build
around it. When I designed and deployed a data platform for an EU institution, all the
infrastructure was in Bicep from the first deployment, along with compliance, security and cost
control. This post is about the question every such project faces in its first sprint: what has
to be there from day one, and what can wait?

My rule is simple. **Put in the first sprint what is expensive to add later.** Everything else can
follow the workloads.

## 1. Structure and names

The cheapest decisions to make early, and the most painful to change, are how resources are
organised and named.

- **Scopes.** Management groups for the organisation, a subscription per environment (or per
  environment and workload), and resource groups that follow the lifecycle of what they contain.
  Moving resources between subscriptions later is possible, but it breaks role assignments,
  policies and sometimes the resources themselves.
- **A naming convention, in code.** A Bicep module that builds names from a few parameters
  (workload, environment, region, resource type) means nobody types a name by hand. Renaming
  resources later usually means recreating them.

## 2. Identity and access

Access is the other thing that is hard to clean up afterwards: rights granted "temporarily" in the
first weeks tend to stay for years.

- **Groups, not people.** Role assignments go to Entra ID groups, at the narrowest scope that
  works. Nobody gets Owner on a subscription as a convenience.
- **No standing admin rights.** Elevated roles are requested when needed, for a limited time, for
  example with Privileged Identity Management.
- **No secrets in pipelines.** The deployment pipeline authenticates with workload identity
  federation, and applications use managed identities. There is then no client secret to rotate,
  leak or forget.

## 3. Policies as guardrails

Azure Policy turns rules into something the platform enforces, instead of something a reviewer
has to remember. In the first sprint, I want a short list:

- **Allowed regions.** For a European public body, only EU regions. That one line is a large part
  of a data residency commitment.
- **Required tags, and tag inheritance.** Tags such as owner, environment and cost centre are set
  by the Bicep modules, required by policy, and inherited from the resource group when a resource
  is created outside the templates. I described why in [FinOps from day one](/blog/finops-from-day-one).
- **Diagnostics sent to a central workspace.** A policy that configures diagnostic settings on
  every new resource means logs exist on the day you need them, not from the day after the
  incident.

Start policies in audit mode, look at what they flag, then switch the important ones to deny. A
deny policy introduced on a busy platform blocks people mid-task; introduced on day one, it simply
shapes how things are built.

## 4. Network decisions that are hard to reverse

Not all of the network needs to exist in the first sprint, but some decisions do.

- **Address space.** Plan the IP ranges for every environment and for future connections to
  on-premises or other clouds now. Overlapping ranges are one of the most expensive mistakes to
  undo.
- **Private access to data.** For a data platform, decide from the start whether storage,
  databases and analytics services are reached through private endpoints. Moving a running
  service from public to private access later touches DNS, firewalls, pipelines and every client.

A full hub-and-spoke network with a central firewall can come later, when there is more than one
workload to connect.

<!-- TODO(cedric): one or two concrete choices from the data platform here, if you can share them
without naming the project (e.g. private endpoints from day one, how DNS was handled, what you
deferred). Delete this comment once filled in. -->

## 5. Logs, security baseline and budgets

- **One log workspace** for the platform, with a retention period that matches your obligations.
- **A security baseline**: Microsoft Defender for Cloud enabled on the subscriptions, secrets in
  Key Vault, encryption settings decided rather than left at defaults.
- **Budgets and alerts** on each subscription, set from the cost estimate, sent to the people who
  own the workload.

None of these takes long to set up on day one. All of them are tedious to add across an estate
that has grown without them.

## 6. The pipeline itself

The landing zone is code, so it needs the same delivery discipline as an application:

- **Small Bicep modules**, or [Azure Verified Modules](https://aka.ms/avm) where they fit, rather
  than one large template.
- **A preview before every deployment.** Bicep's what-if operation shows what will be created,
  changed or deleted. Reviewing it in the pull request catches most surprises.
- **No manual changes.** If something has to be changed by hand in an emergency, it goes back
  into code the same week. Otherwise the code stops describing the platform, and nobody trusts it.

## What can wait

- A full hub-and-spoke network, firewalls and connectivity to on-premises, until a workload needs
  them.
- A second region and disaster recovery, until the first workload's recovery objectives are
  known. But do choose a region pair and a naming scheme that leave room for it.
- Fine-grained cost allocation and chargeback, once there is more than one team paying.
- Most of the catalogue of policy initiatives. Start with the few rules that matter, and add more
  when you know what you are protecting against.

## The first sprint is a design decision

A landing zone is never finished, and that is fine. What matters is that the first sprint puts in
place the things that are cheap now and expensive later: structure, identity, guardrails, the
network choices you cannot easily undo, logs, budgets and the pipeline. Everything else can grow
with the workloads.

If you are about to build a new platform on Azure or another cloud, the
[Cloud architecture](/services/cloud-architecture) page describes how I work. Or
[get in touch](/#contact).
