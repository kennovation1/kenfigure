# Changelog

All notable changes to the **Kenfigure** schema will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.10.0] - 2026-07-14

- Add optional `Container name template` on Entity schemas: ordered parts for Benchling
  container naming (`containerNameTemplate`). Part `Type` enum covers Text, Separator, Field,
  Contained entity name, Sample lot number, Registry ID number, Registry ID number (base 26),
  Barcode, Barcode number, Concentration value/units, Fill date/year, Parent storable
  barcode/name, Position, Project, Quantity value/units, and Restriction status. `Definition`
  holds literal text (Text/Separator) or a field display name (Field).

## [1.9.0] - 2026-07-12

- Add `Dimensional terms (do not hand-edit)` to Unit dictionary unit type entries: an opaque,
  Benchling-internal dimensional signature (e.g., `MASS^1, LENGTH^-3`) that is not shown in the
  Benchling UI and is not reliably derivable from `Formula`. Populated verbatim by export tooling
  and carried through unmodified on import; omitted entirely for hand-authored unit types.

## [1.8.0] - 2026-07-11

- Add support for a Unit dictionary (Benchling unit types and their units), and a `Unit` field key
  on Entity schema and Result schema Decimal/Integer fields to assign a unit from the dictionary.
- Add `Conversion_hints`, a global parameters object that adapts Kenfigure Tool import/export
  behavior to variations in the Benchling `.dat` format without requiring Kenfigure schema changes.
  Its first use records which JSON key a tenant/version uses for a unit type's formula
  (`formula` vs `original_formula`).

## [1.7.0] - 2026-06-13

- Add support for Benchling Connect: Instrument Gateways, Connection Schemas, and Connections.

## [1.6.0] - 2026-6-05

- Add support for Run schemas.  Input and output file configurations are
  represented as opaque passthrough objects and not explicitly defined in the JSON schema.
  To create file configurations, implement in Benchling first and then export to Kenfigure format.

## [1.5.0] - 2026-06-03

- Add support for Insights Dashboards
  
## [1.4.0] - 2026-05-22

- Add Boolean type support for Entity schema fields.

## [1.3.2] - 2026-01-13

- Change "Computed field" to "Computed" in Study schema fields (to match Entity and Fieldset schemas).
- Change "Formula name" to "Formula" in all computed fields (Entity, Fieldset, Schema). Result schema was already correct.
- Relax validation on enums for Formula values so that any string is allowed for now.
- Allow duplicate templates and sub-templates even in the same collection since Benchling allows this. This may change in the future.
- Allow duplicate template collections since Benchling allows this. This may change in the future.
- Add ft_assay_request_link as a valid data type for entity schemas, fieldsets, and result schemas.
- Add Batch to result schema field type (deprecated by Benchling, but exists in older tenants and need to support this for exports)

## [1.3.1] - 2025-12-08

- Add Template and Sub-template support for non-content attributes.
  Does not define content specification or default entry schema values.

## [1.2.1] - 2025-12-07

- Added 'Any inventory' as a valid generic object reference
- Added missing generic entity enums on Study and Result schema fields
- Minor documentation fixes related to generic object references

## [1.2.0] - 2025-09-01

- Added JSON schema support for Template collections

## [1.1.0] - 2025-07-04

- Added Height and Width keys to Plate schemas
- Removed Size key from Plate schemas
- Minor doc updates. Added Cursor support.

## [0.2.0] – 2025-05-30

### Added
- Fleshed out JSON Schema for Box schemas
- Fleshed out JSON Schema for Plate schemas
- Fleshed out JSON Schema for Container schemas
- Fleshed out JSON Schema for Location schemas

## [0.1.0] – 2025-04-20

### Added
- First public release of the **Kenfigure™** schema
