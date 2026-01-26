"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileType, AlertCircle, Loader2, CheckCircle2, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import Papa from "papaparse"
import { CROP_DATABASE, getTopCropRecommendations, analyzeNutrientLevels, calculateCropSuitability } from "@/lib/crop-database"

// Define the stages of analysis for real-time feedback
const ANALYSIS_STAGES = [
  { id: "parsing", label: "Parsing CSV data", percentage: 10 },
  { id: "validating", label: "Validating soil parameters", percentage: 20 },
  { id: "analyzing", label: "Analyzing nutrient levels", percentage: 30 },
  { id: "calculating", label: "Calculating crop suitability", percentage: 40 },
  { id: "ai_soil_health", label: "AI analyzing soil health", percentage: 55 },
  { id: "ai_irrigation", label: "AI analyzing irrigation needs", percentage: 70 },
  { id: "ai_insights", label: "AI generating comprehensive insights", percentage: 85 },
  { id: "generating", label: "Generating final report", percentage: 95 },
  { id: "complete", label: "Analysis complete", percentage: 100 },
]

export default function UploadCSV() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [parsedData, setParsedData] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const [processingComplete, setProcessingComplete] = useState(false)
  const [aiWarning, setAiWarning] = useState(false)

  // Add this function inside the UploadCSV component, after the state declarations
  const dispatchAnalysisUpdate = (stage: string | null, progress: number, error: string | null = null) => {
    const event = new CustomEvent("analysisUpdate", {
      detail: { stage, progress, error },
    })
    window.dispatchEvent(event)
  }

  // Function to update progress based on the current stage
  const updateProgress = (stageId: string) => {
    setCurrentStage(stageId)
    const stage = ANALYSIS_STAGES.find((s) => s.id === stageId)
    if (stage) {
      setUploadProgress(stage.percentage)
      dispatchAnalysisUpdate(stageId, stage.percentage)
    }
  }

  // Function to parse CSV data client-side for immediate validation
  const parseCSV = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(results.errors)
          } else {
            resolve(results.data)
          }
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  }

  // Smart column mapping - maps various column name formats to standard names
  const COLUMN_MAPPINGS: { [key: string]: string[] } = {
    N: ["n", "nitrogen", "n_content", "nitrogen_content"],
    P: ["p", "phosphorus", "phosphorous", "p_content", "phosphorus_content"],
    K: ["k", "potassium", "k_content", "potassium_content"],
    temperature: ["temp", "temperature", "temp_c", "temperature_c", "avg_temp"],
    humidity: ["humidity", "humid", "moisture", "relative_humidity", "rh"],
    ph: ["ph", "soil_ph", "ph_level", "acidity"],
    rainfall: ["rainfall", "rain", "precipitation", "annual_rainfall", "r"],
    crop: ["crop", "crop_name", "plant", "crop_type"],
    yield: ["yield", "yield (tons/ha)", "production", "output", "harvest"],
  }

  // Function to find the matching column in the data
  const findColumn = (row: any, standardName: string): string | null => {
    const rowKeys = Object.keys(row)
    const possibleNames = COLUMN_MAPPINGS[standardName] || [standardName]

    for (const key of rowKeys) {
      const lowerKey = key.toLowerCase().trim()
      if (possibleNames.some(name => name.toLowerCase() === lowerKey)) {
        return key
      }
    }
    return null
  }

  // Function to normalize data using smart column detection
  const normalizeData = (data: any[]): { normalized: any[]; detectedColumns: { [key: string]: string }; missingColumns: string[] } => {
    if (data.length === 0) return { normalized: [], detectedColumns: {}, missingColumns: [] }

    const firstRow = data[0]
    const detectedColumns: { [key: string]: string } = {}
    const missingColumns: string[] = []

    // Try to find each standard column
    const standardColumns = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall", "crop", "yield"]

    for (const stdCol of standardColumns) {
      const foundCol = findColumn(firstRow, stdCol)
      if (foundCol) {
        detectedColumns[stdCol] = foundCol
      } else {
        missingColumns.push(stdCol)
      }
    }

    // Normalize the data
    const normalized = data.map(row => {
      const normalizedRow: any = { ...row }
      for (const [stdCol, originalCol] of Object.entries(detectedColumns)) {
        if (stdCol !== originalCol) {
          normalizedRow[stdCol] = row[originalCol]
        }
      }
      return normalizedRow
    })

    return { normalized, detectedColumns, missingColumns }
  }

  // State for detected columns
  const [detectedColumns, setDetectedColumns] = useState<{ [key: string]: string }>({})
  const [missingColumns, setMissingColumns] = useState<string[]>([])

  // Function to validate the parsed data - now more flexible
  const validateData = (data: any[]): { valid: boolean; message?: string } => {
    if (data.length === 0) {
      return { valid: false, message: "CSV file is empty" }
    }

    const firstRow = data[0]
    const hasAnyData = Object.keys(firstRow).length > 0

    if (!hasAnyData) {
      return { valid: false, message: "CSV file has no columns" }
    }

    // Check if we have at least some useful data (N, P, K or crop data)
    const { detectedColumns, missingColumns } = normalizeData(data)
    setDetectedColumns(detectedColumns)
    setMissingColumns(missingColumns)

    const hasNPK = detectedColumns.N && detectedColumns.P && detectedColumns.K
    const hasCropData = detectedColumns.crop
    const hasAnyNutrient = detectedColumns.N || detectedColumns.P || detectedColumns.K

    if (!hasNPK && !hasCropData && !hasAnyNutrient) {
      return {
        valid: false,
        message: "Could not detect required columns. Please ensure your CSV has at least N, P, K columns or crop data."
      }
    }

    return { valid: true }
  }

  // Handle file change with immediate parsing and validation
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)
    setParsedData(null)
    setProcessingComplete(false)
    setAiWarning(false)

    if (!selectedFile) {
      return
    }

    if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
      setError("Please upload a CSV file")
      return
    }

    setFile(selectedFile)

    try {
      // Parse CSV immediately for validation
      updateProgress("parsing")
      const parsedData = await parseCSV(selectedFile)

      // Validate the data structure
      updateProgress("validating")
      const validation = validateData(parsedData)

      if (!validation.valid) {
        const errorMessage = validation.message || "Invalid data format"
        setError(errorMessage)
        dispatchAnalysisUpdate(null, 0, errorMessage)
        setUploadProgress(0)
        setCurrentStage(null)
        return
      }

      // Store parsed data for later use
      setParsedData(parsedData)
    } catch (err) {
      const errorMessage = "Error parsing CSV file. Please check the format."
      setError(errorMessage)
      dispatchAnalysisUpdate(null, 0, errorMessage)
      setUploadProgress(0)
      setCurrentStage(null)
    }
  }

  // Function to call OpenRouter API for specific analysis
  const callOpenRouterAPI = async (prompt: string, soilData: any) => {
    try {
      // Get API key from localStorage
      const apiKey = localStorage.getItem("openrouter_api_key")

      if (!apiKey) {
        throw new Error("OpenRouter API key not configured. Please set up your API key in Profile settings.")
      }

      const response = await fetch("/api/openrouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          soilData,
          apiKey, // Send the API key from client
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || "API request failed")
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error("OpenRouter API error:", error)
      throw error
    }
  }

  // Function to analyze the CSV data using OpenRouter API
  const analyzeData = async (data: any[]) => {
    // Normalize the data using smart column detection
    const { normalized } = normalizeData(data)

    // Get the first row of normalized data
    const row = normalized[0]

    // Safely get values with fallbacks
    const getValue = (key: string, defaultVal: number = 0) => {
      const val = row[key]
      return typeof val === 'number' ? val : (parseFloat(val) || defaultVal)
    }

    // Extract soil parameters (with fallbacks for missing data)
    const soilParameters = {
      nitrogen: getValue('N'),
      phosphorus: getValue('P'),
      potassium: getValue('K'),
      temperature: getValue('temperature', 25),
      humidity: getValue('humidity', 60),
      ph: getValue('ph', 7),
      rainfall: getValue('rainfall', 100),
      crop: row.crop || null,
      yield: getValue('yield'),
    }

    const nVal = soilParameters.nitrogen
    const pVal = soilParameters.phosphorus
    const kVal = soilParameters.potassium
    const phVal = soilParameters.ph

    // Basic nutrient analysis (local calculation) - handles 0 values
    const nutrientAnalysis: any = {}

    if (nVal !== undefined) {
      nutrientAnalysis.nitrogen = {
        status: nVal < 40 ? "Deficient" : nVal < 80 ? "Low" : nVal > 140 ? "Excessive" : "Optimal",
        value: nVal,
        sufficiencyRange: "40-120 mg/kg",
        recommendation:
          nVal < 40
            ? "Severe deficiency. Apply nitrogen-rich fertilizers immediately."
            : nVal < 80
              ? "Moderate deficiency. Apply nitrogen fertilizers before planting."
              : nVal > 140
                ? "Excessive levels. Reduce nitrogen applications."
                : "Current levels are optimal. Maintain with balanced fertilization practices.",
        scientificDetail:
          "Nitrogen is essential for chlorophyll production and protein synthesis. It promotes vegetative growth and is a key component of amino acids, nucleic acids, and enzymes.",
      }
    }

    if (pVal !== undefined) {
      nutrientAnalysis.phosphorus = {
        status: pVal < 20 ? "Deficient" : pVal < 40 ? "Low" : pVal > 100 ? "Excessive" : "Optimal",
        value: pVal,
        sufficiencyRange: "20-80 mg/kg",
        recommendation:
          pVal < 20
            ? "Severe deficiency. Apply phosphorus fertilizers before planting."
            : pVal < 40
              ? "Moderate deficiency. Apply phosphorus-rich amendments."
              : pVal > 100
                ? "Excessive levels. Avoid phosphorus applications."
                : "Current levels are optimal. Maintain with balanced fertilization practices.",
        scientificDetail:
          "Phosphorus plays a vital role in energy transfer and storage (ATP), root development, flowering, and seed formation. It's essential for photosynthesis and respiration.",
      }
    }

    if (kVal !== undefined) {
      nutrientAnalysis.potassium = {
        status: kVal < 25 ? "Deficient" : kVal < 50 ? "Low" : kVal > 150 ? "Excessive" : "Optimal",
        value: kVal,
        sufficiencyRange: "25-100 mg/kg",
        recommendation:
          kVal < 25
            ? "Severe deficiency. Apply potassium fertilizers immediately."
            : kVal < 50
              ? "Moderate deficiency. Apply potassium-rich fertilizers."
              : kVal > 150
                ? "Excessive levels. Avoid potassium applications."
                : "Current levels are optimal. Maintain with balanced fertilization practices.",
        scientificDetail:
          "Potassium regulates water uptake, activates enzymes, and helps in photosynthesis and protein synthesis. It improves disease resistance and overall plant vigor.",
      }
    }

    if (phVal !== undefined) {
      nutrientAnalysis.ph = {
        status:
          phVal < 5.5
            ? "Strongly Acidic"
            : phVal < 6.0
              ? "Moderately Acidic"
              : phVal > 8.0
                ? "Strongly Alkaline"
                : phVal > 7.5
                  ? "Moderately Alkaline"
                  : "Neutral (Optimal)",
        value: phVal,
        sufficiencyRange: "6.0-7.5 (optimal for most crops)",
        recommendation:
          phVal < 5.5
            ? "Strongly acidic. Apply lime to raise pH."
            : phVal < 6.0
              ? "Moderately acidic. Consider applying lime."
              : phVal > 8.0
                ? "Strongly alkaline. Apply sulfur to lower pH."
                : phVal > 7.5
                  ? "Moderately alkaline. Consider applying sulfur."
                  : "Optimal pH range for most crops. No adjustment needed.",
        scientificDetail:
          "Soil pH affects nutrient availability, microbial activity, and root growth. Most nutrients are optimally available in the 6.0-7.5 pH range.",
      }
    }

    // Use the comprehensive crop database for real rule-based recommendations
    // Analyze ALL rows from CSV to get average conditions
    const avgConditions = {
      N: 0, P: 0, K: 0, ph: 0, temperature: 0, humidity: 0, rainfall: 0
    }
    let rowCount = 0

    normalized.forEach((r: any) => {
      const getVal = (key: string) => {
        const val = r[key]
        return typeof val === 'number' ? val : (parseFloat(val) || 0)
      }
      avgConditions.N += getVal('N')
      avgConditions.P += getVal('P')
      avgConditions.K += getVal('K')
      avgConditions.ph += getVal('ph')
      avgConditions.temperature += getVal('temperature')
      avgConditions.humidity += getVal('humidity')
      avgConditions.rainfall += getVal('rainfall')
      rowCount++
    })

    if (rowCount > 0) {
      avgConditions.N /= rowCount
      avgConditions.P /= rowCount
      avgConditions.K /= rowCount
      avgConditions.ph /= rowCount
      avgConditions.temperature /= rowCount
      avgConditions.humidity /= rowCount
      avgConditions.rainfall /= rowCount
    }

    // Get top crop recommendations using the real database
    const topCrops = getTopCropRecommendations(avgConditions, 10)

    // Format for the UI
    const cropSuitability = topCrops.map(result => ({
      name: result.crop.name,
      suitability: result.overallScore,
      scientificName: result.crop.scientificName,
      category: result.crop.category,
      season: result.crop.season,
      waterNeeds: result.crop.waterNeeds,
      growthDuration: result.crop.growthDuration,
      soilTypes: result.crop.soilType,
      reasoning: `${result.crop.name} shows ${Math.round(result.overallScore * 100)}% suitability. ${result.crop.description}`,
      requirements: result.crop.requirements,
      scores: result.scores,
      detailedRecommendations: Object.entries(result.scores).map(([key, val]) => ({
        parameter: key,
        status: val.status,
        recommendation: val.recommendation,
        score: val.score
      }))
    }))

    // Analyze nutrient levels from ALL data
    const realNutrientAnalysis = analyzeNutrientLevels(normalized)

    let aiSoilHealth = ""
    let aiIrrigation = ""
    let aiInsights = ""

    try {
      // Segment 1: AI Soil Health Analysis (shortened prompt)
      updateProgress("ai_soil_health")
      const soilHealthPrompt = `Briefly analyze soil health: fertility score (0-100), nutrient deficiencies, pH impact, and fertilizer recommendations.`

      aiSoilHealth = await callOpenRouterAPI(soilHealthPrompt, soilParameters)

      // Segment 2: AI Irrigation Analysis (shortened prompt)
      updateProgress("ai_irrigation")
      const irrigationPrompt = `Briefly provide irrigation recommendations: water needs, scheduling, and best irrigation method.`

      aiIrrigation = await callOpenRouterAPI(irrigationPrompt, soilParameters)

      // Segment 3: AI Comprehensive Insights (shortened prompt)
      updateProgress("ai_insights")
      const insightsPrompt = `Briefly provide: best crops, planting calendar, pest management tips, and sustainable farming practices.`

      aiInsights = await callOpenRouterAPI(insightsPrompt, soilParameters)
    } catch (error) {
      console.error("AI analysis failed:", error)

      // Check if it's an API key issue
      if (error instanceof Error && error.message.includes("API key not configured")) {
        setError("Please configure your OpenRouter API key in Profile settings to enable AI analysis.")
        setAiWarning(true)
      } else {
        setAiWarning(true)
      }

      // Fallback content
      aiSoilHealth =
        "AI analysis temporarily unavailable. Please configure your OpenRouter API key in Profile settings."
      aiIrrigation =
        "AI analysis temporarily unavailable. Please configure your OpenRouter API key in Profile settings."
      aiInsights = "AI analysis temporarily unavailable. Please configure your OpenRouter API key in Profile settings."
    }

    // Calculate soil health score from real data
    const soilHealthScore = calculateSoilHealthScore({
      nitrogen: { status: realNutrientAnalysis.nitrogen.status },
      phosphorus: { status: realNutrientAnalysis.phosphorus.status },
      potassium: { status: realNutrientAnalysis.potassium.status },
      ph: { status: realNutrientAnalysis.ph.status },
    })

    return {
      soilParameters: {
        ...soilParameters,
        // Include averages from all data
        avgNitrogen: avgConditions.N,
        avgPhosphorus: avgConditions.P,
        avgPotassium: avgConditions.K,
        avgPh: avgConditions.ph,
        avgTemperature: avgConditions.temperature,
        avgHumidity: avgConditions.humidity,
        avgRainfall: avgConditions.rainfall,
      },
      recommendedCrops: cropSuitability,  // Now includes detailed info from database
      nutrientAnalysis: {
        nitrogen: {
          status: realNutrientAnalysis.nitrogen.status,
          value: realNutrientAnalysis.nitrogen.avg,
          min: realNutrientAnalysis.nitrogen.min,
          max: realNutrientAnalysis.nitrogen.max,
          sufficiencyRange: "40-120 kg/ha",
          recommendation: realNutrientAnalysis.nitrogen.recommendation,
          scientificDetail: "Nitrogen is essential for chlorophyll production and protein synthesis. It promotes vegetative growth and is a key component of amino acids, nucleic acids, and enzymes.",
        },
        phosphorus: {
          status: realNutrientAnalysis.phosphorus.status,
          value: realNutrientAnalysis.phosphorus.avg,
          min: realNutrientAnalysis.phosphorus.min,
          max: realNutrientAnalysis.phosphorus.max,
          sufficiencyRange: "20-80 kg/ha",
          recommendation: realNutrientAnalysis.phosphorus.recommendation,
          scientificDetail: "Phosphorus plays a vital role in energy transfer and storage (ATP), root development, flowering, and seed formation.",
        },
        potassium: {
          status: realNutrientAnalysis.potassium.status,
          value: realNutrientAnalysis.potassium.avg,
          min: realNutrientAnalysis.potassium.min,
          max: realNutrientAnalysis.potassium.max,
          sufficiencyRange: "25-100 kg/ha",
          recommendation: realNutrientAnalysis.potassium.recommendation,
          scientificDetail: "Potassium regulates water uptake, activates enzymes, and helps in photosynthesis and protein synthesis.",
        },
        ph: {
          status: realNutrientAnalysis.ph.status,
          value: realNutrientAnalysis.ph.avg,
          min: realNutrientAnalysis.ph.min,
          max: realNutrientAnalysis.ph.max,
          sufficiencyRange: "6.0-7.5 (optimal for most crops)",
          recommendation: realNutrientAnalysis.ph.recommendation,
          scientificDetail: "Soil pH affects nutrient availability, microbial activity, and root growth. Most nutrients are optimally available in the 6.0-7.5 pH range.",
        },
      },
      soilHealthAssessment: {
        overallScore: soilHealthScore,
        detailedAnalysis: aiSoilHealth,
        limitations: generateLimitations({
          nitrogen: { status: realNutrientAnalysis.nitrogen.status },
          phosphorus: { status: realNutrientAnalysis.phosphorus.status },
          potassium: { status: realNutrientAnalysis.potassium.status },
        }),
        strengths: generateStrengths({
          nitrogen: { status: realNutrientAnalysis.nitrogen.status },
          phosphorus: { status: realNutrientAnalysis.phosphorus.status },
          potassium: { status: realNutrientAnalysis.potassium.status },
        }),
      },
      irrigationRecommendation: {
        required: avgConditions.rainfall < 150 || avgConditions.rainfall === 0,
        recommendation: aiIrrigation,
        supplementaryNeeds:
          avgConditions.rainfall < 150
            ? "Regular irrigation needed throughout growing season"
            : "Standby irrigation recommended for dry spells",
      },
      aiInsights: aiInsights,
      dataSummary: {
        totalRecords: normalized.length,
        averageConditions: avgConditions,
      },
    }
  }

  // Helper functions
  const calculateScore = (value: number, min: number, max: number) => {
    if (value < min) {
      return Math.max(0, 1 - (min - value) / min)
    } else if (value > max) {
      return Math.max(0, 1 - (value - max) / max)
    } else {
      const middle = (min + max) / 2
      const rangeHalf = (max - min) / 2
      return 1 - (Math.abs(value - middle) / rangeHalf) * 0.5
    }
  }

  const calculateSoilHealthScore = (nutrientAnalysis: any) => {
    let score = 0
    Object.values(nutrientAnalysis).forEach((nutrient: any) => {
      if (nutrient.status === "Optimal") score += 25
      else if (
        nutrient.status === "Low" ||
        nutrient.status === "Moderately Acidic" ||
        nutrient.status === "Moderately Alkaline"
      )
        score += 15
      else if (
        nutrient.status === "Deficient" ||
        nutrient.status === "Excessive" ||
        nutrient.status === "Strongly Acidic" ||
        nutrient.status === "Strongly Alkaline"
      )
        score += 5
    })
    return Math.min(100, Math.max(0, score))
  }

  const generateLimitations = (nutrientAnalysis: any) => {
    const limitations = []
    if (nutrientAnalysis.nitrogen.status === "Deficient" || nutrientAnalysis.nitrogen.status === "Low") {
      limitations.push("Suboptimal nitrogen levels limiting vegetative growth")
    }
    if (nutrientAnalysis.phosphorus.status === "Deficient" || nutrientAnalysis.phosphorus.status === "Low") {
      limitations.push("Insufficient phosphorus restricting energy transfer and root development")
    }
    if (nutrientAnalysis.potassium.status === "Deficient" || nutrientAnalysis.potassium.status === "Low") {
      limitations.push("Suboptimal potassium levels may reduce crop quality and disease resistance")
    }
    return limitations.length > 0 ? limitations : ["No significant limitations identified"]
  }

  const generateStrengths = (nutrientAnalysis: any) => {
    const strengths = []
    if (nutrientAnalysis.nitrogen.status === "Optimal") {
      strengths.push("Optimal nitrogen levels supporting healthy plant growth")
    }
    if (nutrientAnalysis.phosphorus.status === "Optimal") {
      strengths.push("Optimal phosphorus levels supporting energy transfer and reproductive growth")
    }
    if (nutrientAnalysis.potassium.status === "Optimal") {
      strengths.push("Optimal potassium levels enhancing plant vigor and stress resistance")
    }
    return strengths.length > 0 ? strengths : ["Basic soil conditions present"]
  }

  const handleUpload = async () => {
    if (!file || !parsedData) {
      setError("Please select a valid file to upload")
      return
    }

    setUploading(true)
    setError(null)
    setProcessingComplete(false)
    setAiWarning(false)

    try {
      // Start the analysis process
      updateProgress("analyzing")

      // Analyze the data with AI integration
      const analysisResults = await analyzeData(parsedData)

      // Generate final report
      updateProgress("generating")

      // Store the results in localStorage
      localStorage.setItem("analysisResults", JSON.stringify(analysisResults))

      // Also store raw CSV data for charts
      localStorage.setItem("rawCsvData", JSON.stringify(parsedData))

      // Complete the process
      updateProgress("complete")
      setProcessingComplete(true)
      dispatchAnalysisUpdate("complete", 100)

      toast({
        title: "Analysis Complete",
        description: "Your soil data has been successfully analyzed with AI insights.",
        duration: 5000,
      })

      // Switch to the results tab
      setTimeout(() => {
        const tabsElement = document.querySelector('[data-orientation="horizontal"]')
        if (tabsElement) {
          const resultTab = tabsElement.querySelector('[value="results"]') as HTMLElement
          if (resultTab) resultTab.click()
        }
      }, 1000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze data. Please try again."
      setError(errorMessage)
      dispatchAnalysisUpdate(null, 0, errorMessage)
      setUploadProgress(0)
      setCurrentStage(null)
    } finally {
      setUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      if (droppedFile.type !== "text/csv" && !droppedFile.name.endsWith(".csv")) {
        setError("Please upload a CSV file")
        return
      }
      setFile(droppedFile)
      setError(null)

      try {
        updateProgress("parsing")
        const parsedData = await parseCSV(droppedFile)
        updateProgress("validating")
        const validation = validateData(parsedData)

        if (!validation.valid) {
          const errorMessage = validation.message || "Invalid data format"
          setError(errorMessage)
          dispatchAnalysisUpdate(null, 0, errorMessage)
          setUploadProgress(0)
          setCurrentStage(null)
          return
        }

        setParsedData(parsedData)
      } catch (err) {
        const errorMessage = "Error parsing CSV file. Please check the format."
        setError(errorMessage)
        dispatchAnalysisUpdate(null, 0, errorMessage)
        setUploadProgress(0)
        setCurrentStage(null)
      }
    }
  }

  // Reset progress when file is removed
  useEffect(() => {
    if (!file) {
      setUploadProgress(0)
      setCurrentStage(null)
      setParsedData(null)
      setProcessingComplete(false)
      setAiWarning(false)
    }
  }, [file])

  return (
    <div className="space-y-6">
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed ${file ? "border-primary/40" : "border-primary/20"
          } rounded-xl p-6 md:p-12 cursor-pointer hover:bg-primary/5 transition-colors`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <Upload className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          </div>
          <h3 className="text-lg md:text-xl font-medium mb-2">Upload CSV File</h3>
          <p className="text-muted-foreground mb-1 text-sm md:text-base">Drag and drop or click to browse</p>
          <p className="text-xs text-muted-foreground max-w-[400px]">
            Supports various CSV formats. Auto-detects columns like N, P, K, Ph, temperature, humidity, rainfall, crop, yield
          </p>
        </div>
      </div>

      {file && (
        <Card className={`border-primary/20 ${parsedData ? "bg-primary/5" : ""}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <FileType className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              {!uploading && (
                <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                  Remove
                </Button>
              )}
            </div>

            {parsedData && (
              <div className="mt-2 pt-2 border-t border-dashed border-primary/20 space-y-2">
                <p className="text-xs text-primary flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  CSV validated successfully. {parsedData.length} row(s) found.
                </p>

                {/* Show detected columns */}
                {Object.keys(detectedColumns).length > 0 && (
                  <div className="text-xs">
                    <p className="text-muted-foreground mb-1">Detected columns:</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(detectedColumns).map(([stdCol, originalCol]) => (
                        <span key={stdCol} className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                          {stdCol}{stdCol !== originalCol ? ` (${originalCol})` : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show missing columns (if any) */}
                {missingColumns.length > 0 && (
                  <div className="text-xs">
                    <p className="text-muted-foreground mb-1">Missing (using defaults):</p>
                    <div className="flex flex-wrap gap-1">
                      {missingColumns.map((col) => (
                        <span key={col} className="inline-flex items-center px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive" className="animate-shake">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {aiWarning && (
        <Alert variant="warning" className="bg-amber-50 border-amber-200">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">AI Analysis Partially Available</AlertTitle>
          <AlertDescription className="text-amber-700">
            Some AI-powered insights may be limited. Basic analysis has been completed successfully.
          </AlertDescription>
        </Alert>
      )}

      {(uploading || currentStage) && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2 w-full" />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {currentStage && ANALYSIS_STAGES.find((s) => s.id === currentStage)?.label}
            </p>
            <p className="text-xs font-medium">{uploadProgress}%</p>
          </div>
        </div>
      )}

      <Button
        className={`w-full font-medium ${processingComplete ? "bg-green-600 hover:bg-green-700" : ""}`}
        disabled={!parsedData || uploading}
        onClick={handleUpload}
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing with AI...
          </>
        ) : processingComplete ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Analysis Complete - View Results
          </>
        ) : (
          "Analyze Soil Data with AI"
        )}
      </Button>

      <div className="text-xs text-muted-foreground text-center">
        <p>
          Need a sample file?{" "}
          <a
            href="#"
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault()
              const csvContent = "N,P,K,temperature,humidity,ph,rainfall\n90,42,43,20.87,82.0,6.5,202.93"
              const blob = new Blob([csvContent], { type: "text/csv" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "sample_soil_data.csv"
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            }}
          >
            Download template
          </a>
        </p>
      </div>
    </div>
  )
}
