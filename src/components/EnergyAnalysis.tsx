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
  const { toast } = useToast();

  // Function to handle image selection
  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(null); // Reset any previous analysis
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
    try {
      // Attempt to get analysis from localStorage cache first
      const cacheKey = `energy-analysis-${selectedImage.substring(0, 50)}`;
      const cachedAnalysis = localStorage.getItem(cacheKey);
      
      if (cachedAnalysis) {
        setAnalysis(cachedAnalysis);
        setIsAnalyzing(false);
        return;
      }

      // Otherwise, proceed with analysis via Supabase function
      const { data, error } = await fetch('/api/analyze-energy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: selectedImage 
        }),
      }).then(res => res.json());

      if (error) {
        throw new Error(error.message);
      }

      // Generate a placeholder analysis for demo purposes
      // In production, this would come from the OpenAI API
      const placeholderAnalysis = `
        Energetically speaking, your skin is reflecting a balanced flow of vital energy in most areas. 
        There's a subtle glow emanating from your skin that suggests good qi circulation. 
        The areas around your cheeks show signs of heart chakra activation, while your forehead 
        indicates strong third-eye energy. Your skin's natural luminosity points to a well-balanced 
        root chakra providing grounding energy to your entire system.
        
        Some areas around your jawline suggest minor energy blockages that might be related to 
        unexpressed communication or emotions. A gentle practice of throat chakra meditation 
        could help clear these subtle imbalances. Overall, your skin's energetic pattern shows 
        remarkable resilience and a natural ability to self-regulate its vital force.
      `;
      
      // In production, this would be the actual response from OpenAI
      setAnalysis(placeholderAnalysis);
      
      // Cache the result
      localStorage.setItem(cacheKey, placeholderAnalysis);
      
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis failed",
        description: "Could not analyze the image. Please try again later.",
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
                onClick={() => setSelectedImage(null)}
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
        
        {analysis && (
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
