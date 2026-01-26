// Comprehensive crop knowledge base with requirements and optimal conditions
// This is used for rule-based recommendations

export interface CropRequirements {
    name: string
    scientificName: string
    category: string
    requirements: {
        nitrogen: { min: number; max: number; optimal: number; unit: string }
        phosphorus: { min: number; max: number; optimal: number; unit: string }
        potassium: { min: number; max: number; optimal: number; unit: string }
        ph: { min: number; max: number; optimal: number }
        temperature: { min: number; max: number; optimal: number; unit: string }
        humidity: { min: number; max: number; optimal: number; unit: string }
        rainfall: { min: number; max: number; optimal: number; unit: string }
    }
    growthDuration: string
    season: string[]
    waterNeeds: "Low" | "Medium" | "High"
    soilType: string[]
    description: string
}

export const CROP_DATABASE: CropRequirements[] = [
    {
        name: "Rice",
        scientificName: "Oryza sativa",
        category: "Cereal",
        requirements: {
            nitrogen: { min: 60, max: 120, optimal: 80, unit: "kg/ha" },
            phosphorus: { min: 30, max: 80, optimal: 50, unit: "kg/ha" },
            potassium: { min: 30, max: 100, optimal: 60, unit: "kg/ha" },
            ph: { min: 5.5, max: 7.5, optimal: 6.5 },
            temperature: { min: 18, max: 35, optimal: 25, unit: "°C" },
            humidity: { min: 70, max: 90, optimal: 80, unit: "%" },
            rainfall: { min: 150, max: 300, optimal: 200, unit: "mm" },
        },
        growthDuration: "120-150 days",
        season: ["Kharif", "Summer"],
        waterNeeds: "High",
        soilType: ["Clay", "Loamy", "Alluvial"],
        description: "Requires standing water during growth. Best in humid tropical conditions.",
    },
    {
        name: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        requirements: {
            nitrogen: { min: 80, max: 120, optimal: 100, unit: "kg/ha" },
            phosphorus: { min: 40, max: 80, optimal: 60, unit: "kg/ha" },
            potassium: { min: 40, max: 80, optimal: 60, unit: "kg/ha" },
            ph: { min: 6.0, max: 7.5, optimal: 6.8 },
            temperature: { min: 10, max: 25, optimal: 18, unit: "°C" },
            humidity: { min: 50, max: 70, optimal: 60, unit: "%" },
            rainfall: { min: 75, max: 150, optimal: 100, unit: "mm" },
        },
        growthDuration: "100-120 days",
        season: ["Rabi"],
        waterNeeds: "Medium",
        soilType: ["Loamy", "Clay Loam", "Sandy Loam"],
        description: "Cool season crop. Requires well-drained soil with moderate moisture.",
    },
    {
        name: "Maize",
        scientificName: "Zea mays",
        category: "Cereal",
        requirements: {
            nitrogen: { min: 80, max: 160, optimal: 120, unit: "kg/ha" },
            phosphorus: { min: 40, max: 100, optimal: 70, unit: "kg/ha" },
            potassium: { min: 40, max: 120, optimal: 80, unit: "kg/ha" },
            ph: { min: 5.5, max: 7.5, optimal: 6.5 },
            temperature: { min: 18, max: 33, optimal: 25, unit: "°C" },
            humidity: { min: 50, max: 80, optimal: 65, unit: "%" },
            rainfall: { min: 100, max: 200, optimal: 150, unit: "mm" },
        },
        growthDuration: "90-120 days",
        season: ["Kharif", "Rabi", "Summer"],
        waterNeeds: "Medium",
        soilType: ["Loamy", "Sandy Loam", "Well-drained"],
        description: "Versatile crop. Sensitive to waterlogging. Needs warm temperatures.",
    },
    {
        name: "Cotton",
        scientificName: "Gossypium hirsutum",
        category: "Fiber",
        requirements: {
            nitrogen: { min: 60, max: 120, optimal: 90, unit: "kg/ha" },
            phosphorus: { min: 30, max: 60, optimal: 45, unit: "kg/ha" },
            potassium: { min: 30, max: 90, optimal: 60, unit: "kg/ha" },
            ph: { min: 5.5, max: 8.0, optimal: 6.5 },
            temperature: { min: 21, max: 35, optimal: 28, unit: "°C" },
            humidity: { min: 50, max: 75, optimal: 60, unit: "%" },
            rainfall: { min: 85, max: 120, optimal: 100, unit: "mm" },
        },
        growthDuration: "150-180 days",
        season: ["Kharif"],
        waterNeeds: "Medium",
        soilType: ["Black Cotton Soil", "Loamy", "Well-drained"],
        description: "Requires warm climate with adequate sunshine. Sensitive to frost.",
    },
    {
        name: "Sugarcane",
        scientificName: "Saccharum officinarum",
        category: "Cash Crop",
        requirements: {
            nitrogen: { min: 100, max: 200, optimal: 150, unit: "kg/ha" },
            phosphorus: { min: 50, max: 100, optimal: 75, unit: "kg/ha" },
            potassium: { min: 60, max: 120, optimal: 90, unit: "kg/ha" },
            ph: { min: 6.0, max: 8.0, optimal: 7.0 },
            temperature: { min: 20, max: 40, optimal: 30, unit: "°C" },
            humidity: { min: 70, max: 90, optimal: 80, unit: "%" },
            rainfall: { min: 150, max: 250, optimal: 200, unit: "mm" },
        },
        growthDuration: "10-18 months",
        season: ["Year-round"],
        waterNeeds: "High",
        soilType: ["Loamy", "Clay Loam", "Well-drained"],
        description: "Long duration crop. Requires high water and nutrient input.",
    },
    {
        name: "Soybean",
        scientificName: "Glycine max",
        category: "Legume",
        requirements: {
            nitrogen: { min: 20, max: 40, optimal: 30, unit: "kg/ha" },
            phosphorus: { min: 40, max: 80, optimal: 60, unit: "kg/ha" },
            potassium: { min: 40, max: 80, optimal: 60, unit: "kg/ha" },
            ph: { min: 6.0, max: 7.5, optimal: 6.8 },
            temperature: { min: 20, max: 35, optimal: 28, unit: "°C" },
            humidity: { min: 60, max: 80, optimal: 70, unit: "%" },
            rainfall: { min: 80, max: 150, optimal: 100, unit: "mm" },
        },
        growthDuration: "90-120 days",
        season: ["Kharif"],
        waterNeeds: "Medium",
        soilType: ["Loamy", "Clay Loam", "Well-drained"],
        description: "Nitrogen-fixing legume. Good for crop rotation. Rich in protein.",
    },
    {
        name: "Millet",
        scientificName: "Pennisetum glaucum",
        category: "Cereal",
        requirements: {
            nitrogen: { min: 40, max: 80, optimal: 60, unit: "kg/ha" },
            phosphorus: { min: 20, max: 50, optimal: 35, unit: "kg/ha" },
            potassium: { min: 20, max: 50, optimal: 35, unit: "kg/ha" },
            ph: { min: 5.5, max: 7.5, optimal: 6.5 },
            temperature: { min: 20, max: 38, optimal: 30, unit: "°C" },
            humidity: { min: 40, max: 70, optimal: 55, unit: "%" },
            rainfall: { min: 40, max: 100, optimal: 60, unit: "mm" },
        },
        growthDuration: "70-90 days",
        season: ["Kharif"],
        waterNeeds: "Low",
        soilType: ["Sandy", "Sandy Loam", "Light Soils"],
        description: "Drought-tolerant crop. Grows well in arid regions with low rainfall.",
    },
    {
        name: "Barley",
        scientificName: "Hordeum vulgare",
        category: "Cereal",
        requirements: {
            nitrogen: { min: 60, max: 100, optimal: 80, unit: "kg/ha" },
            phosphorus: { min: 30, max: 60, optimal: 45, unit: "kg/ha" },
            potassium: { min: 30, max: 60, optimal: 45, unit: "kg/ha" },
            ph: { min: 6.0, max: 8.0, optimal: 7.0 },
            temperature: { min: 8, max: 25, optimal: 15, unit: "°C" },
            humidity: { min: 40, max: 65, optimal: 50, unit: "%" },
            rainfall: { min: 50, max: 100, optimal: 75, unit: "mm" },
        },
        growthDuration: "90-120 days",
        season: ["Rabi"],
        waterNeeds: "Low",
        soilType: ["Loamy", "Sandy Loam", "Well-drained"],
        description: "Cool season crop. Tolerates saline and alkaline conditions.",
    },
    {
        name: "Groundnut",
        scientificName: "Arachis hypogaea",
        category: "Oilseed",
        requirements: {
            nitrogen: { min: 20, max: 40, optimal: 25, unit: "kg/ha" },
            phosphorus: { min: 40, max: 80, optimal: 60, unit: "kg/ha" },
            potassium: { min: 40, max: 80, optimal: 60, unit: "kg/ha" },
            ph: { min: 5.5, max: 7.0, optimal: 6.2 },
            temperature: { min: 22, max: 32, optimal: 27, unit: "°C" },
            humidity: { min: 50, max: 75, optimal: 65, unit: "%" },
            rainfall: { min: 80, max: 150, optimal: 100, unit: "mm" },
        },
        growthDuration: "100-130 days",
        season: ["Kharif", "Rabi"],
        waterNeeds: "Medium",
        soilType: ["Sandy Loam", "Light Soils", "Well-drained"],
        description: "Legume crop. Fixes atmospheric nitrogen. Requires calcium-rich soil.",
    },
    {
        name: "Mustard",
        scientificName: "Brassica juncea",
        category: "Oilseed",
        requirements: {
            nitrogen: { min: 60, max: 100, optimal: 80, unit: "kg/ha" },
            phosphorus: { min: 30, max: 50, optimal: 40, unit: "kg/ha" },
            potassium: { min: 20, max: 40, optimal: 30, unit: "kg/ha" },
            ph: { min: 6.0, max: 7.5, optimal: 6.8 },
            temperature: { min: 10, max: 25, optimal: 18, unit: "°C" },
            humidity: { min: 40, max: 65, optimal: 50, unit: "%" },
            rainfall: { min: 40, max: 80, optimal: 60, unit: "mm" },
        },
        growthDuration: "110-145 days",
        season: ["Rabi"],
        waterNeeds: "Low",
        soilType: ["Loamy", "Sandy Loam", "Well-drained"],
        description: "Cool season oilseed crop. Important source of edible oil.",
    },
    {
        name: "Chickpea",
        scientificName: "Cicer arietinum",
        category: "Pulse",
        requirements: {
            nitrogen: { min: 15, max: 30, optimal: 20, unit: "kg/ha" },
            phosphorus: { min: 40, max: 80, optimal: 60, unit: "kg/ha" },
            potassium: { min: 20, max: 50, optimal: 35, unit: "kg/ha" },
            ph: { min: 6.0, max: 8.0, optimal: 7.0 },
            temperature: { min: 15, max: 30, optimal: 22, unit: "°C" },
            humidity: { min: 40, max: 65, optimal: 50, unit: "%" },
            rainfall: { min: 60, max: 100, optimal: 80, unit: "mm" },
        },
        growthDuration: "90-120 days",
        season: ["Rabi"],
        waterNeeds: "Low",
        soilType: ["Loamy", "Sandy Loam", "Well-drained"],
        description: "Nitrogen-fixing pulse. Drought tolerant. Rich in protein.",
    },
    {
        name: "Lentil",
        scientificName: "Lens culinaris",
        category: "Pulse",
        requirements: {
            nitrogen: { min: 15, max: 25, optimal: 20, unit: "kg/ha" },
            phosphorus: { min: 35, max: 60, optimal: 45, unit: "kg/ha" },
            potassium: { min: 20, max: 40, optimal: 30, unit: "kg/ha" },
            ph: { min: 6.0, max: 8.0, optimal: 7.0 },
            temperature: { min: 12, max: 28, optimal: 20, unit: "°C" },
            humidity: { min: 35, max: 60, optimal: 45, unit: "%" },
            rainfall: { min: 40, max: 80, optimal: 60, unit: "mm" },
        },
        growthDuration: "80-110 days",
        season: ["Rabi"],
        waterNeeds: "Low",
        soilType: ["Loamy", "Sandy Loam", "Clay Loam"],
        description: "Cool season pulse. Sensitive to waterlogging. High protein content.",
    },
    {
        name: "Potato",
        scientificName: "Solanum tuberosum",
        category: "Vegetable",
        requirements: {
            nitrogen: { min: 100, max: 180, optimal: 140, unit: "kg/ha" },
            phosphorus: { min: 60, max: 120, optimal: 90, unit: "kg/ha" },
            potassium: { min: 80, max: 160, optimal: 120, unit: "kg/ha" },
            ph: { min: 5.0, max: 6.5, optimal: 5.8 },
            temperature: { min: 12, max: 24, optimal: 18, unit: "°C" },
            humidity: { min: 60, max: 80, optimal: 70, unit: "%" },
            rainfall: { min: 80, max: 150, optimal: 100, unit: "mm" },
        },
        growthDuration: "80-120 days",
        season: ["Rabi"],
        waterNeeds: "High",
        soilType: ["Sandy Loam", "Loamy", "Well-drained"],
        description: "Cool weather crop. Requires loose, well-drained soil. High K demand.",
    },
    {
        name: "Tomato",
        scientificName: "Solanum lycopersicum",
        category: "Vegetable",
        requirements: {
            nitrogen: { min: 80, max: 150, optimal: 120, unit: "kg/ha" },
            phosphorus: { min: 50, max: 100, optimal: 80, unit: "kg/ha" },
            potassium: { min: 80, max: 150, optimal: 110, unit: "kg/ha" },
            ph: { min: 5.5, max: 7.0, optimal: 6.2 },
            temperature: { min: 18, max: 30, optimal: 24, unit: "°C" },
            humidity: { min: 50, max: 75, optimal: 65, unit: "%" },
            rainfall: { min: 60, max: 100, optimal: 80, unit: "mm" },
        },
        growthDuration: "90-120 days",
        season: ["Rabi", "Summer"],
        waterNeeds: "Medium",
        soilType: ["Loamy", "Sandy Loam", "Well-drained"],
        description: "Warm season vegetable. Sensitive to frost. High nutrient demand.",
    },
    {
        name: "Onion",
        scientificName: "Allium cepa",
        category: "Vegetable",
        requirements: {
            nitrogen: { min: 80, max: 130, optimal: 100, unit: "kg/ha" },
            phosphorus: { min: 50, max: 80, optimal: 65, unit: "kg/ha" },
            potassium: { min: 60, max: 100, optimal: 80, unit: "kg/ha" },
            ph: { min: 6.0, max: 7.5, optimal: 6.5 },
            temperature: { min: 13, max: 28, optimal: 20, unit: "°C" },
            humidity: { min: 50, max: 70, optimal: 60, unit: "%" },
            rainfall: { min: 50, max: 100, optimal: 75, unit: "mm" },
        },
        growthDuration: "100-150 days",
        season: ["Rabi", "Kharif"],
        waterNeeds: "Medium",
        soilType: ["Loamy", "Sandy Loam", "Well-drained"],
        description: "Shallow-rooted crop. Requires well-drained soil. Sulfur important.",
    },
]

