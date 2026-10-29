---
title: 'Inside an agentic software factory'
description: 'How a small public-sector team organised coding agents, a backlog and a set of gates into a factory, and what went wrong along the way.'
date: '2026-10-29'
lang: en
tags: [agentic-ai, software-factory, delivery, public-sector]
draft: false
translationOf: fr/au-coeur-d-une-software-factory-agentique
---

Coding agents have made code cheap. Most teams now build software faster, but they do not ship
it faster. The code arrives in minutes, then waits for refinement, review, a test campaign, an
approval. The bottleneck has moved from writing code to everything around it: deciding what to
build, and checking that it was built right.

For the past months I have worked with a small team that took this seriously. We are rewriting
a large public-sector web platform. The new version must do everything the old one does (but better), and replaces
it one user story at a time with a fixed deadline, while the old site stays online. We organised
the work as an agentic software factory. This post describes what that means, how we set it up, and what broke on the way.

## What an agentic software factory is

Here is how I define it, from what we built:

> An agentic software factory is a delivery system in which coding agents do the repeatable
> production work and people own the intent, the judgement and the acceptance. It takes
> specified work in, and puts verified, traceable software out, through rules that are
> enforced while the work is done. Every defect it lets through becomes a new rule.

Each part of that sentence carries weight.

- **A delivery system, not a tool.** A coding assistant helps one developer write code faster.
  A factory covers the whole path, from a story on the board to accepted software in
  production, and the same path is followed for every change.
- **Agents do the production work; people own the decisions.** The developer stops typing most
  of the code and starts running the system that produces it: choosing the work, reviewing the
  result, and answering for what is merged.
- **Specified work in.** The factory does not take ideas or wishes. It takes stories that state
  who they are for, what is in scope and how success will be checked.
- **Verified, traceable software out.** Every change can be followed back to the requirement
  that asked for it and the tests that prove it.
- **Rules enforced while the work is done.** Not guidelines that a reviewer may or may not
  remember, but hooks, generated code and CI gates that the agent cannot get past.
- **Every defect becomes a new rule.** This is what separates a factory from a set of prompts.
  It gets better from its own mistakes.

The consequence is that writing code is no longer the constraint. Checking it is. When
generation is cheap, a team ships as fast as it can verify, so most of the design effort goes
into the gates. But you can only verify against something, and that something is the
requirement.

## The work shifts left, to intent

When almost anything can be built in an afternoon, the hard questions are no longer about how to
build it. They are about what to build, for whom, and how good it has to be. An agent builds
exactly what is written. Where the requirement is silent, it does not stop to ask: it fills the
gap with a plausible default drawn from everything it has seen, which is rarely what your users
need. A factory amplifies the quality of what goes in. A weak story now produces weak software,
only faster.

So the effort moves upstream. On this project, refinement is where people spend the time that
coding no longer takes, and a story is not ready until it says, in writing:

- **Who and why.** A named type of user from a fixed list, what they want, and the benefit.
- **The boundaries.** A short description of the business context, what is in scope and, just
  as important, what is explicitly out of scope.
- **Acceptance criteria that can fail.** Each one specific, measurable and testable, covering the
  happy path, the error cases (invalid input, missing data, a service that is down) and the edge
  cases (empty results, maximum values, special characters).
- **The quality it must reach.** Non-functional requirements are part of the story, not an
  afterthought: a response time, an accessibility level, the screen sizes it must work on. If
  nobody states them, the agent will not invent them.
- **Examples.** Scenarios written in Gherkin, at least one per criterion plus one negative case,
  declarative rather than tied to the user interface, with concrete example data.
- **What it replaces.** For a rewrite, a reference to the legacy behaviour the story must match,
  or an explicit statement that it is new.

Agents help here too, but as critics rather than authors. The refinement command checks a story
against the legacy functional documents, hunts for duplicates and contradictions across the
backlog, and reviews the quality of the scenarios. The development command repeats part of that
check before it starts: is this already built, does it contradict another story, is it legacy
parity or new scope, and if new, can it be traced to a signed-off design? Any red flag stops the
build and goes back to a person.

Once a scenario is drafted, it is a commitment. It is either built or retired with a written
reason, and CI blocks the merge otherwise. This closed a real hole: a story could be refined
with eight scenarios, delivered with three, and closed green.

