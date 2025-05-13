
import React, { useEffect } from "react";
import Index from "@/pages/Index";
import AppNavigation from "@/components/AppNavigation";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DesignExport: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Add title for the export page
    document.title = "Skin Savvy - Design Export";
  }, []);

  const handlePrint = () => {
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
        <p className="text-center text-muted-foreground">Design Export - {new Date().toLocaleDateString()}</p>
      </div>
      
      {/* Controls that will only show on screen, not in print */}
      <div className="print:hidden bg-white p-4 mb-6 rounded-lg shadow-md sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Design Export</h1>
            <p className="text-sm text-muted-foreground">Use your browser's print function to save as PDF</p>
          </div>
          <div className="flex gap-2">
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
      <div className="export-content max-w-md mx-auto bg-white rounded-lg shadow-md print:shadow-none">
        {/* iOS device frame styling */}
        <div className="ios-device-frame border-2 border-gray-300 rounded-[38px] p-2 pb-0 relative overflow-hidden">
          {/* Notch at the top */}
          <div className="ios-notch h-6 w-40 bg-gray-300 absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl"></div>
          
          {/* Status bar */}
          <div className="ios-status-bar h-8 flex justify-between items-center px-8 pt-1">
            <div className="text-xs font-medium">9:41 AM</div>
            <div className="flex items-center gap-1 text-xs">
              <div className="h-2.5 w-2.5 rounded-full bg-gray-800"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-gray-800"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-gray-800"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-gray-800"></div>
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M7 15V11C7 9.89543 7.89543 9 9 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M13 15V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M17 11V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>
          
          <div className="ios-screen p-4 rounded-3xl bg-slate-50 min-h-[600px] border border-gray-100">
            {/* The actual Home Screen component */}
            <div className="home-screen-preview">
              <Index />
            </div>
            
            {/* Include the AppNavigation component */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <AppNavigation />
            </div>
          </div>
          
          {/* Home indicator at the bottom */}
          <div className="ios-home-indicator h-1.5 w-1/3 bg-gray-300 rounded-full mx-auto my-2"></div>
        </div>
        
        {/* Description below the device frame */}
        <div className="export-description border-2 border-dashed border-gray-200 p-4 rounded-lg mt-6 print:border-solid">
          <h2 className="text-lg font-medium mb-2">Skin Savvy - Mobile Design</h2>
          <p className="text-sm text-muted-foreground">
            The design above represents the current implementation of the Skin Savvy home screen with iOS-style navigation.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Generated on {new Date().toLocaleDateString()} • Skin Savvy App
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesignExport;
