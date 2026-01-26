"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Download, Loader2 } from "lucide-react"
import { exportToPDF } from "@/utils/pdf-export"

interface PDFExportProps {
  contentId: string
  filename?: string
  buttonText?: string
}

export default function PDFExport({
  contentId,
  filename = "soil-analysis-report.pdf",
  buttonText = "Export PDF",
}: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [exportSuccess, setExportSuccess] = useState<boolean | null>(null)

  const handleExport = async () => {
    setIsExporting(true)
    setShowDialog(true)

    try {
      const success = await exportToPDF(contentId, filename)
      setExportSuccess(success)
    } catch (error) {
      console.error("Error exporting PDF:", error)
      setExportSuccess(false)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleExport}>
        <Download className="h-4 w-4" />
        {buttonText}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isExporting
                ? "Generating PDF..."
                : exportSuccess
                  ? "PDF Generated Successfully"
                  : "PDF Generation Failed"}
            </DialogTitle>
            <DialogDescription>
              {isExporting ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p>Please wait while we generate your soil analysis report...</p>
                </div>
              ) : exportSuccess ? (
                <div className="py-4">
                  <p>Your soil analysis report has been generated and downloaded successfully.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    If the download didn't start automatically, click the button below to try again.
                  </p>
                  <Button className="mt-4 w-full" onClick={() => exportToPDF(contentId, filename)}>
                    Download Again
                  </Button>
                </div>
              ) : (
                <div className="py-4">
                  <p>There was an error generating your PDF. Please try again.</p>
                  <Button className="mt-4 w-full" onClick={() => handleExport()}>
                    Try Again
                  </Button>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
