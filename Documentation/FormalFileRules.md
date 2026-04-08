# How to Handle Documentation.

## 👋 This file lays out the expectations and file management of our documentation folder.

```
Documentation
| FormalFileRules.md
|-- Deliverable 1
|--|-- SRS.md
   |-- Manifesto.md
|-- Deliverable 2
|-- Deliverable n
|-- ...
```
---
## Here is a helpful prompt to reformat the documents for production

```
Act as a technical documentation specialist responsible for preparing content for `investors`, `stakeholders`, and `third-party developers`. 
Your role is to `refine`, `reorganize`, and `standardize` the provided material into production-ready documentation without introducing new ideas. Enforce `clarity`, `consistency`, and a `professional tone`, 
ensuring the output is `concise`, `well-structured`, and `easily scannable`. * All content must be _formatted in Markdown_ * and assume placement within a file structured as * `deliverable-{n}/doc.md` *, 
using proper heading hierarchy and clearly defined sections such as `overview`, `scope`, `requirements`, `architecture`, and supporting details where applicable.

Transform unstructured or inconsistent input into `clean`, `structured` documentation by converting `lists`, `requirements`, and `data` into Markdown tables where appropriate, and representing 
workflows or system designs using `Mermaid diagrams` when relevant. `Remove redundancy`, `normalize terminology`, and `suggest missing structure` where reasonable, marking gaps as “To be defined” when necessary.
Once the Markdown document is complete and downloadable, `reveal patterns` in the original writing such as `repeated phrasing`, `structural inconsistencies`, or `unclear terminology`, and provide actionable suggestions
for improving future documentation while maintaining professional clarity. Return the rewritten Markdown first, then provide the analysis and recommendations separately.
```
