# Kenfigure™
![License: ODC-BY 1.0](https://img.shields.io/badge/License-ODC--BY%201.0-blue)
![Version](https://img.shields.io/badge/version-v0.1.0-orange)

# Overview
*Kenfigure*: a YAML spec to define Benchling configurations

This approach provides a structured, accurate, reproducible, reviewable, and maintainable definition
of your Benchling tenant configurations.

Because it is a structured human *and* machine readable format, it works exceptionally well with git
and can therefore form the foundation of a top-notch change management process.

*Kenfigure* is highly useful solely as a standalone documentation tool,
but I also use it for internal tools I've developed
to programmatically deploy configurations, extract and document configurations,
check against a set of schema quality rules and create dynamic ER diagrams.
I created the spec for my internal tool use, but am making it publicly available since it
is highly valuable as a way to document the source-of-truth for Benchling configurations
even without leveraging any tools.

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

# Documentation
- Here is the primary [Kenfigure documentation](./annotated.md) in the form of annotated examples.
- The complete [schema reference is here](./reference.md). This is not as user friendly, but it is
  comprehensive.
- The [schema design style guide](./schema_design_style_guide.md)
  is an opinionated guide related to style aspects of schema design in Benchling.
  This is a companion to Kenfigure by is independent of the Kenfigure specification.
  Some custom tooling (e.g., Kenfigure Schema Lint) may use the style guide as a source for style rules.

# Benefits 
Here are some benefits of documenting your Benchling configuration in *kenfigure* files in git. In no particular order:
(Note that I'm included some benefits are required additional tooling that is not open source.
I've left these bullet points here since it helps to show the future possibilities when it's with Go2 Software
proprietary tools or others.)
- Allows comments, notes, annotations on schemas and schema fields
- Version control including branching and pull requests
- Version difference inspection
- Reusable/shareable components and patterns
- Templatized components and patterns
- Faster configuration (no UI clicking) [using additional tooling]
- Fewer errors
- Consistency between environments
- Configuration rollback [using additional tooling]
- Can integrate with visualization tools [e.g., I have a tool to create ER diagrams from the *kenfigure* specification]
  - Support hints for automated diagram layout generation
- Enables the ability to write model checkers and style checkers [e.g., I have a tool, "SchemaLint", that checks for many issues and anti-patters that I seen over the years]
  - No more fields with hidden leading or trialing spaces!
- Allows for more complete, verifiable, and easier configurations review (particular useful for validated environments)
- Documentation for validated environments
- Enables global spell checking
- Enables global search to find configuration information, verify settings, check for consistency, check for conflicts, etc.
- Easy global search and replace
- Basic tools like grep (and grep -R) can make it very easy to see things like "all prefixes" or "all names" or all
  schemas that refer to a given entity.
- IDE support for hover hints and typing completion
- GitHub Copilot typing completions
- Can implement special operations (e.g., to help migrations) such as bulk disable/enable require fields on entity schemas. [using additional tooling]
- Copy & paste of common sections (e.g., fields)
- Can try multiple model configurations
- Edit, review, share, revise, all before committing to Benchling
- There are lots of features of VSCode and DbSchema that are now possible. May are not listed here. Some thoughts...
  - VSCode allows section expand/collapse, navigation crumbs, great when fleshing out multiple similar fields (lipid A, B, C...)
  - DbSchema has various navigation and pan/zoom features. Cool to create layout from group
  - YAML supports grouping which can drive DbSchema and in the future I may use this for filters and such
  - Create layout from group is powerful
- Create and inspect computed fields without requiring Benchling support [using additional tooling]
- Detects and corrects drift [using additional tooling]
- Supports Notify directive for manual instructions for imports (e.g., configure dashboard, set permissions) [using additional tooling]
- Tracks feature flag settings and can convert to/from a CSV that Benchling support provides and can use to as a guide to perform updates
  by filtering on "Planned Value" fields. By keeping feature flags in YAML it's easy to manage config changes with git and also
  to see differences between tenants or versions (since diffs of sorted yamls is easier than diffs of Benchling xlsx files). This also
  makes it possible to control feature flags along with all other configs. [using additional tooling]
- Git management of YAMLs allows for hierarchical grouping of schemas in a folder tree

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

## VS Code specific notes
- For VSCode, install the YAML plugin from Red Hat and add the following in
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
- GitHub Copilot can also provide excellent typing completions
  - Works especially well if you have your entire environment documented since Copilot learns from your entire context
  - As always, review AI-generated completions carefully since it can confidently make mistakes.
    It will not necessarily abide by the JSON schema, so you'll need to sometimes decide to take the VS Code
    completion (based on the JSON schema) instead of the Copilot completion.
  - Can he helpful for creating appropriate tooltips or at least giving your a good start.

## Other IDEs
If you use a different IDE, please create a pull request so we can document and applicable notes.

Here's some doc for how to configure [PyCharm for YAML editing with a custom schema](https://www.jetbrains.com/help/pycharm/yaml.html#json_schema).

# License and Trademark

**Kenfigure™** is provided under the [Open Data Commons Attribution License (ODC-BY 1.0)](https://opendatacommons.org/licenses/by/1-0/).

You are free to use, adapt, and share this schema with proper attribution.

Commercial use of software tools that rely on this schema may require a separate license.  
Please contact [info@go2software.com](mailto:info@go2software.com) for commercial licensing inquiries.

**Kenfigure™** is an trademark of Go2 Software LLC.  
Use of the name "Kenfigure" in derivative projects or commercial products is not permitted without permission.

Benchling is a trademark of Benchling, Inc.