
import React, { useEffect } from "react";
import Index from "@/pages/Index";
import AppNavigation from "@/components/AppNavigation";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DesignExport: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Add title for the export page
    document.title = "Skin Savvy - Design Export";
  }, []);

  const handleDownload = () => {
    window.print();
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="design-export">
      {/* Print-only header that will appear in the PDF */}
      <div className="print-header print:block hidden mb-8">
        <h1 className="text-2xl font-bold text-center">Skin Savvy - Home Screen Design</h1>
        <p className="text-center text-muted-foreground">Mobile Design - {new Date().toLocaleDateString()}</p>
      </div>
      
      {/* Controls that will only show on screen, not in print */}
      <div className="print:hidden bg-white p-4 mb-6 rounded-lg shadow-md sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Mobile Design Export</h1>
            <p className="text-sm text-muted-foreground">Use your browser's print function to save as PDF</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownload} variant="default" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Save as PDF
            </Button>
            <Button onClick={handleGoBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return
            </Button>
          </div>
        </div>
      </div>
      
      {/* Clean mobile view content */}
      <div className="export-content max-w-md mx-auto bg-white rounded-lg shadow-md print:shadow-none overflow-hidden">
        {/* Mobile status bar for context (only shows in PDF) */}
        <div className="mobile-status-bar h-6 bg-white border-b border-gray-100 flex justify-between items-center px-4 print:block hidden">
          <span className="text-xs font-medium">9:41 AM</span>
          <span className="text-xs">100%</span>
        </div>
        
        {/* The actual Home Screen component */}
        <div className="home-screen-content p-4 bg-slate-50">
          <Index />
        </div>
        
        {/* Navigation bar at the bottom */}
        <div className="navigation-container bg-white border-t border-gray-200">
          <AppNavigation />
        </div>
      </div>
      
      {/* Description below the mobile view */}
      <div className="export-description border border-dashed border-gray-200 p-4 rounded-lg mt-6 print:border-solid max-w-md mx-auto">
        <h2 className="text-lg font-medium mb-2">Skin Savvy - Mobile Design</h2>
        <p className="text-sm text-muted-foreground">
          This document represents the current mobile design of the Skin Savvy app home screen with navigation.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Generated on {new Date().toLocaleDateString()} • Skin Savvy App
        </p>
      </div>
    </div>
  );
};

export default DesignExport;