The roles that matter most change accordingly. The product owner and the business analyst are
no longer upstream of the real work; their writing is the real input to the factory. And the
skills that make a good requirement (asking why, finding the edge case, agreeing on an example)
are the ones that make a good facilitator.

## The factory on one page

Our version rests on three ideas.

- **People own intent, judgement and acceptance.** A product owner refines and accepts, a
  developer drives the agents and owns what is merged, a reviewer reviews, business testers
  validate.
- **Agents do the repeatable production work.** Writing tests, implementing, reviewing,
  analysing legacy code, updating the board.
- **Rules are enforced while the agent works, not discovered in review.** Hooks, generated
  code and CI gates catch problems before a person has to.

The tooling is Claude Code, configured in the repository itself: rules files, 16 specialist
subagents, 27 commands, 27 skills and 12 hooks, all committed so every developer has the same
factory.

## One source of truth, traceable end to end

The backlog lives in GitLab and nowhere else. Epics, stories, acceptance criteria, Gherkin
scenarios, status and assignments are all there. Agents read and update it through the API, with
commands we wrote, so there is no parallel tracker to drift.

Every story has a stable identifier, and every test scenario has a permanent one derived from it.
A scenario number is never reused: deleting a scenario retires its number. This gives a chain
from requirement to code that CI can check:

```text
Story  US-AREA-NNN
  └─ Acceptance criteria
       └─ Gherkin scenario  @US-AREA-NNN-01
            └─ Test + code + merge request
```

A knowledge graph over the backlog, the code, the legacy code and the documentation lets an agent
ask which stories touch a piece of code, or how the legacy system did something, before it
changes anything.

<figure>
  <img src="/blog/software-factory/docs-graph.webp" width="1200" height="1156" loading="lazy" decoding="async" class="w-full h-auto rounded-2xl" alt="A network graph on a dark background: hundreds of coloured dots, each a document or concept, joined by thin lines. Most form one dense central cluster around a few large hubs; smaller groups of related documents sit around it, and a few isolated dots stand apart." />
  <figcaption>The knowledge graph of the project documentation. Each dot is a document or a concept, each colour a group of closely linked ones.</figcaption>
</figure>

## Commands move the cards

The board has twelve lanes, each with a clear owner or marked as a queue. People do not drag
cards: commands do, as a side effect of doing the work. The board is true because it is updated
by the same steps that produce the change.

| Lane change                    | Command           | What it does                                                         |
| ------------------------------ | ----------------- | -------------------------------------------------------------------- |
| To do → Ready for dev          | `/refine-us`      | Checks the story against legacy documents, duplicates and scenario quality |
| Ready for dev → Developing     | `/feature-dev`    | Story check, branch, exploration, design, then a test-first build     |
| Before the merge request       | `/self-review`    | Parallel local reviewers: code, security, tests, types, design        |
| Developing → Ready for review  | `/commit-push-mr` | Conventional commit, push, merge request from a template, status update |
| On the merge request           | `/review-mr`      | Multi-lens review, scored findings, one resolvable thread             |
| Accepted → Done                | `/close-story`    | Closes the story after business acceptance                            |

Refinement and development never overlap. The refinement command never touches code or git; the
development command refuses a story that has not reached the Definition of Ready, and never
rewrites it.

## Narrow roles, separated duties

Each subagent has one job and the tools for that job only. The rule that matters most: **the
agent that writes the failing test is not the one that makes it pass.** A test engineer agent
writes tests from the Gherkin and cannot touch production code. The backend or frontend engineer
agent makes them pass and may not weaken a test. Before any design, the test engineer lists the
edge cases, and each one becomes a test or a recorded decision.

This is separation of duties, applied to agents. A model that checks its own work tends to
confirm it; the signal that decides whether the work holds has to come from somewhere else.

The API follows the same logic. One OpenAPI specification generates both the backend
controllers and the frontend types. The loop is always: edit the contract, regenerate,
implement. Code that drifts from the contract fails the build, so an agent cannot quietly invent
an endpoint.

Each story is built in its own git worktree, so agents working in parallel cannot step on each
other.

## Guardrails at three moments

| When                     | What checks the work                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| While the agent works    | Hooks for test-first, linting and worktree safety; secrets are unreadable by the agent; narrow tool permissions per agent |
| Before the merge         | Local self-review, then a multi-lens review with a mandatory security pass; only high-confidence findings are posted |
| In CI                    | Contract drift, documentation consistency, scenario ids and coverage, static analysis, dependency scanning      |

