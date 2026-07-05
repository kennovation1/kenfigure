---
title: Kenfigure Pro™ Subscription Terms
layout: default
toc: true
---

[Kenfigure home](https://kenfigure.com)

# Kenfigure Pro™ Subscription Terms

_Effective June 2026. Go2 Software LLC, 365 Boston Post Road, Suite 132, Sudbury, MA 01776, USA, [info@go2.software](mailto:info@go2.software). Kenfigure is a product of Go2 Software LLC._

---

## 1. Agreement and acceptance

These Kenfigure Subscription Terms (the "**Terms**") govern access to and use of the paid **Kenfigure Pro™** service (the "**Service**") provided by Go2 Software LLC ("**Provider**," "we," "us") to the customer identified on the applicable order form ("**Customer**," "you"). Each order form that references these Terms (an "**Order Form**"), together with these Terms and any addenda incorporated by reference (including the [Privacy Policy](privacy_policy.html) and [Data Processing Addendum](data_processing_addendum.html)), forms the "**Agreement**."

By signing or otherwise accepting an Order Form, or by accessing or using the Service, Customer agrees to the Agreement. For Standard and Growth tiers the Agreement is offered on a click-accept basis and is not negotiated; Enterprise and Validated Cloud orders may be individually negotiated. If the person accepting is doing so on behalf of an entity, they represent that they are authorized to bind that entity.

The free **Kenfigure Tool™ (Export)** is not part of the Service and is governed separately by the [Kenfigure Free-Tier Terms](free_tier_terms.html).

## 2. The Service and license

Subject to the Agreement and payment of fees, Provider grants Customer a non-exclusive, non-transferable, non-sublicensable right, during the subscription term, to access and use the Service for Customer's internal business purposes of managing Customer's Benchling configuration. The license covers all of Customer's Benchling environments (e.g., Dev, Test, Prod, and any Sandbox/Preview tenants). The object types and features supported by each Service component are described in the then-current [Kenfigure Feature Support Matrix](feature_matrix.html) on Provider's website. Provider provisions Customer's account and an initial administrator user for Kenfigure Diagram; additional Kenfigure Diagram users may be added by Provider upon Customer's request. The Kenfigure Tool (Canvas app) is accessed through Customer's Benchling environment and requires no separate provisioning; Customer's Benchling administrator controls which Benchling users may access it.

Customer will not, and will not permit others to: (a) resell, sublicense, or provide the Service to third parties except as expressly permitted; (b) reverse engineer or attempt to derive source code, except to the extent that restriction is prohibited by law; (c) use the Service to build a competing product; or (d) remove proprietary notices.

## 3. Customer responsibilities and recommended use

Customer is responsible for: (a) providing accurate provisioning and contact information; (b) safeguarding its credentials and any access tokens (including any Git access token, which is supplied and secured through Benchling's native Canvas capabilities); (c) its users' compliance with the Agreement; and (d) maintaining its own agreements with, and complying with the terms of, Benchling and any third-party code repository it connects.

**Reviewing changes.** Kenfigure Tool (Import) generates a Benchling Configuration Migration file. To apply changes, Customer uploads that file to Benchling's Configuration Migration tool, which presents a review UI showing the changes that will occur before Customer confirms the import. Customer is solely responsible for reviewing those changes in Benchling's tool and for deciding whether to proceed. Provider does not itself apply changes to Customer's Benchling environments.

**Recommended practice.** Provider strongly recommends importing only to a non-production (Dev/Test, or Sandbox/Preview) tenant first, validating the result there, and then promoting the configuration to production using Benchling's Configuration Migration tool. **Customers should not import directly to a production tenant.** Customer acknowledges that it controls and is responsible for changes made to its production environments.

**Validated Cloud environments.** The Service is designed to operate within Benchling Validated Cloud environments and supports the configuration management, version control, and auditable promotion workflows those environments require. The Service does not include Provider's direct participation in Customer's IQ/OQ/PQ protocol authoring or formal validation documentation (e.g., Installation Qualification, Operational Qualification, or Performance Qualification deliverables). Such activities are available as a separate professional services engagement, subject to a separately executed statement of work.

## 4. Fees, payment, and refunds {#refund-policy}

Fees are stated on the Order Form and billed annually in advance through Provider's payment provider (Merchant of Record), by card, ACH, or invoice/PO as offered. The Merchant of Record is the seller of record for the transaction and handles applicable taxes; fees are otherwise exclusive of taxes that are Customer's responsibility. Fees for a committed term are fixed (price-locked) as stated on the Order Form. Undisputed late amounts may accrue interest at the lower of 1% per month or the maximum allowed by law, and Provider may suspend the Service for non-payment after reasonable notice.

**Refunds and cancellations.** Except as expressly stated in this Section 4, fees are non-refundable, and there are no refunds for unused or partial subscription periods, including after cancellation. To decline renewal and stop future billing, Customer gives written notice of non-renewal as stated on the Order Form and in Section 11; cancellation takes effect at the end of the then-current term and does not refund fees already paid for that term. Refunds of prepaid, unused fees are available only: (a) if, within 30 days of the start date, the Service cannot be made to work in Customer's environment and the incompatibility cannot reasonably be remedied (Section 11); or (b) under the warranty remedy in Section 8. Where a refund is due, it is issued through the Merchant of Record to the original payment method, and the amount may differ slightly from the amount paid due to tax or currency-exchange recalculation. Nothing in this Section limits Customer's rights regarding a Service that is not as described, faulty, or not fit for purpose. _(This Section is the "Refund Policy" referenced on Provider's website.)_

## 5. Customer Data and security

"**Customer Data**" means the configuration data, files, and other content Customer provides to or generates through the Service, plus Customer's account and contact information. As between the parties, Customer owns Customer Data. Customer grants Provider a limited license to host, process, and use Customer Data solely to provide and support the Service.

Provider processes primarily configuration schema (structure, not scientific, research, clinical, or patient data) and limited contact information. The Service is hosted on Amazon Web Services, and certain features (e.g., diagram layout assistance) use Amazon Bedrock within Provider's own infrastructure. Provider will maintain reasonable administrative, technical, and organizational safeguards designed to protect Customer Data. Provider's processing of any personal data, and its subprocessors, are described in the [Privacy Policy](privacy_policy.html) and [Data Processing Addendum](data_processing_addendum.html), which are incorporated by reference.

## 6. Intellectual property

Provider owns and retains all right, title, and interest in the Service and all related software, documentation, and IP. The open Kenfigure standard published by Provider is licensed separately under its own open-source license and is not restricted by this Agreement. If Customer provides feedback or suggestions, Provider may use them without restriction or obligation.

## 7. Confidentiality

Each party may receive the other's non-public information ("**Confidential Information**"). The receiving party will use it only to perform under the Agreement, protect it with at least reasonable care, and not disclose it except to those who need it and are bound by similar obligations. This does not apply to information that is public, independently developed, or rightfully received from a third party, or to disclosures required by law (with notice where permitted).

## 8. Warranty and disclaimer

Provider warrants that during the subscription term the Service will perform materially in accordance with its then-current documentation. Customer's exclusive remedy, and Provider's sole obligation, for breach of this warranty is for Provider to use reasonable efforts to correct the non-conformity or, failing that within a reasonable time, to terminate the affected subscription and refund any prepaid, unused fees for the terminated period.

**Except for the express warranty above, the Service and all outputs are provided "AS IS."** Provider disclaims all other warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. Provider does not warrant that the Service or any generated Configuration Migration file will be error-free or that importing a file will not affect Customer's Benchling environments; Customer is responsible for reviewing outputs and following the recommended practice in Section 3.

## 9. Limitation of liability

To the maximum extent permitted by law: (a) neither party will be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost revenue, business interruption, or loss or corruption of data, even if advised of the possibility; and (b) each party's total aggregate liability arising out of or related to the Agreement will not exceed **one million U.S. dollars ($1,000,000)**. The limitations in this Section do not apply to Customer's obligation to pay fees due.

## 10. Indemnification

Provider will defend Customer against third-party claims alleging that the Service, as provided and used in accordance with the Agreement, infringes that third party's intellectual property rights, and will pay resulting damages finally awarded or agreed in settlement. This does not apply to claims arising from Customer Data, Customer's modifications, use of the Service in violation of the Agreement, or combination with non-Provider products. If the Service is or may be enjoined, Provider may modify it, obtain a license, or terminate the affected subscription and refund prepaid, unused fees.

Customer will defend Provider against third-party claims arising from Customer Data, Customer's use of the Service in violation of the Agreement, or Customer's breach of its agreements with Benchling or its code repository, and will pay resulting damages finally awarded or agreed.

The party seeking indemnity will give prompt notice, reasonable cooperation, and control of the defense (no settlement imposing obligations on the indemnified party without consent).

## 11. Term, termination, and suspension

The subscription term and renewal are stated on the Order Form. Unless the Order Form states a specific renewal price, renewals are at Provider's then-current pricing for the applicable tier; the committed-term price lock in Section 4 applies during the committed term only and does not carry into renewal terms. Either party may terminate for the other's material breach not cured within 30 days of written notice, or immediately if the other becomes insolvent. **Environment compatibility:** if within 30 days of the start date the Service cannot be made to work in Customer's environment and the incompatibility cannot reasonably be remedied, either party may terminate and Provider will refund prepaid, unused fees. On termination, Customer's access ends; Sections that by their nature should survive (including 5–10 and 12) survive. Provider may suspend the Service for non-payment, security risk, or legal requirement, with notice where practicable.

## 12. General

The Agreement is governed by the laws of the Commonwealth of Massachusetts, USA, without regard to conflict-of-laws rules, and the parties submit to the exclusive jurisdiction of the state and federal courts located in Massachusetts. Provider may update the Service and these Terms; for any material adverse change Provider will give reasonable notice, and committed-term pricing and terms on an existing Order Form remain locked for that term. Neither party may assign the Agreement without the other's consent, except that either party may assign it to a successor in a merger, acquisition, or sale of substantially all assets. Neither party is liable for delays caused by events beyond its reasonable control. Notices will be in writing to the addresses on the Order Form.
