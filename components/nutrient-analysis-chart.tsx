"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"

interface SoilParameters {
  nitrogen: number
  phosphorus: number
  potassium: number
  ph: number
  temperature: number
  humidity: number
  rainfall: number
}

interface NutrientAnalysisChartProps {
  data: SoilParameters
}

export default function NutrientAnalysisChart({ data }: NutrientAnalysisChartProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Transform data for the radar chart
  // Normalize values to a 0-100 scale for better visualization
  const chartData = [
    {
      subject: "Nitrogen",
      A: normalizeValue(data.nitrogen, 0, 140, 0, 100),
      fullMark: 100,
    },
    {
      subject: "Phosphorus",
      A: normalizeValue(data.phosphorus, 5, 145, 0, 100),
      fullMark: 100,
    },
    {
      subject: "Potassium",
      A: normalizeValue(data.potassium, 5, 205, 0, 100),
      fullMark: 100,
    },
    {
      subject: "pH",
      A: normalizeValue(data.ph, 0, 14, 0, 100),
      fullMark: 100,
    },
    {
      subject: "Rainfall",
      A: normalizeValue(data.rainfall, 20, 300, 0, 100),
      fullMark: 100,
    },
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-64 w-full bg-muted/20 rounded-md animate-pulse"></div>
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid className="text-muted-foreground" />
        <PolarAngleAxis dataKey="subject" className="text-muted-foreground" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} className="text-muted-foreground" tick={{ fontSize: 10 }} />
        <Radar
          name="Soil Nutrients"
          dataKey="A"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

// Helper function to normalize values to a specific range
function normalizeValue(value: number, min: number, max: number, newMin: number, newMax: number): number {
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin
}
