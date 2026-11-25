# Trace

Trace turns messy information into a structured map of what matters and how it connects.

Instead of producing another wall of summary text, Trace identifies the people, topics, decisions, questions, and relationships inside a piece of information and presents them as an interactive map.

## What it does

You can give Trace unstructured information such as:

- Meeting notes
- Research interviews
- Project briefs
- Lecture notes
- Transcripts
- Planning documents

Trace processes the content and surfaces:

- **Topics** — the ideas being discussed
- **People** — the people mentioned or involved
- **Decisions** — commitments, conclusions, or agreed actions
- **Questions** — unresolved issues and things that still need answers
- **Relationships** — connections between the information

Each extracted item can be traced back to the source material, making it easier to understand not just *what* was identified, but *why* it matters.

## Why Trace

Most tools turn information into shorter information.

Trace takes a different approach: it tries to recover the structure inside it.

A meeting transcript, for example, might contain several people, competing ideas, decisions, unanswered questions, and dependencies scattered across dozens of paragraphs. A summary can compress that information, but it can also hide the relationships between those pieces.

Trace makes those relationships visible.

## How it works

```text
Unstructured information
        ↓
Content processing
        ↓
Entity & topic extraction
        ↓
Decision & question detection
        ↓
Relationship mapping
        ↓
Interactive information map
        ↓
Source-backed insights

## Development status

Trace is an early product prototype. The current browser experience uses deterministic, rule-based extraction. A separate backend foundation is being developed for source-preserving PDF/DOCX ingestion and future AI integration. No model provider is currently connected, and persistent workspaces, semantic retrieval and AI-generated answers are not yet implemented.

## Product evidence and technical roadmap

- [Usage and traction record](docs/USAGE_AND_TRACTION.md)
- [Product analytics plan](docs/PRODUCT_ANALYTICS.md)
- [Technical readiness and production roadmap](docs/TECHNICAL_READINESS.md)
- [AI architecture](docs/AI_ARCHITECTURE.md)
- [AI evaluation plan](docs/AI_EVALUATION.md)
- [Backend development guide](backend/README.md)
- [Static route rendering and SEO](docs/STATIC_PRERENDERING.md)

The current traction baseline of 40 users is founder-reported and has not yet been verified against an analytics export. Qualitative feedback and future product metrics are documented separately from implemented capabilities.
