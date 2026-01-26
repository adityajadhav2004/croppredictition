"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Results from "./results"

export default function RealTimeResults() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingStage, setLoadingStage] = useState("initializing")

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoadingStage("checking")

        // Check if we have results in localStorage
        const storedResults = localStorage.getItem("analysisResults")

        if (!storedResults) {
          setLoading(false)
          return
        }

        setLoadingStage("parsing")

        // Parse the stored results
        const parsedResults = JSON.parse(storedResults)

        setLoadingStage("rendering")

        // Simulate a slight delay to show the loading states
        setTimeout(() => {
          setResults(parsedResults)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error("Error loading results:", error)
        setError("Failed to load analysis results. Please try uploading your data again.")
        setLoading(false)
      }
    }

    loadResults()
  }, [])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {loadingStage === "checking" && "Checking for analysis results..."}
            {loadingStage === "parsing" && "Loading your soil analysis data..."}
            {loadingStage === "rendering" && "Preparing your personalized recommendations..."}
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No analysis results available. Please upload your soil data first.</p>
      </div>
    )
  }

  return <Results initialResults={results} />
}
