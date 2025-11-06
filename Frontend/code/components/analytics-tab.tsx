"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AnalyticsTab() {
  const confidenceDistribution = [
    { range: "0-60%", count: 3, percentage: 5 },
    { range: "60-80%", count: 12, percentage: 18 },
    { range: "80-95%", count: 28, percentage: 42 },
    { range: "95-100%", count: 23, percentage: 35 },
  ]

  const reviewReasons = [
    { name: "Low Confidence", value: 32, color: "#ef4444" },
    { name: "Ambiguous Query", value: 18, color: "#f59e0b" },
    { name: "Multiple Templates", value: 12, color: "#3b82f6" },
    { name: "Missing Metadata", value: 8, color: "#8b5cf6" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
        <p className="text-muted-foreground mt-1">Email processing insights and trends</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confidence Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Confidence Distribution</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">How many emails fall into each confidence bracket</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={confidenceDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="range" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db" }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {confidenceDistribution.map((item) => (
                <div key={item.range} className="text-sm">
                  <p className="text-muted-foreground">{item.range}</p>
                  <p className="font-semibold text-foreground">
                    {item.count} ({item.percentage}%)
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Manual Review Reasons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Review Reasons Breakdown</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Why emails required manual review this week</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reviewReasons}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {reviewReasons.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} emails`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-2">
              {reviewReasons.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="ml-auto text-sm font-semibold text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-4">
            <div className="text-3xl font-bold text-blue-600">83%</div>
            <p className="text-sm text-blue-800">
              of reviews this week were due to low confidence scores (below 80%). Consider reviewing model thresholds.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl font-bold text-blue-600">2.3h</div>
            <p className="text-sm text-blue-800">
              average time from email received to manual review. Most emails are reviewed within the first hour.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
