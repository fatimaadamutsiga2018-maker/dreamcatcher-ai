# Supabase SQL Guide

This directory contains SQL files related to ClarityPath database setup and historical migrations.

## Source Of Truth

For the current authentication system, the active SQL entrypoint is:

- `better-auth-tables-cp.sql`

This is the only auth SQL in this directory that matches the current project decision:

- Better Auth
- Supabase PostgreSQL
- `cp_` table prefix

## Current Status

### Current / active

- `better-auth-tables-cp.sql`
  Purpose: Better Auth compatible auth tables for ClarityPath
  Status: current

- `update-result-labels.sql`
  Purpose: result label updates for domain content
  Status: potentially still useful, non-auth

### Legacy / do not run casually

Historical SQL files are archived under:

- `supabase/legacy/`

They are kept for reference and git history, but they do not represent the current auth direction.

## Important Warning

Some local scripts in `scripts/` still reference older SQL files, now under `supabase/legacy/init.sql`.
That means:

- old SQL files are not automatically applied to production
- but they are still dangerous if someone manually runs the old scripts

Before running any DB setup script, verify that it points to the intended SQL file.

## Working Rule

If the goal is to work on current auth:

1. Use `better-auth-tables-cp.sql`
2. Keep `cp_` prefixes
3. Do not revive old NextAuth SQL
4. Do not mix these files with `planning/supabase/` drafts
