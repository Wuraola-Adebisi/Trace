from app.services.chunking import build_source_units, chunk_text


def test_source_offsets_and_chunk_references_are_preserved():
    text, units = build_source_units([
        ("A decision was made to launch in June.", 1, None),
        ("Mina owns the launch checklist.", 2, None),
    ])
    chunks = chunk_text(text, units, chunk_size=100, overlap=10)

    assert len(units) == 2
    assert units[0].char_start == 0
    assert text[units[1].char_start:units[1].char_end] == units[1].text
    assert chunks[0].page_numbers == [1, 2]
    assert chunks[0].source_unit_indices == [0, 1]


def test_empty_text_returns_no_chunks():
    assert chunk_text("", []) == []
