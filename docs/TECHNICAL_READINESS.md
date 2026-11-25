# Trace Technical Readiness — v0.1

**Status:** Architecture assessment and production roadmap  
**Last updated:** 2026-11-25

This document describes the current technical shape of Trace, the limitations visible in the repository and the proposed path towards a reliable AI-enabled product. It distinguishes existing implementation from planned work.

## 1. Current architecture

### Existing web application

The current product is a React, TypeScript, Vite and Tailwind application. Its main processing path is browser-side:

- The user supplies text.
- A deterministic heuristic engine extracts candidate topics, people, decisions and questions.
- Relationship rules construct a graph from those candidates.
- The interface renders an interactive SVG knowledge map.
- Insight and source panels expose selected information and supporting text.
- Example datasets provide prepared demonstrations.
- The interface supports a Markdown export workflow.

The frontend is organised into page, engine, visualisation, panel and example-data modules. This is a useful prototype structure, but the extraction logic is not model-based AI.

### Backend foundation in the AI foundation branch

The separate FastAPI backend foundation adds:

- PDF and DOCX text extraction.
- Page/paragraph metadata and source offsets.
- Overlapping text chunking.
- Typed contracts for knowledge items, relationships, evidence and grounded answers.
- A provider-neutral interface for extraction, embeddings and answer generation.
- An explicit status response when no AI provider is configured.
- Tests for parsing and source-reference preservation.

This backend foundation is not yet a production service. It does not currently provide persistent storage, authentication, model inference, embeddings, retrieval or generated answers.

## 2. Current limitations and risks

| Area | Current state | Consequence |
|---|---|---|
| Extraction | Browser-side heuristics in the existing app | Limited semantic understanding; can miss or misclassify information |
| Examples | Curated/prepared example outputs exist | Demonstrations are not evidence of general extraction accuracy |
| Input | Existing workflow accepts pasted text; backend foundation parses PDF/DOCX | No complete persistent upload workflow |
| AI inference | No provider configured | No genuine model-based extraction or reasoning |
| Retrieval | No semantic/vector retrieval | No cross-document question answering |
| Persistence | No production database identified in the current implementation | Results and documents are not yet a durable workspace knowledge base |
| Identity and access | No production authentication or workspace access control | Not ready for private multi-user documents |
| Storage | No production object storage integration | No durable, managed document lifecycle |
| Observability | No verified product analytics or backend monitoring baseline | Usage, errors and performance cannot yet be reliably reported |
| Security | No complete production upload security, tenant isolation or retention controls | Do not expose document processing as a public production service yet |
| OCR | Scanned/image-only PDF OCR not implemented in the backend foundation | Text extraction will not cover every PDF |
| Performance | No repeatable load or latency benchmark recorded | Capacity and scaling limits are not quantified |

These are repository-level findings and implementation gaps, not claims that every external service or operational process has been exhaustively audited.

## 3. Performance and reliability work

Before production use, establish a baseline rather than guessing at capacity.

Measure:

- Upload size and page-count distribution.
- Parsing success rate by file type.
- Processing latency at p50 and p95.
- Memory use during parsing and chunking.
- Queue wait time and job duration.
- Model latency and token usage once inference is connected.
- Retrieval latency and recall.
- Answer latency and citation validation failures.
- Error rate, retry rate and failed-job recovery.

Document explicit limits for file size, page count, processing time and concurrent jobs. Process large files asynchronously. Use checksums to detect duplicate uploads and idempotency keys to prevent duplicate processing.

## 4. Target production architecture

The intended production architecture is:

1. React frontend communicates with a backend API.
2. Backend authenticates users and authorises workspace access.
3. Original documents are stored in private object storage.
4. A background worker parses documents and creates source-preserving passages.
5. A model adapter performs structured extraction and embedding generation.
6. PostgreSQL stores workspaces, documents, passages, extracted knowledge, relationships and processing jobs.
7. pgvector and PostgreSQL full-text search support hybrid retrieval.
8. A retrieval-and-answer service generates evidence-backed responses.
9. Citation validation checks that source references resolve to stored passages.
10. Monitoring records processing outcomes, latency, failures and cost without logging sensitive document content unnecessarily.

A separate graph database is not required for the initial scale. Store typed relationships in PostgreSQL and generate graph views from those records. Revisit graph infrastructure only if measured query patterns justify it.

## 5. Model hosting and inference options

Trace should keep its model interface provider-neutral. Compare options using the same labelled evaluation dataset and representative documents.