// Function to calculate crop suitability score based on actual data
export function calculateCropSuitability(
    crop: CropRequirements,
    soilData: {
        N?: number
        P?: number
        K?: number
        ph?: number
        temperature?: number
        humidity?: number
        rainfall?: number
    }
): {
    crop: CropRequirements
    overallScore: number
    scores: { [key: string]: { score: number; status: string; recommendation: string } }
    matchingSoilTypes: string[]
} {
    const scores: { [key: string]: { score: number; status: string; recommendation: string } } = {}
    let totalScore = 0
    let factorCount = 0

    // Helper function to calculate individual score
    const calcScore = (
        value: number | undefined,
        min: number,
        max: number,
        optimal: number,
        name: string
    ): { score: number; status: string; recommendation: string } => {
        if (value === undefined || value === null) {
            return { score: 0.5, status: "Unknown", recommendation: "Data not available" }
        }

        let score: number
        let status: string
        let recommendation: string

        if (value < min) {
            const deficit = ((min - value) / min) * 100
            score = Math.max(0, 1 - deficit / 100)
            status = "Deficient"
            recommendation = `Increase ${name} by ${(min - value).toFixed(1)} to reach minimum requirement of ${min}`
        } else if (value > max) {
            const excess = ((value - max) / max) * 100
            score = Math.max(0, 1 - excess / 100)
            status = "Excessive"
            recommendation = `${name} is ${(value - max).toFixed(1)} above optimal range. Consider reducing.`
        } else {
            // Within range - calculate how close to optimal
            const rangeSize = max - min
            const distFromOptimal = Math.abs(value - optimal)
            const maxDist = Math.max(optimal - min, max - optimal)
            score = 1 - (distFromOptimal / maxDist) * 0.3 // Max 30% penalty for being within range but not optimal
            status = value === optimal ? "Optimal" : "Good"
            recommendation = status === "Optimal" ? "Perfect conditions" : `Near optimal (ideal: ${optimal})`
        }

        return { score: Math.max(0, Math.min(1, score)), status, recommendation }
    }

    // Calculate scores for each parameter
    if (soilData.N !== undefined) {
        scores.nitrogen = calcScore(soilData.N, crop.requirements.nitrogen.min, crop.requirements.nitrogen.max, crop.requirements.nitrogen.optimal, "Nitrogen")
        totalScore += scores.nitrogen.score
        factorCount++
    }

    if (soilData.P !== undefined) {
        scores.phosphorus = calcScore(soilData.P, crop.requirements.phosphorus.min, crop.requirements.phosphorus.max, crop.requirements.phosphorus.optimal, "Phosphorus")
        totalScore += scores.phosphorus.score
        factorCount++
    }

    if (soilData.K !== undefined) {
        scores.potassium = calcScore(soilData.K, crop.requirements.potassium.min, crop.requirements.potassium.max, crop.requirements.potassium.optimal, "Potassium")
        totalScore += scores.potassium.score
        factorCount++
    }

    if (soilData.ph !== undefined) {
        scores.ph = calcScore(soilData.ph, crop.requirements.ph.min, crop.requirements.ph.max, crop.requirements.ph.optimal, "pH")
        totalScore += scores.ph.score
        factorCount++
    }

    if (soilData.temperature !== undefined) {
        scores.temperature = calcScore(soilData.temperature, crop.requirements.temperature.min, crop.requirements.temperature.max, crop.requirements.temperature.optimal, "Temperature")
        totalScore += scores.temperature.score
        factorCount++
    }

    if (soilData.humidity !== undefined) {
        scores.humidity = calcScore(soilData.humidity, crop.requirements.humidity.min, crop.requirements.humidity.max, crop.requirements.humidity.optimal, "Humidity")
        totalScore += scores.humidity.score
        factorCount++
    }

    if (soilData.rainfall !== undefined) {
        scores.rainfall = calcScore(soilData.rainfall, crop.requirements.rainfall.min, crop.requirements.rainfall.max, crop.requirements.rainfall.optimal, "Rainfall")
        totalScore += scores.rainfall.score
        factorCount++
    }

    const overallScore = factorCount > 0 ? totalScore / factorCount : 0

    return {
        crop,
        overallScore,
        scores,
        matchingSoilTypes: crop.soilType,
    }
}

