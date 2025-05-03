COPY_DEST = docs

.PHONY: all doc copy-readme copy-jsonschemas-latest copy-jsonschemas-version

# Default action: copy README and latest jsonschemas
all: copy-readme copy-jsonschemas-latest

# Autogenerate documentation from jsonschemas/kenfigure.schema_flat.json
doc:
	jsonschema2md  --examples-as-yaml --show-examples all jsonschemas/kenfigure.schema_flat.json docs/autodoc.md

# Copy README.md to docs/index.md
copy-readme:
	@echo "Copying README.md to $(COPY_DEST)/index.md"
	cp README.md $(COPY_DEST)/index.md

# Copy jsonschemas directory recursively to docs/jsonschemas/latest/
copy-jsonschemas-latest:
	@echo "Copying jsonschemas/ to $(COPY_DEST)/jsonschemas/latest/"
	cp -r jsonschemas/* $(COPY_DEST)/jsonschemas/latest/

# Set VERSION from the command line, e.g., `make copy-jsonschemas-version VERSION=1.2.3`
# Fail if VERSION is not supplied
copy-jsonschemas-version:
	@if [ -z "$(VERSION)" ]; then \
		echo "Error: VERSION is not set. Use 'make copy-jsonschemas-version VERSION=<version>'"; \
		exit 1; \
	fi
	@echo "Creating directory $(COPY_DEST)/jsonschemas/$(VERSION)/"
	mkdir -p $(COPY_DEST)/jsonschemas/$(VERSION)/
	@echo "Copying jsonschemas/ to $(COPY_DEST)/jsonschemas/$(VERSION)/"
	cp -r jsonschemas/* $(COPY_DEST)/jsonschemas/$(VERSION)/