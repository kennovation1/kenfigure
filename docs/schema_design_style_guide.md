[Kenfigure home](https://kenfigure.com)

# Benchling schema design style guide
This is an opinionated guide related to style aspects of schema design in Benchling.
You may choose to adhere to this style, or use it as a basis to create your own.

This list is not exhaustive of all possible topics and will likely grow over time.
Suggestions for additions or modifications are always very welcome.

This guide relates to the design of the schema itself and does not attempt to discuss
the style for the structure of the Kenfigure YAML files.

# General
- Use common sense
- Be consistent within the model
- Be consistent with industry terminology and practices
- Avoid local shorthands and vernacular
- Don't assume that names provided by scientists are canonical. Google to ensure you are using standard terms.
- Spelling, capitalization, spacing, and punctuation all matter
- Do not allow leading or trailing white space characters (note that Benchling permits this so be careful)
- Do not use consecutive whitespace characters, underscores, or dashes
- Names should be as short as possible without sacrificing clarity. Generally, names should be no greater than than 50 characters.
- Avoid use of embedded commas in names/options if at all possible. This is especially true for dropdown option names that might be used in multi-select fields.
- Names should not include unnecessary terms that are implied. For example, names should not include terms like "schema", "record", "item", "results", etc.
  This includes terms that may be part of an acronym that is already in the name (unless it is common vernacular). E.g., Use "NGS" (or "Next Generation Sequencing")
  and not "NGS Sequencing" or "Next Generation Sequencing (NGS)".

# Object naming
- Schema and dropdown names should be Title Case
- Dropdown names should be plural nouns (e.g., Strains)
- Schema names (other than Result schemas) should be singular nouns (e.g., Plasmid)
- Result schema names are often procedural or descriptive phrases since they do not represent objects like entity schemas do.
  E.g., "Flow Cytometry", "Body Weight", "LNP Characterization"

# Schema configuration
- Entity schemas should only enable a single naming option in most cases
- ID prefixes should not end with a character that could be confused with a digit. Namely, do not use 'O' (letter O), 'l' (lowercase L), or 'I' (capital I).
- ID prefixes should be as short as possible without sacrificing clarity. Generally, they should be no greater than 8 characters.
- Tooltips should be added to all fields
- Parent link fields for batch (lot) entity schemas should typically be required fields since a batch may be meaningless without its parent
- The name of a parent link (or entity link) should generally match the name of the entity to which it points.
  For example, the parent link field on a Nanoparticle Batch schema should be called "Nanoparticle" if the parent entity schema is called Nanoparticle.
  If schema names have prefixes (e.g., v2_) then those should not be part of the field name. For example, if the schema is called v2_Nanoparticle, the
  field should be called "Nanoparticle".
- If a dropdown is very large (e.g., >100 options), consider if a custom entity schema is more appropriate
- Sample fields in result tables should typically be required since results without an entity may be meaningless.
  If there are multiple sample fields, then they should not be required since only 1 of N will be populated.
- Be careful about making result table fields required or not since once data is recorded you cannot add the restriction and there's no way to migrate data from
  one field to another

# Field display names
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

# Field system names
- Must conform to PostgreSQL naming restrictions
- System names should contain a representation of the units that appear in the field name. If a ratio, the '/' should be converted
  to an underscore ('_') (note that Benchling will silently drop the slash when auto-generating system names).
  E.g., "Concentration (mg/mL)" should have a system name "concentration_mg_ml".
- System names representing percent units, should use a "_pct" suffix (note that Benchling silently drops the '%' symbol when auto-generating system names).
  E.g., The display name "Purity (%)" should have a system name "purity_pct".
- Superscripts generally should be dropped. E.g., "cm^2" or "cm²" should be converted to "cm2". If units are complex, review and use common sense.
- For fun, here is a more complex example multiple superscripts, multiple divisions, and a greek letter:
  - Display name: Avg Radiant Efficiency [p/s/cm²/sr] / [µW/cm²]
  - System name: avg_radiant_efficiency_p_s_cm2_sr_uw_cm2
- Do not use double underscores (two consecutive underscores). E.g., For "Total Flux (p/s)", use "total_flux_p_s" not "total_flux__(p/s)".

---
© 2025 Go2 Software LLC. All rights reserved.