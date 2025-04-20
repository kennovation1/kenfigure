'''
This script builds a JSON schema for Kenfigure by resolving references and saving
the final schema to a versioned directory and a latest directory.

Usage: python tools/build_schema.py <schema_version>
'''
import argparse
import json
from pathlib import Path
from referencing import Registry, Resource
from referencing.jsonschema import DRAFT202012

BASE_DIR = Path(__file__).resolve().parent.parent
COMPONENTS_DIR = BASE_DIR / "jsonschemas" / "components"
VERSIONS_DIR = BASE_DIR / "jsonschemas" / "versions"
LATEST_DIR = BASE_DIR / "jsonschemas" / "latest"

OUTPUT_FILENAME = "kenfigure.schema.json"
ROOT_SCHEMA = COMPONENTS_DIR / "kenfigure_root.schema.json"  # Root schema file with references to children


def build_registry(base_path: Path) -> Registry:
    '''
    Build a registry (a catalog of referenced JSON schema component files)
    of schemas from the components directory.
    '''
    resources = {}
    for schema_path in base_path.glob("*.schema.json"):
        with open(schema_path, encoding="utf-8") as f:
            schema_data = json.load(f)
        uri = f"https://kenfigure.com/schemas/{schema_path.name}"
        resources[uri] = Resource.from_contents(schema_data)
    return Registry(resources)


def resolve_schema() -> dict:
    '''Resolve the schema references and return the final schema.'''
    with open(ROOT_SCHEMA, encoding="utf-8") as f:
        schema = json.load(f)

    registry = build_registry(COMPONENTS_DIR)
    resolved = DRAFT202012.rewrite(schema, registry=registry)
    return resolved.contents


def write_schema(resolved_schema: dict, schema_version: str) -> None:
    '''Write the resolved schema to a versioned directory and a latest directory.'''
    # Write to versioned directory
    version_dir = VERSIONS_DIR / schema_version
    version_dir.mkdir(parents=True, exist_ok=True)
    with open(version_dir / OUTPUT_FILENAME, "w", encoding="utf-8") as f:
        json.dump(resolved_schema, f, indent=2)

    # Write to latest
    LATEST_DIR.mkdir(parents=True, exist_ok=True)
    with open(LATEST_DIR / OUTPUT_FILENAME, "w", encoding="utf-8") as f:
        json.dump(resolved_schema, f, indent=2)


def main() -> None:
    '''Main function to build and save the schema.'''
    parser = argparse.ArgumentParser(description="Build and save the Kenfigure JSON schema.")
    parser.add_argument(
        "schema_version",
        help="The version of the schema to build (e.g., 'v0.1.0')."
    )
    args = parser.parse_args()

    schema_version = args.schema_version
    print(f"Building schema version {schema_version}...")
    resolved = resolve_schema()
    write_schema(resolved, schema_version)
    print("Schema built and saved to:")
    print(f"  {VERSIONS_DIR / schema_version / OUTPUT_FILENAME}")
    print(f"  {LATEST_DIR / OUTPUT_FILENAME}")


########
# MAIN #
########
if __name__ == "__main__":
    main()