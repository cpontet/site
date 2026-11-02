---
title: 'A week of Domain-Driven Design, one cinema at a time'
description: 'Five days, one family cinema business across four eras, and no lecture to open a single module. How my new Domain-Driven Design course works, without giving the plot away.'
date: '2026-11-02'
lang: en
tags: [ddd, eventstorming, domain-modelling, facilitation, training]
draft: false
translationOf: fr/une-semaine-de-domain-driven-design
---

Most Domain-Driven Design courses start with the patterns. Entities, value objects, aggregates,
repositories: a vocabulary first, and the reasons for it later, if there is time. People leave
able to name the building blocks and unsure when any of them matters.

I wanted the opposite, so I built a five-day Domain-Driven Design course for developers. It is
meant for solid programmers: comfortable with objects, tests and an IDE. What most of them have
never done is spend three days understanding a business before writing the code for it. That is
what the week is built around.

## One business, four generations

The whole week runs on a single domain: a family cinema business, told across four eras. It is
loosely based on my own family, who ran cinemas in the east of France from the 1950s until the
late 1980s. I first used it in a workshop,
[EventStorming with the stars](/talks/eventstorming-with-the-stars), and it turned out to be a
very good teacher.

Each era changes the business a little more than the one before:

- **The 1960s.** One large room, one cashier, a fixed ticket price and a few simple rules.
- **The 1970s.** A multiplex. More screens, more sessions, a loyalty card, and a partner selling
  ice cream in the room.
- **The 1980s.** Four cinemas in four cities, and with them taxes, levies and distributors who
  each want their share of every ticket.
- **The 1990s and after.** The era my family never ran: the web, mobile, streaming.
  Participants get to imagine it.

Nobody has to learn a new industry to follow along. Everyone has bought a cinema ticket. And
because the business grows more complex era by era, the reasons for Domain-Driven Design appear
on their own, at the moment they are needed.

## Discover first, name it after

The course is built on Sharon Bowman's *Training from the Back of the Room*: active learning, with
the usual order flipped. In practice, that means two rules I hold myself to all week.

First, I talk for ten to fifteen minutes at most before participants do something with what I
said: explain it to a neighbour, draw it, put it on the wall, put it in code.

Second, no module opens with a lecture. Participants try first, with what they already know.
Only then do I give a name to what they just did. A team protects a business rule inside a
boundary it drew itself, and I can say: you just built an aggregate. A name given after the
experience sticks. A name given before it is one more term to memorise.

## The shape of the week

Each day adds one layer, and each team carries the same slice of the cinema all the way through.

- **Day 1: language.** Why software gets hard, and how much of that difficulty comes from
  misunderstanding the business. Teams start a glossary of the cinema, and find out how many
  meanings a word as simple as "ticket" can have.
- **Day 2: EventStorming.** A long wall, a lot of orange sticky notes, and the whole history of
  the cinema laid out as events. Then we walk forward through the eras and watch the timeline
  change.
- **Day 3: boundaries.** From the wall to a context map. Which parts of the cinema are its core,
  which can be bought off the shelf, and how the parts should talk to each other.
- **Day 4: code.** An evolutionary kata. Teams model the 1960s in code, then move their model
  forward into the next era as the business changes.
- **Day 5: architecture and defence.** Teams push the technology to the edges of their code,
  then present and defend their design in front of the group.

We model for three full days before writing production code. That is on purpose: it is the
point of the course.

## What happens in the code

I will not give away the kata here, because some of the people reading this will sit in front
of it. But I can tell you what it is built to show.

Each era arrives with new business rules, and the obvious move is to add them to the model you
already have. One more field, one more condition. The kata lets participants feel where that leads,
and then find a better move. The lesson of the week fits in one line: **a model grows by gaining
boundaries, not bulk.**

There is also one rule the cinema can never break, introduced in the first era and carried all
the way to the last, where it becomes much harder to keep than it looks. And at one point a new
era arrives that changes everything for the customer, and the domain code does not change at
all. Participants have to work out why.

The kata is written in TypeScript, and the same arc exists in C# and Kotlin, so the language is
never the subject.

## How it ends

On the last day, every team presents what it built during the week: its glossary, its
EventStorming wall, its context map, its code. Then the others ask questions, and the questions
are about why, not what. Why this boundary? Why this pattern here and not there? A design you
can defend is a design you understood.

If you would like this course for your team or your school, or a shorter workshop built on the
same cinema, the
[Domain-Driven Design & EventStorming](/services/domain-driven-design-eventstorming) page
describes how I work, and you can [get in touch](/contact).
