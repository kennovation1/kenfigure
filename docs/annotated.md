# Kenfigure Schema Documentation

This page is a detailed reference to the Kenfigure specification.
Please first see the overview [Kenfigure.com home page](./index.md).

## General background
- Kenfigure uses YAML format to define configuration objects. YAML is a format that is both
  human and machine readable. The [Wikipedia YAML page](https://en.wikipedia.org/wiki/YAML)
  provides a good overview of the syntax.
  However, you can figure out almost everything by looking at the examples in this repository.
- We define the specific structure (schema) of Kenfigure YAML files using a standard called
  JSON Schema. Yes, I know, it's a little weird that something called JSON Schema is used to
  define a YAML schema, but just go with it. You don't need to know anything about JSON Schema
  other than knowing the URL of the JSON Schema if you want syntax checking and typing completion
  in your Integrated Development Environment (IDE) as described in [Kenfigure.com home page](./index.md).
- The formal reference that defines the schema can be found in [reference.md](./reference.md).
  However, the information below is likely much more accessible compared to the machine generated
  reference.md file.
- Naming and organization of Kenfigure is meant to mirror the Benchling UI as much as possible.

## Directory structure
Kenfigure is designed such that you can specify a Benchling tenant configuration using any file structure
that is helpful to you. The recommended best practice is to keep each primary object
(e.g., each entity schema, result schema, or dropdown) in a discrete file. However, if you find the need
you can put multiple objects in a single file. Technically, you can put everything in a single file
but this is not recommended.

Additionally, you can put files in multiple directories to help organize your configuration information.
Typically I group all schema types under their own top-level directories (e.g., Entity schemas, Result schemas,
Dropdowns) and then within each of those, I create a directory for each logical grouping of objects
(e.g., In Vivo, In Vitro, NGS, Process Development, etc.).

A good alternative strategy is to swap the above hierarchy and make the local groupings be the top level
and the object type would be the subdirectories.

Pick whatever works for you.

## Common structures
All top-level object types are designated by a key for the configuration object type
followed by a list of objects of that type. For example, a dropdowns are defined as follows
```yaml
Dropdowns:
  - Name: ExampleDropdown  # Name of the dropdown
    ...
  - Name: A different dropdown  # The second dropdown
    ...
```

If you adhere to the one object per file model, then the above would like like this:

File: ExampleDropdown.yaml
```yaml
Dropdowns:
  - Name: ExampleDropdown  # Name of the dropdown
    ...
```

File: A different dropdown.yaml
```yaml
Dropdowns:
  - Name: A different dropdown  # The second dropdown
    ...
```

An example entity scheme would be:

File: CustomEntity.yaml
```yaml
Entity_schemas:
  - Name: CustomEntity  # Name of the entity schema
    ...
```

Often different configuration objects will have a very similar syntax with their peers, but may
have subtle differences since Benchling has difference (e.g., the fields types for entity schemas
and result schemas are not identical in Benchling).

Kenfigure defines some keys (attributes) that don't exist in Benchling. These are uniform
across all configuration object types. These include `Description` attributes for top-level
objects and for schema fields, and then `Diagram` object. Some of these keys are used by tooling
that makes use of the Kenfigure format
(e.g., Kenfigure Export, Kenfigure Import, Kenfigure Diagram, Kenfigure Lint).
These extended attributes are always optional unless your are using tooling that requires them.

### Diagram
The following defines how the common Diagram object works. Since it applies to all configuration
objects, it will not be included in other examples.
```yaml
Entity_schemas:
  - Name: CustomEntity  # Name of the entity schema
    # The Diagram object does not affect Benchling at all. This is used by tools that support
    # Kenfigure syntax to automatically create ER diagrams from Kenfigure specifications.
    Diagram:
      Group: In Vitro  # All entities that share this value will be grouped in the rendered
                       # diagram in a group of the same name.
      Color: yellow  # Color of table in diagram. Will override default if specified.
                     # May be a hex web color (e.g., '#0000FF' for blue) or certain well-known
                     # names are recognized. The default color schema is:
                     # Green for entity schemas, Red for result tables, Blue for dropdowns,
                     # Yellow for fieldsets, and Orange for study schemas
      X: 100  # X-coordinate of the table on the diagram. Normally layout tool (e.g., Kenfigure Layout) generated.
      Y: 200  # Y-coordinate of the table on the diagram. Normally layout tool (e.g., Kenfigure Layout) generated.
    ...
```

For those who are new to YAML, the above example illustrates several points about YAML
- Quotes are not needed around string values (there are exceptions)
- Decimal and integer numbers are accepted for certain fields
- The pound sign defines a comment. Comments are ignored by software that reads YAML format.
- Objects that are defined in other objects are indicated with indentation
- Lists are define by a leading dash character

The remainder of this page will document each top-level configuration object by showing
a commented example. This approach is more usable than the [full reference](./reference.md), though may not
explain all possible options and details. If you are unsure, please consult the full reference.
Also, the annotated examples below do not generally attempt to describe if a key is required or not.
As a general point of style, it's preferred to document most keys even if the default value is desired.
There are some exceptions (notably several attributes on schema fields are optional and are
traditionally omitted for the default state).

Most of the examples used below are derived from the RNA Therapeutics Bioresearch V3.1 scientific accelerator.
They have been changed, sometimes in artificial was, to help demonstrate more of the Kenfigure syntax
than would naturally be part of a real configuration.

## Dropdowns
File: Species.yaml

```yaml
Dropdowns:
- Name: Species  # Name of the dropdown
  Description: This is just a starter list for now.  # Used for internal documentation. Optional.
    # Not available in Benchling, though that might change in the future.
  Alphabetize: false  # This indicates if the list should be sorted. Optional. Defaults to false.
    # The Options list below need not be sorted if this value is true, but it is recommended to
    # keep in sorted for maintainability.
    # Boolean values in YAML may be true/false or yes/no. It is recommended that a single style
    # is consistently used.
  Options:  # This list of dropdown options. Note the use of the dash to define list items
    # As with other YAML strings, quotes are only necessary of there are embedded special characters
    # or symbols. Note that 'Yes' and 'No' need to be quoted since otherwise they will be interpreted
    # as Boolean values instead of strings. Strings with embedded ": " (colon space) will also need
    # to be enclosed in quotes.
  - Mouse
  - Rabbit
  - Human
  - Other
  Diagram: ...  # See Diagram discussion above
  API ID: sfs_pQitWWTI  # The API ID for the dropdown. Export tools (e.g., Kenfigure Export) may set
    # this value. Generally, there is no need to use this field since it is not settable in Benchling
    # and since it is tenant-specific.
```

## Entity schemas
The following assumes that you've read the above sections so that common topics are not
repeated below. The `Diagram` and `API ID` keys are valid here but are not shown for clarity.

File: Lipid.yaml

```yaml
Entity_schemas:
- Name: Lipid  # Schema name
  Description: A lipid concept entity used in formulating LNPs
  Entity type: Molecule  # The same entity types as seen in the Benchling UI
  Prefix: LIP  # Same as Benchling UI
  System name: lipid  # Formerly known as "Warehouse name". Must confirm to PostgreSQL naming standards.
  Containable type: None  # None or Entity as in UI
  Naming options:  # At least one list item must be specified. The options may be provided as short
    # symbol name (e.g., NEW_IDS, DELETE_NAMES, etc.) or the fully spelled out definitions as shown
    # in the Benchling UI. See full list below.
  - NEW_IDS
  Name template: []  # The empty list shows that there is no name template. Details are shown below.
  Constraint: []  # The empty list shows that there are no constraints. If there are constraints,
    # Create a list item for each field (using the display name) included in the constraint.
    # In addition to field names, list items may include one of the following special names if supported
    # by the entity type:
    # - Bases (ignore case)
    # - Canonical SMILES
    # - Amino acids (exact match)
    # - Amino acids (ignore case)
  RegID display: false  # The sames as the UI checkbox: Use Registry ID as display label
  RegID chips: false  # The sames as the UI checkbox: Include Registry ID in chips 
  Access type: Registry-based  # One of Registry-based or Project-based
  Icon: small-molecule  # Name of item to use for the schema 
  # Note that since this is a Molecule schema type, the chemical structure (SMILES) is a built-in field
  # provided to the API.
  Notify: Manually attach the Lipid Usage dashboard  # Used by Kenfigure Import tooling to print a message
    # to the administrator. Usually this is used to prompt the user to perform a manual action that cannot
    # be automated. 
  Fieldsets:  # A list of fieldsets that the schema implements. Omit or set to [] if not applicable.
  - LNP Component
  Fields:  # The list of fields on the schema. Use [] if there are no fields
  - Name: MW (g/mol)
    Description: Fields can have descriptions too
    System name: mw_g_mol
    Required: true  # Default is false, true if the field is required. Yes or No are equally valid
      # but you should select one style and stick to it.
    Type: Decimal  # See below for more type options.
  - Name: Notes
    Description: A freeform notes field
    System name: notes
    Type: Text
  - Name: CoA
    Description: The COA is part of the concept entity since it has concept-level
      information. However, it also includes lot-level information and therefore
      appears at the lot level too.
    System name: coa
    Type: Attachment
```

### Naming options
The following are the valid naming options, each added as a list item to the `Naming options` key.
The two values are each line are synonymous with each other.
- NEW_IDS, Generate new registry IDs
- IDS_FROM_NAMES, Generate registry IDs based on entity names
- DELETE_NAMES, Generate new registry IDs and replace name with registry ID
- SET_FROM_NAME_PARTS, Generate new registry IDs, rename according to name template, and keep old name as alias
- REPLACE_NAMES_FROM_PARTS, Generate new registry IDs, and replace name according to name template
- KEEP_NAMES, Keep existing entity names as registry IDs
- REPLACE_ID_AND_NAME_FROM_PARTS, Generate registry IDs and names according to name template

### Name template
A name template is define as a list of name components such as:
```yaml
Name template:
- Type: Field  # Component is a field from the current schema. The specific field is in the Definition.
  Definition: Lipid  # The field within the current schema to use as the name component
- Type: Separator  # A separator string. The actual string appears in the Definition.
  Definition: '-'  # The separator string.
                   # Dash, underscore, colon, and other special characters should be in quotes
- Type: Text  # A text name template component. The Definition key defines the specific text string.
  Definition: lot  # The text string for the component.
- Type: Parent lot number  # A parent lot number component. The field pointing to the parent entity
                           # (must have type "Parent") is specified in the Definition field.
  Definition: Lipid  # The field on the current entity that points to the parent entity.
```

The available special `Type` values are:
- Types that require a `Definition` field:
  - Text
  - Separator
  - Field
  - Parent lot number
  - Registry ID of field
- Types that do not require a `Definition` field:
  - Registry ID number
  - Creation year
  - Creation date
  - Project

### Entity schema fields
Above shows some simple example fields. Here we shows the full specification for an
entity schema field.
```yaml
Name: Lipid  # Field display name
Description: Parent concept for this lot
Tool tip: Reference to an existing registered Lipid entity
System name: lipid  # Field PostgreSQL-compatible system (Warehouse) name
Type: Entity  # May be any of the following types:
 # Date, Datetime, Decimal, Integer, Long text, Dropdown, Text, Attachment, Entry, Entity, Category, Part,
 # Inventory, ft_translation_link, ft_assay_result_link, ft_assay_run_link, Batch, Transcription
 # (The ft_ types will have new names in the future.)
Definition: Lipid  # Name of a Benchling object applicable to the Type. Omit if not applicable for the Type.
  # May also be one of the "generic" entities:
  # Any Entity, Custom Entity, AA Sequence, DNA Sequence, Molecule, Mixture
Required: true  # or false
Multi-select: true  # or false
Parent-link: true  # or false
Computed:  # This section is only partially documented and defined in Kenfigure schema.
  # This is still converging and can be quite complicated. The current recommendation is to
  # not worry too much about the formality of computed fields and just document your understanding
  # of how the field is computed. Kenfigure tooling does have a defined format, but it varies
  # quite a bit depending on the formula.
  Formula name: molecule_molecular_weight
```

## Fieldset Schemas
Setting some attributes versus leaving them unspecified alters the behavior in significant ways.
See Benchling documentation for now to configure fieldsets.

File: Test Substance.yaml
```yaml
Fieldset_schemas:
- Name: Test Substance  # Name of the fieldset
  Description: A generic fieldset that in intended to be applied batch entities
    that might be used as test samples.
  Entity type: None  # "None" or one of the following entity schema types: Custom Entity,
    # DNA Sequence, DNA Oligo, RNA Oligo, RNA Sequence, AA Sequence, Molecule, Mixture
  System name: test_substance
  Prefix: TS
  Constraint: []
  Category: true  # Always true for now
  Naming options: []
  Name template: []
  Fields: []  # List of fields in the fieldset. May be an empty list or omitted.
```

## Result Schemas
File: LNP_Characterization.yaml
```yaml
Result_schemas:
- Name: LNP Characterization  # Result schema name
  Description: Captures LNP characterization measures after formulation
  System name: lnp_characterization
  Fields:
  - Name: Sample
    Description: The sample entity being characterized
    Tool tip: The sample entity being characterized  # If tool tip and description are the same
      # then it is common to omit the Description. Sometimes the description will have more detail.
    Required: true  # By convention we only include the required attribute when it is true
    Multi-select: false  # Normally if false, the attribute is not shown. Shown here just for
      # documentation purposes.
    System name: sample
    Type: Entity
    Definition: LNP Batch  # The specific entity. Only required for some Type values`
  - Name: LNP
    Description: The LNP concept for the provided LMP Batch provided in the Sample field.
      Caution that snapshot fields fields don't update if the operands changes.
    Tool tip: The LNP concept for the provided LMP Batch provided in the Sample field.
      This is a a computed snapshot field.
    System name: lnp
    Type: Entity
    Snapshot:  # This section is only partially documented and defined in Kenfigure schema.
      # This is still converging and can be quite complicated. The current recommendation is to
      # not worry too much about the formality of computed fields and just document your understanding
      # of how the field is computed. Kenfigure tooling does have a defined format, but it varies
      # quite a bit depending on the formula.
      Formula: identity_fn
      Arguments: ...
  - Name: EE (%)
    Description: Encapsulation Efficiency percent
    Tool tip: The encapsulation efficiency as a percentage (i.e., 0 to 100) 
    System name: ee_pct
    Type: Decimal
      # The value types for result fields are:
      # Date, Datetime, Decimal, Integer, Long text, Dropdown, Text, Attachment,
      # Entry, Entity, Category, Part, Inventory, JSON, Boolean, ft_assay_result_link, Run
```

## Study Schemas
TODO

## Feature Flags
The initial version of the feature flags file is typically created using a custom tool
(e.g., Kenfigure Export). Once initialized, it may then be maintained in git or periodically
updated via a fresh export. The export includes all attributes including `Description`.

File: feature_flags.yaml
```yaml
Feature_flags:  # Top-level key for Feature Flags object
  MOLBIO:  # Second level is a general Benchling-defined category
    MOLBIO_ALIGNMENT_CAPITALIZATION_QUALITY_THRESHOLD:  # A feature flag in the current category
      Current: '20'  # The current value of the feature flag
      Default: '20'  # The Benchling-defined default for this feature
      # The Benchling-provided description for the feature flag
      Description: 'This value configures the Phred score threshold for DNA alignments.
        When users choose to display ''quality base capitalization'' in the visibility
        options dropdown on an alignment, bases at or above this score will be rendered
        in uppercase, and bases below will be rendered in lowercase. '
    MOLBIO_ALIGNMENT_TRIM_STRINGENCY:  # A different feature flag in the current category
      Current: '0.05'  # Numeric values are treated as strings
      Default: '0.05'
      Description: This value dictates the strategy for trimming a DNA alignment with
        trace data. The ends of each read are trimmed to exclude bases where the probability
        of an incorrect base call rises above the configured value. (renamed from
        ALIGNMENT_TRIM_STRINGENCY)
    MOLBIO_ENABLE_EXTERNAL_BLAST:
      Current: false  # Many feature flags are Booleans
      Default: false
      Description: If enabled, users can select a region of a sequence or oligo in
        Benchling and send that sequence to the NCBI BLAST public website. Disabling
        the flag hides this feature and prevents Benchling data from being sent to
        NCBI BLAST. (renamed from MOLBIO_ENABLE_BLAST)
    # Other data types includes strings and lists
```

## Metadata
The `Metadata` object is mostly only used by Kenfigure tooling, but you might find
it useful for record keeping as well.

```yaml
Metadata:
  Organization: biotech_r_us  # Organization name
  Description: RNA Therapeutics Bioresearch V3.1 scientific accelerator model
  Model version: 3.1.0  # The version of the data model represented by the Kenfigure files
  Created: '2025-05-09T13:50:59+00:00'  # The datetime when the model was first created
  Modified: '2025-05-09T13:50:59+00:00'  # The datetime when the model was last modified
  Schema version: 0.1.0  # The Kenfigure schema version
```

## Container Schemas
TODO

## Box Schemas
TODO

## Plate Schemas
TODO

## Location Schemas
TODO
