# Kenfigure Schema Documentation

This document provides an overview of the Kenfigure JSON schema, with example YAML fragments and comments to explain the structure and purpose of each key and value.

For more details, refer to the JSON schema file.

THIS IS NOT YET CORRECT. THIS IS AN EXPERIMENT TO TEST THE DOCUMENTATION STYLE.

TODO:
- This is an early draft of the doc
- Decide on a more deliberate order
- Add deeper keys as required
- Factor out repeated details such as Diagram.Group
- Expand lists

---

## Metadata

The `Metadata` object contains information about the model instance, such as its organization, version, and timestamps.

```yaml
Metadata:
  Organization: example_org  # Organization handle, must match the pattern ^[a-z_][a-z0-9_]{0,32}$
  Description: Description of the environment and model.  # Optional description of the model
  Model version: "1.2.3"  # Semantic version of the model, e.g., 1.2.3
  Created: "2025-05-03T12:00:00Z"  # ISO 8601 datetime when the model was created
  Modified: "2025-05-04T12:00:00Z"  # ISO 8601 datetime when the model was last modified
  Schema version: "1.0.0"  # Semantic version of the schema, e.g., 1.0.0
```

---

## Diagram

The `Diagram` object defines properties for diagram rendering, such as coordinates.

```yaml
Diagram:
  ExampleDiagram:
    X: 100  # X-coordinate of the diagram
    Y: 200  # Y-coordinate of the diagram
```

---

## Dropdowns

The `Dropdowns` object defines dropdown menus and their options.

```yaml
Dropdowns:
  - Name: ExampleDropdown  # Name of the dropdown
    Description: A dropdown for selecting options.  # Optional description
    Alphabetize: true  # Whether to alphabetize options upon deployment
    Diagram:
      Group: Group1  # Layout group name
      Color: "#FF0000"  # Hex color for the dropdown
      X: 50  # X-coordinate
      Y: 100  # Y-coordinate
    Options:
      - Option1  # List of dropdown options
      - Option2
    API ID: dropdown_123  # API ID for export operations
```

---

## Entity Schemas

The `Entity_schemas` object defines various entity schemas, such as DNA sequences or custom entities.

```yaml
Entity_schemas:
  - Name: CustomEntity  # Name of the entity schema
    Description: A custom entity schema.  # Optional description
    Entity type: Custom Entity  # Must match one of the predefined types
    Prefix: CE  # Registry ID prefix
    Naming options:
      - NEW_IDS  # Generate new registry IDs
    Fields:
      - Name: Field1  # Name of the field
        Type: Text  # Data type of the field
        Required: true  # Whether the field is required
        Description: A text field for the entity.  # Optional description
```

---

## Fieldset Schemas

The `Fieldset_schemas` object defines reusable fieldsets that can be attached to entities.

```yaml
Fieldset_schemas:
  - Name: ExampleFieldset  # Name of the fieldset
    Description: A reusable fieldset.  # Optional description
    Entity type: Custom Entity  # Type of entity this fieldset applies to
    Fields:
      - Name: Field1  # Name of the field
        Type: Integer  # Data type of the field
        Required: false  # Whether the field is required
```

---

## Study Schemas

The `Study_schemas` object defines schemas for studies.

```yaml
Study_schemas:
  - Name: ExampleStudy  # Name of the study schema
    Prefix: ST  # ID prefix for the study schema
    Fields:
      - Name: StudyField1  # Name of the field
        Type: Date  # Data type of the field
        Required: true  # Whether the field is required
    Approval required: true  # Whether approval is required before execution
```

---

## Container Schemas

The `Container_schemas` object defines schemas for containers.

```yaml
Container_schemas:
  ExampleContainer:
    Description: A container schema.  # Optional description
```

---

## Box Schemas

The `Box_schemas` object defines schemas for boxes.

```yaml
Box_schemas:
  ExampleBox:
    Description: A box schema.  # Optional description
```

---

## Plate Schemas

The `Plate_schemas` object defines schemas for plates.

```yaml
Plate_schemas:
  ExamplePlate:
    Description: A plate schema.  # Optional description
```

---

## Location Schemas

The `Location_schemas` object defines schemas for locations.

```yaml
Location_schemas:
  ExampleLocation:
    Description: A location schema.  # Optional description
```

---

## Result Schemas

The `Result_schemas` object defines schemas for results.

```yaml
Result_schemas:
  - Name: ExampleResult  # Name of the result schema
    Description: A result schema.  # Optional description
    Fields:
      - Name: ResultField1  # Name of the field
        Type: Decimal  # Data type of the field
        Required: true  # Whether the field is required
```

---

## Feature Flags

The `Feature_flags` object defines back-end feature flag settings.

```yaml
Feature_flags:
  ExampleFeature:
    Current: true  # Current value of the feature flag
    Default: false  # Default value of the feature flag
    Description: A feature flag for enabling a feature.  # Description of the feature flag
    Planned: null  # Planned value (optional)
```

---
