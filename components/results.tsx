"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Leaf, Droplet, ThermometerIcon, Sprout, CloudRain, Brain, BarChart3 } from "lucide-react"
import CropRecommendationChart from "./crop-recommendation-chart"
import NutrientAnalysisChart from "./nutrient-analysis-chart"
import DataCharts from "./data-charts"
import { useToast } from "@/components/ui/use-toast"
import PDFExport from "./pdf-export"

// No default mock data - we only show real analysis results
// This will be null until user uploads and analyzes CSV data
const defaultResults: any = null

interface ResultsProps {
  initialResults?: typeof defaultResults
}

export default function Results({ initialResults }: ResultsProps) {
  const [results, setResults] = useState<typeof defaultResults | null>(null)
  const [rawData, setRawData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("recommendations")
  const resultsRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)

      try {
        if (initialResults) {
          setResults(initialResults)
        } else {
          const storedResults = localStorage.getItem("analysisResults")
          if (storedResults) {
            setResults(JSON.parse(storedResults))
          } else {
            setResults(defaultResults)
          }
        }

        // Also fetch raw CSV data for charts
        const storedRawData = localStorage.getItem("rawCsvData")
        if (storedRawData) {
          setRawData(JSON.parse(storedRawData))
        }
      } catch (error) {
        console.error("Error fetching results:", error)
        setResults(defaultResults)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [initialResults])

  const reportContentId = "soil-analysis-report"

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="rounded-full bg-muted/50 p-4 mx-auto w-fit">
          <Leaf className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No Analysis Results Yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Upload a CSV file with your soil data and click "Analyze Soil Data with AI" to get real-time crop recommendations and nutrient analysis.
        </p>
        <p className="text-xs text-muted-foreground">
          Required columns: N, P, K, pH, temperature (optional: humidity, rainfall, crop, yield)
        </p>
      </div>
    )
  }

  // Format text content for display
  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.trim() === "") return <br key={i} />
      if (line.startsWith("##")) {
        return (
          <h3 key={i} className="text-lg font-medium mt-4 mb-2">
            {line.replace("##", "").trim()}
          </h3>
        )
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="ml-6 list-disc my-1">
            {line.replace("- ", "").trim()}
          </li>
        )
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={i} className="ml-6 list-decimal my-1">
            {line.replace(/^\d+\./, "").trim()}
          </li>
        )
      }
      return (
        <p key={i} className="my-2">
          {line}
        </p>
      )
    })
  }

  return (
    <div id={reportContentId} className="space-y-6" ref={resultsRef}>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl md:text-2xl font-heading font-bold">Analysis Results</h2>
        <PDFExport contentId={reportContentId} filename="soil-analysis-report.pdf" />
      </div>

      <Tabs defaultValue="recommendations" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1">
          <TabsTrigger value="recommendations" className="text-xs md:text-sm">
            Crop Recommendations
          </TabsTrigger>
          <TabsTrigger value="nutrients" className="text-xs md:text-sm">
            Nutrient Analysis
          </TabsTrigger>
          <TabsTrigger value="soilhealth" className="text-xs md:text-sm">
            Soil Health
          </TabsTrigger>
          <TabsTrigger value="irrigation" className="text-xs md:text-sm">
            Irrigation
          </TabsTrigger>
          <TabsTrigger value="aiinsights" className="text-xs md:text-sm">
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="charts" className="text-xs md:text-sm">
            <BarChart3 className="h-3 w-3 mr-1" />
            Charts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4 animate-fade-in">
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg md:text-xl">
                <Leaf className="mr-2 h-5 w-5 text-primary" />
                Top Recommended Crops (Rule-Based Analysis)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3 stagger-animation">
                    {results.recommendedCrops?.slice(0, 5).map((crop: any, index: number) => (
                      <li
                        key={crop.name}
                        className="flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-slide-in-left"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <span className="font-medium">{crop.name}</span>
                              {crop.scientificName && (
                                <p className="text-xs text-muted-foreground italic">{crop.scientificName}</p>
                              )}
                            </div>
                          </div>
                          <Badge variant={crop.suitability > 0.8 ? "default" : crop.suitability > 0.6 ? "secondary" : "outline"} className="ml-auto">
                            {Math.round(crop.suitability * 100)}% suitable
                          </Badge>
                        </div>

                        {/* Crop Details */}
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          {crop.category && (
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Category:</span>
                              <span className="font-medium">{crop.category}</span>
                            </div>
                          )}
                          {crop.waterNeeds && (
                            <div className="flex items-center gap-1">
                              <Droplet className="h-3 w-3 text-blue-500" />
                              <span className="font-medium">{crop.waterNeeds} Water</span>
                            </div>
                          )}
                          {crop.growthDuration && (
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Duration:</span>
                              <span className="font-medium">{crop.growthDuration}</span>
                            </div>
                          )}
                          {crop.season && (
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Season:</span>
                              <span className="font-medium">{Array.isArray(crop.season) ? crop.season.join(', ') : crop.season}</span>
                            </div>
                          )}
                        </div>

                        {/* Requirements */}
                        {crop.requirements && (
                          <div className="mt-3 pt-3 border-t border-dashed">
                            <p className="text-xs text-muted-foreground mb-2">Optimal NPK Requirements:</p>
                            <div className="flex gap-2">
                              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                                N: {crop.requirements.nitrogen?.optimal || 'N/A'}
                              </span>
                              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                                P: {crop.requirements.phosphorus?.optimal || 'N/A'}
                              </span>
                              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded text-xs">
                                K: {crop.requirements.potassium?.optimal || 'N/A'}
                              </span>
                              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">
                                pH: {crop.requirements.ph?.optimal || 'N/A'}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="mt-2 text-sm text-muted-foreground">{crop.reasoning}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-64 md:h-auto">
                  <CropRecommendationChart data={results.recommendedCrops} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="border-primary/20 bg-primary/5">
            <InfoIcon className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-medium">Scientific Recommendation Summary</AlertTitle>
            <AlertDescription>
              Based on comprehensive analysis of your soil parameters,{" "}
              <span className="font-medium">{results.recommendedCrops[0]?.name}</span> is the most suitable crop for
              your land with a {Math.round(results.recommendedCrops[0]?.suitability * 100)}% suitability score.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="nutrients" className="space-y-4 animate-fade-in">
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg md:text-xl">Nutrient Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-4 stagger-animation">
                    {Object.entries(results.nutrientAnalysis).map(([nutrient, data]) => (
                      <li
                        key={nutrient}
                        className="space-y-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors animate-slide-in-left"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full ${(data as any).status === "Deficient"
                                ? "bg-red-500"
                                : (data as any).status === "Low"
                                  ? "bg-amber-500"
                                  : (data as any).status === "Optimal"
                                    ? "bg-primary"
                                    : (data as any).status === "Excessive"
                                      ? "bg-purple-500"
                                      : "bg-blue-500"
                                }`}
                            ></div>
                            <span className="font-medium capitalize">{nutrient}</span>
                          </div>
                          <Badge
                            variant={
                              (data as any).status === "Deficient"
                                ? "destructive"
                                : (data as any).status === "Low"
                                  ? "outline"
                                  : (data as any).status === "Optimal"
                                    ? "default"
                                    : "secondary"
                            }
                          >
                            {(data as any).status}
                          </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-2">
                          <span>
                            Average value:{" "}
                            <span className="font-medium">
                              {typeof (data as any).value === 'number' ? (data as any).value.toFixed(2) : (data as any).value} {nutrient === "ph" ? "" : "kg/ha"}
                            </span>
                          </span>
                          {(data as any).min !== undefined && (data as any).max !== undefined && (data as any).min !== Infinity && (
                            <span>
                              Range in data: <span className="font-medium">{(data as any).min.toFixed(1)} - {(data as any).max.toFixed(1)}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Optimal range: </span>
                          <span className="font-medium">{(data as any).sufficiencyRange}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted/30 rounded">{(data as any).recommendation}</p>
                        <div className="mt-2 pt-2 border-t border-dashed">
                          <p className="text-xs italic">{(data as any).scientificDetail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-64 md:h-auto">
                  <NutrientAnalysisChart data={results.soilParameters} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="soilhealth" className="animate-fade-in">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg md:text-xl">
                <Sprout className="mr-2 h-5 w-5 text-primary" />
                AI Soil Health Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-block relative">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-primary stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${results.soilHealthAssessment.overallScore * 2.51} 251`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{results.soilHealthAssessment.overallScore}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mt-2">Soil Health Score</h3>
                  <p className="text-sm text-muted-foreground">
                    {results.soilHealthAssessment.overallScore >= 90
                      ? "Excellent"
                      : results.soilHealthAssessment.overallScore >= 70
                        ? "Good"
                        : results.soilHealthAssessment.overallScore >= 50
                          ? "Moderate"
                          : "Poor"}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">AI Expert Analysis</h3>
                  <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/20 p-4 rounded-lg">
                    {formatText(results.soilHealthAssessment.detailedAnalysis)}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <h4 className="font-medium mb-2 flex items-center">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Limitations
                      </h4>
                      <ul className="space-y-2">
                        {results.soilHealthAssessment.limitations.map((limitation, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4 bg-muted/20">
                      <h4 className="font-medium mb-2 flex items-center">
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {results.soilHealthAssessment.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="irrigation" className="animate-fade-in">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg md:text-xl">
                <CloudRain className="mr-2 h-5 w-5 text-primary" />
                AI Irrigation Management Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className={results.irrigationRecommendation.required ? "border-amber-500" : "border-primary"}>
                  <div
                    className={`rounded-full p-1 ${results.irrigationRecommendation.required ? "bg-amber-500" : "bg-primary"
                      }`}
                  >
                    <CloudRain className="h-4 w-4 text-white" />
                  </div>
                  <AlertTitle className={results.irrigationRecommendation.required ? "text-amber-500" : "text-primary"}>
                    {results.irrigationRecommendation.required
                      ? "Supplementary Irrigation Required"
                      : "Natural Rainfall Assessment"}
                  </AlertTitle>
                  <AlertDescription>{results.irrigationRecommendation.supplementaryNeeds}</AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">AI Expert Irrigation Analysis</h3>
                  <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/20 p-4 rounded-lg">
                    {formatText(results.irrigationRecommendation.recommendation)}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Droplet className="h-4 w-4 mr-2 text-primary" />
                      Water Requirements
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Annual Rainfall</span>
                        <span className="text-sm font-medium">{results.soilParameters.rainfall} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Humidity</span>
                        <span className="text-sm font-medium">{results.soilParameters.humidity}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <ThermometerIcon className="h-4 w-4 mr-2 text-primary" />
                      Climate Factors
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Temperature</span>
                        <span className="text-sm font-medium">{results.soilParameters.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Irrigation Status</span>
                        <Badge variant={results.irrigationRecommendation.required ? "destructive" : "default"}>
                          {results.irrigationRecommendation.required ? "Required" : "Optional"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-primary" />
                      Crop Compatibility
                    </h4>
                    <div className="space-y-2">
                      <div className="flex flex-col">
                        <span className="text-sm">Best Match</span>
                        <span className="text-sm font-medium">{results.recommendedCrops[0]?.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">Suitability</span>
                        <span className="text-sm font-medium">
                          {Math.round(results.recommendedCrops[0]?.suitability * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aiinsights" className="animate-fade-in">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg md:text-xl">
                <Brain className="mr-2 h-5 w-5 text-primary" />
                AI Comprehensive Farming Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/20 p-4 rounded-lg">
                {formatText(results.aiInsights)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="animate-fade-in">
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg md:text-xl">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Data Visualization & Charts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataCharts data={rawData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