// Function to get top crop recommendations based on soil data
export function getTopCropRecommendations(
    soilData: {
        N?: number
        P?: number
        K?: number
        ph?: number
        temperature?: number
        humidity?: number
        rainfall?: number
    },
    topN: number = 5
) {
    const results = CROP_DATABASE.map(crop => calculateCropSuitability(crop, soilData))
    results.sort((a, b) => b.overallScore - a.overallScore)
    return results.slice(0, topN)
}

// Function to analyze nutrient levels
export function analyzeNutrientLevels(data: any[]) {
    const analysis: {
        nitrogen: { avg: number; min: number; max: number; status: string; recommendation: string }
        phosphorus: { avg: number; min: number; max: number; status: string; recommendation: string }
        potassium: { avg: number; min: number; max: number; status: string; recommendation: string }
        ph: { avg: number; min: number; max: number; status: string; recommendation: string }
    } = {
        nitrogen: { avg: 0, min: Infinity, max: -Infinity, status: "", recommendation: "" },
        phosphorus: { avg: 0, min: Infinity, max: -Infinity, status: "", recommendation: "" },
        potassium: { avg: 0, min: Infinity, max: -Infinity, status: "", recommendation: "" },
        ph: { avg: 0, min: Infinity, max: -Infinity, status: "", recommendation: "" },
    }

    let nSum = 0, pSum = 0, kSum = 0, phSum = 0
    let count = 0

    data.forEach(row => {
        const n = parseFloat(row.N || row.n || 0)
        const p = parseFloat(row.P || row.p || 0)
        const k = parseFloat(row.K || row.k || 0)
        const ph = parseFloat(row.ph || row.Ph || row.PH || 0)

        if (n > 0) {
            nSum += n
            analysis.nitrogen.min = Math.min(analysis.nitrogen.min, n)
            analysis.nitrogen.max = Math.max(analysis.nitrogen.max, n)
        }
        if (p > 0) {
            pSum += p
            analysis.phosphorus.min = Math.min(analysis.phosphorus.min, p)
            analysis.phosphorus.max = Math.max(analysis.phosphorus.max, p)
        }
        if (k > 0) {
            kSum += k
            analysis.potassium.min = Math.min(analysis.potassium.min, k)
            analysis.potassium.max = Math.max(analysis.potassium.max, k)
        }
        if (ph > 0) {
            phSum += ph
            analysis.ph.min = Math.min(analysis.ph.min, ph)
            analysis.ph.max = Math.max(analysis.ph.max, ph)
        }
        count++
    })

    if (count > 0) {
        analysis.nitrogen.avg = nSum / count
        analysis.phosphorus.avg = pSum / count
        analysis.potassium.avg = kSum / count
        analysis.ph.avg = phSum / count

        // Nitrogen analysis
        const nAvg = analysis.nitrogen.avg
        if (nAvg < 40) {
            analysis.nitrogen.status = "Deficient"
            analysis.nitrogen.recommendation = "Apply 80-100 kg/ha nitrogen through urea or ammonium sulfate"
        } else if (nAvg < 80) {
            analysis.nitrogen.status = "Low"
            analysis.nitrogen.recommendation = "Apply 40-60 kg/ha nitrogen. Consider split application."
        } else if (nAvg > 140) {
            analysis.nitrogen.status = "Excessive"
            analysis.nitrogen.recommendation = "Reduce nitrogen fertilizer. Risk of groundwater contamination."
        } else {
            analysis.nitrogen.status = "Optimal"
            analysis.nitrogen.recommendation = "Maintain current nitrogen levels with balanced fertilization."
        }

        // Phosphorus analysis
        const pAvg = analysis.phosphorus.avg
        if (pAvg < 20) {
            analysis.phosphorus.status = "Deficient"
            analysis.phosphorus.recommendation = "Apply 60-80 kg/ha P2O5 through SSP or DAP before sowing"
        } else if (pAvg < 40) {
            analysis.phosphorus.status = "Low"
            analysis.phosphorus.recommendation = "Apply 40-50 kg/ha P2O5. Band placement recommended."
        } else if (pAvg > 100) {
            analysis.phosphorus.status = "Excessive"
            analysis.phosphorus.recommendation = "Skip phosphorus application this season."
        } else {
            analysis.phosphorus.status = "Optimal"
            analysis.phosphorus.recommendation = "Apply maintenance dose of 30-40 kg/ha P2O5."
        }

        // Potassium analysis
        const kAvg = analysis.potassium.avg
        if (kAvg < 25) {
            analysis.potassium.status = "Deficient"
            analysis.potassium.recommendation = "Apply 80-100 kg/ha K2O through MOP or SOP"
        } else if (kAvg < 50) {
            analysis.potassium.status = "Low"
            analysis.potassium.recommendation = "Apply 50-60 kg/ha K2O. Important for fruit quality."
        } else if (kAvg > 150) {
            analysis.potassium.status = "Excessive"
            analysis.potassium.recommendation = "Skip potassium application. May cause magnesium deficiency."
        } else {
            analysis.potassium.status = "Optimal"
            analysis.potassium.recommendation = "Apply maintenance dose of 30-40 kg/ha K2O."
        }

        // pH analysis
        const phAvg = analysis.ph.avg
        if (phAvg < 5.5) {
            analysis.ph.status = "Strongly Acidic"
            analysis.ph.recommendation = "Apply 2-4 tonnes/ha lime (calcium carbonate) to raise pH"
        } else if (phAvg < 6.0) {
            analysis.ph.status = "Moderately Acidic"
            analysis.ph.recommendation = "Apply 1-2 tonnes/ha lime. Add organic matter."
        } else if (phAvg > 8.0) {
            analysis.ph.status = "Strongly Alkaline"
            analysis.ph.recommendation = "Apply gypsum or sulfur to lower pH. Use acidifying fertilizers."
        } else if (phAvg > 7.5) {
            analysis.ph.status = "Moderately Alkaline"
            analysis.ph.recommendation = "Apply organic matter and consider iron sulfate application."
        } else {
            analysis.ph.status = "Optimal"
            analysis.ph.recommendation = "pH is ideal for most crops. Maintain with balanced fertilization."
        }
    }

    return analysis
}
