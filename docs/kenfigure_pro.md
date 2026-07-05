---
title: Kenfigure Pro
layout: default
toc: true
---

[Kenfigure home](https://kenfigure.com)

# Kenfigure Pro™

_Kenfigure is a product of Go2 Software LLC · Last updated: June 2026_

The configuration-management discipline software teams apply to code — now for your Benchling platform.

<a href="pricing.html" class="kf-cta-btn">See pricing →</a>  &nbsp; [Read the FAQ](faq.html)

---

## The challenge of Benchling configuration management

Benchling configuration — entity schemas, dropdowns, result schemas, templates, and more — is complex, evolves constantly, and exists only as UI clicks. There is no version history, no way to propose and review a change before it is applied, no easy path to reproduce a configuration in a new environment, and no visual overview of how everything fits together.

For small teams at an early stage this is manageable. For growing teams, for cross-environment consistency, and especially for regulated environments, configuration debt accumulates fast.

---

## The foundation is free and open

Kenfigure starts with a structured, version-controlled source of truth.

The **[Kenfigure™ YAML standard](https://kenfigure.com)** is open-source: a documented format for describing Benchling configurations as human- and machine-readable text. It maps directly to what you see in the Benchling UI, works naturally with Git (branches, pull requests, diffs, code review), and integrates with modern IDEs for completions, hints, and schema validation.

**Kenfigure Tool™ (Export)** is free for all Benchling users. It runs as a Benchling Canvas app and exports your configuration as a tree of Kenfigure YAML files — either as a downloadable `.zip` or written directly to your own Git repository. It also includes **schema lint**: heuristic quality checks that flag potential configuration issues before they become problems.

Start free. Keep what you build. Your YAML files live in your own Git repo, in an open format that remains readable and useful regardless of any subscription.

---

## Kenfigure Pro closes the loop

**Kenfigure Pro™** is an annual subscription that adds **Kenfigure Tool™ (Import)** and **Kenfigure Diagram™** — the tools that turn a versioned YAML source of truth into a full configuration-management workflow.

One per-company subscription covers all of your Benchling environments (Dev, Test, Prod, and any Sandbox or Preview tenants). No developer or DevOps engineer required: Kenfigure Pro runs as a Benchling Canvas app and a hosted web application — a Benchling administrator can run the full workflow.

### Kenfigure Tool™ (Import)

Push reviewed, versioned configuration changes back to Benchling without manual UI work.

Instead of translating your YAML back into hundreds of UI clicks — error-prone, time-consuming, and impossible to review before it happens — Kenfigure Tool (Import) generates a Benchling Configuration Migration file from your YAML source of truth and applies it to your tenant. Every import originates from a branch that has been reviewed and approved. Imports are accurate, complete, and fully auditable.

Both **Import from File** (upload a `.zip` of your Kenfigure directory) and **Import from Git** (pull directly from a configured repository branch) are included.

### Kenfigure Diagram™

An interactive entity-relationship diagram of your Benchling configuration — always current, connected to your source of truth.

Kenfigure Diagram visualizes your schema as an explorable graph: filter by schema type, navigate relationships, and search across the entire configuration. Every export you run through Kenfigure Tool automatically refreshes the diagram; you can also point Kenfigure Diagram directly at a Git repository branch for a live view of your YAML.

Schema lint results appear inline as visual indicators — the equivalent of a spell checker for your Benchling data model. Lint suppressions are tracked in Git alongside your configuration.

The **Prompt Builder** assembles rich, targeted context from selected schema elements, ready for SQL query development or AI-assisted analysis. Kenfigure Diagram also integrates with Benchling AI for chat-based schema exploration directly in the interface.

### Git integration throughout

The free Export tier already writes configuration to your Git repository. Kenfigure Pro goes further: Kenfigure Tool (Import) pulls YAML directly from a configured repository branch as its source, and Kenfigure Diagram reads and writes to your repo — saving diagram layouts, sub-layouts, and lint suppressions to a branch of your choice. Configuration, diagram state, and quality decisions all live in one reviewable, versioned place.

---

## Who it's for

**Benchling administrators** who want their configuration under the same discipline as their code — version history, review before changes apply, and a clear record of what changed, when, and why.

**Growing teams investing in Benchling.** The best time to establish good configuration-management practice is before the configuration grows complex. Starting with Kenfigure means building on a solid, reviewable foundation — not trying to reconstruct one after the fact.

**Validated Cloud and GxP teams.** For regulated environments, a versioned source of truth, reviewed changes, and an auditable promotion path through Sandbox/Preview environments to production are not conveniences — they are expectations. Kenfigure provides exactly that workflow. (Validated Cloud is supported across all subscription tiers; [contact us](mailto:info@go2.software) for a tailored quote.)

### Kenfigure Pro and Benchling's Configuration Migration tool

Kenfigure Pro _complements_ Benchling's Configuration Migration tool — it does not replace it. Configuration Migration is the mechanism Benchling provides for applying configuration changes. Kenfigure Pro provides the discipline around it: a versioned source of truth, a structured review step before changes are applied, and a reproducible import process — so every use of Configuration Migration is intentional, traceable, and consistent.

---

## Licensing and pricing

A single per-company subscription covers all of your Benchling environments. Pricing tiers are based on your organization's total Benchling user count — not the number of people who will use Kenfigure directly.

→ [See pricing and tiers](pricing.html)  
→ [Frequently asked questions](faq.html) — coverage, security, licensing, and support.  
→ [Feature Support Matrix](feature_matrix.html) — supported Benchling object types for Export, Import, and Diagram.

<a href="pricing.html" class="kf-cta-btn">See pricing →</a>

---

[Back to Kenfigure home](https://kenfigure.com)
