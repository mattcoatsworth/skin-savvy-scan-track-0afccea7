
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon, Zap, Leaf, BookOpen, Heart, Circle, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

interface EnergyAnalysisProps {
  className?: string;
}

interface AnalysisData {
  traditionalChineseMedicine: string;
  chakraTheory: string;
  metaphysicalSymbolism: string;
  holisticRemedies: string;
  suggestedFoods: string;
}

const EnergyAnalysis = ({ className }: EnergyAnalysisProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  
  // Check if we're on the log-skin-condition page
  const isOnLogSkinPage = location.pathname.includes('log-skin-condition');

  // Function to validate and optimize image
  const processImage = async (imageDataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Create an image object to work with
      const img = new Image();
      img.onload = () => {
        // Check dimensions and resize if needed
        const maxDimension = 2048;
        let width = img.width;
        let height = img.height;
        let needsResize = false;
        
        if (width > maxDimension || height > maxDimension) {
          needsResize = true;
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        
        // If we don't need to resize, just return the original
        if (!needsResize) {
          resolve(imageDataUrl);
          return;
        }
        
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG with reasonable quality to reduce size
        try {
          const resizedImageData = canvas.toDataURL('image/jpeg', 0.85);
          resolve(resizedImageData);
        } catch (err) {
          reject(new Error('Failed to resize image'));
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageDataUrl;
    });
  };

  // Function to handle image selection
  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (limit to 10MB to be safe)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setError(`Image size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds the 10MB limit.`);
        toast({
          title: "Image too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setSelectedImage(imageData);
        setAnalysis(null); // Reset any previous analysis
        setError(null); // Reset any previous errors
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to get user ID if logged in
  const getUserId = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.user?.id || null;
    } catch (error) {
      console.log("Error getting user session:", error);
      return null;
    }
  };

  // Function to analyze the selfie
  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select a selfie to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Optimize the image before sending
      const processedImage = await processImage(selectedImage);
      
      // Get the user ID if available
      const userId = await getUserId();
      console.log("Current user ID:", userId);

      // Generate a unique request ID to prevent caching
      const requestId = uuidv4();

      // Call the Supabase Function for analysis
      const response = await fetch('https://jgfsyayitqlelvtjresx.supabase.co/functions/v1/analyze-energy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: processedImage,
          userId: userId, // Send the userId if available
          timestamp: Date.now(), // Add timestamp to prevent caching
          requestId: requestId // Add unique request ID
        }),
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server response:", errorData);
        let errorMessage = "Error analyzing image";
        
        try {
          const parsedError = JSON.parse(errorData);
          errorMessage = parsedError.error || errorMessage;
        } catch (e) {
          // If parsing fails, use the raw error text
          errorMessage = errorData || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        throw new Error("Failed to parse server response");
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Debug the response data structure
      console.log("Analysis data structure:", JSON.stringify(data.analysis));
      
      // Check if analysis data is null or undefined
      if (!data.analysis) {
        throw new Error("The analysis could not be generated. The AI may have refused to analyze the image.");
      }
      
      // Process the response data to create our analysis object with safety checks
      const processedAnalysis: AnalysisData = {
        traditionalChineseMedicine: formatAnalysisSection(data.analysis.traditionalChineseMedicine || "No traditional Chinese medicine insights available."),
        chakraTheory: formatAnalysisSection(data.analysis.chakraTheory || "No chakra theory insights available."),
        metaphysicalSymbolism: formatAnalysisSection(data.analysis.metaphysicalSymbolism || "No metaphysical symbolism insights available."),
        holisticRemedies: formatAnalysisSection(data.analysis.holisticRemedies || "No holistic remedies available."),
        suggestedFoods: formatAnalysisSection(data.analysis.suggestedFoods || "No food suggestions available.")
      };
      
      setAnalysis(processedAnalysis);
      
      // Show toast about whether skin log data was included
      if (isOnLogSkinPage && data.includedSkinData) {
        toast({
          title: "Holistic Analysis Complete",
          description: "Your analysis includes your recent skin logs and factors",
          variant: "default",
        });
      } else if (isOnLogSkinPage && !data.includedSkinData) {
        toast({
          title: "Basic Analysis Complete",
          description: "Continue logging your skin conditions for a more personalized analysis",
          variant: "default",
        });
      } else {
        toast({
          title: "Energy Analysis Complete",
          description: "Your holistic skin reading is ready",
          variant: "default",
        });
      }
      
    } catch (error) {
      console.error("Error analyzing image:", error);
      setError(error instanceof Error ? error.message : "Could not analyze the image. Please try again later.");
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Could not analyze the image. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Unified helper function to format any analysis section
  const formatAnalysisSection = (data: any): string => {
    // If there's no data, return a default message
    if (!data) return "No information available";
    
    // If it's already a string, return it directly
    if (typeof data === 'string') return data;
    
    // If it's an object, we'll format it as key-value pairs
    if (typeof data === 'object' && data !== null) {
      let result = '';
      
      // Handle different possible structures in the API response
      Object.entries(data).forEach(([key, value]) => {
        // If the key is a known nested object structure
        if (['organAssociations', 'energyConnections', 'skinConditions', 'visibleSkinConditions'].includes(key)) {
          result += `${formatTitle(key)}:\n`;
          
          if (typeof value === 'object' && value !== null) {
            Object.entries(value as object).forEach(([subKey, subValue]) => {
              result += `• ${subKey}: ${subValue}\n`;
            });
          }
          result += '\n';
        } 
        // If the value is an array (like for remedies or foods)
        else if (Array.isArray(value)) {
          result += `${formatTitle(key)}:\n`;
          value.forEach((item: string) => {
            result += `• ${item}\n`;
          });
          result += '\n';
        } 
        // For simple key-value pairs like strings
        else if (typeof value === 'string') {
          // If it looks like a descriptive field rather than a category
          if (['TCMInsights', 'chakraInsights', 'symbolicInsights', 'symbolicMeanings'].includes(key)) {
            result += `${value}\n\n`;
          } else {
            // Otherwise treat it as a titled section
            result += `${formatTitle(key)}: ${value}\n\n`;
          }
        }
        // If it's a nested object that's not recognized above
        else if (typeof value === 'object' && value !== null) {
          result += `${formatTitle(key)}:\n`;
          
          Object.entries(value as object).forEach(([subKey, subValue]) => {
            if (Array.isArray(subValue)) {
              result += `${formatTitle(subKey)}:\n`;
              (subValue as string[]).forEach(item => {
                result += `• ${item}\n`;
              });
            } else if (typeof subValue === 'string') {
              result += `• ${formatTitle(subKey)}: ${subValue}\n`;
            }
          });
          
          result += '\n';
        }
      });
      
      return result.trim() || "No details available";
    }
    
    // Fallback for any other data type
    return String(data) || "No information available";
  };
  
  // Helper function to format category titles nicely
  const formatTitle = (text: string): string => {
    return text
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();
  };

  // Component for displaying a section of the analysis
  const AnalysisCard = ({ 
    title, 
    content, 
    icon, 
    gradientFrom = "from-purple-500", 
    gradientTo = "to-indigo-600",
    iconBgFrom = "from-purple-400",
    iconBgTo = "to-indigo-600"
  }: { 
    title: string; 
    content: string; 
    icon: React.ReactNode;
    gradientFrom?: string;
    gradientTo?: string;
    iconBgFrom?: string;
    iconBgTo?: string;
  }) => {
    return (
      <Card className="mb-4 overflow-hidden shadow-md border border-gray-100">
        <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} px-4 py-3.5 rounded-t-lg`}>
          <h3 className="text-md font-medium text-white flex items-center gap-2.5">
            <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${iconBgFrom} ${iconBgTo} flex items-center justify-center text-white shadow-sm`}>
              {icon}
            </div>
            {title}
          </h3>
        </div>
        <CardContent className="p-5 bg-white">
          <div className="prose prose-sm text-gray-800 leading-relaxed whitespace-pre-line">
            {content || "No information available."}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className={`${className} overflow-hidden border-gray-100 shadow-md`}>
      <CardContent className="p-5 space-y-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white shadow-sm">
            <Zap className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Energy Analysis</h2>
        </div>
        
        <p className="text-sm text-gray-600 mb-6">
          Upload a selfie to receive a holistic and metaphysical analysis of your skin's energy
          {isOnLogSkinPage && " that considers your skin logs and daily factors"}.
        </p>
        
        {!selectedImage ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 bg-gray-50 transition-all hover:bg-gray-100 hover:border-purple-200">
            <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-4">
              <ImageIcon className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-center text-gray-700 mb-4">
              Select a selfie for energy analysis
            </p>
            <Button 
              variant="outline" 
              className="relative bg-white border-purple-100 text-purple-700 hover:bg-purple-50 hover:border-purple-200 transition-colors shadow-sm"
              onClick={() => document.getElementById('selfie-upload')?.click()}
            >
              Choose Image
              <input 
                id="selfie-upload"
                type="file" 
                accept="image/*" 
                className="hidden absolute" 
                onChange={handleImageSelection} 
              />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <AspectRatio ratio={1/1} className="bg-gray-50 rounded-xl overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt="Selected selfie" 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-200 hover:bg-gray-50 text-gray-600"
                onClick={() => {
                  setSelectedImage(null);
                  setAnalysis(null);
                  setError(null);
                }}
              >
                Change Image
              </Button>
              
              <Button 
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all rounded-md"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : analysis ? "Analyze Again" : "Analyze Energy"}
              </Button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mt-4 border border-red-100 bg-red-50 rounded-lg p-4 shadow-sm">
            <h3 className="text-md font-medium mb-2 text-red-800">Analysis Failed</h3>
            <div className="text-sm text-red-700">
              {error}
            </div>
          </div>
        )}
        
        {analysis && !error && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Energetic Analysis</h3>
            
            <AnalysisCard 
              title="Traditional Chinese Medicine" 
              content={analysis.traditionalChineseMedicine}
              icon={<BookOpen className="h-3 w-3" />}
              gradientFrom="from-amber-400"
              gradientTo="to-orange-500"
              iconBgFrom="from-amber-300"
              iconBgTo="to-orange-400"
            />
            
            <AnalysisCard 
              title="Chakra Theory" 
              content={analysis.chakraTheory}
              icon={<Circle className="h-3 w-3" />}
              gradientFrom="from-purple-400"
              gradientTo="to-purple-700"
              iconBgFrom="from-purple-300"
              iconBgTo="to-purple-600"
            />
            
            <AnalysisCard 
              title="Metaphysical Symbolism" 
              content={analysis.metaphysicalSymbolism}
              icon={<Heart className="h-3 w-3" />}
              gradientFrom="from-indigo-400"
              gradientTo="to-blue-600"
              iconBgFrom="from-indigo-300"
              iconBgTo="to-blue-500"
            />
            
            <AnalysisCard 
              title="Suggested Holistic Remedies" 
              content={analysis.holisticRemedies}
              icon={<Leaf className="h-3 w-3" />}
              gradientFrom="from-green-400"
              gradientTo="to-teal-500"
              iconBgFrom="from-green-300"
              iconBgTo="to-teal-400"
            />
            
            <AnalysisCard 
              title="Suggested Foods" 
              content={analysis.suggestedFoods}
              icon={<Utensils className="h-3 w-3" />}
              gradientFrom="from-yellow-400"
              gradientTo="to-amber-500"
              iconBgFrom="from-yellow-300"
              iconBgTo="to-amber-400"
            />
            
            <div className="bg-white px-4 py-3 border border-gray-100 rounded-lg mt-4">
              <p className="text-xs text-gray-500 italic">
                This analysis is based on holistic principles and is for personal insight only, not medical advice.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnergyAnalysis;
