from __future__ import annotations

from dataclasses import dataclass
from io import BytesIO
from pathlib import Path

from docx import Document as WordDocument
from pypdf import PdfReader


PDF_MEDIA_TYPE = "application/pdf"
DOCX_MEDIA_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
SUPPORTED_TYPES = {".pdf": PDF_MEDIA_TYPE, ".docx": DOCX_MEDIA_TYPE}


class DocumentParseError(ValueError):
    pass


@dataclass(frozen=True)
class ParsedUnit:
    text: str
    page_number: int | None = None
    paragraph_index: int | None = None


@dataclass(frozen=True)
class ParsedContent:
    media_type: str
    units: list[ParsedUnit]


def parse_document(filename: str, content: bytes) -> ParsedContent:
    """Extract text while retaining page/paragraph boundaries for later citations."""
    suffix = Path(filename).suffix.lower()
    if suffix not in SUPPORTED_TYPES:
        raise DocumentParseError("Only PDF and DOCX files are supported.")

    if not content:
        raise DocumentParseError("The uploaded document is empty.")

    try:
        if suffix == ".pdf":
            reader = PdfReader(BytesIO(content))
            if reader.is_encrypted:
                raise DocumentParseError("Password-protected PDFs are not supported.")
            units = [
                ParsedUnit(text=page.extract_text() or "", page_number=index + 1)
                for index, page in enumerate(reader.pages)
            ]
        else:
            document = WordDocument(BytesIO(content))
            units = [
                ParsedUnit(text=paragraph.text, paragraph_index=index)
                for index, paragraph in enumerate(document.paragraphs)
            ]
    except DocumentParseError:
        raise
    except Exception as exc:
        raise DocumentParseError("The file could not be read. Check that it is a valid PDF or DOCX.") from exc

    cleaned = [unit for unit in units if unit.text and unit.text.strip()]
    if not cleaned:
        raise DocumentParseError(
            "No readable text was found. Scanned PDFs require OCR, which is not included yet."
        )

    return ParsedContent(media_type=SUPPORTED_TYPES[suffix], units=cleaned)
