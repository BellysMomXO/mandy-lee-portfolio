# Mandy Lee | Connected Business Systems

I build websites, custom operating systems, dashboards and automation around the way a business works. My focus is connecting the customer experience to the operations behind it.

This public portfolio presents selected work from private application repositories. It includes project case studies, connected workflows and runnable code examples with synthetic data. The full working repositories remain private.

## Selected projects

| Project | What it demonstrates | Case study |
| --- | --- | --- |
| Trinity School & Ecosystem | Course commerce, student access, learning and affiliate administration | [Explore Trinity](projects/trinity/README.md) |
| Selling Freedom OS | Bilingual real estate operations, CRM, role-specific portals and referral networks | [Explore Selling Freedom](projects/selling-freedom/README.md) |
| Madd Hatter | Responsive website, service discovery and readiness assessment | [Explore Madd Hatter](projects/madd-hatter/README.md) |
| Madd Hatter Site Studio | Templates, brand kits and page editing in a custom website builder | [Explore Site Studio](projects/site-studio/README.md) |
| Interactive Assessments & Smaller Tools | Guided inputs, recommendations, authorized report access and refinement | [Explore the tools](projects/interactive-tools/README.md) |

## Sample-data preview

![Synthetic operations demonstration](assets/operations-demo.jpg)

This screenshot comes from the included illustrative demo. It contains no production records.

Trinity and Selling Freedom OS are complex builds that are actively used and continue to be developed as their businesses evolve.

## How I build

I design around business workflows, carry shared context between tools, and make access and administrative responsibilities explicit. These small examples illustrate that approach:

* [Enrollment and refund state](examples/enrollment.mjs): verified events, duplicate delivery and access changes.
* [Lead ownership and access](examples/lead-access.mjs): role-aware filtering and permission boundaries.
* [Page configuration](examples/page-config.mjs): validating editable structures before saving them.
* [Assessment recommendations](examples/assessment.mjs): validated inputs and explainable recommendations.

The examples are newly written, reduced teaching adaptations informed by the private implementations. They are not production modules or complete security implementations. The assessment example does not reproduce private prompts or scoring. All names, identifiers, amounts and records in examples are synthetic.

## Explore the demo

Serve this folder locally to run the [interactive demo](demo/index.html):

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080/demo/`. GitHub renders the code for HTML files; it does not run the interactive demo inside the repository viewer.

The demonstration covers a sample operations dashboard, enrollment workflow, website configuration and assessment recommendations. It has no production API connections, sends no messages and stores no personal data.

## Run the examples

Node.js 18 or later:

```sh
node --test examples/examples.test.mjs
```

## Public websites

* [Madd Hatter](https://maddhatter.pro/)
* [Selling Freedom](https://sellingfreedom.mx/)
* [The Trinity Protocol](https://www.trinityprotocol.ai/)

Public websites and private dashboards have different access requirements. Some applications remain in development or await launch; each case study states the relevant boundaries. The new Madd Hatter portfolio page is not deployed yet.

## Scope

This repository deliberately excludes production credentials, environment files, customer records, access codes, payment records and private course curricula. No access to a production system is required to explore it.

Copyright © 2026 Mandy Lee. No open-source license is granted unless explicitly added. Public visibility permits review, not unrestricted reuse.
