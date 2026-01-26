"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "@/components/ui/chart"
import { useEffect, useState } from "react"

interface CropData {
  name: string
  suitability: number
}

interface CropRecommendationChartProps {
  data: CropData[]
}

export default function CropRecommendationChart({ data }: CropRecommendationChartProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Transform data for the chart
  const chartData = data.map((crop) => ({
    name: crop.name,
    suitability: Math.round(crop.suitability * 100),
  }))

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-64 w-full bg-muted/20 rounded-md animate-pulse"></div>
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="text-muted-foreground"
          tick={{ fontSize: 10 }}
          height={60}
          angle={-45}
          textAnchor="end"
        />
        <YAxis
          tickFormatter={(value) => `${value}%`}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickCount={5}
          className="text-muted-foreground"
        />
        <Tooltip
          formatter={(value) => [`${value}%`, "Suitability"]}
          labelStyle={{ fontWeight: "bold" }}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          itemStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Bar dataKey="suitability" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}
