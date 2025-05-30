COPY_DEST = docs

.PHONY: all reference index latest version

# Default action: copy README and latest jsonschemas
all: reference index latest

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