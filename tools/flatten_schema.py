'''
This script flattens a JSON schema for Kenfigure by resolving references ($ref)
and saving the resolved version to a new file.

Usage: python tools/flatten_schema.py
'''
import glob
import json
import sys
from copy import deepcopy
from pathlib import Path
from typing import Any

import jsonschema
from jsonschema.exceptions import SchemaError, ValidationError
from referencing import Registry, Resource
from referencing.jsonschema import DRAFT202012

BASE_DIR = Path(__file__).resolve().parent.parent
COMPONENTS_DIR = BASE_DIR / 'jsonschemas'
ROOT_SCHEMA = COMPONENTS_DIR / 'kenfigure.schema.json'  # Root schema file with references to children
FLATTENED_SCHEMA = COMPONENTS_DIR / 'kenfigure.schema_flat.json'  # Flattened schema file


def create_registry() -> Registry:
    '''
    Schema and references files are in the 'jsonschemas' directory.

    The conventions used are:
        JSON schema files in directory:  ./jsonschemas/
        Schema files are named <SOMETHING>.schema.json
        Each schema files sets its $id as: "https://kenfigure.com/jsonschemas/latest/SOMETHING.schema.json"
        Schema files are referenced using $ref: "https://kenfigure.com/jsonschemas/latest/SOMETHING.schema.json"
        Top level schema file is: kbconfig.schema.json
    '''
    resources = [
        (
            f'https://kenfigure.com/jsonschemas/latest/{Path(file_path).name}',
            Resource.from_contents(json.loads(Path(file_path).read_text()))
        )
        for file_path in glob.glob('jsonschemas/*.schema.json')
    ]
    return   Registry().with_resources(resources)


def flatten_schema(schema: dict, registry: Registry) -> dict:
    '''Recursively resolve $ref references in the top-level schema.'''
    def resolve_refs(obj: Any) -> Any:
        '''Recursive function.'''
        if isinstance(obj, dict):
            if '$ref' in obj:
                uri = obj['$ref']
                resolved_schema = registry.resolver().lookup(uri).contents
                return resolve_refs(resolved_schema)
            else:
                return {k: resolve_refs(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [resolve_refs(item) for item in obj]
        else:
            return obj

    flat_schema = deepcopy(schema)
    return resolve_refs(flat_schema)


def main() -> None:
    '''Main function flatten and validate the schema.'''
    root_schema = json.loads(ROOT_SCHEMA.read_text())

    registry = create_registry()

    flattened_schema = flatten_schema(root_schema, registry)

    try:
        jsonschema.validate({}, flattened_schema, registry=registry)
    except SchemaError as e:
        print(f'Schema is not a valid JSON schema. Not savng flattened schema. {e}')
        sys.exit(1)

    FLATTENED_SCHEMA.write_text(json.dumps(flattened_schema, indent=2))
    print(f'Flattened schema saved to {FLATTENED_SCHEMA}')


########
# MAIN #
########
if __name__ == '__main__':
    main()