"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UploadCSV from "@/components/upload-csv"
import RealTimeResults from "@/components/real-time-results"
import AnalysisStatus from "@/components/analysis-status"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upload")
  const [analysisStage, setAnalysisStage] = useState<string | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  // Listen for analysis status updates from the UploadCSV component
  useEffect(() => {
    const handleAnalysisUpdate = (event: CustomEvent) => {
      const { stage, progress, error } = event.detail
      setAnalysisStage(stage)
      setAnalysisProgress(progress)
      setAnalysisError(error)

      // Automatically switch to results tab when analysis is complete
      if (stage === "complete") {
        setTimeout(() => {
          setActiveTab("results")
        }, 1000)
      }
    }

    window.addEventListener("analysisUpdate" as any, handleAnalysisUpdate)
    return () => {
      window.removeEventListener("analysisUpdate" as any, handleAnalysisUpdate)
    }
  }, [])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-4 md:py-8">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}! Analyze your soil data and get crop recommendations.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Data</TabsTrigger>
              <TabsTrigger value="results">Results & Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <Card>
                <CardHeader className="pb-2 md:pb-4">
                  <CardTitle>Upload Soil Data</CardTitle>
                  <CardDescription>
                    Upload a CSV file containing soil parameters to get crop recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <UploadCSV />

                  {/* Show analysis status during processing */}
                  {analysisStage && (
                    <AnalysisStatus stage={analysisStage} progress={analysisProgress} error={analysisError} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="results">
              <Card>
                <CardHeader className="pb-2 md:pb-4">
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>Your crop recommendations and soil health analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <RealTimeResults />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
