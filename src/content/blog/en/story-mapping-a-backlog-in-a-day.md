---
title: 'Story mapping a backlog in a day'
description: 'A flat backlog hides the user journey and makes every release a negotiation. How I run a one-day story mapping workshop, and what came out of it when Restena revamped My.lu, the .lu domain management application.'
date: '2026-11-26'
lang: en
tags: [story-mapping, facilitation, product-discovery, agile]
draft: true
translationOf: fr/story-mapping-d-un-backlog-en-une-journee
---

Most backlogs I inherit are lists. Hundreds of items, sorted by priority, each one reasonable on
its own. What the list does not show is the thing the product is for: the journey of someone
trying to get a job done. You cannot see which steps are missing, which ones only matter later,
or what the smallest useful release would be. So every planning meeting turns into a negotiation
over individual items.

A story map puts the journey back. I have run story mapping workshops many times, for startups,
for industrial companies and for public bodies. This post describes the format I use to build a
first map in one day, and how it helped on one project: the revamp of My.lu at Restena.

## What a story map is

Jeff Patton described the technique in
[User Story Mapping](https://jpattonassociates.com/story-mapping/) (O'Reilly, 2014). The map has
two directions:

- **Left to right, the journey.** The big activities a user goes through, in the order they go
  through them, and under each one the steps that make it up. This row is the backbone: read
  aloud, it should sound like a story.
- **Top to bottom, the detail and the priority.** Under each step, the stories that implement it,
  the most essential at the top.

Then you draw horizontal lines across the map. Everything above the first line is the first
release: a thin slice through the whole journey, not a complete version of the first activity.
That single shift, from "finish the first feature" to "cover the whole journey thinly", is most of
the value.

## Before the day

A day is enough only if the preparation is done.

- **The right people.** Someone who decides on the product, people who know the users, the people
  who will build it. Between five and ten is a good size. Without the decision maker, the map
  becomes a wish list; without the builders, the slices are not realistic.
- **One goal for the day.** For example: "a map of the journey for the main user, and a first
  release we would be willing to ship." Write it on the wall.
- **What we already know.** User research, support tickets, the current backlog, the analytics.
  The workshop sorts and completes knowledge; it does not replace it.
- **A wall, or a board.** A long wall and sticky notes work best in a room. Remotely, an online
  whiteboard with a prepared grid.

## The day

This is the outline I use. The timings move; the order does not.

1. **Frame (30 minutes).** The goal, the users we are mapping for, and the rules: one idea per
   note, verbs for steps, no debate about solutions yet.
2. **Tell the story (1 hour).** Everyone writes, in silence, the steps a user goes through, from
   the first contact to the moment the job is done. Then we merge the notes into one line, left to
   right. Duplicates disappear, gaps become visible.
3. **Find the backbone (45 minutes).** We group the steps under a handful of activities and name
   them. This is often where the first real disagreement appears, and it is a useful one: people
   discover they did not have the same product in mind.
4. **Fill in the detail (1.5 hours).** Under each step, the stories: what the product needs to do
   for that step to work. This is where the existing backlog comes in: each item is placed under a
   step, or dropped if it has no place.
5. **Walk the map (30 minutes).** Someone reads the journey aloud, step by step, as a user would
   live it. Missing steps jump out. So do steps that only exist because of how the current system
   works.
6. **Slice (1.5 hours).** We draw the first line: the minimum that lets a user go through the
   whole journey, even badly. Then the next one. Each slice gets a name and an outcome, not just a
   date.
7. **Close (30 minutes).** What we learnt, what we still need to find out, and who does what next.

At the end of the day, the team has a map on the wall, a first release they agree on, and a list
of open questions. The backlog is no longer a list; it is the map, read top to bottom.

## Restena and My.lu

[Restena](https://www.restena.lu) is the foundation that manages the .lu registry and provides
network services to research and education in Luxembourg. My.lu is its application for managing
.lu domain names. After a redesign of its website, Restena wanted to revamp My.lu: make it more
intuitive for its users, modernise its visuals and usability, and integrate it better into the
world of registrars.

Between September 2022 and February 2023, a team I was part of took on UX research, design,
front-end development, API governance and the authentication platform. I facilitated the story
mapping, set up the infrastructure and the delivery pipeline, and worked on the authentication
between the Angular front end and Keycloak.

<!-- TODO(cedric): two or three concrete facts from the workshop: who was in the room, how long it
took, the backbone you ended up with (main activities), one surprise or disagreement the map
revealed, and what the first slice contained. Delete this comment once filled in. -->

One delivery choice fits well with a story map: the front end was developed against a mock API,
built with Mockoon, so that it did not have to wait for the back end. A slice of the map can then
be built and shown while the real API is still being designed.

## What makes it work

- **Map the journey, not the system.** If the backbone reads like a menu of screens, start again
  from what the user is trying to do.
- **Slice across, not down.** A first release that covers every activity thinly teaches you more
  than one that finishes the first activity perfectly.
- **Keep the map alive.** A map that is rolled up after the workshop is a nice photo. A map that
  stays on the wall, and is updated at every planning, is the backlog.
- **Let people disagree on the wall.** The most useful moments are when two people place the same
  note in different places. That is a conversation the list would have hidden until the
  development was done.

Story mapping is one of the [workshops I facilitate](/services/facilitation-workshops). If your
backlog has become a list nobody can read any more, [get in touch](/#contact).
