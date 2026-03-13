# Planning SQL Drafts

This folder now only keeps planning-stage reference SQL that is still useful for documentation or raw data reference.

It is not the operational source of truth for the running project.

## Purpose

This folder should not contain active auth or deployment SQL anymore.

## Important Rule

Do not treat this folder as the default place to execute production SQL.

If you need the current auth SQL for the live project, use:

- `/home/echo007/.openclaw/workspace/projects/claritypath-app/supabase/better-auth-tables-cp.sql`

## File Notes

- `hexagrams_64_init.sql`
  Raw planning/reference SQL for hexagram data
  Status: reference only

Removed from this folder:

- alternate Better Auth drafts
- blog comment auth drafts tied to Supabase built-in auth
- rename experiments that conflicted with the `cp_` prefix decision

Those drafts were deleted to reduce confusion. The running project should only use the root `supabase/` directory for operational SQL.
