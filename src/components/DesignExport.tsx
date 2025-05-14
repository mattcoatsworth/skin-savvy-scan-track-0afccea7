
import React, { useEffect } from "react";
import Index from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import AppNavigation from "@/components/AppNavigation";

const DesignExport: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Add title for the export page
    document.title = "Skin Savvy - Design Export";
    
    // Apply specific styles for export view
    document.body.classList.add('design-export-view');
    
    return () => {
      // Clean up styles when component unmounts
      document.body.classList.remove('design-export-view');
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPNG = async () => {
    try {
      // Find the content to capture
      const contentElement = document.querySelector('.home-screen-preview') as HTMLElement;
      
      if (!contentElement) {
        toast({
          title: "Error",
          description: "Could not find content to export",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Generating PNG",
        description: "Please wait while we create your PNG..."
      });
      
      // Use html2canvas with improved settings
      const canvas = await html2canvas(contentElement, {
        scale: 3, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
        logging: false, // Disable logging
        backgroundColor: "#ffffff", // White background
        width: contentElement.offsetWidth,
        height: contentElement.offsetHeight,
        onclone: (documentClone) => {
          // Apply direct styles to ensure consistency
          const clonedElement = documentClone.querySelector('.home-screen-preview') as HTMLElement;
          if (clonedElement) {
            // Force apply consistent styles to ensure matching appearance
            const styleElement = documentClone.createElement('style');
            styleElement.textContent = `
              /* Force consistent styling for export */
              .home-screen-preview {
                width: 390px !important;
                box-shadow: none !important;
                background-color: white !important;
                padding: 16px !important;
                border: none !important;
              }
              .app-navigation-bar {
                position: relative !important;
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                border-top: 1px solid #eaeaea !important;
                margin-top: 20px !important;
                padding: 8px 0 !important;
                display: block !important;
              }
              /* Fix recommendation styling */
              .recommendation-item {
                display: flex !important;
                padding: 12px 16px !important;
                margin-bottom: 8px !important;
                border-radius: 9999px !important;
                gap: 8px !important;
                align-items: center !important;
              }
              .recommendation-item.skincare {
                background-color: #e0edff !important;
                color: #2563eb !important;
              }
              .recommendation-item.food {
                background-color: #dcfce7 !important;
                color: #16a34a !important;
              }
              .recommendation-item.lifestyle {
                background-color: #ffedd5 !important;
                color: #c2410c !important;
              }
              .recommendation-item.supplements {
                background-color: #e0e7ff !important;
                color: #4f46e5 !important;
              }
            `;
            documentClone.head.appendChild(styleElement);
          }
        }
      });
      
      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create a link element to download the image
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `skin-savvy-home-${new Date().toISOString().split('T')[0]}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "PNG Generated",
        description: "Your PNG has been successfully downloaded",
      });
    } catch (error) {
      console.error("PNG export error:", error);
      toast({
        title: "Export Failed",
        description: "There was an error generating the PNG",
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
            <p className="text-sm text-muted-foreground">Export as PNG or print to save as PDF</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportPNG} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Save as PNG
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print / Save PDF
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
        
        {/* Include the actual Home Screen component with navigation */}
        <div className="home-screen-preview relative export-preview">
          <Index />
          <div className="app-navigation-bar">
            <AppNavigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignExport;
