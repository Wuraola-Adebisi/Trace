from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.providers.registry import get_ai_provider
from app.schemas import AIStatus, ParsedDocument
from app.services.chunking import build_source_units, chunk_text
from app.services.document_parser import DocumentParseError, parse_document


app = FastAPI(
    title="Trace API",
    version="0.1.0",
    description="Document ingestion foundation for Trace. AI inference is not configured yet.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "trace-api"}


@app.get("/v1/ai/status", response_model=AIStatus)
async def ai_status() -> AIStatus:
    provider = get_ai_provider()
    return AIStatus(
        configured=provider is not None,
        provider=provider.provider_name if provider else None,
        message=(
            "AI provider configured."
            if provider
            else "No AI provider is connected. Document parsing is available; AI extraction and answers are not."
        ),
    )


@app.post("/v1/documents/preview", response_model=ParsedDocument)
async def preview_document(file: UploadFile = File(...)) -> ParsedDocument:
    """Parse a PDF/DOCX and return source-preserving chunks without storing the file."""
    filename = file.filename or "upload"
    content = await file.read(settings.max_upload_bytes + 1)
    if len(content) > settings.max_upload_bytes:
        raise HTTPException(status_code=413, detail="File exceeds the 15 MB upload limit.")

    try:
        parsed = parse_document(filename, content)
    except DocumentParseError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    text, source_units = build_source_units(
        [(unit.text, unit.page_number, unit.paragraph_index) for unit in parsed.units]
    )
    chunks = chunk_text(
        text,
        source_units,
        chunk_size=settings.chunk_size_chars,
        overlap=settings.chunk_overlap_chars,
    )

    return ParsedDocument(
        filename=filename,
        media_type=parsed.media_type,
        character_count=len(text),
        source_units=source_units,
        chunks=chunks,
    )
