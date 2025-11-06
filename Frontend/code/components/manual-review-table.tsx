"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ArrowUpDown } from "lucide-react"

interface ManualReviewEmail {
  id: string
  student_name: string
  uni: string
  subject: string
  confidence: number
  status: string
  body: string
  references: string[]
}

type SortKey = "student_name" | "uni" | "subject" | "confidence" | "status"

interface ManualReviewTableProps {
  searchTerm?: string
}

export default function ManualReviewTable({ searchTerm = "" }: ManualReviewTableProps) {
  const mockData: ManualReviewEmail[] = [
    {
      id: "1",
      student_name: "Jordan",
      uni: "j12345",
      subject: "Withdraw from course",
      confidence: 0.87,
      status: "review",
      body: "Hi, I would like to withdraw from CS 101. I realized this course is not suitable for my schedule. Please advise on the withdrawal process and any academic implications. Thank you.",
      references: ["Policy: Course Withdrawal", "Form: Drop/Add Request"],
    },
    {
      id: "2",
      student_name: "Taylor",
      uni: "t67890",
      subject: "Financial aid question",
      confidence: 0.92,
      status: "review",
      body: "I was wondering about my financial aid eligibility for the spring semester. I noticed some changes in my account. Could you clarify what documents I need to submit? Thanks.",
      references: ["FAFSA Requirements", "Aid Disbursement Schedule"],
    },
    {
      id: "3",
      student_name: "Morgan",
      uni: "m54321",
      subject: "Grade dispute",
      confidence: 0.76,
      status: "review",
      body: "I believe there was an error in my grade calculation for the midterm exam. I scored 88% but received a lower grade. Can we discuss this discrepancy?",
      references: ["Grade Appeal Process", "Exam Rubric"],
    },
    {
      id: "4",
      student_name: "Casey",
      uni: "c09876",
      subject: "Degree audit request",
      confidence: 0.81,
      status: "review",
      body: "I need a degree audit to ensure I'm on track for graduation. Can you provide an updated report of my completed and remaining requirements? I'd like to review before registration.",
      references: ["Degree Requirements", "Graduation Checklist"],
    },
  ]

  const [sortKey, setSortKey] = useState<SortKey>("student_name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedEmail, setSelectedEmail] = useState<ManualReviewEmail | null>(null)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  const filteredData = mockData.filter((email) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      email.student_name.toLowerCase().includes(searchLower) ||
      email.uni.toLowerCase().includes(searchLower) ||
      email.subject.toLowerCase().includes(searchLower)
    )
  })

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]

    if (typeof aValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue as string) : (bValue as string).localeCompare(aValue)
    }

    if (typeof aValue === "number") {
      return sortDirection === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
    }

    return 0
  })

  const getConfidenceColor = (score: number) => {
    if (score < 0.8) return "bg-red-100 text-red-700"
    if (score < 0.95) return "bg-amber-100 text-amber-700"
    return "bg-green-100 text-green-700"
  }

  const getConfidenceBarColor = (score: number) => {
    if (score < 0.8) return "bg-red-500"
    if (score < 0.95) return "bg-amber-500"
    return "bg-green-500"
  }

  const SortableHeader = ({ label, sortKeyName }: { label: string; sortKeyName: SortKey }) => (
    <button
      onClick={() => handleSort(sortKeyName)}
      className="flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
      <ArrowUpDown className="h-4 w-4" />
    </button>
  )

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manual Review Emails</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">
                    <SortableHeader label="Student Name" sortKeyName="student_name" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortableHeader label="UNI" sortKeyName="uni" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortableHeader label="Subject" sortKeyName="subject" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortableHeader label="Confidence" sortKeyName="confidence" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <SortableHeader label="Status" sortKeyName="status" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((email, index) => (
                  <tr
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`border-b hover:bg-blue-50 transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 text-foreground font-medium">{email.student_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{email.uni}</td>
                    <td className="px-4 py-3 text-foreground">{email.subject}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getConfidenceBarColor(email.confidence)}`}
                            style={{ width: `${email.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground text-xs">{(email.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                        {email.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedEmail} onOpenChange={(open) => !open && setSelectedEmail(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedEmail && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedEmail.subject}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Student Info */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Student Name</p>
                    <p className="font-semibold text-foreground">{selectedEmail.student_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">UNI</p>
                    <p className="font-semibold text-foreground">{selectedEmail.uni}</p>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="pb-4 border-b">
                  <p className="text-xs text-muted-foreground mb-2">Confidence Score</p>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-48 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getConfidenceBarColor(selectedEmail.confidence)}`}
                        style={{ width: `${selectedEmail.confidence * 100}%` }}
                      />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(selectedEmail.confidence)}`}
                    >
                      {(selectedEmail.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Email Body */}
                <div className="pb-4 border-b">
                  <p className="text-xs text-muted-foreground mb-2">Email Content</p>
                  <p className="text-sm text-foreground leading-relaxed bg-gray-50 p-4 rounded-md">
                    {selectedEmail.body}
                  </p>
                </div>

                {/* References */}
                {selectedEmail.references.length > 0 && (
                  <div className="pb-4">
                    <p className="text-xs text-muted-foreground mb-2">References</p>
                    <ul className="space-y-1">
                      {selectedEmail.references.map((ref, idx) => (
                        <li key={idx} className="text-sm text-blue-600">
                          • {ref}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2 flex-row">
                <Button variant="outline" onClick={() => setSelectedEmail(null)}>
                  Back to List
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Mark as Reviewed</Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Send Now</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
