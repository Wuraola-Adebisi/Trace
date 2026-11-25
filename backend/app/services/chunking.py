from __future__ import annotations

from app.schemas import DocumentChunk, SourceUnit


def build_source_units(units: list[tuple[str, int | None, int | None]]) -> tuple[str, list[SourceUnit]]:
    """Create one normalised text stream and offsets that map back to source units."""
    parts: list[str] = []
    source_units: list[SourceUnit] = []
    cursor = 0

    for index, (raw_text, page_number, paragraph_index) in enumerate(units):
        text = raw_text.strip()
        if not text:
            continue
        if parts:
            parts.append("\n\n")
            cursor += 2
        start = cursor
        parts.append(text)
        cursor += len(text)
        source_units.append(
            SourceUnit(
                unit_index=index,
                text=text,
                page_number=page_number,
                paragraph_index=paragraph_index,
                char_start=start,
                char_end=cursor,
            )
        )

    return "".join(parts), source_units


def _choose_boundary(text: str, start: int, proposed_end: int) -> int:
    """Prefer a nearby paragraph/sentence boundary without creating tiny chunks."""
    minimum = start + max(1, (proposed_end - start) // 2)
    candidates = [
        text.rfind("\n\n", minimum, proposed_end),
        text.rfind(". ", minimum, proposed_end),
        text.rfind("? ", minimum, proposed_end),
        text.rfind("! ", minimum, proposed_end),
        text.rfind(" ", minimum, proposed_end),
    ]
    boundary = max(candidates)
    return boundary + 1 if boundary >= minimum else proposed_end


def chunk_text(
    text: str,
    source_units: list[SourceUnit],
    chunk_size: int = 1200,
    overlap: int = 180,
) -> list[DocumentChunk]:
    if chunk_size < 100:
        raise ValueError("chunk_size must be at least 100 characters")
    if overlap < 0 or overlap >= chunk_size:
        raise ValueError("overlap must be non-negative and smaller than chunk_size")

    chunks: list[DocumentChunk] = []
    start = 0
    while start < len(text):
        proposed_end = min(start + chunk_size, len(text))
        end = proposed_end if proposed_end == len(text) else _choose_boundary(text, start, proposed_end)
        if end <= start:
            end = proposed_end

        overlapping_units = [
            unit for unit in source_units
            if unit.char_start < end and unit.char_end > start
        ]
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(
                DocumentChunk(
                    chunk_index=len(chunks),
                    text=chunk,
                    char_start=start,
                    char_end=end,
                    page_numbers=sorted(
                        {unit.page_number for unit in overlapping_units if unit.page_number is not None}
                    ),
                    source_unit_indices=[unit.unit_index for unit in overlapping_units],
                )
            )

        if end >= len(text):
            break
        start = max(start + 1, end - overlap)

    return chunks
