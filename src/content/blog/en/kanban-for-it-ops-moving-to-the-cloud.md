---
title: 'Kanban for IT Ops teams moving to the cloud'
description: 'A cloud migration does not pause the run. Why I use Kanban rather than Scrum with operations teams, and how team boards and a portfolio board can hold incidents, changes and package releases at the same time.'
date: '2026-10-08'
lang: en
tags: [kanban, agile-coaching, change-management, cloud, azure]
draft: false
translationOf: fr/kanban-pour-les-equipes-it-ops-qui-passent-au-cloud
---

When an organisation moves to the cloud, most of the attention goes to the target architecture
and the migration plan. The operations team gets less attention, but its work changes the most.
It has to keep the current systems running and learn a new platform at the same time, often
with the same people.

From 2019 to 2023 I worked with Cargolux, which decided to move all its IT workloads to Azure.
I was there as cloud architect and agile coach. Part of the mission was to train and coach the
IT Ops teams, and the approach we used with them was Kanban, not Scrum. This post explains why,
and what the setup looked like.

## Ops work does not fit in a sprint

Scrum works well for a team that can plan two weeks of work and protect that plan. An
operations team cannot. Its work arrives in several forms at once:

- **Incidents**, which cannot wait for the next sprint.
- **Requests** from users and other teams, each with its own expected delay.
- **Changes**: patches, upgrades, configuration, new integrations.
- **Package releases**, often tied to a date or a change window.
- **Migration work**, the project that is supposed to move everything to the cloud.

Put this into a sprint and the first serious incident breaks the commitment. After a few
sprints like this, the team stops believing in the plan, and the sprint review becomes a list
of reasons why the planned work did not happen.

Kanban starts from a different place. There is no timebox and no commitment on a batch of work.
The team makes its work visible, agrees on rules for how work enters and moves, and improves
those rules over time. It also starts from what the team does today, which matters for a team
that is already asked to change its tools, its platform and part of its job.

## A board per team, and one for the portfolio

The work was split across several implementation teams, such as Flight Ops, Maintenance &
Engineering, and Operations. Each team had its own board in Azure DevOps that showed all of its work: run
and change together. This is the point that matters most. When migration work lives in a
project plan and incidents live in the ticketing tool, nobody sees that the same people are
expected to do both. On one board, the trade-off becomes visible, and it can be discussed with
management instead of being absorbed silently by the team.

Above the team boards sat a portfolio board, which followed the work of each team at a higher
level. Management could see where each team stood on its changes without reading every card,
and the teams kept their own boards for the day-to-day detail.

A large part of the work was linking backlog items across boards. A migration rarely stays
inside one team: an application moves only when the network, an integration or another team's
change is ready. Linking those items to each other made the dependencies visible, so we could
follow them and see a blocked item before it held up the next one.

Incidents and requests still came in through ServiceNow, which remained the tool for users and
for service levels. We integrated the process with ServiceNow tickets so that the team did not
have to look in two places to know what it had to do. The board did not replace the ticketing
tool. It showed the team's work as a flow, which a ticket queue does not.

## Classes of service: making priorities explicit

When run and change share a board, the next question is what comes first. Without explicit
rules, the answer is "whatever is the loudest", and the migration work always loses.

Kanban answers this with classes of service. Each type of work gets its own policy:

- **Expedite** for incidents that affect operations: it goes to the top, and someone stops what
  they are doing to take it.
- **Fixed date** for work tied to a deadline, such as a package release in a change window: it
  must start early enough to finish on time.
- **Standard** for most changes and requests: first in, first out.
- **Intangible** for work with no visible deadline but a real cost of delay: automation,
  documentation, training. It is the first to disappear when nobody protects it.

The value is less in the names than in the agreement. The team and its managers decide together
what counts as expedite, and that decision is written next to the board. When a manager asks
why a change is late, the answer is on the board: three expedite incidents went through that
week.

## Backlogs for change, tasks for releases

Changes were too large to sit on the board as single cards. Each change, such as moving a
workload or adding an integration, had its own implementation backlog. Items from these
backlogs entered the team's board when the team had capacity, not when the backlog owner
wanted them to. That kept the board readable and kept change work from flooding the flow.

Package releases followed the same logic with more structure: release tasks on the board, a
follow-up until the release was done, and a test plan for each release. The test plan matters
for an operations team. It turns "we installed it, it seems to work" into a list of checks that
someone else can run again at the next release.

## Training alongside the board

Moving to the cloud also changes what the work is. A server request becomes a few lines of
infrastructure as code, reviewed and deployed through a pipeline. A manual configuration
becomes a policy. The operations staff needed training on Azure and on infrastructure as code,
and that training was part of the mission alongside the Kanban coaching.

We also maintained the Azure policies as code, and kept the project artifacts in git next to
them. For many people in operations, git was a new tool, so they were trained to use it as part
of their daily work. A policy change then followed the same path as any other change: a commit,
a review, a deployment, with a history anyone could read.

The two support each other. Kanban makes the learning visible as work, instead of something
people are expected to do in the evening. And infrastructure as code produces work items that
fit naturally on a board: a change, a review, a deployment, each one a step in the flow.

## When Scrum still makes sense

This is not a case against Scrum. A team dedicated to the migration, with a planned scope and
protected from incidents, can work well in sprints. The difficulty is the team that does both.
For that team, I would rather make the interruptions visible and manage them than pretend they
will not happen.

## What to watch for

A few signs that a Kanban setup for operations is not working:

- the board is a copy of the ticket queue, with no columns for how the work actually moves;
- almost everything is classed as expedite, so the class means nothing;
- migration and improvement work never move, and nobody raises it;
- the board is updated before the weekly meeting rather than during the work.

And a few signs that it works: the team can say what it is working on and what it is not, the
trade-off between run and change is discussed with management, and improvement work keeps
moving even in a busy week.

## Where to start

If your operations team is about to take on a cloud migration, or is already in one, the
[Agile coaching & transformation](/services/agile-coaching) page describes how I work with
teams, and [Cloud architecture](/services/cloud-architecture) covers the platform side. Or
[get in touch](/#contact) and tell me how your team's work arrives today.
