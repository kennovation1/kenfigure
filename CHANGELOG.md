# Changelog

All notable changes to the **Kenfigure** schema will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## [1.3.2] - 2026-01-13

- Change "Computed field" to "Computed" in Study schema fields (to match Entity and Fieldset schemas).
- Change "Formula name" to "Formula" in all computed fields (Entity, Fieldset, Schema). Result schema was already correct.
- Relax validation on enums for Formula values so that any string is allowed for now.
- Allow duplicate templates and sub-templates even in the same collection since Benchling allows this. This may change in the future.
- Allow duplicate template collections since Benchling allows this. This may change in the future.

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
