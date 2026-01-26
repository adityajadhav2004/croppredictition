import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Test the API key with a simple request
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://agrisoil.vercel.app",
        "X-Title": "AgriSoil Crop Recommendation System",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat",
        messages: [{ role: "user", content: "Hello, this is a test message." }],
        max_tokens: 10,
        temperature: 0.1,
      }),
    })

    if (response.ok) {
      return NextResponse.json({ success: true, message: "API key is valid" })
    } else {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          error: "API key is invalid",
          details: errorData.error?.message || "Authentication failed",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Error testing OpenRouter API key:", error)
    return NextResponse.json(
      { error: "Failed to test API key", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
