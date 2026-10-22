# 0002. SQL migrations live in db/migrations/ as NNNN_name.sql

- Status: accepted
- Decided by: cgarg2461, 2026-10-22
- Decision: D-0002 in the #eng-decisions `decisions` log
- Thread: #eng-decisions (Switch room eng-decisions), thread sw_f4682462dbd41a31b08206773c443a80

## Context

D-0001 keeps database access on raw SQL through `pg` with no ORM, so there is
no ORM migration tool to say where schema changes go. Before this ADR the repo
had no migrations directory and no naming convention for schema changes.

## Decision

All SQL migrations live in `db/migrations/` and are named `NNNN_name.sql`.

## Rule

Every SQL migration file is in `db/migrations/` and its file name matches
`^[0-9]{4}_[a-z0-9_]+\.sql$` (for example `0001_create_orders.sql`). No `.sql`
migration files anywhere else in the repo.

## Consequences

- One place to look for schema history, and the numeric prefix gives a clear
  apply order.
- Numbers must be unique: two branches that both add `0005_...` will collide
  and one has to be renumbered before merging.
- Fits D-0001: no ORM migration tool is involved.
- Open point: the decision does not say whether a migration may be edited
  after it is merged, or which tool applies them. Raise it in #eng-decisions
  if that needs a rule.
