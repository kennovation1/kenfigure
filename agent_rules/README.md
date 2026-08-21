# Agent rules

Starter instructions for AI coding agents working in a **Kenfigure configuration repository** - a repo
holding Kenfigure YAML that describes a Benchling tenant.

Copy the file your tool reads into **your** configuration repository. These are not meant to be used in
a clone of the Kenfigure repo itself, which holds the standard and its schema rather than a configuration.

| File | Tool | Copy to |
|---|---|---|
| `kenfigure.mdc` | Cursor | `.cursor/rules/kenfigure.mdc` |
| `CLAUDE.md` | Claude Code | repository root, as `CLAUDE.md` |
| `AGENTS.md` | GitHub Copilot, Codex, and other tools that read `AGENTS.md` | repository root, as `AGENTS.md` |

The three carry identical content. `kenfigure.mdc` adds the `alwaysApply: true` frontmatter Cursor needs.

After copying, fill in the environment profile table at the top - or leave the placeholders and let the
agent work them out from the repo and confirm them with you on first use.

## What the rules cover

- Loading the Kenfigure JSON schema and the schema design style guide before authoring, rather than
  working from what the model remembers.
- Where the style guide is the default and where an established model's own conventions override it.
- A model-building sequence: understand the process, survey before adding, agree a design before
  generating YAML, then write, validate, and lint.
- File naming, directory layout, and why layout choice interacts with refresh exports.
- The `Tool tip` versus `Description` split - guidance for the person at the bench versus documentation
  for whoever maintains the model.
- Checking what references an object before renaming or archiving it.
- Querying the warehouse to see real data before changing the model that holds it.

## Adapt them

This is a starting point, not a specification. Delete what does not apply, add your own conventions, and
keep the file in version control alongside the configuration it describes.

Improvements are welcome - please open a pull request.
