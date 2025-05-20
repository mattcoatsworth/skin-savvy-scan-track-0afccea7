
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Image as ImageIcon, Zap, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EnergyAnalysisProps {
  className?: string;
}

interface AnalysisData {
  fullAnalysis: string;
  traditionalChineseMedicine: string;
  chakraTheory: string;
  metaphysicalSymbolism: string;
  holisticRemedies: string;
  suggestedFoods: string;
}

/**
 * Energy Analysis component
 * Allows users to upload a selfie and receive a holistic energy analysis
 */
const EnergyAnalysis: React.FC<EnergyAnalysisProps> = ({ className }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [showHealingPlan, setShowHealingPlan] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
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
        setShowHealingPlan(false); // Reset healing plan state
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
          userId: userId, 
          timestamp: Date.now(), 
          requestId: requestId 
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
      console.log("Raw response received");
      
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
      
      // Check if analysis data is null or undefined
      if (!data.analysis) {
        throw new Error("The analysis could not be generated. The AI may have refused to analyze the image.");
      }
      
      // Process the full analysis text
      setAnalysis(data.analysis);
      
      toast({
        title: "Energy Analysis Complete",
        description: "Your holistic skin reading is ready",
        variant: "default",
      });
      
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

  // Format the analysis text to enhance display of emojis and structure
  const formatAnalysisText = (text: string | undefined) => {
    if (!text) return null;
    
    // First, preserve line breaks but convert double line breaks to HTML breaks
    let formattedText = text.replace(/\n\n/g, '<br/><br/>');
    
    // Make emojis stand out more
    formattedText = formattedText.replace(/🔮|🧬|🌫️|🔥|🌿|🧘‍♀️|⚡|🌊|💫|🌀/g, '<span class="text-xl">$&</span>');
    
    // Make headings slightly larger and bolder
    formattedText = formattedText.replace(/^(.*?\:)/gm, '<strong class="text-md">$1</strong>');
    
    return { __html: formattedText };
  };

  // Show healing plan section
  const handleShowHealingPlan = () => {
    setShowHealingPlan(true);
    toast({
      title: "7-Day Healing Plan",
      description: "Your personalized healing ritual plan is now available",
      variant: "default",
    });
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
          Upload a selfie to receive a holistic and metaphysical analysis of your skin's energy.
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
                  setShowHealingPlan(false);
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
            
            <Card className="mb-4 overflow-hidden shadow-md border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3.5 rounded-t-lg">
                <h3 className="text-md font-medium text-white flex items-center gap-2.5">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-300 to-indigo-500 flex items-center justify-center text-white shadow-sm">
                    <Zap className="h-3 w-3" />
                  </div>
                  Holistic Skin Analysis
                </h3>
              </div>
              <CardContent className="p-5 bg-white">
                <div className="prose prose-sm text-gray-800 leading-relaxed">
                  {analysis.fullAnalysis ? (
                    <div dangerouslySetInnerHTML={formatAnalysisText(analysis.fullAnalysis)} />
                  ) : (
                    <p>No analysis available.</p>
                  )}
                </div>
                
                {!showHealingPlan && analysis.fullAnalysis && analysis.fullAnalysis.toLowerCase().includes("7-day") && (
                  <div className="mt-8">
                    <Button
                      onClick={handleShowHealingPlan}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all rounded-md"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Yes, I want a 7-day ritual healing plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {showHealingPlan && (
              <Collapsible className="mb-4">
                <Card className="overflow-hidden shadow-md border border-gray-100">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3.5 rounded-t-lg">
                    <CollapsibleTrigger className="w-full text-left">
                      <h3 className="text-md font-medium text-white flex items-center gap-2.5">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-300 to-teal-500 flex items-center justify-center text-white shadow-sm">
                          <MessageSquare className="h-3 w-3" />
                        </div>
                        Your 7-Day Ritual Healing Plan
                      </h3>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <CardContent className="p-5 bg-white">
                      <div className="prose prose-sm text-gray-800 leading-relaxed">
                        <h4 className="font-medium text-teal-800">Day 1: Grounding & Awareness</h4>
                        <ul className="pl-5 list-disc space-y-1">
                          <li>Morning ritual: 5-minute facial massage with intention to release</li>
                          <li>Evening practice: Journal about what emotions you're holding in your face</li>
                          <li>Healing foods: Add leafy greens for liver support</li>
                        </ul>
                        
                        <h4 className="font-medium text-teal-800 mt-4">Day 2: Expression Release</h4>
                        <ul className="pl-5 list-disc space-y-1">
                          <li>Morning ritual: Throat chakra humming meditation (5 mins)</li>
                          <li>Evening practice: Speak aloud 3 things you've been holding back</li>
                          <li>Healing drink: Dandelion tea for liver detoxification</li>
                        </ul>
                        
                        <h4 className="font-medium text-teal-800 mt-4">Day 3: Emotional Detoxification</h4>
                        <ul className="pl-5 list-disc space-y-1">
                          <li>Morning ritual: Dry brushing lymphatic system</li>
                          <li>Evening practice: Castor oil pack over liver area (20 mins)</li>
                          <li>Healing foods: Bitter foods for liver cleansing</li>
                        </ul>
                        
                        <h4 className="font-medium text-teal-800 mt-4">Day 4: Energy Circulation</h4>
                        <ul className="pl-5 list-disc space-y-1">
                          <li>Morning ritual: Gua sha facial release with rose quartz</li>
                          <li>Evening practice: Full-body stretching focused on chest opening</li>
                          <li>Healing drink: Spearmint tea for hormonal balance</li>
                        </ul>
                        
                        <h4 className="font-medium text-teal-800 mt-4">Day 5: Boundary Setting</h4>
                        <ul className="pl-5 list-disc space-y-1">
                          <li>Morning ritual: Mirror affirmations - "I honor my needs"</li>
                          <li>Evening practice: Identify and write down one boundary to set</li>
                          <li>Healing foods: Omega-rich seeds and nuts</li>
                        </ul>
                        
                        <h4 className="font-medium text-teal-800 mt-4">Day 6: Emotional Release</h4>
                        <ul className="pl-5 list-disc space-y-1">
                          <li>Morning ritual: EFT tapping on face meridian points</li>
                          <li>Evening practice: Sound bath or humming</li>
                          <li>Healing activity: Write a release letter (not to send)</li>
                        </ul>
                        
                        <h4 className="font-medium text-teal-800 mt-4">Day 7: Integration</h4>
                        <ul className="pl-5 list-disc space-y-1">
                          <li>Morning ritual: Full face massage with gratitude</li>
                          <li>Evening practice: Candlelit meditation reflecting on the week</li>
                          <li>Healing food: Prepare a meal with intention for skin healing</li>
                        </ul>
                        
                        <div className="bg-teal-50 p-4 rounded-md mt-4">
                          <p className="text-teal-800 italic">
                            Remember that holistic healing takes time - continue practices that resonate with you. Your skin is reflecting your inner journey, not defining your worth.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            )}
            
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
