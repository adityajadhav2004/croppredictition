import Results from "@/components/results"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ResultsPage() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 lg:p-24">
      <div className="flex flex-col items-center text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2">Analysis Results</h1>
        <p className="text-muted-foreground max-w-3xl">
          Your personalized crop recommendations and soil health analysis
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Crop Recommendations & Soil Analysis</CardTitle>
                <CardDescription>Based on your uploaded soil parameters</CardDescription>
              </div>
              <Link href="/">
                <Button variant="outline">Upload New Data</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Results />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
