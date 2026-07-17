---
title: Bulk "Update" Selection for Configuration Migration Import
layout: default
toc: true
---

[Kenfigure home](https://kenfigure.com)

# Bulk "Update" Selection for Configuration Migration Import

The **CM Update All** tool automates the most tedious step of importing a
Kenfigure-produced `.dat` file with Benchling's Configuration Migration tool:
flipping hundreds of per-object **Create** actions to **Update** of the
same-named object.

## When you need this

When Kenfigure Tool round-trips a configuration (Benchling export →
`Kenfigure Tool export` → `Kenfigure Tool import`), the internal identifiers in the
resulting `.dat` file are recreated to be based on the new virtual source environment.
On import, Benchling therefore cannot definitively match
objects to their originals and conservatively defaults every action to **Create**.
The correct action is almost always **Update &lt;same-named object&gt;**, and Benchling
lists that matching object first among the "Update ..." menu entries — but the
UI only offers global **Reset** and **Ignore All**, so each row must normally be
changed by hand.

**You only need this once per configuration.** After the first import completes
with Update actions, the internal identifiers in Benchling (that track where the
last import came from) match the ones in your Kenfigure repo, and subsequent imports
default to Update automatically.

## Usage

1. In Benchling, go to **Configuration migration → Import**
   (`https://<tenant>.benchling.com/config-migration/import`), upload your
   `.dat` file, and continue to the **Validate plan** page.
   (These instructions are based on the "new migration experience". You should
   switch to that version of the UI if not already using the new experience.)
2. Open the **SCHEMAS** tab.  Make sure the object-class sections you care about
   are expanded (which is the default) — collapsed sections will not be processed.
3. Click the **CM Update All** bookmarklet. (One-time install from the
   [bookmarklet page](cm_update_all_bookmarklet.html): drag the buttons to your
   bookmarks bar.)

The tool walks every dropdown currently showing **Create**, opens it, and
clicks the **Update &lt;row name&gt;** entry (falling back to the first
"Update ..." entry — which Benchling sorts to be the name match — if the row's
name can't be read exactly). Progress appears in a status box in the corner of
the page — with a Stop button, a final summary, and a list of any rows that
need manual attention — and is also logged per row in the console.

Repeat steps 2–3 for each tab (Tenant Settings, Schemas, Templates, Workflows)
that has rows you want to update, then review and continue the wizard as usual.
Tenant Settings should not need attention since Benchling defaults to Update
on that tab. Templates and Workflows are typically not relevant with the current
state of Kenfigure Tool, which does not support import of Templates or Workflows.

### Safety properties

- Runs entirely in your browser tab; makes **no network requests** and touches
  no credentials. It only simulates the clicks you would make yourself, so
  nothing is submitted to Benchling until you click **Continue** in the wizard.
- Only rows currently showing **Create** are touched. Rows already set to
  Update/Ignore — by you or by a previous run — are left alone, so it is safe
  to rerun (e.g. after expanding a section you missed).
- The **Stop** button in the on-page status box stops it after the current row.

### Dry run

The install page provides a second bookmarklet, **CM Update All (dry run)**.
It walks the same rows and shows exactly which menu entry would be chosen for
each one — in the status box and the browser console — without changing
anything. A dry-run pass first is a good habit on a large import.

## Troubleshooting

- **"No Create dropdowns found"** — you're not on the Validate plan page, you're on a
  tab with no pending rows, or all sections are collapsed.
- **Rows fail with "menu never opened" / "row still shows Create"** — the UI is
  probably lagging; click the bookmarklet again. Reruns skip everything
  already updated.
- **Nothing happens at all** — the tool matches Benchling's current
  config-migration UI (the status box and console show the tool version, e.g.
  v1). If Benchling ships a redesign, contact
  [support@go2.software](mailto:support@go2.software) for an updated version,
  and re-install the bookmarklet from the
  [bookmarklet page](cm_update_all_bookmarklet.html).
