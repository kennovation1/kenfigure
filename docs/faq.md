---
title: Kenfigure Pro FAQ
layout: default
toc: true
---

[Kenfigure home](https://kenfigure.com)

# Kenfigure Pro™ — Frequently Asked Questions

_Go2 Software LLC · [info@go2.software](mailto:info@go2.software)_

_Not sure what Kenfigure Pro is? [Read the product overview](kenfigure_pro.html) first._

---

## Getting started

**What is Kenfigure Pro and what problem does it solve?**

Benchling configuration — entity schemas, dropdowns, result schemas, and more — is complex, evolves constantly, and exists only as clicks in a UI. Kenfigure Pro brings that configuration under version control: export it to reviewable, auditable YAML; propose and review changes in Git; import them to Benchling precisely; and explore the resulting schema through interactive diagrams. The result is the same configuration-management discipline software teams apply to code, now applied to your Benchling platform.

**Do I need a developer or DevOps engineer to use Kenfigure Pro?**

No. Kenfigure Pro runs as a Benchling Canvas app — there is no infrastructure to set up or maintain on your end. A Benchling administrator can run the full workflow. Configuration files are YAML — human-readable text that uses the same labels and values you see in the Benchling UI, not code — and Kenfigure Diagram™ makes the schema visually explorable by any user without opening a file. Familiarity with Git is helpful, but not required since Git integration is optional.

**What Benchling tenant types are supported?**

Kenfigure Pro works with the standard Benchling enterprise platform. Validated Cloud tenants are fully supported. Kenfigure Pro is not applicable for academic tenants.

**How do I get started?**

Choose your tier on the [pricing page](pricing.html) and complete the [order form]({{ site.data.urls.auth_base_url[jekyll.environment] }}/order). We provision your account once your order is placed — you do not have to wait for payment to clear. The free **Kenfigure Tool™ (Export)** is available to anyone immediately with no order form required: install the Benchling Canvas app and export. See the [Kenfigure Tool User Guide](./kenfigure_tool_user_guide.md) for details and installation instructions.

---

## Pricing and licensing

**How is my pricing tier determined?**

We use your organization's total Benchling user count as a proxy for the scale and complexity of your Benchling deployment. Your tier reflects that scale — it is not a per-seat charge, and has nothing to do with how many people will use Kenfigure Pro directly.

**How many people can use Kenfigure Pro?**

As many as you need. Kenfigure Pro is a **company-wide license** — there is no per-seat fee and no cap on the number of logins you can provision. Every administrator, reviewer, and scientist who needs access can have an account.

**Does a Kenfigure Diagram user need to be a Benchling user?**

No. A Kenfigure Diagram user has a unique Kenfigure Pro login, and they need not also have a Benchling account. This is particularly helpful for computational or data scientists who need to understand the data model but don't need to consume a Benchling user seat.

**Does Kenfigure Pro cover all of our Benchling tenants?**

Yes — all of them. One subscription covers every Benchling environment in your organization: Dev, Test, Prod, Sandbox, Preview, and any others. You pay once for your organization, not once per environment.

**We're a startup. Is it too early to use Kenfigure Pro?**

The best time to establish good configuration management practice is at the very beginning, before things get complicated. Your science will evolve constantly, and so will your Benchling configuration. Starting with a versioned source of truth means every change is documented, reviewed, auditable, and safely promotable from day one. Starting without one means accumulating configuration debt: schemas with undetected quality issues, structural duplications that become load-bearing, and change habits that are far harder to reform later than to build correctly from the start. Closing the barn door after the horses have left is possible — but considerably more painful. That's why we offer the sharply discounted Startup tier to make starting early easy.

**Can I commit to multiple years to lock in pricing?**

Yes. A 2-year prepay earns **10% off** the annual rate; a 3-year prepay earns **15% off**. Both prepays lock the price for the full committed term. After the term, the subscription renews annually at then-current pricing.

**Is there a free trial?**

The free **Kenfigure Tool (Export)** is available to every Benchling customer at no charge and requires no order form. Export your configuration, review the schema-lint output, and explore the YAML — all before committing to Kenfigure Pro.

---

## Features and coverage

**What types of Benchling configuration objects are supported?**

The vast majority of Benchling configuration objects are supported. Some object types have partial coverage across export, import, and diagram. See the full [Feature Support Matrix](feature_matrix.html) for complete coverage by object type and feature.

**How is Kenfigure Pro different from just using Benchling's Configuration Migration tool?**

Benchling's Configuration Migration tool is the mechanism for applying changes — Kenfigure Pro is the discipline around that mechanism. Without Kenfigure Pro, the source of a configuration change is a person clicking through the Benchling UI: undocumented, unreviewed, unversioned, and unrepeatable. With Kenfigure Pro, every change originates in YAML, optionally goes through a pull request, and is applied precisely and auditably via Benchling's own tool. Kenfigure Pro doesn't replace Configuration Migration; it makes every use of it intentional and traceable.

**Does Kenfigure Pro support Benchling Validated Cloud?**

Yes, fully. Kenfigure Pro works with Validated Cloud tenants and is built around the GxP promotion pattern: edit in Git, approve with a pull request, import to Preview (or Sandbox), validate, and promote to Prod via Configuration Migration — with a complete audit trail at each step.

**How does Kenfigure Diagram work?**

Kenfigure Diagram is a web-based interactive entity-relationship diagram of your Benchling configuration. It lets you visualize and navigate complex schema relationships, see schema-lint findings in context, search across schema elements, and use the Prompt Builder to generate SQL queries and AI starting points from selected elements. Layouts, groupings, and lint suppressions can be saved to your Git repository so the diagram state is versioned alongside your configuration. When backed by Git, the diagram reflects the current state of your branch in real time — changes committed to Git are immediately visible in the diagram, even before they have been imported to Benchling.

**What is the Git integration and what does it add?**

The free **Kenfigure Tool (Export)** can already write exports directly to your Git repository. **Kenfigure Pro** extends this in both directions: **Kenfigure Tool (Import)** reads configuration YAML from a Git branch as the source for an import, and **Kenfigure Diagram** reads from and writes to your repository — persisting layouts, sub-layouts, and schema-lint suppressions to a branch of your choice. Git becomes the connective tissue across the entire workflow. When writing back to Git you can configure a direct commit to the branch head or an automatic pull request for review. Git usage is optional, but highly recommended.

**What is "schema lint"?**

Schema lint is a set of heuristic rules that flag risky anti-patterns in your Benchling configuration. These rules are based on years of Go2 Software's experience developing highly effective data models in Benchling. During export and import operations a log file of schema lint warnings is produced. Additionally, **Kenfigure Diagram** provides easy visualization of schema issues using a squiggle underline — like a spell checker — to show which schemas or fields have warnings. An interactive panel lets you sort, filter, and selectively suppress warnings that are acceptable in your context.

---

## Security and compliance

**Does Kenfigure Pro access our scientific, research, clinical, or patient data?**

No. Kenfigure Pro operates exclusively on Benchling configuration schema — the structure of your deployment. It does not access, store, or process your scientific, research, experimental, sample, clinical, or patient data. See our [Security & Data Handling Overview](security_data_handling.html).

**How is our data secured?**

The Service runs on Amazon Web Services infrastructure dedicated to Kenfigure Pro, with encryption in transit (TLS) and at rest (AWS-managed), MFA for all administrative access, and least-privilege access controls throughout. Any Git token you provide is secured through Benchling's native Canvas secure-configuration capability and is never stored or transmitted in plain text. Full details are in our [Security & Data Handling Overview](security_data_handling.html).

**Does Kenfigure Pro comply with GDPR?**

We process only limited business contact information about authorized users (name, business email, company, role, Benchling tenant identifiers). For personal data subject to EU or UK data-protection law, we rely on Standard Contractual Clauses as the transfer mechanism. Details are in our [Privacy Policy](privacy_policy.html) and [Data Processing Addendum](data_processing_addendum.html).

---

## Support and services

**What support is included with Kenfigure Pro?**

Email support is included. Expect a prompt, substantive response from someone who knows Kenfigure deeply — not a tier-1 support queue. Contact [info@go2.software](mailto:info@go2.software).

**Is training available?**

Kenfigure Pro is designed to be intuitive, and online resources and video walkthroughs are available to help you get up and running quickly. For organizations that want a more guided experience — hands-on training, best practices for Git-based configuration management, or a structured walk-through of the end-to-end promotion workflow — Go2 Software offers targeted training engagements. [Contact us](mailto:info@go2.software) to discuss your team's needs.

**Does Go2 Software offer consulting?**

Yes — two flavors.

**Kenfigure Pro consulting:** best practices for Kenfigure Pro, Git-based configuration management workflows, and establishing high-quality change management discipline in Benchling.

**Benchling platform consulting:** Ken Robbins of Go2 Software brings deep Benchling platform expertise to engagements of every scale — from leading full digital transformation initiatives and building out new scientific use cases, to targeted work such as data model design or refactoring, platform assessments, schema audits, and creating configuration or data clones of production environments. Learn more at [go2.software](https://go2.software) or [contact us](mailto:info@go2.software).

---

## Other questions

**What is the free Kenfigure Tool (Export) and how does it differ from Kenfigure Pro?**

**Kenfigure Tool (Export)** is free to any Benchling customer with no subscription required beyond installing the Canvas app. It exports your Benchling configuration to Kenfigure YAML — as a downloadable zip or written directly to your Git repository — and includes schema-lint analysis. Kenfigure Pro adds **Kenfigure Tool (Import)** (push reviewed changes back to Benchling from your YAML) and **Kenfigure Diagram** (interactive schema visualization with Git-backed state). See [Pricing](pricing.html) and [Free-Tier Terms](free_tier_terms.html).

**My question isn't answered here.**

[Contact us](mailto:info@go2.software) — we're happy to help!

---

[Back to Kenfigure home](https://kenfigure.com)
