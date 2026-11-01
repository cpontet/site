---
title: 'Technical excellence without a mandate'
description: 'You cannot order a team to write better code. What I have learnt from improving engineering practices as a coach, a consultant and a CTO with no authority over the teams: start with the pain, practise rather than preach, and let standards come from the teams.'
date: '2026-12-10'
lang: en
tags: [technical-excellence, cto, craftsmanship, agile-coaching]
draft: true
translationOf: fr/excellence-technique-sans-mandat
---

Technical excellence is often announced from the top: a new standard, a code review policy, a
target for test coverage. It rarely lasts. Teams comply where they are checked, and the code
underneath does not change much.

For most of my career, I have worked on engineering practices without the authority to impose
them: as a coach inside a client's team, as an architect called in for a project, and as CTO of a
consulting company. I could not order anyone to write tests. What I could do was help teams want
to, and make it easier. This post describes what that looks like in practice.

## Start where it hurts

In 2014, I coached a team at POST Luxembourg that had been developing an application for the
documentation of the fixed telephone network for more than seven years. The team had recently
moved to Scrum, and had no real source control in place. Working on several user stories in
parallel was painful, and they knew it.

I was there as a Scrum coach, to help with agile engineering practices such as TDD and BDD. But
part of the work had nothing to do with TDD: we migrated the code base to the central source
control platform, decoupled the code enough to work on stories in parallel, and set up a
continuous build. Without those, the practices I came to coach had nothing to stand on.

The lesson I took from it, and from many teams since: a practice is adopted when it solves a
problem the team already feels. Start with that problem, even if it is not the one you came for.
Once the team trusts that you are there to make their work easier, the next conversation is much
shorter.

## Practise, don't preach

Nobody learns test-driven development from a slide. People learn it by doing it, on a problem
small enough to try several approaches in an hour, with someone next to them. That is what code
katas are for: short, repeatable exercises, done in pairs or as a group, where the point is the
way you get there, not the solution.

When I prepared a technical excellence programme for a private bank in Luxembourg in 2023, the
modules covered clean code, agile testing (TDD, BDD and specification by example), pair
programming, refactoring, technical debt, evolutionary architecture and DevSecOps. Each module
came with code katas, and identifying the right kata for each module was a large part of the
preparation: a good kata makes the practice obvious, a bad one makes it look like a ritual.

Two things make the difference between a training and a habit:

- **Use the team's own code next.** After the kata, apply the practice to a real piece of the
  code base, ideally one the team finds painful. The kata teaches the move; the real code shows
  that it works here.
- **Pair, then rotate.** Pair programming spreads a practice faster than any training. Rotating
  pairs spreads it across the team.

## Grow a community, not a programme

Inside a large organisation, the people who care about engineering practices are usually spread
across teams. A community of practice, or guild, gives them a place to meet: a regular slot,
open to anyone, where developers share what they tried, work on a kata together, or review a
piece of design.

I helped grow such communities at BIL and at Foyer, alongside coaching on Domain-Driven Design,
CQRS and event sourcing. At BIL, the stated goal was to make the teams and their communities
autonomous on their development practices and their learning: in other words, to stop needing a
coach.

What I have seen help:

- **A fixed, protected slot.** Same day, same time, every two weeks or every month. A community
  that is rescheduled around deliveries dies quietly.
- **Topics from real work.** A design decision someone is stuck on, a refactoring that went well,
  an incident. Abstract topics draw fewer people every time.
- **Facilitation that rotates.** If one enthusiast runs every session, the community lasts as long
  as that person stays.
- **Visible support from management, without ownership.** Managers can protect the time and
  attend as participants. They should not set the agenda.

## Let standards come from the teams

Standards are useful. Agreed coding conventions, a definition of done, architecture decision
records, a shared pipeline with the same checks for everyone: these save time and arguments. But
a standard written by someone outside the team is a rule to work around. A standard the team
wrote is a promise they made to each other.

So my role on standards is mostly to ask the questions and hold the pen. What do we keep
arguing about in code reviews? What broke in production last quarter, and what would have caught
it? The answers become the standard. Then automate whatever can be automated, such as formatting,
linting, test runs and security checks in the pipeline, so that reviews can focus on design.

## When you do have the title

From 2019 to 2026, as CTO, I had the title. Fostering technical excellence still meant the same
things: organising training and workshops, making the right tools and platforms available, and
supporting every project on quality. The approach did not change. It only reached more teams.

I think that is the real lesson. Even with authority, excellence cannot be ordered. It grows when
a team sees a practice solve its own problem, has time to practise it, and owns the standard that
results.

If you want to raise the engineering level of your teams without a top-down programme, the
[CTO and strategic advisory](/services/cto-strategic-advisory) page describes how I work. Or
[get in touch](/#contact).
