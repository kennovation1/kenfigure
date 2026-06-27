---
title: Kenfigure Feature Support Matrix
layout: default
---

[Kenfigure home](https://kenfigure.com)

# Kenfigure Feature Support Matrix

Top-level Kenfigure object types from the [Kenfigure JSON schema](https://kenfigure.com/jsonschemas/latest/kenfigure.schema.json) and their support in Kenfigure Tool and Kenfigure Diagram.

| Object type | Export | Import | Diagram | Notes |
|-------------|--------|--------|---------|-------|
| Dropdowns | ✓ | ✓ | ✓ | |
| Entity schemas | ✓ | ✓ | ✓ | |
| Fieldset schemas | ✓ | ✓ | ✓ | |
| Result schemas | ✓ | ✓ | ✓ | |
| Study schemas | ✓ | ✓ | ✓ | |
| Location schemas | ✓ | ✓ | ✓ | |
| Container schemas | ✓ | ✓ | ✓ | |
| Box schemas | ✓ | ✓ | ✓ | |
| Plate schemas | ✓ | ✓ | ✓ | |
| Run schemas | ✓ | ✓ | X | |
| Dashboards | ✓ | X | N/A | Export is via API since dashboards are not supported by Configuration Migration |
| Template collections | ✓ | ✓ | N/A | |
| Templates | ✓ | X | N/A | |
| Sub templates | ✓ | X | N/A | |
| Instrument gateways | X | X | X | |
| Connection schemas | N/A | N/A | X | |
| Connections | X | X | N/A | |
| Feature flags | X | N/A | N/A | |
| Workflow schemas | X | X | X | No JSON schema support |

**Key**

| Symbol | Meaning |
|--------|---------|
| ✓ | Supported |
| X | Not supported |
| N/A | Not applicable to this feature |

- **Export** — Benchling → Kenfigure YAML
- **Import** — Kenfigure YAML → Benchling (via Benchling's Configuration Migration tool)
- **Diagram** — rendered in Kenfigure Diagram

## Notes

**Configuration Migration scope.** Kenfigure Tool Export and Import are both bounded by what Benchling's Configuration Migration tool supports. Objects outside that scope — such as Access Policies — are not exportable or importable. Dashboard exports is an exception since we use the API to fetch dashboard definitions.

**Pass-through elements.** Some data elements within supported object types (e.g., computed/snapshot schema fields and input/output file transformations in Run schemas) are mapped 1:1 from Benchling without Kenfigure JSON schema validation. These elements can be round-tripped (exported and re-imported) but cannot be created from scratch via import — they must originate from an existing Benchling configuration. They are not intended for manual editing.

**Deprecated features.** Deprecated Benchling object types (e.g., legacy Batch schemas) are not supported. Export and import will not function if your configuration has dependencies on deprecated features.

**Unlisted object types.** Object types not listed above are not supported in the Kenfigure JSON schema. If an object type you need is missing, please [contact us](mailto:info@go2.software)!

---

Interested in adding Export, Import, or Diagram to your team? See [Kenfigure Pro™](kenfigure_pro.html) or the [Pricing page](pricing.html).

---

[Back to Kenfigure home](https://kenfigure.com)
