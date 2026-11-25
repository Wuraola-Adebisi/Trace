from app.config import settings
from app.providers.base import AIProvider


def get_ai_provider() -> AIProvider | None:
    """Return a configured provider when one is implemented and credentials exist.

    Deliberately returns None for now. Trace must not label heuristic output as AI output.
    """
    _ = settings
    return None
