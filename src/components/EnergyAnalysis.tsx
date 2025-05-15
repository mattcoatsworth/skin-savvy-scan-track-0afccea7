
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Image, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface EnergyAnalysisProps {
  className?: string;
}

const EnergyAnalysis = ({ className }: EnergyAnalysisProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to handle image selection
  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(null); // Reset any previous analysis
        setError(null); // Reset any previous errors
      };
      reader.readAsDataURL(file);
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
      // Attempt to get analysis from localStorage cache first
      const cacheKey = `energy-analysis-${selectedImage.substring(0, 50)}`;
      const cachedAnalysis = localStorage.getItem(cacheKey);
      
      if (cachedAnalysis) {
        setAnalysis(cachedAnalysis);
        setIsAnalyzing(false);
        return;
      }

      // Call the Supabase Function for analysis
      const response = await fetch('https://jgfsyayitqlelvtjresx.supabase.co/functions/v1/analyze-energy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: selectedImage 
        }),
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
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
      
      // Cache the result
      localStorage.setItem(cacheKey, data.analysis);
      
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
          Upload a selfie to receive a holistic and metaphysical analysis of your skin's energy.
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
