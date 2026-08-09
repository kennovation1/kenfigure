---

## title: Kenfigure schema design style guide
layout: default
toc: true

[Kenfigure home](https://kenfigure.com)

# Benchling schema design style guide

This is an opinionated guide related to style aspects of schema design in Benchling.
You may choose to adhere to this style, or use it as a basis to create your own.

This list is not exhaustive of all possible topics and will likely grow over time.
Suggestions for additions or modifications are always very welcome.

This guide relates to the design of the schema itself and does not attempt to discuss
the style for the structure of the Kenfigure YAML files.

## General

- Use common sense
- Be consistent within the model
- Be consistent with industry terminology and practices
- Avoid local shorthands and vernacular
- Don't assume that names provided by scientists are canonical. Google to ensure you are using standard terms.
- Spelling, capitalization, spacing, and punctuation all matter
- Do not allow leading or trailing white space characters (note that Benchling permits this so be careful)
- Do not use consecutive whitespace characters, underscores, or dashes
- Names should be as short as possible without sacrificing clarity. Generally, names should be no greater than than 50 characters.
- Avoid use of embedded commas in names/options if at all possible. This is especially true for dropdown option names (see [Dropdown options](#dropdown-options)).
- Names should not include unnecessary terms that are implied. For example, names should not include terms like "schema", "record", "item", "results", etc.
This includes terms that may be part of an acronym that is already in the name (unless it is common vernacular). E.g., Use "NGS" (or "Next Generation Sequencing")
and not "NGS Sequencing" or "Next Generation Sequencing (NGS)".



## Object naming

- Schema and dropdown names should be Title Case
- Dropdown names should be plural nouns (e.g., Strains)
- Schema names (other than Result schemas) should be singular nouns (e.g., Plasmid)
- Result schema names are often procedural or descriptive phrases since they do not represent objects like entity schemas do.
E.g., "Flow Cytometry", "Body Weight", "LNP Characterization"



## Dropdown options

The rules above cover naming the dropdown itself. This section covers the *options inside* it.

Dropdowns are controlled vocabularies, and the "controlled" is the whole point — an option list
that accumulates near-duplicates and inconsistent forms quietly degrades every analysis, query,
and integration that depends on it.

### Uniqueness

- Options must be unique after accounting for capitalization, punctuation, spelling, typos, and added or missing prefixes and suffixes
- Options must also be **semantically** unique. "Mouse" and "Mus musculus" are the same thing; only one of them belongs in a given dropdown.



### Canonical form

- Every dropdown should have a defined style, and by default that style should be the canonical form for the kind of thing the dropdown lists. For example, a dropdown of human gene names can declare HUGO nomenclature as its standard. Record that decision somewhere durable — the dropdown's `Description` field in your Kenfigure YAML is a good home for it.
- Use the canonical form of a term, respecting capitalization, spacing, and punctuation
  - For standards and ontologies, match the official standard. Interleukin 4 is "IL-4" — not "IL4", "il4", or "il-4".
  - For proper names, use the official version. Scientists often use local shorthand for vendors and instruments,
  but the standard term — usually the one on the vendor's own website — should win. The plate reader
  "BioTek Synergy Neo2 Hybrid Multimode Reader" should not be entered as "Plate reader 3" or "Neo2".
  Deliberately shortening an official name (e.g., "BioTek Synergy Neo2") is a reasonable exception; see pragmatism below.
- New options must fit the style of the options already in the list. In a Species dropdown where every entry is
in Genus species form, "Mouse" is not a correct addition.
- Pragmatic exceptions are acceptable as long as they are deliberate. A colloquial term is sometimes the de facto
standard within a given company, and forcing rigid consistency at the expense of common use can do more harm than good.



### Characters

- Options should use ASCII characters only unless there is no reasonable alternative.
E.g., "TNF-α" should be entered as "TNF alpha" (or less preferably "TNF-a"). The ASCII conventions under
[Field display names](#field-display-names) apply equally to dropdown options.
- Avoid embedded commas. Benchling renders multi-select values as a comma-separated list with no escaping,
so a comma inside an option name is ambiguous to anyone reading the result.



### Ordering

- Dropdowns should be alphabetized by default. Whether a given dropdown is alphabetized is a property of that
dropdown and should rarely change once set, though the decision may need revisiting as the dropdown matures.
- Deliberate exceptions to alphabetization:
  - Small lists with an inherent logical order — a priority dropdown reads better as Low, Medium, High than alphabetized
  - Lists with a pinned option at the top or bottom, such as "N/A" or "Other" — alphabetize everything else



### Size

- If a dropdown is very large (e.g., >100 options), consider whether a custom entity schema is a more appropriate model.
Sometimes a large dropdown is genuinely fine; sometimes the size is a signal that the concept deserves real
entities with fields of their own.



### Enforcing these rules automatically

The **[Dropdown Tool](dropdown_tool.html)** (part of [Kenfigure Pro™](kenfigure_pro.html)) applies the rules in
this section to every requested dropdown option before it reaches your registry, and routes the request for
approval according to a per-dropdown policy you define. Per-dropdown conventions — "must conform to HUGO",
"use Genus species format" — are configured alongside that policy and applied on top of this guidance.

## Schema configuration

- Entity schemas should only enable a single naming option in most cases
- ID prefixes should not end with a character that could be confused with a digit. Namely, do not use 'O' (letter O), 'l' (lowercase L), or 'I' (capital I).
- ID prefixes should be as short as possible without sacrificing clarity. Generally, they should be no greater than 8 characters.
- Tooltips should be added to all fields
- Parent link fields for batch (lot) entity schemas should typically be required fields since a batch may be meaningless without its parent
- The name of a parent link (or entity link) should generally match the name of the entity to which it points.
For example, the parent link field on a Nanoparticle Batch schema should be called "Nanoparticle" if the parent entity schema is called Nanoparticle.
If schema names have prefixes (e.g., v2_) then those should not be part of the field name. For example, if the schema is called v2_Nanoparticle, the
field should be called "Nanoparticle".
- Sample fields in result tables should typically be required since results without an entity may be meaningless.
If there are multiple sample fields, then they should not be required since only 1 of N will be populated.
- Be careful about making result table fields required or not since once data is recorded you cannot add the restriction and there's no way to migrate data from
one field to another



## Field display names

- Field names should include units in the name where applicable
  - Units should be wrapped in parentheses with a space before the open parenthesis. E.g., Mass (mg)
  - Units should conform to standard spelling and capitalization. E.g., "mL" not "ml".
  - An exception is that molecular weight can be implied and omitted if units are Dalton or g/mol.
  However, if units are kDa, they must be specified.
  - Celsius should be represented as "(C)" with no degree symbol
- Field name capitalization should be consistent. Pick one and stick with it.
  - Sentence case (Ken's preference for readability). E.g., Lipid batch
  - Title case (very common). E.g., Lipid Batch
- Field names should only use ASCII characters
  - Do not use long dashes, curly single or double quotes, Greek letters, etc.
  - Greek letters should be spelled out or ASCII versions should be used. Follow normal conventions for ASCII equivalents.
    - E.g., "TNF-α" should be called "TNF alpha" (or less preferably TNF-a)
    - E.g., "µm" should be written as "um"
- Names should be self-documenting, but should not be used as a crutch for training. Names should not be instructions.
- Name use should be consistent across the entire platform. For example, don't use "Sequence length", "Seq length", and "Sequence len".
Pick one and use it everywhere. Another example might be abbreviations like "conc." v. "concentration". Pick one and use it consistently.
- Conventions may be ignored when it impedes the easy import from instrument output and would require extensive manual field mapping.
In this case, it may be better to match the instrument output. Note that with the (new) ability to save mappings, matching instrument
field naming is less critical in some cases.



## Field system names

- Must conform to PostgreSQL naming restrictions
- System names should contain a representation of the units that appear in the field name. If a ratio, the '/' should be converted
to an underscore ('_'). (Note that Benchling will silently drop the slash when auto-generating system names).
E.g., "Concentration (mg/mL)" should have a system name "concentration_mg_ml".
- System names representing percent units, should use a "_pct" suffix. (Note that Benchling silently drops the '%' symbol when
auto-generating system names). E.g., The display name "Purity (%)" should have a system name "purity_pct".
- Superscripts generally should be dropped. E.g., "cm^2" or "cm²" should be converted to "cm2".
If units are complex, review and use common sense.
- For fun, here is a more complex example multiple superscripts, multiple divisions, and a greek letter:
  - Display name: Avg Radiant Efficiency [p/s/cm²/sr] / [µW/cm²]
  - System name: avg_radiant_efficiency_p_s_cm2_sr_uw_cm2
- Do not use double underscores (two consecutive underscores). E.g., For "Total Flux (p/s)", use "total_flux_p_s" not "total_flux__(p/s)".
- Plus and minus modifiers in display names should be converted to "pos" and "neg" respectively. E.g., "CD4+" should become "cd4_pos".
(Note that Benchling will silently drop the sign which changes the meaning.) In some cases "plus" and "minus" may be appropriate
depending on the context.
- Display units that use scientific notation should be converted to E Notation for system names. E.g., "PLT (10^9/L)" should be "plt_1e9_l".
(Note that by default Benchling would convert this example to plt__109l.)



## Dashboards

This section covers naming and organization conventions for Benchling Insights Dashboards managed in Kenfigure.
Here we include Kenfigure-specific nuances in addition to style guidance.

### Dashboard naming

- Dashboard names should be Title Case and describe what the dashboard surfaces (e.g., "Sequence QC Summary", "Lot Release Results")
- Names should not include redundant words like "Dashboard" or "Report" unless they are genuinely part of the name
- Keep names concise — they appear listings in Benchling that wrap after about 32 characters



### Block naming

- Block names should be short, descriptive phrases in Title Case (e.g., "Entity Count by Project", "Failed QC Lots")
- Names should describe the result of the query, not the query mechanism



### SQL files

- Each block's SQL should live in a separate `.sql` file in the dashboard's directory (not inlined in the YAML even that that is supported).
This makes SQL easier to edit in an IDE, diff in Git, and hand to an AI coding assistant.
- The `.sql` file name should be derived from the block name with non-word characters replaced by underscores (e.g., block "Entity Count by Project" → `Entity_Count_by_Project.sql`)
- The YAML `SQL` key for each block should hold the `.sql` filename as a relative reference (e.g., `SQL: Entity_Count_by_Project.sql`)
- SQL style is outside the scope of this guide; adopt a consistent style within your team
- Use header block comments so that it's easy for a reader to understand the purpose and general design of the SQL without having to read the code



### Chart configuration

- `Chart.Type` and `Chart.Parameters` are defined in the schema for forward-compatibility but are not populated by export (Benchling does not currently expose chart config via the API)
- Document chart preferences as free-form text in `Chart.Parameters`



### Parameters

- Dashboard parameters are defined in the schema for forward-compatibility but are not populated by export (Benchling does not currently expose parameter definitions via the API)
- If you add parameters by hand, `Type` must be one of the 14 values in the `Parameters.Type` enum (Text, Number, Date, Dropdown, Entry, Entity, Folder, Project, Inventory, Study, Team, User, Workflow task group, Workflow task)
- `Definition` is required for `Dropdown` type parameters and should be the name of the source dropdown

