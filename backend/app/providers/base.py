from abc import ABC, abstractmethod

from app.schemas import ExtractionResult, GroundedAnswer


class AIProvider(ABC):
    """Provider boundary. Implementations must return validated, evidence-linked results."""

    provider_name: str
    model_name: str

    @abstractmethod
    async def extract_knowledge(
        self, *, document_id: str, filename: str, chunks: list[dict]
    ) -> ExtractionResult:
        raise NotImplementedError

    @abstractmethod
    async def answer_question(
        self, *, question: str, evidence: list[dict]
    ) -> GroundedAnswer:
        raise NotImplementedError

    @abstractmethod
    async def embed_texts(self, texts: list[str]) -> list[list[float]]:
        raise NotImplementedError
