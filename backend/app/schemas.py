from enum import StrEnum
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class SourceUnit(BaseModel):
    """A source-preserving unit extracted from a file."""

    model_config = ConfigDict(extra="forbid")

    unit_index: int = Field(ge=0)
    text: str = Field(min_length=1)
    page_number: int | None = Field(default=None, ge=1)
    paragraph_index: int | None = Field(default=None, ge=0)
    char_start: int = Field(ge=0)
    char_end: int = Field(gt=0)


class DocumentChunk(BaseModel):
    model_config = ConfigDict(extra="forbid")

    chunk_index: int = Field(ge=0)
    text: str = Field(min_length=1)
    char_start: int = Field(ge=0)
    char_end: int = Field(gt=0)
    page_numbers: list[int] = Field(default_factory=list)
    source_unit_indices: list[int] = Field(default_factory=list)


class ParsedDocument(BaseModel):
    model_config = ConfigDict(extra="forbid")

    filename: str
    media_type: Literal["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    character_count: int = Field(ge=0)
    source_units: list[SourceUnit]
    chunks: list[DocumentChunk]


class EvidenceReference(BaseModel):
    """A citation back to an exact source passage, never just a document title."""

    model_config = ConfigDict(extra="forbid")

    document_id: str
    chunk_id: str | None = None
    filename: str
    page_number: int | None = Field(default=None, ge=1)
    paragraph_index: int | None = Field(default=None, ge=0)
    char_start: int = Field(ge=0)
    char_end: int = Field(gt=0)
    quote: str = Field(min_length=1)


class KnowledgeKind(StrEnum):
    PERSON = "person"
    ORGANISATION = "organisation"
    PROJECT = "project"
    TOPIC = "topic"
    DECISION = "decision"
    COMMITMENT = "commitment"
    QUESTION = "question"
    DATE = "date"


class KnowledgeItem(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    kind: KnowledgeKind
    label: str = Field(min_length=1)
    description: str | None = None
    status: str | None = None
    owner: str | None = None
    due_date: str | None = None
    certainty: Literal["explicit", "inferred", "uncertain"] = "explicit"
    confidence: float | None = Field(default=None, ge=0, le=1)
    evidence: list[EvidenceReference] = Field(min_length=1)


class KnowledgeRelationship(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    source_item_id: str
    target_item_id: str
    relationship_type: str = Field(min_length=1)
    certainty: Literal["explicit", "inferred", "uncertain"] = "explicit"
    evidence: list[EvidenceReference] = Field(min_length=1)


class ExtractionResult(BaseModel):
    model_config = ConfigDict(extra="forbid")

    document_id: str
    provider: str
    model: str
    schema_version: str = "0.1"
    items: list[KnowledgeItem]
    relationships: list[KnowledgeRelationship]


class AnswerCitation(BaseModel):
    model_config = ConfigDict(extra="forbid")

    document_id: str
    filename: str
    page_number: int | None = None
    quote: str = Field(min_length=1)


class GroundedAnswer(BaseModel):
    model_config = ConfigDict(extra="forbid")

    answer: str
    citations: list[AnswerCitation]
    insufficient_evidence: bool = False
    conflicts_detected: bool = False


class AIStatus(BaseModel):
    configured: bool
    provider: str | None = None
    message: str
