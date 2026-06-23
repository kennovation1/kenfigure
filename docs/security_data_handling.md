---
title: Kenfigure Security & Data Handling Overview
layout: default
---

[Kenfigure home](https://kenfigure.com)

# Kenfigure Security & Data Handling Overview

_Go2 Software LLC, 365 Boston Post Road, Suite 132, Sudbury, MA 01776, USA · [security@go2.software](mailto:security@go2.software). Kenfigure is a product of Go2 Software LLC. Last updated: June 2026._

---

**The short version.** **Kenfigure Pro™** and the free **Kenfigure Tool™ (Export)** help you manage your Benchling **configuration**. Both operate on configuration schema — the structure of your Benchling deployment — not your scientific, research, clinical, or patient data. Neither product accesses Benchling experimental, research, or sample data. Any configuration information held by the Service is a transient, read-only copy and is never the system of record.

## What we process

- **Configuration schema and related metadata:** schema and dropdown definitions and diagram layout information, used to provide export, import, and diagramming features.
- **Limited account and contact information:** authorized users' names, business email addresses, company affiliation, role, and Benchling tenant identifiers.
- **We do not** access, store, or process your Benchling scientific, research, sample, or patient data.

## Hosting and infrastructure

The Service runs on Amazon Web Services in the United States, in an account dedicated to Kenfigure. Infrastructure is deployed and maintained as code, backed by version control and standard code-quality tooling.

## Access control

Access to Go2 Software production systems is restricted to authorized Go2 Software personnel on a least-privilege basis. All administrative access requires multi-factor authentication.

## Authentication

Kenfigure Diagram users have individual accounts. Password complexity is enforced; users set their password on first login via a secure link, and subsequent resets are performed via a link sent to the user's registered email. Passwords are stored only as one-way hashes. The Kenfigure Tool (Canvas app) uses Benchling's own authentication — Go2 does not handle or store those credentials.

## Encryption

Data is encrypted in transit using TLS. Data at rest is encrypted using AWS-managed encryption.

## Git repository access (optional)

If you choose to use your own Git repository as a configuration source, you create a limited-scope access token that you control. The token is supplied through Benchling's native Canvas secure-configuration capability, which encrypts it with Kenfigure's public key before transmitting it. Kenfigure decrypts the token in memory using its private key solely to make Git API calls and never stores it in plain text. You set the token's scope and duration and can revoke it at any time. We recommend the most fine-grained token type each provider offers. GitHub, GitLab, and Bitbucket are supported.

## Use of AI

An optional grouping feature uses Amazon Bedrock to cluster schema elements for diagram layout (currently using Anthropic models). Amazon Bedrock does not use this data to train models and does not retain it.

## Subprocessors

- **Amazon Web Services** (hosting, including Amazon Bedrock for the AI grouping feature)
- **Paddle** (Paddle.com Market Ltd. — payment processing and billing; Merchant of Record / seller of record)
- **Fastmail Pty Ltd** (go2.software transactional and order-processing email)
- **Forward Email LLC** (kenfigure.com account and password-reset emails)

A current subprocessor list is available in the [Data Processing Addendum](data_processing_addendum.html).

## Changes to configuration

Kenfigure Tool™ (Import) generates a Benchling Configuration Migration file. You review and apply changes using Benchling's own Configuration Migration tool — Kenfigure does not push changes to your Benchling environments. Recommended practice is to import to a non-production (Dev/Test, or Sandbox/Preview) tenant first, validate, and then promote to production using Benchling's tool.

## Data retention and deletion

Configuration copies held by the Service are transient. When a subscription ends, account access is closed and configuration data is removed. Limited account records may be retained as needed for legal and financial purposes, as described in the [Privacy Policy](privacy_policy.html).

## Questions

Security and data-handling questions: [security@go2.software](mailto:security@go2.software).
