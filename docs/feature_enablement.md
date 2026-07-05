[Kenfigure home](https://kenfigure.com)

# Enable Kenfigure Features

This page describes the **Kenfigure Pro™** features available for Kenfigure Tool and Kenfigure Diagram and how to get them enabled for your tenant.

If you arrived here from a disabled button or link in the Kenfigure Tool canvas, you're in the right place.

Kenfigure Tool provides the ability to export your Benchling configuration into Kenfigure
format either as a .zip file or directly to your Git repository — free for all users.

Importing back to Benchling and the use of Kenfigure Diagram are part of
**[Kenfigure Pro™](kenfigure_pro.html)**.
Please ask your Benchling administrator to contact us about subscribing to Kenfigure Pro.

---

## What Kenfigure Pro includes

### Import to Benchling (Canvas Import)

**What it does:** Converts Kenfigure files back into a Benchling Configuration Migration import file (.dat), which you can then apply to any Benchling tenant. Import from File uploads a `.zip` of your Kenfigure directory; Import from Git reads directly from your configured repository.

Supports all schema types (except for run schemas and task schemas) and dropdowns.
Import also lets you define computed and snapshot fields. Other settings such
a Registry-based v. Project-based access for entity schemas can also be controlled
directly.

**Why you'd want it:** Allows you to maintain your source of truth as Kenfigure YAML files
that can be versioned, backed up, commented, shared for reviews (even pull requests),
analyzed by AI, created/modified by AI, searched, any anything else you would do with
source code/configuration. You can then directly import the state of your files
to your Benchling tenant saving hundreds or thousands of clicks and ensuring complete
accuracy (and consistency among tenants).

**What it includes:** Both *Import from File* and *Import from Git*

---

### Kenfigure Diagram

**What it does:** A companion web application that renders your Kenfigure configuration as an interactive, explorable schema diagram. Visualize entity relationships, filter by schema type, add annotations, and share a live view with your team. Every export you run through Kenfigure Tool automatically updates the diagram.

You can also configure Kenfigure Diagram to directly read from your Git repository
(multiple branches are supported) so you have a live view of the current state of your
Git Kenfigure specification.

**Why you'd want it:** Schema documentation that stays current without manual maintenance. Useful for onboarding, impact analysis, compliance reviews, and cross-team communication.

**What's included:**
- Read-only diagram access for all provisioned users
- Layout saving and (AI mediated) groupings
- Schema lint and suppression management
- Optional Git-backed layout persistence
- Prompt builder tool to create rich and targeted context for AI use or for SQL development
- Benchling AI chat integration in the Prompt Builder

---

## How to Enable

Email [info@go2.software](mailto:info@go2.software) to subscribe to Kenfigure Pro or to request access for your tenant.

---

## Frequently Asked Questions

**Are these features available for Validated Cloud tenants?**
Yes with some minor exceptions. Most features work on both standard and Validated Cloud Benchling tenants. The Benchling AI chat interface required Benchling's "delegated authorization" feature with is not yet available on Val Cloud tenants.
When it is, this feature will be available on Val Cloud.
As an alternative, you can use the "Export for AI" feature to have
the equivalent functionality directly in the Benchling AI interface.

**Can I enable features for only some users in my tenant?**
Yes, fine-grained control is available at the user level and is established during
provisioning of new users. Permissions can be added or removed at any time by contact us.

**What happens if I try to use a feature that hasn't been enabled?**
The relevant button will be disabled in the canvas with a link to this page. No error will be shown to Benchling users — the canvas simply presents the features that are available for your tenant.

**Does enabling a feature require reinstalling the Kenfigure Tool app?**
No. Feature enablement is handled server-side and takes effect immediately without any reinstallation or reconfiguration on your part.

---

## Pricing

See the **[Kenfigure Pricing page](pricing.html)** for current subscription tiers and pricing, or the **[Kenfigure Pro overview](kenfigure_pro.html)** for a full description of what's included. For Enterprise or Validated Cloud inquiries, contact [info@go2.software](mailto:info@go2.software).

---

[Back to Kenfigure home](https://kenfigure.com) · [User Guide](kenfigure_tool_user_guide.html)
