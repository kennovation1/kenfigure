# Kenfigure™
![License: ODC-BY 1.0](https://img.shields.io/badge/License-ODC--BY%201.0-blue)
![Version](https://img.shields.io/badge/version-v1.7.0-orange)

# Overview
*Kenfigure*: a YAML spec to define Benchling configurations

This approach provides a structured, accurate, reproducible, reviewable, and maintainable definition
of your Benchling tenant configurations.

Because it is a structured human *and* machine readable format, it works exceptionally well with git
and can therefore form the foundation of a top-notch change management process.

*Kenfigure* is highly useful as a standalone documentation and source-of-truth tool — valuable on
its own, independent of any additional tooling. Go2 Software also builds
[**Kenfigure Pro™**](kenfigure_pro.html) on the standard: a commercial
suite (Kenfigure Tool™ and Kenfigure Diagram™) for programmatic configuration export and import,
schema quality checking, and interactive ER diagrams. The spec is openly published and independently
useful whether or not you use those tools.

Here's a very stripped down example:
```yaml
Entity_schemas:
- Name: Chemical
  Description: A generic small molecule.
  Entity type: Molecule
  Prefix: CHEM
  System name: chemical
  Containable type: None
  Name template: []
  Constraint:
  - Canonical SMILES
  - CAS RN
  Naming options:
  - NEW_IDS
  # - Generate new registry IDs  # Long form is accepted, but I prefer the short form
  RegID chips: false
  RegID display: false
  Icon: small-molecule
  Access type: Registry-based
  Diagram:
    Group: Chemicals  # All entities with the same name are rendered in a group of that name
  Fields:
  - Name: CAS RN
    Description: If we don't have a SMILES, then a real or pseudo CAS RN drives uniqueness
    Tool tip: Create a pseudo CAS RN if no official number exists
    System name: cas_rn
    Type: Text
```

See [examples/Chemical.yaml](./examples/Chemical.yaml) for a more complete annotated example.

# Documentation and essential references
- [Kenfigure documentation](./annotated.md) - Primary documentation in the form of annotated examples.
- [Complete schema reference](./reference.md) - Comprehensive but dense; the annotated docs are more approachable.
- [Schema design style guide](./schema_design_style_guide.md) - Opinionated style guidance for Benchling schema design.
  A companion to Kenfigure but independent of the specification.
  Kenfigure Tool Schema Lint uses the style guide as a source for quality rules.
- [Kenfigure Tool User Guide](./kenfigure_tool_user_guide.md) - Guide for the Benchling Canvas app (Export/Import, Git integration).
- [Kenfigure JSON schema](./jsonschemas/latest/kenfigure.schema_flat.json) - The full (flattened) JSON schema for Kenfigure.
- [Kenfigure on GitHub](https://github.com/kennovation1/kenfigure) - Open-source schema repository, issues, and contributions.
- [Kenfigure Pro™](kenfigure_pro.html) - The commercial tool suite built on this standard (Kenfigure Tool Import, Kenfigure Diagram).

# Benefits

## What the open standard gives you

Here are the benefits of documenting your Benchling configuration as *Kenfigure* YAML files in git.
These require only the open standard — no commercial tooling:

- Comments, notes, and annotations on schemas and schema fields
- Version control including branching and pull requests
- Version difference inspection — diff any two configurations or environment states
- Reusable and shareable components and patterns
- Templatized components and patterns
- Fewer errors — YAML is reviewed before being applied, and IDE schema validation catches mistakes early
- Consistency across environments — a single reviewed source of truth shared by Dev, Test, and Prod
- More complete, verifiable, and auditable configuration reviews (particularly useful for validated environments)
- Documentation suitable for validated environments
- Global spell checking (IDE or editor spell checker runs across all YAML files)
- Global search — find all uses of a field name, check for consistency, detect conflicts, see all prefixes at once
- Easy global search and replace across the entire configuration
- Quick grep queries: `grep -R "prefix:" .` lists every schema prefix in one command
- IDE support for hover hints and typing completion (see VS Code / Cursor setup below)
- GitHub Copilot and other AI assistant completions — especially effective when the full configuration is in context
- Copy and paste of common sections (e.g., standard field groups)
- Draft and iterate on multiple model configurations before committing anything to Benchling
- Edit, review, share, and revise collaboratively before any change touches Benchling
- VSCode-specific benefits: section expand/collapse, navigation breadcrumbs, great for building out multiple similar fields
- YAML folder-tree grouping allows hierarchical organization of schemas in a directory structure
- Track feature flag settings as YAML — diff tenants or versions far more easily than comparing Benchling's xlsx export files

## What Kenfigure Pro adds

[**Kenfigure Pro™**](kenfigure_pro.html) (Kenfigure Tool™ and Kenfigure Diagram™)
builds on the open standard to close the loop from source of truth back to Benchling:

- **Faster, accurate configuration import** — push changes back to Benchling directly from YAML; no manual UI clicking
- **Configuration rollback** — roll back to any previously versioned state and import it
- **Interactive ER diagrams** — Kenfigure Diagram renders your schema as an explorable, searchable entity-relationship diagram
  - Diagram layout hints in the YAML drive automatic grouping
- **Schema lint with visual indicators** — Kenfigure Tool Schema Lint flags anti-patterns and style issues; Kenfigure Diagram surfaces them inline with suppression tracking
  - No more fields with hidden leading or trailing spaces, inconsistent naming, or other common issues
- **Bulk operations** — bulk enable/disable required fields on entity schemas and similar special operations
- **Computed and snapshot fields** — create and inspect computed fields without requiring Benchling support
- **Drift detection and correction** — detect and reconcile drift between your YAML and the live Benchling state
- **Notify directive** — embed manual instructions (e.g., configure a dashboard, set permissions) as part of an import sequence
- **Prompt Builder** — assemble targeted schema context for SQL development or AI tools from Kenfigure Diagram

→ [Learn more about Kenfigure Pro™](kenfigure_pro.html)

# Mindset
- Generally the key names in the specification match or closely match the terminology Benchling uses in the UI.
- Optional key may be omitted and defaults will be used. My personal style is to normally include all keys, even if optional.
  The only exception is that if a field is not required, I omit the "Required" key.

# Limitations
- Does not yet handle Benchling Workflows, In Vivo, Lab Automation/Connect, Insights, Bioprocess

# Schema
- [Kenfigure JSON schema](./jsonschemas/latest/kenfigure.schema.json)
- Flattened version that doesn't use $refs: [Kenfigure JSON schema flat](./jsonschemas/latest/kenfigure.schema_flat.json)
- I haven't decided if I need to bother producing flat versions. Please let me know if you can't use the
  normal version with $refs and need a flat version for some reason (and what that reason is).

# JSON schema technical notes
- The JSON schemas files are in the `jsonschemas` directory.
- The top level file is `kenfigure.schema.json` and this uses `$ref` to 
  interpolate sub-schemas. This is done only for one-level for items in `properties`.
  It is not otherwise hierarchical.
- A script is used to interpolate the component JSON schema files into a single file: `kenfigure_flat.schema.json`.
  This file is the flattened version of the schema with all `$ref` keys
  resolved from the top-level file in the `properties` section. This flat version
  is for use with IDEs and sharing more generally so that there will be no
  reference resolution hurdles. This allows us to keep the source files separate for manageability.

## VS Code and Cursor specific notes
- For VSCode or Cursor, install the YAML plugin from Red Hat and add the following in
  `.vscode/settings.json` to associate the schema file with YAML files in the listed locations.
```json
{
	"yaml.schemas": {
		"https://kenfigure.com/jsonschemas/latest/kenfigure.schema.json": [
			"*.yaml",
			"**/*.yaml"
		]
	}
}
```
  You may want to narrow the matching files (`"*.yaml"` and `"**/*.yaml"`) by adding a more specific path prefix for your environment.
- Once the above is configured, use `CTRL` + `space` for typing completion. You can also hover to get various hints.
- GitHub Copilot with VS Code and Cursor can also provide excellent typing completions
  - Works especially well if you have your entire environment documented since they learn from your entire context
  - As always, review AI-generated completions carefully since it can confidently make mistakes.
    It will not necessarily abide by the JSON schema, so you'll need to sometimes decide to take the IDE
    completion (based on the JSON schema) instead of the AI completion.
  - The AI can be helpful for creating appropriate tooltips or at least giving you a good start.

### Cursor rules
See [.cursor/rules/kenfigure.mdc](https://github.com/kennovation1/kenfigure/blob/78dedd79021cc64673d4e9525a5dd2268bd015ce/.cursor/rules/kenfigure.mdc)
in the [GitHub repo](https://github.com/kennovation1/kenfigure) for a Cursor rules file that that works well.
Getting these rules optimized is an ongoing process, so check back for updates.
Of course contributions are welcome too!

### GitHub Copilot AGENT.md rules
I have not yet testing using AGENT.md files, but I suspect you could readily adapt the above Cursor rules file.

## Other IDEs
If you use a different IDE, please create a pull request so we can document any applicable notes.

Here's some doc for how to configure [PyCharm for YAML editing with a custom schema](https://www.jetbrains.com/help/pycharm/yaml.html#json_schema).

# License

**Kenfigure™** is provided under the [Open Data Commons Attribution License (ODC-BY 1.0)](https://opendatacommons.org/licenses/by/1-0/).

You are free to use, adapt, and share this schema with proper attribution.

Commercial use of software tools that rely on this schema may require a separate license.
See [Kenfigure Pro™](kenfigure_pro.html) for Go2 Software's commercial tool suite,
or contact [info@go2.software](mailto:info@go2.software) with questions.