---
title: Reviewing a Configuration Migration Plan for Material Changes
layout: default
toc: true
---

[Kenfigure home](https://kenfigure.com)

# Reviewing a Configuration Migration Plan for Material Changes

The **Plan Review** tool filters the **Validate plan** page of Benchling's
Configuration Migration import down to the changes that actually matter,
skipping the noise that comes with every round trip.

## When you need this

Round-tripping a configuration (Benchling export → `Kenfigure Tool export` →
`Kenfigure Tool import`) recreates internal identifiers, so Benchling's plan
shows a line for nearly every object and field even when nothing meaningful
changed — thousands of lines on a large tenant. The real differences you'd
actually want to catch before importing — a validation rule that didn't come
back the way it went out, a field that lost its link target — are easy to
miss in that noise.

Plan Review is not specific to Kenfigure-produced imports — it reads whatever
plan Benchling is currently showing — but it's most useful right after a
round trip, and it's a natural second step right after the [bulk "Update"
selection tool](cm_bulk_update.html): fix the Create/Update actions first,
then run Plan Review on the same page to sanity-check what you're about to
apply before clicking **Continue**.

## Usage

1. In Benchling, go to **Configuration migration → Import**
   (`https://<tenant>.benchling.com/config-migration/import`), upload your
   `.dat` file, and continue to the **Validate plan** page.
2. Open the **SCHEMAS** tab so the "All Changes" panel is present (collapsed
   sections are still read correctly — this tool doesn't need them expanded
   the way the bulk "Update" selection tool does).
3. Click the **Plan Review** bookmarklet. (One-time install from the
   [bookmarklet page](plan_review_bookmarklet.html): drag the button to your
   bookmarks bar.)

A summary panel appears in the corner of the page with the material changes
and a **Copy** button (for pasting into a ticket or chat), and the same rows
are highlighted in place on the plan itself — material rows get a red
outline, everything else is dimmed — so you can scroll the real page with the
noise visually stripped out.

## What gets filtered

These are treated as expected round-trip noise, not material changes:

- **Identifier changes** — an object or field's internal identifier changed,
  with no other property change alongside it.
- **FieldsetConfig and ValidationRule remove-and-replace pairs** — a matched
  Creating/Removing pair for the same named object is an identifier change
  under a different mechanism, not an actual removal followed by an unrelated
  addition.
- **Bare `Creating Identifier` lines** — an identifier change with no display
  name attached.

Everything else — an actual property value change, a field that changed
type, a genuinely new or removed object — is left as material and shown in
the report.

## Safety properties

- Runs entirely in your browser tab; makes **no network requests** and
  touches no credentials.
- Read-only: it only reads text already on the page and adds highlighting
  styles. It never changes a dropdown selection, so it's safe to run
  alongside or in any order relative to the bulk "Update" selection tool.
- Re-running it is always safe — it just re-scans and re-highlights.

## Troubleshooting

- **`"All Changes" panel not found`** — you're not on the Validate plan page,
  or you're on a tab that doesn't have this panel. Open the **SCHEMAS** tab.
- **A change you expected to see filtered out is still showing (or vice
  versa)** — the tool matches Benchling's current config-migration UI (the
  summary panel and console show the tool version, e.g. v1). If Benchling
  ships a redesign, contact [support@go2.software](mailto:support@go2.software)
  for an updated version, and re-install the bookmarklet from the
  [bookmarklet page](plan_review_bookmarklet.html).
- **A snapshot/computed field shows a change to its link type that you didn't
  make** — Benchling can recompute a snapshot field's stored type from its
  live lookup target during import, independent of what was in the imported
  package. This has been observed as a benign self-correction, not data loss
  — the underlying lookup formula came through unchanged. If in doubt, check
  the field's configuration in the UI after import.
