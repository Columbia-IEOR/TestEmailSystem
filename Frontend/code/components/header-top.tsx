"use client"

import { format } from "date-fns"
import { User } from "lucide-react"

export default function HeaderTop() {
  const lastUpdated = new Date()

  return (
    <header className="bg-white border-b border-border shadow-sm sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Last updated:</p>
          <p className="text-sm font-medium text-foreground">{format(lastUpdated, "MMM d, yyyy • h:mm a")}</p>
        </div>

        {/* Profile Icon */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Dr. Smith</p>
              <p className="text-xs text-muted-foreground">Academic Advisor</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
