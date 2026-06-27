# CLAUDE.md — kenfigure

## What this repo is

Public, open-source YAML spec defining the Kenfigure configuration format; owns the JSON schema. Also publishes **kenfigure.com** via GitHub Pages from `docs/`. Anything committed here — on any branch — is effectively public.

## docs/ — kenfigure.com pages

`docs/` is the canonical home for all published kenfigure.com pages. Edit published pages here directly; do not maintain shadow copies in `kenfigure-business`. The `kenfigure-business` repo is for internal docs and drafts only.

**Local preview:** `make docs-serve` (Docker) or `make docs-serve-native` (local Ruby) from the repo root. Preview at `http://localhost:4000`.

**Confidentiality:** Never commit internal content here — (e.g., uncleared legal text). When unsure, check with `kenfigure-business`.

## Footer sync rule

`docs/_includes/site-footer.html` is the canonical site footer. When you edit it here, also update the matching copy in `kenfigure-business/docs/_includes/site-footer.html` (used for local draft preview) and the static copy in `kenfigure-auth/frontend/order.html`.

## Environment-specific external URLs

Pages that link to the order form use a Jekyll data file so local preview and production resolve to the right host:

```liquid
{{ site.data.urls.auth_base_url[jekyll.environment] }}/order
```

**Data file:** `docs/_data/urls.yml`. Do not hard-code `https://auth.kenfigure.com` in page source.
