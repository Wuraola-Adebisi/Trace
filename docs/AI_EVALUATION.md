# Trace AI Evaluation Plan — v0.1

## Purpose

Measure whether Trace correctly extracts and retrieves project information and whether its answers are supported by source material. Evaluation must be based on labelled examples, not anecdotal demonstrations.

## Initial dataset

Build a permissioned evaluation corpus of 30–50 project documents. Synthetic documents are acceptable for the first version. Include multi-document project sets with:

- Explicit decisions and decision reversals.
- Named owners and unassigned actions.
- Due dates and ambiguous date references.
- Unresolved questions.
- Similar or repeated names.
- Conflicting reports and superseded information.
- Mere mentions that should not be classified as decisions or commitments.
- Questions for which no answer exists.

For every document, label source passages and expected entities, decisions, commitments, questions and relationships. Keep a held-out test split that is not used for prompt tuning.

## Metrics

| Area | Metric | Interpretation |
|---|---|---|
| Extraction | Precision, recall and F1 by knowledge kind | Correctness and completeness of extracted items |
| Relationships | Precision/recall by relationship type | Whether links are supported |
| Retrieval | Recall@k and MRR | Whether relevant passages are retrieved and ranked |
| Citations | Citation validity and evidence support rate | Whether citations exist and support claims |
| Answers | Human-rated faithfulness and completeness | Whether answers stay grounded and answer the question |
| Abstention | Correct abstention rate | Whether Trace declines unsupported questions |
| Contradictions | Conflict detection precision/recall | Whether incompatible source claims are surfaced |
| Operations | p50/p95 latency, failure rate, token usage and cost | Reliability and unit economics |

Do not present model self-reported confidence as accuracy.

## Required adversarial cases

- A person is mentioned near an action but is not its owner.
- A proposal is discussed but never approved.
- A question is rhetorical rather than unresolved.
- An old decision is superseded by a later one.
- Two people share a first name.
- A document contains a date but not a deadline.
- A source says an action is complete while a later source says it is blocked.
- The requested answer is absent from all uploaded documents.
- Retrieved passages are topically similar but do not answer the question.

## Initial release gates

These are proposed internal targets, not achieved results or industry benchmarks:

- At least 0.90 precision for extracted decisions and commitments on the held-out set.
- At least 0.85 recall for decisions and commitments.
- At least 0.95 citation validity (all cited source IDs and offsets resolve).
- At least 0.90 human-rated evidence support for factual answer claims.
- At least 0.90 correct abstention on deliberately unanswerable questions.
- No cross-workspace retrieval leakage in automated isolation tests.

Review results by knowledge type and document format. A strong aggregate score must not hide poor performance on commitments or questions.

## Human review

For the first pilot, allow users to flag an extraction as incorrect, edit the item, or report an unsupported answer. Store corrections as evaluation feedback only after consent and with appropriate workspace controls. Do not silently train on customer documents.

## Reporting

Every evaluation report records:
- Dataset version and split.
- Provider and exact model version.
- Prompt version and extraction schema version.
- Test date and code revision.
- Metrics by knowledge type and document format.
- Representative failures and remediation.
- Latency and estimated cost.

Never publish synthetic evaluation results as customer traction or production accuracy.
