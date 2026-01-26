import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export async function exportToPDF(elementId: string, filename = "soil-analysis-report.pdf") {
  try {
    // Get the element to export
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found`)
    }

    // Create a canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      allowTaint: true,
    })

    // Calculate dimensions to fit on A4 page
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 30 // Add some margin at the top

    // Add title
    pdf.setFontSize(18)
    pdf.text("Soil Analysis Report", pdfWidth / 2, 20, { align: "center" })

    // Add the image
    pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)

    // Add footer with date
    pdf.setFontSize(10)
    const date = new Date().toLocaleDateString()
    pdf.text(`Generated on: ${date}`, pdfWidth - 15, pdfHeight - 10, { align: "right" })

    // Save the PDF
    pdf.save(filename)
    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}
