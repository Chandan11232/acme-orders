# 0001. Raw SQL via pg, no ORM

- Status: accepted
- Decided by: cgarg2461, 2026-10-22
- Decision: D-0001 in the #eng-decisions `decisions` log
- Thread: #eng-decisions (Switch room eng-decisions), thread sw_9255be81e3554f30cfd0ba6ba615ba22

## Context

The team kept going back and forth on whether the orders service should move
from hand-written SQL through `pg` to an ORM (Prisma was the candidate).

- For Prisma: raw SQL strings everywhere are getting hard to review.
- For raw SQL: Prisma hides the queries the team tunes for the reporting jobs,
  and Prisma migrations fight the DBA's scripts.

Today the repo depends only on `pg`, and all queries are written by hand.

## Decision

Keep raw SQL through `pg`. Do not adopt an ORM or a query builder.

## Rule

No ORM or query-builder packages in package.json (for example prisma,
@prisma/client, typeorm, sequelize, drizzle-orm, knex, mikro-orm). All database
access goes through `pg` with parameterised queries ($1, $2, ...), and values
are never concatenated into SQL strings.

## Consequences

- Full control over tuned reporting queries. The DBA's migration scripts stay
  the source of truth for the schema.
- Rows are mapped to objects by hand and nothing checks their types, so
  reviewers have to check that every query is parameterised.
- The review burden of SQL strings stays. Keeping queries in one place
  (for example `src/db.js` / `src/orders.js`) helps.
- Revisit this decision if the reporting jobs move off Postgres.
