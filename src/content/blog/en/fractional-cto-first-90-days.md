---
title: 'What a fractional CTO does in the first 90 days'
description: 'Listen and map, decide and write down, then install habits that run without me: how I spend the first three months as a part-time CTO, and what a CEO should get from each.'
date: '2026-10-30'
lang: en
tags: [cto, tech-strategy, architecture-governance]
draft: false
translationOf: fr/cto-a-temps-partage-premiers-90-jours
---

A fractional CTO is a technology leader you hire part-time: a day or two a week, over several
months, as a member of your leadership team rather than as an outside auditor. It makes sense
when you need technical direction but not yet a full-time executive, or while you look for one.

The risk with any new CTO, part-time or not, is that they arrive with a framework and start
installing it in the first week. I was CTO of a consulting company for seven years, and head of
its software factory before that, and I have worked with many client organisations in the public
and private sectors. In my experience, the changes that last are the ones that start from how
the organisation already works.

So I split the first 90 days into three phases. Each has a clear output, so that you can judge
the work at each step and stop it if it is not useful.

## Before day one: a question and a sponsor

A fractional CTO has limited time, so the engagement needs a focus. Before starting, we agree
on three things:

- **The question.** For example: "Can our platform support the next two years of growth?",
  "Why does every release take a month?", or "Should we build this product in-house?".
- **One sponsor.** Usually the CEO. Someone I report to, who can make decisions and open doors.
- **A rhythm.** Fixed days, a weekly point with the sponsor, and a review at day 90.

## Days 1–30: listen and map

The first month is for understanding, not changing. I talk to people and read what the
organisation produces.

**Conversations.** The management team, every tech lead, a few developers, operations, product
owners, and if possible a few customers or users. I ask the same questions to everyone: what
works, what slows you down, what worries you, what you would change first. The differences
between the answers are often more useful than the answers themselves.

**Reading.** The code and its history, the delivery pipelines, the incident log, the cloud bill,
the main supplier contracts, the existing roadmaps. Each of these shows how work actually
happens, which is not always how it is described.

**Mapping.** I draw a map of the value chain, often as a Wardley Map: what your customers need,
which components deliver it, and how mature each one is. It shows where you build something
that sets you apart, and where you build something you could simply buy or rent.

The only changes I make in this phase are safety ones: an untested backup, a production access
shared by everyone, a key that has not been rotated.

**What you get:** a short written diagnosis, a few pages at most. What works and should be
protected, what is risky, and what is still unknown.

## Days 31–60: decide and write down

The second month turns the diagnosis into decisions. A CTO's job is not to make every technical
decision, but to make sure the important ones are made, made once, and written down.

**A technical strategy on one page.** Two or three business goals, and what they mean for the
platform, the teams and the budget. The trade-offs go on the page too: what we will not do, and
why. A strategy that does not exclude anything is a wish list.

**A few architecture principles.** Short, shared with the teams, and checked in reviews. Five
principles that are applied are worth more than thirty that nobody remembers.

**The first decision records.** One page per significant choice: the context, the options
considered, the decision and its consequences. When someone asks in two years why the system
looks like this, the answer is there.

**One or two visible fixes.** Usually the problem that came up in most conversations: a release
process, a test environment, a missing owner. Fixing it early shows that listening led to
something.

**What you get:** the strategy, the principles, the first decision records, and a short list of
priorities agreed with the management team.

## Days 61–90: install and hand over

A fractional CTO is not there every day. Whatever I set up has to work on the days I am absent,
and after I leave. The third month is about habits and people.

**Habits that run without me.** An architecture review before the build, not after. A
community of practice where developers teach each other. A regular look at cloud costs with
the teams that create them. Guidelines for coding agents and AI tools, so that their use
follows the same rules across teams.

**People.** I coach the tech leads who will carry these habits. If the diagnosis showed a
missing role, I help write the profile and take part in the technical interviews.

**A decision at day 90.** We review the engagement with the sponsor. There are three honest
outcomes: continue at the same pace, reduce to a few days a month, or stop because the
organisation now has what it needs. All three are fine.

**What you get:** habits with named owners, tech leads who run them, and a clear decision about
what comes next.

## What to watch for as a CEO

A few signs that the first 90 days are going wrong:

- a proposal to rewrite the system in the first month;
- a new set of tools before anyone has looked at how the current ones are used;
- every decision going through the CTO, so that nothing moves on the days they are absent;
- a strategy that speaks only about technology, without your business goals in it.

And a few signs that they are going well: the teams can explain the priorities in their own
words, decisions are written down, and the conversations at management level have more
technical substance than before.

## Where to start

If you are wondering whether a part-time CTO fits your situation, the
[CTO & strategic advisory](/services/cto-strategic-advisory) page describes the formats I offer.
Or [get in touch](/#contact) and tell me the question you would want answered first.
