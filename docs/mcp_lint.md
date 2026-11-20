---
title: Schema lint from your AI coding assistant
layout: default
toc: true
---

[Kenfigure home](https://kenfigure.com)

# Schema lint from your AI coding assistant

*Included with [Kenfigure Pro™](kenfigure_pro.html) · Go2 Software LLC*

If you keep your Benchling configuration as Kenfigure YAML in Git, you can check your edits
against Kenfigure's schema lint rules without leaving your editor. Kenfigure provides a remote
[MCP](https://modelcontextprotocol.io) server with a `lint_kenfigure` tool. MCP-capable coding
assistants, such as Claude Code, can call it on the files you're working on.

It runs the same lint rules as an export from Kenfigure Tool, and it reads your
`schema_lint.yaml` suppressions the same way Kenfigure Diagram does. No AI runs on our side: the
server lints the files and returns the findings.

## What you need

- A Kenfigure Pro subscription that includes import for your Benchling tenant.
- A Kenfigure API token. During this early release we issue tokens by request: email
info@go2.software with your Benchling tenant (for example `acme.benchling.com`) and the email
address you sign in to Kenfigure with. Each token belongs to one person and one tenant and
expires after 90 days.

Treat the token like a password. Keep it in an environment variable or your secret store, not
in your repository. If one is exposed, tell us and we'll revoke it.

## Connect Claude Code

```bash
export KENFIGURE_TOKEN=kfp_...        # better: load it from your secret store
claude mcp add --transport http kenfigure https://canvas.kenfigure.com/mcp \
  --header "Authorization: Bearer $KENFIGURE_TOKEN"
```

Other MCP clients connect the same way: a Streamable HTTP server at
`https://canvas.kenfigure.com/mcp`, with the token in an `Authorization: Bearer` header.

## Using it

Ask your assistant in plain language. For example:

- "Lint the dropdown file I'm editing with Kenfigure."
- "Run Kenfigure lint on the files I've changed on this branch."
- "Lint the whole Kenfigure model in `test/` and summarize the findings by rule."

The assistant sends the files' current contents, including unsaved and uncommitted edits, and
gets back each finding's rule ID, object, field or option, message and file.

A few things to know:

- **Send the whole model for a complete check.** Most rules look at one schema or dropdown at a
time. A few compare objects with each other, such as duplicate names and conflicts between
schemas. Those only see the files you send. The result tells you when its coverage was partial.
- **Suppressions.** If your model directory has a `schema_lint.yaml`, send it along and
suppressed findings are left out. Ask for "all findings, including suppressed" to see what the
suppressions are hiding.
- **Lint only.** This checks the lint rules. It does not yet validate files against the Kenfigure
JSON Schema or check references to dropdowns and schemas that weren't sent. An import through
Kenfigure Tool still does both.
- **Large trees.** Your assistant sends each file's contents as part of its request, so linting
a large model this way uses a lot of its context. For now, lint the files you changed. Linting a
branch from your Git repository, and uploading a whole working tree without passing it through
the assistant, are both coming (see below).
- **Kenfigure Diagram.** Diagram highlights lint findings in context on the diagram, and its
Lint Viewer lists them and lets you suppress the ones you've decided to accept. Suppressions
saved there go into `schema_lint.yaml`, which this tool reads.

## What's next

- Lint a branch directly from your configured Git repository, without sending the files.
- A command-line upload of a whole working tree, for your own machine and for pull-request
checks in CI.
- Self-service API tokens.

Questions or feedback: info@go2.software.
