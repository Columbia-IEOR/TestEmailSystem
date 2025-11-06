from fastapi import FastAPI, Query
from typing import Optional
from email_advising import EmailAdvisor, TfidfRetriever, load_knowledge_base, load_reference_corpus

app = FastAPI(title="Email Advising System API")

# ----------------------------
# Load backend logic
# ----------------------------
knowledge_base = load_knowledge_base()
reference_corpus = load_reference_corpus()
retriever = TfidfRetriever(reference_corpus)
advisor = EmailAdvisor(knowledge_base, retriever=retriever)

# ----------------------------
# Endpoint: respond
# ----------------------------
@app.get("/respond")
def respond(query: str = Query(..., description="Student's email query"),
            student_name: Optional[str] = None):
    """
    Process a student query using the EmailAdvisor backend.
    Returns subject, body, and confidence.
    """
    result = advisor.process_query(query, {"student_name": student_name})
    return {
        "subject": result.subject,
        "body": result.body,
        "confidence": result.confidence
    }

# ----------------------------
# Endpoint: metrics (mock data)
# ----------------------------
@app.get("/metrics")
def metrics():
    """
    Returns mock dashboard statistics for prototyping.
    """
    return {
        "emails_today": 25,
        "auto_sent": 18,
        "manual_review": 7,
        "top_topics": ["Registration", "Transcripts", "Withdrawals", "Financial Aid"]
    }

# ----------------------------
# Endpoint: emails (mock data)
# ----------------------------
@app.get("/emails")
def emails(status: str = Query("all", description="Filter by 'auto' or 'review'")):
    """
    Returns a list of emails for the dashboard.
    status = 'auto' | 'review' | 'all'
    """
    all_emails = [
        {"student_name": "Alex", "subject": "Transcript request", "confidence": 0.98, "status": "auto"},
        {"student_name": "Jordan", "subject": "Withdraw from course", "confidence": 0.87, "status": "review"},
        {"student_name": "Taylor", "subject": "Financial aid question", "confidence": 0.92, "status": "review"},
        {"student_name": "Riley", "subject": "Class registration", "confidence": 0.99, "status": "auto"},
    ]

    if status == "auto":
        return [e for e in all_emails if e["status"] == "auto"]
    elif status == "review":
        return [e for e in all_emails if e["status"] == "review"]
    else:
        return all_emails