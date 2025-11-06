"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import ManualReviewTable from "@/components/manual-review-table"
import AutoSentTable from "@/components/auto-sent-table"

type FilterType = "all" | "review" | "auto" | "today" | "high" | "low"

export default function EmailsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [activeSection, setActiveSection] = useState<"review" | "auto">("review")

  const filters: { id: FilterType; label: string; description: string }[] = [
    { id: "all", label: "All", description: "Show all emails" },
    { id: "review", label: "Needs Review", description: "Pending manual review" },
    { id: "auto", label: "Auto-Sent", description: "Already sent" },
    { id: "today", label: "Sent Today", description: "Sent in last 24 hours" },
    { id: "high", label: "High Confidence", description: "90%+ confidence" },
    { id: "low", label: "Low Confidence", description: "Below 80% confidence" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Email Management</h2>
        <p className="text-muted-foreground mt-1">Review and manage student emails</p>
      </div>

      {/* Search Bar */}
      <div>
        <Input
          placeholder="Search by student name, UNI, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-foreground hover:bg-gray-200"
            }`}
            title={filter.description}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => setActiveSection("review")}
          className={`pb-3 px-1 font-medium text-sm transition-all ${
            activeSection === "review"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Needs Review (7)
        </button>
        <button
          onClick={() => setActiveSection("auto")}
          className={`pb-3 px-1 font-medium text-sm transition-all ${
            activeSection === "auto"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Auto-Sent (5)
        </button>
      </div>

      {/* Tables */}
      {activeSection === "review" && <ManualReviewTable searchTerm={searchTerm} />}
      {activeSection === "auto" && <AutoSentTable searchTerm={searchTerm} />}
    </div>
  )
}
