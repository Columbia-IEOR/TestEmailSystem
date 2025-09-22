"""Email Advising System package."""
from .advisor import EmailAdvisor
from .composers import LLMEmailComposer, TemplateEmailComposer
from .knowledge_base import KnowledgeBase, KnowledgeArticle, load_knowledge_base
from .models import (
    AdvisorReference,
    AdvisorResponse,
    ConfidenceSettings,
    RankedMatch,
    ReferenceCorpus,
    ReferenceDocument,
)
from .rag import TfidfRetriever, load_reference_corpus

__all__ = [
    "AdvisorReference",
    "AdvisorResponse",
    "ConfidenceSettings",
    "EmailAdvisor",
    "KnowledgeArticle",
    "KnowledgeBase",
    "LLMEmailComposer",
    "RankedMatch",
    "ReferenceCorpus",
    "ReferenceDocument",
    "TfidfRetriever",
    "TemplateEmailComposer",
    "load_knowledge_base",
    "load_reference_corpus",
]