Some things stay human by design: refinement, code review, acceptance, and architecture
decisions, which are recorded as ADRs. An agent may draft an ADR; a person owns the choice.

The team's conventions borrow a line from Codurance's
[Software craftsmanship in the AI era](https://www.codurance.com/publications/software-craftsmanship-in-the-ai-era):
"AI is the engine. Craftsmanship is the compass." They turn it into seven rules. Most are
enforced by gates. The last one is not, and it is the one that holds the rest together: **you
must be able to explain what you merge.** If you cannot say what the code does, why it sits in
that layer and what happens at its edges, you are not the author yet.

The reason is what the conventions call the entropy loop. An agent generates a large change into
code with weak boundaries; the reviewer cannot really assess forty files and approves anyway;
nobody holds the mental model of what was merged; the next prompt reads that code as context and
reproduces its shape. Bad code produces more bad code, and an agent does it at machine speed.

## Keeping the state of the work in view

The team also wrote eleven small Claude Code extensions that put the state of the work inside
the session: a card showing the current story and its progress during a build, a radar of open
merge requests and pipelines, a preflight that predicts which CI gates a change would trip and
runs the cheap ones locally, the static analysis quality gate in the status line, the standup as
a card, and dashboards for token usage and cost. Each one reads a real system. The point is to
see a problem before review, not after.

## Where the models run

For a public-sector client this question comes first. The models run through a managed AI
service in an EU region, inside a cloud account provided by the institution, with cost
allocation per project. Which code and data the agent can see is bounded by the repository and
by what the hooks and permissions allow; secrets are out of reach.

## What went wrong, and what we changed

The most useful part of the setup is the list of failures that shaped it.

- **Agents edited the wrong branch or worktree.** Now each story has its own isolated worktree,
  with absolute paths pinned.
- **Tests passed, behaviour was wrong.** Now a fix is not done until the real application has
  been restarted and checked live. Passing tests are not proof.
- **An agent invented search logic.** It wrote a plausible-looking query clause that no legacy
  code ever used, and cut the results of a common query from 1,824 to 2. Now parity tests run
  against the live search service and the legacy site, and agents must use the domain's own
  vocabulary.
- **Parallel agents and hooks raced each other.** Now we commit only between waves of agents.
- **Documentation went stale.** Now a CI gate fails on any link or file path that does not
  resolve.
- **Review effort moved to people.** Someone has to read what is merged. This is the main cost
  of the approach, and we accept it.

Every failure became a rule, a hook or a gate. That is what makes it a factory rather than a
collection of prompts: it learns from its own defects.

## How it maps to the AI-native SDLC

Anthropic's
[AI-native SDLC playbook](https://academy.claude.com/courses/ai-native-sdlc-playbook) describes
six stages of an agent-assisted lifecycle. Our setup maps onto them like this.

| Stage    | What we do                                                                                   |
| -------- | -------------------------------------------------------------------------------------------- |
| Plan     | Stories refined to a Definition of Ready; intent captured as acceptance criteria and Gherkin |
| Design   | Contract-first API; decisions recorded as ADRs                                               |
| Build    | Rules in `CLAUDE.md` files; skills; subagents in isolated worktrees; tests before code       |
| Test     | Thousands of scenarios with permanent ids; several CI test tiers; feedback loops for the agent |
| Deploy   | Multi-lens automated review; hooks as approval gates; release skills                         |
| Maintain | Daily and review preparation; test, quality and usage reports                                |

In numbers, from April to October 2026: more than 2,000 work items created, more than 1,000 merge
requests and more than 34,000 automated tests.

## Where to start

You do not need sixteen agents on day one. The playbook lists six plays with no prerequisites,
and they are the ones I would start with:

1. **Capture intent.** Write down the need, the boundaries and the quality expected before
   generating anything. This is where to invest first.
2. **Plan mode.** Agree the plan before any code.
3. **A rules file.** `CLAUDE.md`: the project rules the agent always sees.
4. **Skills.** Package know-how you repeat.
5. **Feedback loops.** Give the agent tests it can run.
6. **Hooks.** Automatic gates for the rules that must always hold.

Then pick one team, one product area and one lane of the board for thirty days, and measure cycle
time and rework. Add a gate every time something goes wrong.

If you want to set up something similar, with the guardrails your context requires,
[get in touch](/#contact).
