"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Leaf,
  BarChart,
  ThermometerIcon,
  ArrowRight,
  Check,
  Upload,
  Brain,
  FileSpreadsheet,
  TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { ExternalLink } from "lucide-react" // Declare the ExternalLink variable

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4 animate-fade-in">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit">
                  <Brain className="mr-1 h-3 w-3" />
                  <span>Powered by AI</span>
                </div>
                <div className="space-y-2">
                  <h1 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Transform Your Farming with AI-Powered Soil Analysis
                  </h1>
                  <p className="text-muted-foreground md:text-xl max-w-[600px]">
                    Upload your soil data and get expert-level crop recommendations, nutrient analysis, and irrigation
                    plans powered by advanced AI models.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="btn-gradient font-medium">
                    <Link href="/dashboard">
                      Start Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-medium bg-transparent">
                    <Link href="#how-it-works">See How It Works</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex items-center justify-center">
                <div className="relative rounded-lg overflow-hidden border shadow-xl">
                  <Image
                    src="/agricultural-dashboard.png"
                    alt="AgriSoil Dashboard Preview"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
                      <p className="text-sm font-medium">AI Analysis in Progress</p>
                    </div>
                    <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[800px]">
                <h2 className="font-heading text-3xl font-bold tracking-tighter md:text-4xl">How AgriSoil Works</h2>
                <p className="text-muted-foreground md:text-xl">
                  Our AI-powered system analyzes your soil data in three simple steps to provide expert-level farming
                  insights
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative group">
                <div className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold z-10">
                  1
                </div>
                <div className="rounded-xl border bg-background p-6 shadow-sm ml-2 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
                    <Image src="/csv-soil-data-upload.png" alt="Upload CSV File" fill className="object-cover" />
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <Upload className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">Upload Your Soil Data</h3>
                  <p className="text-muted-foreground mb-4">
                    Simply upload a CSV file containing your soil parameters including N, P, K, pH, temperature,
                    humidity, and rainfall data.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>Drag & drop or browse files</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>Instant data validation</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>Sample template provided</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold z-10">
                  2
                </div>
                <div className="rounded-xl border bg-background p-6 shadow-sm ml-2 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
                    <Image src="/ai-agricultural-analysis.png" alt="AI Analysis Process" fill className="object-cover" />
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <Brain className="h-12 w-12 text-primary animate-pulse" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">AI Expert Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI agricultural expert analyzes your data using advanced language models to provide
                    comprehensive insights across three key areas.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>Soil health assessment</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>Irrigation management plan</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>Comprehensive farming insights</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold z-10">
                  3
                </div>
                <div className="rounded-xl border bg-background p-6 shadow-sm ml-2 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/agricultural-report.png"
                      alt="Get Detailed Recommendations"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">Get Expert Recommendations</h3>
                  <p className="text-muted-foreground mb-4">
                    Receive detailed crop recommendations, nutrient analysis, irrigation schedules, and actionable
                    insights to optimize your farming operations.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>Top 5 crop recommendations</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>Interactive charts & visualizations</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>Exportable PDF reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Button asChild size="lg" className="btn-gradient font-medium">
                <Link href="/dashboard">Try It Now - It's Free</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[800px]">
                <h2 className="font-heading text-3xl font-bold tracking-tighter md:text-4xl">
                  Advanced AI-Powered Features
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our system combines agricultural science with cutting-edge AI technology to provide accurate,
                  actionable recommendations
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="feature-card flex flex-col items-center space-y-4 rounded-xl border p-6 bg-background shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold">Smart Crop Recommendations</h3>
                <p className="text-muted-foreground text-center">
                  AI analyzes your soil conditions against thousands of crop profiles to recommend the most suitable
                  options with precise suitability scores.
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Top 5 most suitable crops</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Detailed suitability reasoning</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Interactive comparison charts</span>
                  </li>
                </ul>
              </div>
              <div className="feature-card flex flex-col items-center space-y-4 rounded-xl border p-6 bg-background shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold">Comprehensive Soil Health</h3>
                <p className="text-muted-foreground text-center">
                  AI-powered soil health assessment with detailed nutrient analysis, pH evaluation, and specific
                  improvement recommendations.
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>NPK level assessment with AI insights</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>pH balance evaluation & corrections</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Personalized fertilizer recommendations</span>
                  </li>
                </ul>
              </div>
              <div className="feature-card flex flex-col items-center space-y-4 rounded-xl border p-6 bg-background shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ThermometerIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold">Smart Irrigation Planning</h3>
                <p className="text-muted-foreground text-center">
                  AI analyzes climate data and soil conditions to create optimized irrigation schedules and water
                  management strategies.
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Climate-based irrigation scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Water conservation strategies</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Seasonal water requirement analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Data Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[800px]">
                <h2 className="font-heading text-3xl font-bold tracking-tighter md:text-4xl">
                  CSV Data Format & Requirements
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Prepare your soil data in the correct format for optimal AI analysis
                </p>
              </div>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="rounded-xl border bg-background p-6 shadow-sm">
                    <h3 className="font-heading text-xl font-bold mb-4 flex items-center">
                      <FileSpreadsheet className="mr-2 h-5 w-5 text-primary" />
                      Required Data Fields
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-medium">Field</th>
                            <th className="text-left p-2 font-medium">Unit</th>
                            <th className="text-left p-2 font-medium">Range</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          <tr className="border-b">
                            <td className="p-2">N (Nitrogen)</td>
                            <td className="p-2">mg/kg</td>
                            <td className="p-2">0-140</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">P (Phosphorus)</td>
                            <td className="p-2">mg/kg</td>
                            <td className="p-2">5-145</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">K (Potassium)</td>
                            <td className="p-2">mg/kg</td>
                            <td className="p-2">5-205</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">temperature</td>
                            <td className="p-2">°C</td>
                            <td className="p-2">8-44</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">humidity</td>
                            <td className="p-2">%</td>
                            <td className="p-2">14-100</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">ph</td>
                            <td className="p-2">-</td>
                            <td className="p-2">3.5-10</td>
                          </tr>
                          <tr>
                            <td className="p-2">rainfall</td>
                            <td className="p-2">mm</td>
                            <td className="p-2">20-300</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-xl border bg-background p-6 shadow-sm">
                    <h4 className="font-medium mb-3">Sample CSV Format</h4>
                    <pre className="p-3 bg-muted rounded-md overflow-x-auto text-xs">
                      <code>
                        N,P,K,temperature,humidity,ph,rainfall 90,42,43,20.87,82.0,6.5,202.93
                        85,58,41,21.77,80.3,7.0,226.65 60,55,44,23.00,82.0,6.8,177.45
                      </code>
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 bg-transparent"
                      onClick={() => {
                        const csvContent =
                          "N,P,K,temperature,humidity,ph,rainfall\n90,42,43,20.87,82.0,6.5,202.93\n85,58,41,21.77,80.3,7.0,226.65\n60,55,44,23.00,82.0,6.8,177.45"
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
                      Download Sample CSV
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-xl border bg-background p-6 shadow-sm">
                    <h3 className="font-heading text-xl font-bold mb-4">Data Collection Tips</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">Soil Testing</span>
                          <p className="text-sm text-muted-foreground">
                            Get professional soil tests for N, P, K, and pH values
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">Weather Data</span>
                          <p className="text-sm text-muted-foreground">
                            Use local weather station data for temperature, humidity, and rainfall
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">Multiple Samples</span>
                          <p className="text-sm text-muted-foreground">
                            Include multiple rows for different field sections or time periods
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="mr-2 h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium">Data Accuracy</span>
                          <p className="text-sm text-muted-foreground">
                            Ensure measurements are within the specified ranges for best results
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border bg-background p-6 shadow-sm">
                    <h4 className="font-medium mb-3">AI Analysis Preview</h4>
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder-gw6q6.png"
                        alt="Analysis Results Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      See how your data transforms into actionable insights with our AI-powered analysis dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-heading text-3xl font-bold tracking-tighter md:text-4xl">
                  Trusted by Farmers Worldwide
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  See what agricultural professionals are saying about our AI-powered system
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border bg-background p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center">
                    <span className="font-heading text-lg font-bold text-primary">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium">John Deere</h4>
                    <p className="text-sm text-muted-foreground">Wheat Farmer, Kansas</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The AI recommendations were incredibly accurate. I switched from corn to wheat based on the analysis
                  and saw a 30% increase in yield. The irrigation scheduling alone saved me thousands in water costs."
                </p>
              </div>

              <div className="rounded-xl border bg-background p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center">
                    <span className="font-heading text-lg font-bold text-primary">SP</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Peterson</h4>
                    <p className="text-sm text-muted-foreground">Organic Farmer, California</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The AI soil health analysis identified a phosphorus deficiency I wasn't aware of. After addressing it
                  with the recommended organic amendments, my vegetables are thriving like never before."
                </p>
              </div>

              <div className="rounded-xl border bg-background p-6 shadow-sm hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center">
                    <span className="font-heading text-lg font-bold text-primary">RM</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Robert Martinez</h4>
                    <p className="text-sm text-muted-foreground">Agricultural Consultant</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "I recommend AgriSoil to all my clients. The AI-powered insights are on par with expensive consultancy
                  reports, but available instantly. It's revolutionizing how we approach precision agriculture."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-heading text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Farming?
                </h2>
                <p className="text-muted-foreground md:text-xl max-w-[600px]">
                  Join thousands of farmers who are already using AI to optimize their crop selection and soil
                  management. Get started in minutes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
                <Button asChild size="lg" className="btn-gradient font-medium">
                  <Link href="/dashboard">
                    Start Free Analysis
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-medium bg-transparent">
                  <Link href="/profile">Configure API Key</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                No credit card required • Get results in minutes • Export detailed reports
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-8 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-heading text-lg font-bold">AgriSoil</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering farmers with AI-powered crop recommendations and soil analysis for sustainable agriculture.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/documentation" className="text-muted-foreground hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://openrouter.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  >
                    OpenRouter API
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AgriSoil. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
