from io import BytesIO

import pytest
from docx import Document

from app.services.document_parser import DocumentParseError, parse_document


def make_docx() -> bytes:
    document = Document()
    document.add_paragraph("The team approved the June launch.")
    document.add_paragraph("Mina owns the launch checklist.")
    stream = BytesIO()
    document.save(stream)
    return stream.getvalue()


def test_docx_parser_preserves_paragraph_indices():
    parsed = parse_document("meeting.docx", make_docx())

    assert parsed.media_type.endswith("wordprocessingml.document")
    assert [unit.paragraph_index for unit in parsed.units] == [0, 1]


def test_unsupported_file_type_is_rejected():
    with pytest.raises(DocumentParseError, match="Only PDF and DOCX"):
        parse_document("notes.txt", b"plain text")


def test_empty_or_unreadable_document_is_rejected():
    with pytest.raises(DocumentParseError):
        parse_document("notes.docx", b"not a real docx")
