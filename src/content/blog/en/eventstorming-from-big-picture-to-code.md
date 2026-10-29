---
title: 'EventStorming, from the big picture to code'
description: 'Five short videos on the three levels of EventStorming and the notation that ties them together.'
date: '2026-10-29'
lang: en
tags: [eventstorming, ddd, facilitation]
draft: false
---

EventStorming is a workshop format created by Alberto Brandolini. People who know the business
and people who build the software stand in front of the same wall, write what happens in the
domain on orange sticky notes, and put them in order until they tell one story. It is the fastest
way I know to get a shared understanding of a domain before anyone writes code.

It is also easy to misread. Some teams run one session, take a photo of the wall and stop there.
Others jump straight to aggregates and miss the conversations that make the method worth it.
EventStorming works at three levels, each one a closer look at the same events. I made five short
animated videos to explain them, using a cinema as the example domain. Each runs about a
minute, with captions.

## Three levels, the same events

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/levels.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/levels.mp4" type="video/mp4" />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/levels.en.vtt" default />
  </video>
  <figcaption>The three levels of EventStorming (35 s).</figcaption>
</figure>

- **Big Picture**: every domain event across the business, the hotspots, and the places where
  bounded contexts start to appear.
- **Process Modelling**: adds commands, policies, read models and external systems, to show how
  the work actually flows.
- **Software Design**: surfaces the aggregates and their invariants, ready to become code.

Each level adds detail without adding noise. You zoom in on a part of the wall; you do not pile
more notation on top of it.

## Big Picture

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/big-picture.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/big-picture.mp4" type="video/mp4" />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/big-picture.en.vtt" default />
  </video>
  <figcaption>A Big Picture workshop, step by step (64 s).</figcaption>
</figure>

The Big Picture starts in chaos on purpose. Everyone writes domain events, in the past tense and
in the language of the business: "Ticket Purchased", not "Purchase Ticket". No discussion yet.
Then the group enforces the timeline, sliding events left to right until they form one story.

From there the wall gets richer:

- **Hotspots** (hot pink) capture questions, conflicts and unknowns. You mark them; you do not
  resolve them on the spot.
- **People** show who triggers each event.
- **Pivotal events** sit on the lines where one part of the business hands off to the next.
  They are the first hint of bounded contexts.
- **A business narrative** walks the wall as a single story, which quickly shows the gaps.
- **Arrow voting** lets everyone point at the problem that hurts most. You get a priority without
  a meeting.
- **Following the money** shows where value is created or lost, in money, trust or time.

The goal is the most shared knowledge with the least notation.

## Process Modelling

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/process-modeling.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/process-modeling.mp4" type="video/mp4" />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/process-modeling.en.vtt" default />
  </video>
  <figcaption>Process Modelling: a chain of commands and events (50 s).</figcaption>
</figure>

Process Modelling narrows the scope to one feature. You place the command that starts it and the
final state it must reach: a domain event and the read model it leaves behind. The flow between
them is what the workshop discovers.

You discover it by following the colours in order. A command runs on a system and produces an
event. A policy turns that event into the next command: "whenever this happened, do that". The
chain repeats until it reaches the final state. There is no aggregate yet; that comes at the next
level.

## Software Design

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/software-design.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/software-design.mp4" type="video/mp4" />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/software-design.en.vtt" default />
  </video>
  <figcaption>Software Design: aggregates and process managers (54 s).</figcaption>
</figure>

Process Modelling tells you which commands lead to which events, but not what enforces the rules.
At the Software Design level, the aggregate appears: a consistency boundary that receives a
command, decides, and emits the event. Software Design is Process Modelling plus the aggregate.

When a piece of behaviour spans several aggregates, a process manager coordinates it. It reacts
to an event from one aggregate, sends a command to the next, waits for that one's event, and
moves its own state forward until the process is complete. The wall at this point is close to a
specification for code.

## The grammar

<figure>
  <video controls preload="none" playsinline width="1280" height="720" poster="/blog/eventstorming/grammar.webp" class="w-full h-auto rounded-2xl">
    <source src="/blog/eventstorming/grammar.mp4" type="video/mp4" />
    <track kind="captions" srclang="en" label="English" src="/blog/eventstorming/grammar.en.vtt" default />
  </video>
  <figcaption>The notation in one picture (46 s).</figcaption>
</figure>

All three levels share one grammar, and it fits in a sentence:

- An **actor** issues a **command**, an intention (blue, imperative).
- The command lands on an **aggregate**, or on an **external system** you do not control.
- Either one produces a **domain event**, something that happened (orange, past tense).
- Events update **read models**, the information people see on screen.
- Events also trigger **policies**, which issue the next command.

Read it out loud: when a ticket is purchased, the loyalty policy tells the system to award
points.

## Where to go next

Brandolini's own material on [eventstorming.com](https://www.eventstorming.com) is the reference,
and his book *Introducing EventStorming* covers the formats in depth. If you want to run a
session with your team, or need a facilitator for one, [get in touch](/#contact).
