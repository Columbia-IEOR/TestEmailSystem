"""Utilities for preprocessing student email text."""
from __future__ import annotations

import re
import unicodedata
from typing import List


_STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "but",
    "by",
    "for",
    "from",
    "how",
    "i",
    "in",
    "is",
    "it",
    "my",
    "of",
    "on",
    "or",
    "so",
    "that",
    "the",
    "to",
    "we",
    "what",
    "when",
    "where",
    "which",
    "who",
    "will",
    "with",
    "you",
    "your",
}

_WORD_RE = re.compile(r"[^a-z0-9]+")


def _strip_accents(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    return "".join(ch for ch in normalized if not unicodedata.combining(ch))


def normalize_text(text: str) -> str:
    """Return a normalized representation of *text*."""

    lowered = _strip_accents(text.lower())
    collapsed = _WORD_RE.sub(" ", lowered)
    return re.sub(r"\s+", " ", collapsed).strip()


def tokenize(text: str) -> List[str]:
    """Tokenize *text* into normalized word tokens."""

    normalized = normalize_text(text)
    if not normalized:
        return []
    return [token for token in normalized.split(" ") if token and token not in _STOPWORDS]


__all__ = ["normalize_text", "tokenize"]