| Option | Potential use | Advantages to evaluate | Constraints to evaluate |
|---|---|---|---|
| Amazon Bedrock | Managed extraction, answer generation and supported embedding models | Managed inference; potential fit with AWS startup credits and existing AWS ecosystem | Model availability by region, price, quotas, latency, data handling and structured-output quality |
| Google Vertex AI | Managed model inference and embeddings | Managed Google model ecosystem and integration options | Model availability, regional support, quotas, cost, data handling and quality |
| NVIDIA NIM | Deploy supported models through NVIDIA inference microservices | Potentially useful for portable, optimised model serving and controlled deployment | Requires supported model/hardware setup, operational ownership and workload justification |
| NVIDIA NeMo | Model development, customisation, evaluation and optimisation workflows | Potential fit when Trace has task-specific data and measurable model-quality needs | Not a substitute for a complete application backend; adoption adds engineering and compute requirements |

No provider has been selected or connected in the current implementation. Access to credits is a commercial and programme consideration, not a technical reason to hardwire the product to one vendor.

## 6. Potential NVIDIA workloads

NVIDIA relevance should be tied to measurable workload requirements.

Potential future GPU workloads include:

- Embedding generation for large document collections.
- Batch extraction across many long documents.
- Reranking large retrieval candidate sets.
- Self-hosted LLM inference for structured extraction and answer generation.
- Evaluation runs across multiple model and prompt versions.
- Optional graph or relationship analytics at a scale where accelerated computation provides a demonstrated benefit.

At the current prototype stage, there is no demonstrated GPU bottleneck and no evidence that GPU hosting is necessary. Managed inference is likely the more practical initial route. Benchmark throughput, latency and cost before moving workloads to self-hosted GPU infrastructure.

NVIDIA NIM and NeMo are technologies to evaluate, not technologies currently integrated into Trace. Do not describe Trace as NVIDIA-powered until an actual integration has been built and validated.

## 7. Production roadmap

### Stage 1 — Prototype foundations
- [x] Separate FastAPI backend foundation.
- [x] PDF/DOCX parsing foundation.
- [x] Preserve page/paragraph and character-offset source references.
- [x] Define typed knowledge and evidence contracts.
- [x] Define provider interface.
- [x] Document AI evaluation approach.
- [ ] Run and record backend test results in a reproducible environment.

### Stage 2 — Persistent application
- [ ] PostgreSQL schema and migrations.
- [ ] User authentication and workspace authorisation.
- [ ] Private object storage and document lifecycle controls.
- [ ] Persistent document, passage and processing-job records.
- [ ] Background processing queue and retry handling.
- [ ] File validation, malware scanning and upload limits.
- [ ] Tenant-isolation tests and deletion/retention controls.

### Stage 3 — First genuine AI workflow
- [ ] Connect one managed model provider.
- [ ] Implement structured extraction with schema validation.
- [ ] Generate embeddings and index source passages.
- [ ] Implement hybrid retrieval and reranking.
- [ ] Generate answers with passage-level citations.
- [ ] Add explicit abstention and contradiction handling.
- [ ] Evaluate on a labelled, held-out document set.

### Stage 4 — Product validation and reliability
- [ ] Instrument meaningful product events.
- [ ] Run a permissioned 10–15 person pilot.
- [ ] Measure activation, repeat usage and retention.
- [ ] Collect corrections and qualitative feedback.
- [ ] Record shipped improvements and follow-up results.
- [ ] Establish latency, reliability and cost baselines.

### Stage 5 — Scale and NVIDIA evaluation
- [ ] Profile representative workloads.
- [ ] Compare managed inference providers on quality, latency and cost.
- [ ] Benchmark supported NVIDIA NIM deployments where relevant.
- [ ] Evaluate NeMo tooling if task-specific optimisation is justified.
- [ ] Test GPU inference economics against managed APIs.
- [ ] Adopt accelerated infrastructure only where benchmarks demonstrate value.

## 8. Technical claims suitable for external applications

Claims supported by the current implementation:
- Trace has a working interactive web prototype.
- The existing prototype identifies candidate information and visualises relationships using deterministic heuristics.
- A separate backend foundation supports PDF/DOCX text extraction and source-location preservation.
- The project has defined typed contracts and a provider-neutral boundary for future AI integration.
- An AI evaluation plan and production architecture roadmap have been documented.

Claims that must remain future tense:
- AI-powered document understanding.
- Model-based entity and decision extraction.
- Semantic and cross-document retrieval.
- Evidence-backed AI question answering.
- Persistent team workspaces.
- NVIDIA NIM/NeMo integration or GPU-accelerated inference.
- Production-scale performance, reliability or cost efficiency.

Update this document as implementation and benchmark evidence changes.
