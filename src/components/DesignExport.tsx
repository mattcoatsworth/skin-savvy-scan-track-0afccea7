
import React, { useEffect } from "react";
import Index from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const DesignExport: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Add title for the export page
    document.title = "Skin Savvy - Design Export";
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      toast({
        title: "Preparing PDF...",
        description: "Please wait while we generate your PDF file."
      });

      const contentElement = document.querySelector('.export-content');
      if (!contentElement) {
        toast({
          title: "Error",
          description: "Could not find the content to export.",
          variant: "destructive"
        });
        return;
      }

      // Create canvas from the design element
      const canvas = await html2canvas(contentElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      });

      // Create PDF with proper dimensions
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('skin-savvy-mobile-design.pdf');

      toast({
        title: "PDF Downloaded",
        description: "Your design has been saved as a PDF."
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="design-export">
      {/* Print-only header that will appear in the PDF */}
      <div className="print-header print:block hidden mb-8">
        <h1 className="text-2xl font-bold text-center">Skin Savvy - Home Screen Design</h1>
        <p className="text-center text-muted-foreground">Design Export - {new Date().toLocaleDateString()}</p>
      </div>
      
      {/* Controls that will only show on screen, not in print */}
      <div className="print:hidden bg-white p-4 mb-6 rounded-lg shadow-md sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Design Export</h1>
            <p className="text-sm text-muted-foreground">Save your design as a PDF</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="default" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Save as PDF
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button onClick={handleGoBack} variant="outline">
              Return to App
            </Button>
          </div>
        </div>
      </div>
      
      {/* Page content with special styling for print */}
      <div className="export-content max-w-md mx-auto bg-white p-6 rounded-lg shadow-md print:shadow-none">
        <div className="border-2 border-dashed border-gray-200 p-4 rounded-lg mb-6 print:hidden">
          <h2 className="text-lg font-medium mb-2">Home Screen Design</h2>
          <p className="text-sm text-muted-foreground">
            The design below represents the current implementation of the Skin Savvy home screen.
          </p>
        </div>
        
        {/* Include the actual Home Screen component */}
        <div className="home-screen-preview">
          <Index />
        </div>
      </div>
    </div>
  );
};

export default DesignExport;
