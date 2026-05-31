[Kenfigure home](https://kenfigure.com)

# Enable Kenfigure Features

This page describes the premium features available for Kenfigure Tool and Kenfigure Diagram and how to get them enabled for your tenant.

If you arrived here from a disabled button or link in the Kenfigure Tool canvas, you're in the right place.

---

## Available Features

### Import to Benchling (Canvas Import)

**What it does:** Converts Kenfigure files back into a Benchling Configuration Migration import file (.dat), which you can then apply to any Benchling tenant. Import from File uploads a `.zip` of your Kenfigure directory; Import from Git reads directly from your configured repository.

**Why you'd want it:** Close the loop on your configuration management workflow — export from one environment, review and modify in Kenfigure format, then import to another. Essential for promoting configurations across Dev, Stage, and Prod tenants without manual re-entry.

**What it includes:** Both *Import from File* and *Import from Git* (the git variant also requires Canvas Git Read, below).

---

### Canvas Git Read

**What it does:** Lets Kenfigure Tool read your Kenfigure files directly from your git repository without a manual file upload — the *Import from Git* button.

**Why you'd want it:** Eliminates the download-then-upload step when your source of truth lives in git. Import is triggered with one click and always picks up the latest committed state.

**Requires:** Canvas Import must also be enabled.

---

### Kenfigure Diagram

**What it does:** A companion web application that renders your Kenfigure configuration as an interactive, explorable schema diagram. Visualize entity relationships, filter by schema type, add annotations, and share a live view with your team. Every export you run through Kenfigure Tool automatically updates the diagram.

**Why you'd want it:** Schema documentation that stays current without manual maintenance. Useful for onboarding, impact analysis, compliance reviews, and cross-team communication.

**What's included:**
- Read-only diagram access for all provisioned users
- Layout saving and groupings (administrator role required)
- Schema lint and suppression management (administrator role required)
- Git-backed layout persistence
- Benchling AI chat integration in the Prompt Builder (where licensed)

---

## How to Enable

There is no self-service enablement at this time. Feature access is managed per-tenant by the Go2 Software team.

**To request access:**

Email [info@go2.software](mailto:info@go2.software) with:

- Your Benchling tenant URL (e.g., `https://yourcompany.benchling.com`)
- Which features you'd like to enable
- A brief description of your use case

We'll confirm your request and enable the features on your tenant within one business day.

---

## Frequently Asked Questions

**Are these features available for Validated Cloud tenants?**
Yes. All features work on both standard and Validated Cloud Benchling tenants.

**Is there a trial or evaluation period?**
Contact us at [info@go2.software](mailto:info@go2.software) to discuss evaluation options.

**Can I enable features for only some users in my tenant?**
Yes, at the user level. Once a feature is licensed for your tenant, individual user access can be configured. Contact us to set this up.

**What happens if I try to use a feature that hasn't been enabled?**
The relevant button will be disabled in the canvas with a link to this page. No error will be shown to Benchling users — the canvas simply presents the features that are available for your tenant.

**Does enabling a feature require reinstalling the Kenfigure Tool app?**
No. Feature enablement is handled server-side and takes effect immediately without any reinstallation or reconfiguration on your part.

---

## Pricing

Contact [info@go2.software](mailto:info@go2.software) — pricing is discussed directly and is not published on this page.

---

[Back to Kenfigure home](https://kenfigure.com) · [User Guide](https://kenfigure.com/kenfigure_tool_user_guide.html)
