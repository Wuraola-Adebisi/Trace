# Trace AI Architecture — v0.1

**Status:** Target architecture and first implementation slice. This document distinguishes implemented ingestion foundations from planned AI capabilities.

## Product focus

Trace initially serves project teams: founders, operators, project managers and product managers who need to recover decisions, commitments, owners, unresolved questions and changes across working documents.

The first high-value workflow is project decision intelligence:

> What decisions have we made about this project, who owns each action, and what remains outstanding?

The primary experience is a document library and evidence-backed question answering. The knowledge map remains a secondary exploration surface generated from structured knowledge records.

## Current implementation in this branch

- A FastAPI backend foundation.
- PDF and DOCX text extraction.
- Page/paragraph source metadata.
- Normalised document text and overlapping chunks.
- Character offsets and source-unit references on chunks.
- Pydantic contracts for knowledge items, relationships, evidence and grounded answers.
- An AI provider interface and explicit unconfigured status.
- Unit tests for parsing and source mapping.

The existing React application and browser-side heuristic graph engine are unchanged.

## Not implemented

No model is connected. There is no inference, extraction by an LLM, embedding generation, vector retrieval, cross-document reasoning, grounded answer generation, persistence, authentication or production upload security in this slice. Scanned PDF OCR is also not supported.

## Target processing flow

1. **Ingest:** validate file type/size, extract text, retain page/paragraph boundaries and create a document record.
2. **Segment:** split text into overlapping passages. Preserve document ID, passage ID, page/paragraph and character offsets.
3. **Extract:** ask a model for schema-constrained structured information. Validate the response; retry or quarantine invalid output rather than silently accepting it.
4. **Resolve:** reconcile entity aliases across documents. Do not merge people or organisations solely because their names are similar.
5. **Index:** retain original text and extracted records; generate embeddings for passages and selected knowledge items.
6. **Retrieve:** combine keyword and vector retrieval, then rerank candidate passages for the user's question.
7. **Reason:** supply only relevant retrieved evidence to the answer model. Require citations for factual claims and explicit abstention when evidence is insufficient.
8. **Verify:** validate that citations refer to real stored passages; evaluate whether cited evidence supports the answer. Surface contradictions across sources.
9. **Present:** show answer, citations, uncertainty/conflicts and links to source documents. Generate the graph from persisted entities and typed relationships.

## Data model

The first persistent version should use PostgreSQL. Use relational records for workspaces, memberships, documents, passages, knowledge items, relationships, processing jobs and answers. Add pgvector for embeddings. Keep original files in private object storage.

Core records:

- **Workspace:** tenant boundary and owner.
- **Document:** workspace, filename, MIME type, checksum, storage key, processing state, timestamps.
- **Passage:** document, ordinal, text, character offsets, page/paragraph metadata, embedding.
- **Knowledge item:** workspace, kind, canonical label, description, status, owner, due date, certainty, confidence, schema/model version.
- **Evidence:** knowledge item or answer, passage, quote and offsets.
- **Relationship:** source item, target item, relationship type, certainty and supporting evidence.
- **Processing job:** stage, state, retries, error category and timing.
- **Answer:** question, response, evidence references, model/provider version and evaluation metadata.

Every workspace-owned record must be tenant-scoped. Every derived claim must preserve provenance to one or more source passages.

## Extraction contract

Knowledge kinds in v0.1:

- person
- organisation
- project
- topic
- decision
- commitment
- question
- date

Every extracted item must include at least one evidence reference. Each reference must identify the source document and exact passage/offsets. Distinguish:

- **explicit:** directly stated in source material.
- **inferred:** derived from evidence but not directly stated.
- **uncertain:** source does not support a confident interpretation.

Do not infer a commitment owner or deadline from proximity alone. Unknown values remain null. Model confidence is a signal for review, not a calibrated probability until calibration has been measured.

## Retrieval and answer rules

Use hybrid retrieval: PostgreSQL full-text search plus pgvector similarity. Apply workspace filters before retrieval. Rerank the candidate set before generation.

The answer model receives the question, retrieved evidence, and an instruction to:
- answer only from supplied evidence;
- cite each material factual claim;
- distinguish explicit facts from inference;
- identify conflicting sources and dates;
- say when evidence is missing;
- never invent an owner, date, status or decision.

Citation existence validation is deterministic. Citation entailment/faithfulness requires a separate evaluation process and must not be assumed from valid citation IDs alone.

## Provider strategy

Define a provider-neutral interface for:
- structured extraction;
- embeddings;
- answer generation;
- optional reranking.

Keep provider/model identifiers and prompt/schema versions with every result. Initial candidates can include Amazon Bedrock or Google Vertex AI when credits/access are available. NVIDIA NIM and NeMo are future evaluation options where supported models and measured workload needs justify them. Do not claim NVIDIA technology is in use until it is integrated and tested.

Do not train a foundation model for the initial product. First benchmark managed models against Trace's own evaluation set.

## Security and operational requirements before public deployment

- Authentication and workspace-level authorisation.
- Private object storage and signed, short-lived file access.
- Upload size/type validation and malware scanning.
- Rate limits and abuse protection.
- Encryption in transit and at rest.
- Configurable retention and deletion of source files and derived records.
- Secrets managed outside source control.
- Per-workspace data isolation in every query.
- Processing timeouts, retries and idempotency.
- Audit logs for document access and deletion.

The current preview endpoint is a local development utility, not a production upload service.

## Delivery sequence

1. **Foundation (this branch):** ingestion, source metadata, chunking, typed contracts, provider boundary.
2. **Persistence:** workspace/document/passage schema, migrations, private storage, processing jobs.
3. **First model integration:** structured extraction for decisions, commitments, people and questions.
4. **Evaluation:** labelled dataset, extraction metrics, citation checks, hallucination/abstention tests.
5. **Retrieval:** embeddings, hybrid search and reranking across documents.
6. **Grounded Q&A:** answer generation, citation validation, contradiction handling.
7. **Frontend integration:** document library, processing states, evidence-backed answers and map backed by persisted knowledge.

Do not move to the next stage merely because an endpoint returns a response. Each stage needs tests and measurable acceptance criteria.
