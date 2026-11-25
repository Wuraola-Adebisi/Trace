# Trace API

The first backend slice establishes source-preserving document ingestion and the provider boundary for Trace's AI layer.

## Current capabilities

- PDF text extraction with page numbers.
- DOCX paragraph extraction with paragraph indices.
- Text normalisation and overlapping chunk creation.
- Source-unit and character-offset references on every chunk.
- Explicit AI provider status endpoint.
- Provider interface for extraction, embeddings and grounded answers.
- Tests for parsing and source-reference preservation.

## Not implemented yet

- AI model inference or provider credentials.
- OCR for scanned/image-only PDFs.
- Persistent document/workspace storage.
- Authentication, authorisation or team collaboration.
- Embedding generation, vector indexing, retrieval or answer generation.
- Production file storage, malware scanning or background jobs.

The preview endpoint processes files in memory and does not persist them. Do not expose this API publicly until authentication, access controls, storage limits, malware scanning and retention/deletion controls are implemented.

## Local development

Requires Python 3.11+.

```bash
cd backend
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

API docs: http://127.0.0.1:8000/docs

Run tests:

```bash
pytest
```

## Endpoints

- `GET /health`
- `GET /v1/ai/status`
- `POST /v1/documents/preview` — multipart form field named `file`; PDF and DOCX only.

The provider registry intentionally returns no provider until a real model integration is configured. No heuristic or fixture output is represented as AI output.
