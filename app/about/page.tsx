import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Database, LineChart, FileSpreadsheet } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">About the Crop Recommendation System</h1>
            <p className="text-muted-foreground">Learn how our system helps farmers make data-driven decisions</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-green-500" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  The Crop Recommendation System aims to help farmers and agricultural professionals make informed
                  decisions about crop selection based on soil parameters. By leveraging machine learning algorithms, we
                  provide personalized recommendations that can increase yield, reduce resource waste, and promote
                  sustainable farming practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-blue-500" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Our system analyzes your soil parameters (N, P, K, pH, temperature, humidity, rainfall) using advanced
                  machine learning models trained on extensive agricultural datasets. The algorithm identifies patterns
                  and correlations between soil conditions and crop performance to recommend the most suitable crops for
                  your specific conditions.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>The Technology Behind Our System</CardTitle>
              <CardDescription>A combination of data science and agricultural expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      <LineChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Machine Learning Models</h3>
                      <p className="text-sm text-muted-foreground">
                        We use Random Forest and XGBoost algorithms to analyze soil parameters and predict crop
                        suitability with high accuracy.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Comprehensive Dataset</h3>
                      <p className="text-sm text-muted-foreground">
                        Our models are trained on extensive agricultural data collected from various regions, soil
                        types, and climate conditions.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Data Processing Pipeline</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Upload your soil parameters via CSV file</li>
                    <li>Data validation and preprocessing</li>
                    <li>Feature analysis and normalization</li>
                    <li>Prediction using trained ML models</li>
                    <li>Generation of recommendations and visualizations</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSV File Format</CardTitle>
              <CardDescription>Prepare your data in the correct format for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Your CSV file should contain the following columns with appropriate values:</p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Column</th>
                      <th className="text-left p-2">Description</th>
                      <th className="text-left p-2">Unit</th>
                      <th className="text-left p-2">Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">N</td>
                      <td className="p-2">Nitrogen content</td>
                      <td className="p-2">mg/kg</td>
                      <td className="p-2">0-140</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">P</td>
                      <td className="p-2">Phosphorus content</td>
                      <td className="p-2">mg/kg</td>
                      <td className="p-2">5-145</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">K</td>
                      <td className="p-2">Potassium content</td>
                      <td className="p-2">mg/kg</td>
                      <td className="p-2">5-205</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">temperature</td>
                      <td className="p-2">Average temperature</td>
                      <td className="p-2">°C</td>
                      <td className="p-2">8.83-43.68</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">humidity</td>
                      <td className="p-2">Relative humidity</td>
                      <td className="p-2">%</td>
                      <td className="p-2">14.26-99.98</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">ph</td>
                      <td className="p-2">Soil pH level</td>
                      <td className="p-2">-</td>
                      <td className="p-2">3.5-9.94</td>
                    </tr>
                    <tr>
                      <td className="p-2">rainfall</td>
                      <td className="p-2">Annual rainfall</td>
                      <td className="p-2">mm</td>
                      <td className="p-2">20.21-298.56</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Example CSV Format</h4>
                <pre className="p-2 bg-muted rounded-md overflow-x-auto">
                  <code>
                    N,P,K,temperature,humidity,ph,rainfall 90,42,43,20.87,82.0,6.5,202.93 85,58,41,21.77,80.3,7.0,226.65
                    60,55,44,23.00,82.0,6.8,177.45
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Crop Recommendation System. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </a>
            <a href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </a>
            <a href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
