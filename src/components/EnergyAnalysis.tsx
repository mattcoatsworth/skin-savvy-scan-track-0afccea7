
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Image, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

interface EnergyAnalysisProps {
  className?: string;
}

const EnergyAnalysis = ({ className }: EnergyAnalysisProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
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
      
      setAnalysis(data.analysis);
      
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

  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-purple-500" />
          <h2 className="text-lg font-semibold">Energy Analysis</h2>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Upload a selfie to receive a holistic and metaphysical analysis of your skin's energy
          {isOnLogSkinPage && " that considers your skin logs and daily factors"}.
        </p>
        
        {!selectedImage ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
            <Image className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-center text-gray-500 mb-3">
              Select a selfie for energy analysis
            </p>
            <Button 
              variant="outline" 
              className="relative"
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
            <AspectRatio ratio={1/1} className="bg-muted rounded-md overflow-hidden">
              <img 
                src={selectedImage} 
                alt="Selected selfie" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
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
                className="bg-purple-500 hover:bg-purple-600"
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
          <div className="mt-4 border border-red-100 bg-red-50 rounded-md p-4">
            <h3 className="text-md font-medium mb-2 text-red-800">Analysis Failed</h3>
            <div className="text-sm text-red-700">
              {error}
            </div>
          </div>
        )}
        
        {analysis && !error && (
          <div className="mt-4 border border-purple-100 bg-purple-50 rounded-md p-4">
            <h3 className="text-md font-medium mb-2 text-purple-800">Energetic Analysis</h3>
            <div className="text-sm text-purple-900 whitespace-pre-line">
              {analysis}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnergyAnalysis;
