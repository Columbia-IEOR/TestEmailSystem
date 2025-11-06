"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface MetricsData {
  emailsToday: number
  autoSent: number
  manualReview: number
  avgConfidence: number
}

export default function MetricsCards() {
  const metrics: MetricsData = {
    emailsToday: 25,
    autoSent: 18,
    manualReview: 7,
    avgConfidence: 0.91,
  }

  const chartDataDaily = [
    { date: "Mon", pending: 5 },
    { date: "Tue", pending: 8 },
    { date: "Wed", pending: 6 },
    { date: "Thu", pending: 9 },
    { date: "Fri", pending: 7 },
    { date: "Sat", pending: 4 },
    { date: "Sun", pending: 3 },
  ]

  const chartDataWeekly = [
    { date: "Week 1", pending: 15 },
    { date: "Week 2", pending: 22 },
    { date: "Week 3", pending: 18 },
    { date: "Week 4", pending: 25 },
  ]

  const chartDataMonthly = [
    { date: "Jan", pending: 45 },
    { date: "Feb", pending: 52 },
    { date: "Mar", pending: 48 },
    { date: "Apr", pending: 61 },
    { date: "May", pending: 55 },
  ]

  const [chartView, setChartView] = useState<"daily" | "weekly" | "monthly">("daily")

  const chartData = chartView === "daily" ? chartDataDaily : chartView === "weekly" ? chartDataWeekly : chartDataMonthly

  const getConfidenceColor = (score: number) => {
    if (score < 0.8) return "text-red-600"
    if (score < 0.95) return "text-amber-600"
    return "text-green-600"
  }

  const getConfidenceBgColor = (score: number) => {
    if (score < 0.8) return "bg-red-100"
    if (score < 0.95) return "bg-amber-100"
    return "bg-green-100"
  }

  return (
    <div className="space-y-4">
      {/* Top Row: 4 Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Emails Today */}
        <Card className="border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Emails Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{metrics.emailsToday}</div>
            <p className="mt-2 text-xs text-muted-foreground">Total emails received</p>
          </CardContent>
        </Card>

        {/* Auto-Sent */}
        <Card className="border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Auto-Sent Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{metrics.autoSent}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {((metrics.autoSent / metrics.emailsToday) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>

        {/* Manual Review */}
        <Card className="border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Manual Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{metrics.manualReview}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {((metrics.manualReview / metrics.emailsToday) * 100).toFixed(0)}% pending
            </p>
          </CardContent>
        </Card>

        {/* Average Confidence Score */}
        <Card
          className={`border shadow-sm hover:shadow-md transition-shadow ${getConfidenceBgColor(metrics.avgConfidence)}`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getConfidenceColor(metrics.avgConfidence)}`}>
              {(metrics.avgConfidence * 100).toFixed(0)}%
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Auto-sent emails</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Pending Responses Chart */}
      <Card className="border border-blue-100 shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Pending Responses Over Time</CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={chartView === "daily" ? "default" : "outline"}
              onClick={() => setChartView("daily")}
              className={chartView === "daily" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              Daily
            </Button>
            <Button
              size="sm"
              variant={chartView === "weekly" ? "default" : "outline"}
              onClick={() => setChartView("weekly")}
              className={chartView === "weekly" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              Weekly
            </Button>
            <Button
              size="sm"
              variant={chartView === "monthly" ? "default" : "outline"}
              onClick={() => setChartView("monthly")}
              className={chartView === "monthly" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              Monthly
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db" }} />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: "#2563eb", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
