"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle, Leaf, FlaskRoundIcon as Flask, Brain } from "lucide-react"

interface AnalysisStatusProps {
  stage: string | null
  progress: number
  error: string | null
}

export default function AnalysisStatus({ stage, progress, error }: AnalysisStatusProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    // Animate progress changes
    const interval = setInterval(() => {
      setAnimatedProgress((prev) => {
        if (prev < progress) {
          return Math.min(prev + 1, progress)
        }
        return prev
      })
    }, 20)

    return () => clearInterval(interval)
  }, [progress])

  if (error) {
    return (
      <Card className="border-destructive/50 animate-pulse">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-destructive">
            <AlertCircle className="mr-2 h-5 w-5" />
            Analysis Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!stage) return null

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "parsing":
      case "validating":
        return <Loader2 className="h-5 w-5 animate-spin" />
      case "analyzing":
        return <Flask className="h-5 w-5" />
      case "calculating":
        return <Leaf className="h-5 w-5" />
      case "ai_processing":
        return <Brain className="h-5 w-5" />
      case "generating":
        return <Loader2 className="h-5 w-5 animate-spin" />
      case "complete":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Loader2 className="h-5 w-5 animate-spin" />
    }
  }

  const getStageTitle = (stage: string) => {
    switch (stage) {
      case "parsing":
        return "Parsing CSV Data"
      case "validating":
        return "Validating Soil Parameters"
      case "analyzing":
        return "Analyzing Nutrient Levels"
      case "calculating":
        return "Calculating Crop Suitability"
      case "ai_processing":
        return "Processing with AI Models"
      case "generating":
        return "Generating Final Report"
      case "complete":
        return "Analysis Complete"
      default:
        return "Processing..."
    }
  }

  const getStageDescription = (stage: string) => {
    switch (stage) {
      case "parsing":
        return "Reading and parsing your CSV file data..."
      case "validating":
        return "Checking soil parameters for validity and completeness..."
      case "analyzing":
        return "Analyzing soil nutrient levels against scientific thresholds..."
      case "calculating":
        return "Determining optimal crop suitability based on soil conditions..."
      case "ai_processing":
        return "Using advanced AI models to generate comprehensive insights..."
      case "generating":
        return "Compiling all analysis results into a detailed report..."
      case "complete":
        return "Your soil analysis is complete and ready to view!"
      default:
        return "Processing your soil data..."
    }
  }

  return (
    <Card className="border-primary/20 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          {getStageIcon(stage)}
          <span className="ml-2">{getStageTitle(stage)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{getStageDescription(stage)}</p>

        <div className="relative pt-1">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-primary/10">
            <div
              style={{ width: `${animatedProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-300 ease-in-out"
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Starting</span>
            <span>Processing</span>
            <span>Completing</span>
          </div>
        </div>

        {stage === "ai_processing" && (
          <div className="mt-4 flex items-center text-xs text-muted-foreground animate-pulse">
            <Brain className="h-3 w-3 mr-1" />
            <span>AI model is analyzing your soil data for optimal recommendations...</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
