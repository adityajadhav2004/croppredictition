"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts"
import { BarChart3, TrendingUp, PieChartIcon, Activity } from "lucide-react"

interface DataChartsProps {
    data: any[]
}

// Color palette for charts
const COLORS = [
    "#22c55e", // green
    "#3b82f6", // blue
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#84cc16", // lime
    "#f97316", // orange
    "#6366f1", // indigo
]

export default function DataCharts({ data }: DataChartsProps) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No data available for visualization</p>
                <p className="text-sm mt-2">Upload and analyze a CSV file to see charts</p>
            </div>
        )
    }

    // Process data for different chart types
    const processYieldByCrop = () => {
        const cropYields: { [key: string]: { total: number; count: number } } = {}

        data.forEach((row) => {
            const crop = row.crop || row.Crop || "Unknown"
            const yieldVal = parseFloat(row.yield || row["Yield (tons/ha)"] || row["yield (tons/ha)"] || 0)

            if (!cropYields[crop]) {
                cropYields[crop] = { total: 0, count: 0 }
            }
            cropYields[crop].total += yieldVal
            cropYields[crop].count += 1
        })

        return Object.entries(cropYields).map(([name, values]) => ({
            name,
            avgYield: Number((values.total / values.count).toFixed(2)),
            totalYield: Number(values.total.toFixed(2)),
            count: values.count,
        })).sort((a, b) => b.avgYield - a.avgYield)
    }

    const processYieldVsTemperature = () => {
        return data.map((row, index) => ({
            temperature: parseFloat(row.temperature || row.Temperature || 0),
            yield: parseFloat(row.yield || row["Yield (tons/ha)"] || row["yield (tons/ha)"] || 0),
            crop: row.crop || row.Crop || `Row ${index + 1}`,
            ph: parseFloat(row.ph || row.Ph || row.PH || 0),
        })).filter(d => d.temperature > 0 && d.yield > 0)
    }

    const processNPKData = () => {
        const cropNPK: { [key: string]: { N: number; P: number; K: number; count: number } } = {}

        data.forEach((row) => {
            const crop = row.crop || row.Crop || "Unknown"
            const N = parseFloat(row.N || row.n || 0)
            const P = parseFloat(row.P || row.p || 0)
            const K = parseFloat(row.K || row.k || 0)

            if (!cropNPK[crop]) {
                cropNPK[crop] = { N: 0, P: 0, K: 0, count: 0 }
            }
            cropNPK[crop].N += N
            cropNPK[crop].P += P
            cropNPK[crop].K += K
            cropNPK[crop].count += 1
        })

        return Object.entries(cropNPK).map(([name, values]) => ({
            name,
            N: Number((values.N / values.count).toFixed(1)),
            P: Number((values.P / values.count).toFixed(1)),
            K: Number((values.K / values.count).toFixed(1)),
        }))
    }

    const processCropDistribution = () => {
        const counts: { [key: string]: number } = {}

        data.forEach((row) => {
            const crop = row.crop || row.Crop || "Unknown"
            counts[crop] = (counts[crop] || 0) + 1
        })

        return Object.entries(counts).map(([name, value]) => ({
            name,
            value,
        }))
    }

    const processYieldByPH = () => {
        return data.map((row) => ({
            ph: parseFloat(row.ph || row.Ph || row.PH || 0),
            yield: parseFloat(row.yield || row["Yield (tons/ha)"] || row["yield (tons/ha)"] || 0),
            crop: row.crop || row.Crop || "Unknown",
        })).filter(d => d.ph > 0 && d.yield > 0).sort((a, b) => a.ph - b.ph)
    }

    const yieldByCrop = processYieldByCrop()
    const yieldVsTemp = processYieldVsTemperature()
    const npkData = processNPKData()
    const cropDistribution = processCropDistribution()
    const yieldByPH = processYieldByPH()

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                    <p className="font-medium text-sm">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-xs" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="space-y-6">
            <Tabs defaultValue="yield" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1">
                    <TabsTrigger value="yield" className="text-xs md:text-sm">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Yield Analysis
                    </TabsTrigger>
                    <TabsTrigger value="npk" className="text-xs md:text-sm">
                        <Activity className="h-3 w-3 mr-1" />
                        NPK Levels
                    </TabsTrigger>
                    <TabsTrigger value="correlation" className="text-xs md:text-sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Correlations
                    </TabsTrigger>
                    <TabsTrigger value="distribution" className="text-xs md:text-sm">
                        <PieChartIcon className="h-3 w-3 mr-1" />
                        Distribution
                    </TabsTrigger>
                </TabsList>

                {/* Yield Analysis Tab */}
                <TabsContent value="yield" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Average Yield by Crop */}
                        <Card className="border-primary/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center">
                                    <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                                    Average Yield by Crop
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={yieldByCrop} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                            <XAxis type="number" tick={{ fontSize: 11 }} />
                                            <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11 }} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Bar
                                                dataKey="avgYield"
                                                name="Avg Yield (tons/ha)"
                                                radius={[0, 4, 4, 0]}
                                            >
                                                {yieldByCrop.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Yield vs Temperature Scatter */}
                        <Card className="border-primary/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                                    Yield vs Temperature
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ScatterChart>
                                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                            <XAxis
                                                dataKey="temperature"
                                                name="Temperature"
                                                unit="°C"
                                                tick={{ fontSize: 11 }}
                                                label={{ value: 'Temperature (°C)', position: 'bottom', fontSize: 11 }}
                                            />
                                            <YAxis
                                                dataKey="yield"
                                                name="Yield"
                                                unit=" t/ha"
                                                tick={{ fontSize: 11 }}
                                                label={{ value: 'Yield (tons/ha)', angle: -90, position: 'insideLeft', fontSize: 11 }}
                                            />
                                            <Tooltip
                                                cursor={{ strokeDasharray: '3 3' }}
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        const data = payload[0].payload
                                                        return (
                                                            <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                                                                <p className="font-medium text-sm">{data.crop}</p>
                                                                <p className="text-xs text-muted-foreground">Temp: {data.temperature}°C</p>
                                                                <p className="text-xs text-muted-foreground">Yield: {data.yield} t/ha</p>
                                                                <p className="text-xs text-muted-foreground">pH: {data.ph}</p>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                }}
                                            />
                                            <Scatter
                                                name="Crops"
                                                data={yieldVsTemp}
                                                fill="#22c55e"
                                            >
                                                {yieldVsTemp.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Scatter>
                                        </ScatterChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Data Summary */}
                    <Card className="border-primary/20 bg-primary/5">
                        <CardContent className="pt-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">{data.length}</p>
                                    <p className="text-xs text-muted-foreground">Total Records</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">{yieldByCrop.length}</p>
                                    <p className="text-xs text-muted-foreground">Unique Crops</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">
                                        {yieldByCrop.length > 0 ? yieldByCrop[0].avgYield : 0}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Max Avg Yield (t/ha)</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">
                                        {yieldByCrop.length > 0 ? yieldByCrop[0].name : "N/A"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Best Performing Crop</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* NPK Levels Tab */}
                <TabsContent value="npk" className="space-y-4">
                    <Card className="border-primary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center">
                                <Activity className="h-4 w-4 mr-2 text-primary" />
                                NPK Nutrient Levels by Crop
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={npkData}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Bar dataKey="N" name="Nitrogen (N)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="P" name="Phosphorus (P)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="K" name="Potassium (K)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Correlations Tab */}
                <TabsContent value="correlation" className="space-y-4">
                    <Card className="border-primary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center">
                                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                                Yield vs pH Level
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={yieldByPH}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                        <XAxis
                                            dataKey="ph"
                                            tick={{ fontSize: 11 }}
                                            label={{ value: 'pH Level', position: 'bottom', fontSize: 11 }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 11 }}
                                            label={{ value: 'Yield (tons/ha)', angle: -90, position: 'insideLeft', fontSize: 11 }}
                                        />
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload
                                                    return (
                                                        <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                                                            <p className="font-medium text-sm">{data.crop}</p>
                                                            <p className="text-xs text-muted-foreground">pH: {data.ph}</p>
                                                            <p className="text-xs text-muted-foreground">Yield: {data.yield} t/ha</p>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="yield"
                                            stroke="#22c55e"
                                            strokeWidth={2}
                                            dot={{ fill: '#22c55e', strokeWidth: 2 }}
                                            activeDot={{ r: 6, fill: '#16a34a' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Distribution Tab */}
                <TabsContent value="distribution" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Crop Distribution Pie Chart */}
                        <Card className="border-primary/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center">
                                    <PieChartIcon className="h-4 w-4 mr-2 text-primary" />
                                    Crop Distribution
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={cropDistribution}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {cropDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        const data = payload[0].payload
                                                        return (
                                                            <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
                                                                <p className="font-medium text-sm">{data.name}</p>
                                                                <p className="text-xs text-muted-foreground">Count: {data.value}</p>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Crop Stats Table */}
                        <Card className="border-primary/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center">
                                    <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                                    Crop Statistics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-auto max-h-[300px]">
                                    <table className="w-full text-sm">
                                        <thead className="sticky top-0 bg-background">
                                            <tr className="border-b">
                                                <th className="text-left py-2 px-2">Crop</th>
                                                <th className="text-right py-2 px-2">Count</th>
                                                <th className="text-right py-2 px-2">Avg Yield</th>
                                                <th className="text-right py-2 px-2">Total Yield</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {yieldByCrop.map((crop, index) => (
                                                <tr key={crop.name} className="border-b border-dashed hover:bg-muted/50">
                                                    <td className="py-2 px-2 flex items-center">
                                                        <span
                                                            className="w-3 h-3 rounded-full mr-2"
                                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                        />
                                                        {crop.name}
                                                    </td>
                                                    <td className="text-right py-2 px-2">{crop.count}</td>
                                                    <td className="text-right py-2 px-2 font-medium">{crop.avgYield} t/ha</td>
                                                    <td className="text-right py-2 px-2">{crop.totalYield} t/ha</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
