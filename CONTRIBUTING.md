# Contributing to Kenfigure

Thanks for your interest in contributing to **Kenfigure™**, a schema developed and maintained by **Go2 Software LLC**.

We welcome feedback, improvements, and pull requests that help refine the schema. Please read the following guidelines before submitting.

---

## 📌 Scope

Kenfigure is designed as a **stable schema standard** for public and private use. We prioritize changes that:

- Fix bugs or clarify ambiguous definitions
- Improve documentation
- Add optional fields that extend flexibility without breaking compatibility

We discourage changes that:

- Alter existing required fields or semantics without strong justification
- Introduce breaking changes without a versioning plan

---

## 🧑‍💻 Submitting Issues

If you find a bug, unclear part of the spec, or want to propose a new feature:

1. [Open an issue](https://github.com/YOUR-USERNAME/kenfigure/issues) with a descriptive title.
2. Include examples, schema fragments, or context if applicable.
3. Tag it with `bug`, `enhancement`, or `question`.

---

## 🔀 Pull Requests

Before opening a PR:

- Fork the repository
- Create a new branch (e.g. `fix/clarify-schema`)
- Add your changes with clear commit messages
- Run any applicable validation tools (JSON Schema linting, etc.)

In your pull request, explain:
- **What** you're changing
- **Why** it improves the schema or documentation
- If it introduces breaking changes

---

## 🌐 Local site preview

The published site at [kenfigure.com](https://kenfigure.com) is built with Jekyll from the `docs/` directory. Preview changes locally before pushing:

**Requirements:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
make docs-serve    # http://localhost:4000 (live reload on file changes)
make docs-build    # one-off build to docs/_site/
make docs-stop     # stop the preview server
```

If you have Ruby 3+ and Bundler installed locally, you can use `make docs-serve-native` instead of Docker.

---

## 💼 Commercial Use Notice

While the Kenfigure schema is open under the [ODC-BY 1.0 license](https://opendatacommons.org/licenses/by/1-0/), **commercial use of software tools based on this schema may require a separate license**. See the `NOTICE` file or contact [info@go2software.com](mailto:info@go2software.com).

---

Thanks again for helping improve Kenfigure™!
