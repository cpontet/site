---
title: 'Domain-Driven Design for coding agents'
description: 'A coding agent fills every gap in your domain with a plausible default. What the DDD community is learning about AI, and the four-step loop I am putting in place: discover with people, distil into the repository, drive with examples, detect drift.'
date: '2027-01-07'
lang: en
tags: [ddd, eventstorming, domain-modelling, agentic-ai, coding-agents]
draft: true
translationOf: fr/le-domain-driven-design-pour-les-agents-de-code
---

On the rewrite of a large public-sector web platform, which I described in
[an earlier post](/blog/agentic-software-factory), a coding agent once wrote a search clause that
looked perfectly reasonable. It used the search engine's syntax correctly, and it excluded a
category of documents in a way that sounded right. No code in the legacy system had ever used it.
It cut the results of a common query from 1,824 to 2.

The fix was not a better model. It was a rule: agents must use the domain's own vocabulary, and
must not invent a concept or a query clause for something the domain already names. That rule is
Domain-Driven Design, applied to a new kind of team member.

This post looks at what the DDD community is learning about AI, what we already had in place on
that project, what was missing, and the loop I am now putting in place to close the gap.

## What the DDD community is finding

[Alberto Brandolini](https://blog.avanscoperta.it/2026/08/27/code-is-still-a-side-effect/), who
created EventStorming, is a friend; he has invited me several times to the Avanscoperta Retreat and
the EventStorming Summit. He codes with agents every day, and he is clear about where they help
and where they do not. His old line, "software development is a learning process, working code is
a side effect", has not changed. What has changed is how fast the side effect arrives.

His warning is about discovery. Ask an AI to extract a glossary from photos of an EventStorming
wall and you get something plausible, without the reasoning behind the choices: "You've just
increased noise faster." Building a coherent model is where the learning happens, and it has to
happen in people's heads. On the other side, he makes bounded contexts "a first-class citizen of
the AI harness": a short vision of the domain, then one file per bounded context with its own
glossary and the terms that are banned in it, loaded only when the agent works in that context.
His new workshop, [AI-powered Domain-Driven Design](https://www.avanscoperta.it/en/training/ai-powered-domain-driven-design/),
still opens with a Big Picture EventStorming between humans.

Others reach similar conclusions from different directions:

- **Eric Evans** treats the model itself as a context to map:
  "[LLMs are bounded contexts too](https://www.domainlanguage.com/articles/context-mapping-an-ai-based-component/)",
  and an AI component needs an anticorruption layer like any other external system. He also
  separates classification, which an LLM can do against a fixed scheme, from modelling, the
  creation of the scheme, which still needs people.
- **Vaughn Vernon** reports that agents left to themselves produce disappointing domain models:
  [the agent "quickly and autonomously falls back to CRUD"](https://wso2.com/library/conference/2026/05/this-is-your-agent-on-domain-driven-design),
  even with guidance. Well-designed domain models are rare in the code agents learnt from.
- **Mathias Verraes** found that
  [giving the agent a domain model before asking for code](https://verraes.net/2026/07/software-design-in-the-agentic-age/)
  produced better code structure and database schemas.
- **Annegret Junker** built the same small application three times with an agent, from
  increasingly precise domain descriptions. Her conclusion:
  "[They fail because they have no access to your domain.](https://www.codecentric.de/en/knowledge-hub/blog/from-stories-to-code-how-domain-storytelling-and-eventstorming-give-llms-the-context-they-need)"

The research is thin but consistent. An
[industrial case study published in March 2026](https://arxiv.org/abs/2603.26244) tested a
prompting framework for DDD on a real enterprise platform. The first steps, a glossary, a
simulated EventStorming and a set of bounded contexts, produced useful artefacts, and the authors
describe the approach as "a collaborative sparring partner" rather than a way to automate the
work. Every model proposed finer-grained bounded contexts than the ones the company actually used,
and small errors accumulated until the later steps, aggregates and technical architecture, were
impractical.

The common thread: AI is a good assistant for producing and checking artefacts, and a poor
substitute for the conversations that create a shared model. And whatever model you do have, the
agent only benefits from it if it can read it.

## What we already had

On the rewrite, the structure was there from the start:

- **Modules per subdomain.** The backend is a modular monolith with more than twenty modules, each
  aligned with a business subdomain, each with its own data and a service interface.
- **Hexagonal inside each module.** Domain, application and adapters are separate packages.
  Architecture tests fail the build if the domain depends on an adapter or on the framework.
- **Names enforced by the build.** Linters check naming in the API contract and the backend. The
  domain's own abbreviations are listed as first-class names that must not be
  "expanded" into something more readable but wrong.
- **Rules for agents.** A convention states that agents must use the domain vocabulary in code
  and in prompts, that a human decides where code goes and records the decision, and that an agent
  should be asked for the edge cases before it writes the code.

What we did not have was the language itself, in a form an agent can load. Our DDD guideline
explained bounded contexts and glossaries well, with textbook examples. The project's own terms
lived in people's heads, in the legacy code, in the rules files and in hundreds of notes the
agents had written to themselves. The rule "use the domain vocabulary" pointed at a vocabulary
that was nowhere in one place.

## A loop in four steps

This is the approach I am now putting in place. It is not new DDD; it is DDD with an explicit
handover to agents at each step.

### 1. Discover with people

EventStorming and the other discovery workshops stay human. The point of a Big Picture session is
not the wall; it is the moment two people realise they do not mean the same thing by the same
word. An agent cannot have that moment for you.

AI can still help around the workshop: preparing questions before meeting domain experts, or, as
some practitioners propose, playing a junior domain expert who is allowed to be wrong, and whose
suggestions are marked as such. It generates questions, not answers.

### 2. Distil into the repository

After each workshop, the team writes down what it learnt, by hand, in files the agent can read:

- **A domain vision**: what the system is for, the subdomains, and the bounded contexts with one
  line each.
- **One file per bounded context**: its purpose, its glossary (business term, code term,
  definition), the terms that are banned in it and why, its rules and invariants, and the events
  it publishes.
- **The context map**: who depends on whom, and the translation rules at each boundary.

The files live next to the code, and the agent loads only the context it is working in. A short
glossary per context beats one long instructions file: it costs fewer tokens, and it does not mix
two meanings of the same word.

Writing these files is the coherence work Brandolini insists on. An agent may propose a draft from
the code; a person who was in the workshop decides what goes in.

### 3. Drive with examples in the domain's language

Stories reach the agent already specified, as the [factory post](/blog/agentic-software-factory)
described: acceptance criteria that can fail, and scenarios written in the vocabulary of the
bounded context they belong to. The test comes before the code, and the agent works inside one
context at a time.

This is where specification and domain model meet. A scenario that uses the context's terms
is both a test and a lesson in the language. A scenario that uses vague words teaches the agent
vague words.

### 4. Detect drift

Language drifts: a new synonym appears in a pull request, a concept leaks across a boundary, a
banned term comes back. This is where agents are genuinely good, because comparing artefacts is
cheap for them and tedious for people.

- An agent reviews each change against the glossary and the boundaries of the context it touches,
  and flags new terms, banned terms and cross-context imports.
- The architecture tests already catch structural violations; the glossary check catches the
  semantic ones.
- What the agent finds goes back to the team, as input for the next modelling session. It does
  not rewrite the glossary on its own.

## What stays human

- **Deciding the boundaries.** Agents tend to split contexts too finely and are happy to share
  models across them. Where a boundary goes is a design decision, recorded by a person.
- **Creating the language.** An agent can list candidate terms; the team decides what a word means,
  with the people who use it.
- **Explaining what is merged.** If nobody on the team can explain a change without re-reading
  it, the model has stopped living in the team, whatever the files say.

Brandolini sums it up better than I can: "protect the learning, build explicit coherence, enjoy
AI-assisted coding, in a Domain-aware harness." The loop above is my attempt to make that
concrete on a real project. I will report on what works and what does not.

If you want to bring Domain-Driven Design into a team that works with coding agents, the
[Domain-Driven Design & EventStorming](/services/domain-driven-design-eventstorming) and
[agentic software factory](/services/agentic-software-factory) pages describe how I work. Or
[get in touch](/#contact).
