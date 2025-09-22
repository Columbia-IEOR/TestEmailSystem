"""Retrieval-augmented generation helpers for the advising system."""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import List, Optional

from .models import AdvisorReference, ReferenceCorpus, ReferenceDocument
from .similarity import TfIdfVectorizer
from .text_processing import tokenize


_DEFAULT_CORPUS_PATH = Path(__file__).resolve().parent.parent / "data" / "reference_corpus.json"


def load_reference_corpus(path: Path | str | None = None) -> ReferenceCorpus:
    """Load a reference corpus for retrieval augmented generation."""

    data_path = Path(path) if path else _DEFAULT_CORPUS_PATH
    if not data_path.exists():
        raise FileNotFoundError(f"Reference corpus file not found: {data_path}")
    with data_path.open("r", encoding="utf-8") as source:
        payload = json.load(source)
    documents: List[ReferenceDocument] = []
    for entry in payload:
        documents.append(
            ReferenceDocument(
                id=entry["id"],
                title=entry["title"],
                content=entry["content"],
                url=entry.get("url"),
                tags=tuple(entry.get("tags", [])),
            )
        )
    return ReferenceCorpus(documents)


class TfidfRetriever:
    """Retrieve supporting references using TF-IDF similarity."""

    def __init__(self, corpus: ReferenceCorpus) -> None:
        if not corpus:
            raise ValueError("TfidfRetriever requires at least one reference document")
        self.corpus = corpus
        tokenized_documents: List[List[str]] = []
        self._documents: List[ReferenceDocument] = list(corpus.documents)
        for document in self._documents:
            tokens = tokenize(
                " ".join([document.title, document.content] + list(document.tags))
            )
            tokenized_documents.append(tokens)
        self.vectorizer = TfIdfVectorizer(tokenized_documents)

    def retrieve(
        self,
        query: str,
        article: Optional["KnowledgeArticle"] = None,
        limit: int = 3,
    ) -> List[AdvisorReference]:
        if limit <= 0:
            return []
        query_fragments: List[str] = [query]
        if article:
            query_fragments.append(article.subject)
            query_fragments.extend(article.categories)
        query_tokens = tokenize(" ".join(query_fragments))
        if not query_tokens:
            return []
        scores = self.vectorizer.similarities(query_tokens)
        ranked = sorted(zip(self._documents, scores), key=lambda item: item[1], reverse=True)
        references: List[AdvisorReference] = []
        token_set = set(query_tokens)
        for document, score in ranked[: max(limit, 0) * 2]:
            if score <= 0.0:
                continue
            snippet = _build_snippet(document.content, token_set)
            references.append(
                AdvisorReference(
                    document_id=document.id,
                    title=document.title,
                    url=document.url,
                    snippet=snippet,
                    score=score,
                )
            )
            if len(references) >= limit:
                break
        return references


def _build_snippet(content: str, query_tokens: set[str], max_length: int = 200) -> str:
    """Construct a snippet from *content* that mentions any of *query_tokens*."""

    sentences = [segment.strip() for segment in re.split(r"(?<=[.!?])\s+", content) if segment.strip()]
    for sentence in sentences:
        sentence_tokens = set(tokenize(sentence))
        if query_tokens & sentence_tokens:
            return sentence[:max_length].strip()
    trimmed = content.strip()
    if len(trimmed) <= max_length:
        return trimmed
    snippet = trimmed[:max_length].rsplit(" ", 1)[0]
    return snippet + "..."


__all__ = ["load_reference_corpus", "TfidfRetriever"]
