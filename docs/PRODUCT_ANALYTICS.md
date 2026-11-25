# Trace Product Analytics Plan — v0.1

**Status:** Event specification; no analytics provider or production event pipeline is configured yet.

## Purpose

Measure whether users reach value, which workflows they use, whether they return, and where the product fails. Instrument meaningful product actions rather than collecting every click.

## Recommended event taxonomy

| Event | Trigger | Useful properties |
|---|---|---|
| `user_signed_up` | Account creation succeeds | user_id, timestamp, acquisition_source |
| `workspace_created` | Workspace creation succeeds | workspace_id |
| `document_upload_started` | Upload begins | workspace_id, file_type, file_size_bucket |
| `document_upload_completed` | Upload and validation succeed | document_id, file_type, page_count_bucket |
| `document_processing_started` | Processing job begins | document_id, pipeline_version |
| `document_processing_completed` | Processing completes | document_id, duration_ms, extracted_item_counts |
| `document_processing_failed` | Processing fails | document_id, stage, error_category |
| `insight_viewed` | User opens processed insights | document_id, view_type |
| `source_reference_opened` | User opens supporting source | document_id, source_type |
| `knowledge_item_corrected` | User edits or flags an item | item_type, correction_type |
| `question_submitted` | User submits a workspace question | workspace_id, question_category |
| `answer_generated` | Answer generation completes | workspace_id, latency_ms, citation_count |
| `answer_feedback_submitted` | User rates or flags an answer | feedback_type |
| `user_returned` | Derived from a later meaningful event | days_since_activation |

## Measurement rules

- Define activation as a successful document-processing completion followed by viewing the resulting insights.
- Define meaningful activity as document processing, inspecting insights/source evidence, correcting an extracted item, or submitting a question.
- Exclude page views and passive sessions from active-user counts unless reported separately.
- Calculate retention by activation cohort and state the window and denominator.
- Distinguish unique users from events and documents.
- Do not log raw document text, full prompts, extracted sensitive content, filenames containing personal information, or answer contents in general analytics events.
- Use pseudonymous IDs in analytics where possible.
- Set a documented retention period and restrict access to event data.
- Respect applicable consent, privacy and deletion requirements.

## Initial dashboard

Report weekly:

1. Total users since launch (cumulative).
2. New users in the period.
3. Activated users and activation rate.
4. Documents uploaded and successfully processed.
5. Processing success/failure rate.
6. Meaningful active users (DAU/WAU/MAU, where sample size supports reporting).
7. Returning users and day-7/day-30 retention by cohort.
8. Source-reference interactions and corrections.
9. Questions submitted and answers generated, once those capabilities exist.
10. Median and p95 processing/answer latency, once measured.

## Implementation decision

Do not add an analytics SDK until a provider is selected and its privacy, data residency, retention and cost implications are reviewed. A small first-party event endpoint can be considered alongside the persistence/authentication milestone. Until instrumentation is deployed and validated, report the existing 40-user figure as founder-reported rather than analytics-verified.
