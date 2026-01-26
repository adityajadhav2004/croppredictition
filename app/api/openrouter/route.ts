import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, soilData, apiKey } = await request.json()

    // Check if we have the API key from the client
    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        {
          error: "OpenRouter API key not provided",
          details: "Please configure your OpenRouter API key in your profile settings",
        },
        { status: 400 },
      )
    }

    console.log("Making request to OpenRouter API with DeepSeek model")

    // Create a concise prompt to save tokens
    const masterPrompt = `Agricultural expert analysis for soil data:
N:${soilData.nitrogen || 'N/A'} P:${soilData.phosphorus || 'N/A'} K:${soilData.potassium || 'N/A'} pH:${soilData.ph || 'N/A'} Temp:${soilData.temperature || 'N/A'}°C Humidity:${soilData.humidity || 'N/A'}% Rain:${soilData.rainfall || 'N/A'}mm

${prompt}

Be concise and practical.`

    // Call the OpenRouter API with DeepSeek model
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://agrisoil.vercel.app",
        "X-Title": "AgriSoil Crop Recommendation System",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat", // Using DeepSeek model
        messages: [{ role: "user", content: masterPrompt }],
        temperature: 0.7,
        max_tokens: 500, // Reduced to save credits
        stream: false,
      }),
    })

    console.log("OpenRouter API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        errorData = { rawError: errorText }
      }

      console.error("OpenRouter API error:", errorData)

      return NextResponse.json(
        {
          error: "OpenRouter API error",
          details: errorData.error?.message || "Failed to get response from AI model",
          status: response.status,
          statusText: response.statusText,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error calling OpenRouter:", error)
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
