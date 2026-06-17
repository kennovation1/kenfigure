COPY_DEST = docs
DOCS_DIR = docs

.DEFAULT_GOAL := help

.PHONY: help all flatten reference index latest version docs-install docs-serve docs-serve-native docs-build docs-stop

help:
	@echo "Schema targets (run from repo root):"
	@echo "  make all                     flatten + reference + index + latest"
	@echo "  make flatten                 flatten JSON schema"
	@echo "  make reference               regenerate docs/reference.md"
	@echo "  make index                   copy README.md → docs/index.md"
	@echo "  make latest                  copy jsonschemas/ → docs/jsonschemas/latest/"
	@echo "  make version VERSION=x.y.z   snapshot jsonschemas to docs/jsonschemas/<version>/"
	@echo ""
	@echo "Jekyll preview targets (requires Docker Desktop):"
	@echo "  make docs-serve              start preview server at http://localhost:4000"
	@echo "  make docs-build              one-off build to docs/_site/"
	@echo "  make docs-stop               stop the preview server"
	@echo "  make docs-serve-native       use local Ruby instead of Docker"

# Default schema action: copy README and latest jsonschemas
all: flatten reference index latest

flatten:
	@echo "Flattening jsonschemas/kenfigure.schema.json to jsonschemas/kenfigure.schema_flat.json"
	python tools/flatten_schema.py

# Autogenerate documentation from jsonschemas/kenfigure.schema_flat.json
reference:
	@echo "Generating $(COPY_DEST)/reference.md"
	jsonschema2md  --examples-as-yaml --show-examples all jsonschemas/kenfigure.schema_flat.json $(COPY_DEST)/reference.md

# Copy README.md to docs/index.md
index:
	@echo "Copying README.md to $(COPY_DEST)/index.md"
	cp README.md $(COPY_DEST)/index.md

# Copy jsonschemas directory recursively to docs/jsonschemas/latest/
latest:
	@echo "Copying jsonschemas/ to $(COPY_DEST)/jsonschemas/latest/"
	cp -r jsonschemas/* $(COPY_DEST)/jsonschemas/latest/

# Set VERSION from the command line, e.g., `make version VERSION=1.2.3`
# Fail if VERSION is not supplied
version:
	@if [ -z "$(VERSION)" ]; then \
		echo "Error: VERSION is not set. Use 'make version VERSION=<version>'"; \
		exit 1; \
	fi
	@echo "Creating directory $(COPY_DEST)/jsonschemas/$(VERSION)/"
	mkdir -p $(COPY_DEST)/jsonschemas/$(VERSION)/
	@echo "Copying jsonschemas/ to $(COPY_DEST)/jsonschemas/$(VERSION)/"
	cp -r jsonschemas/* $(COPY_DEST)/jsonschemas/$(VERSION)/

# Jekyll local preview (run from repo root)
docs-install:
	cd $(DOCS_DIR) && bundle install --path vendor/bundle

docs-serve:
	docker compose up

docs-serve-native: docs-install
	cd $(DOCS_DIR) && bundle exec jekyll serve --livereload --open

docs-build:
	docker compose run --rm jekyll bash -lc "bundle install && bundle exec jekyll build"

docs-stop:
	docker compose down
