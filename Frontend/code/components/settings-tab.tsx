"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export default function SettingsTab() {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">Configure your email advising system</p>
      </div>

      {/* Auto-Send Threshold */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Send Threshold</CardTitle>
          <CardDescription>Emails with confidence above this level will be sent automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-foreground">Confidence Threshold</label>
              <span className="text-2xl font-bold text-blue-600">92%</span>
            </div>
            <Slider defaultValue={[92]} max={100} min={50} step={1} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">Recommended: 90-95% for safe auto-sending</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Threshold</Button>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Manage response templates for common student inquiries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {[
              { name: "Course Withdrawal", usage: 24 },
              { name: "Financial Aid Inquiry", usage: 18 },
              { name: "Grade Appeal", usage: 12 },
              { name: "Transcript Request", usage: 31 },
              { name: "Add/Drop Process", usage: 16 },
            ].map((template) => (
              <div key={template.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{template.usage} uses this month</p>
                </div>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            ))}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full">Add New Template</Button>
        </CardContent>
      </Card>

      {/* Knowledge Base */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>Upload policies, forms, and documents for the AI to reference</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
            <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT up to 10MB each</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase">Recent Uploads (3)</p>
            {[
              { name: "Academic-Policies.pdf", date: "Nov 2, 2024" },
              { name: "Financial-Aid-Guide.docx", date: "Oct 28, 2024" },
              { name: "Course-Catalog-2024.pdf", date: "Oct 15, 2024" },
            ].map((file) => (
              <div key={file.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="text-xs text-foreground">{file.name}</div>
                <div className="text-xs text-muted-foreground">{file.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your advisor profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input defaultValue="Dr. Sarah Smith" className="mt-2" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input defaultValue="sarah.smith@university.edu" className="mt-2" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Department</label>
            <Input defaultValue="Academic Advising Center" className="mt-2" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}
