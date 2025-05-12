
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import SelfieCarousel from "./SelfieCarousel";
import SelfieSection from "./SelfieSection";

interface DailySkinSnapshotProps {
  title?: string;
}

const DailySkinSnapshot: React.FC<DailySkinSnapshotProps> = ({ 
  title = "Today's Selfies" 
}) => {
  // State to store selfie images
  const [selfieImages, setSelfieImages] = useState({
    am: [] as (string | null)[],
    pm: [] as (string | null)[]
  });

  // Load selfies from localStorage on component mount
  useEffect(() => {
    const savedAmSelfies = localStorage.getItem(`am-selfies-today`);
    const savedPmSelfies = localStorage.getItem(`pm-selfies-today`);
    
    if (savedAmSelfies) {
      setSelfieImages(prev => ({
        ...prev,
        am: JSON.parse(savedAmSelfies)
      }));
    }
    
    if (savedPmSelfies) {
      setSelfieImages(prev => ({
        ...prev,
        pm: JSON.parse(savedPmSelfies)
      }));
    }
  }, []);

  // Handle adding a selfie image
  const handleAddSelfie = (type: "am" | "pm", index: number) => {
    // In a real app, this would open the camera or file selector
    // For demo, we'll use placeholder images
    const placeholderImages = [
      "https://source.unsplash.com/random/300x300/?face&sig=1",
      "https://source.unsplash.com/random/300x300/?face&sig=2",
      "https://source.unsplash.com/random/300x300/?face&sig=3",
      "https://source.unsplash.com/random/300x300/?face&sig=4"
    ];
    
    const newImages = [...(selfieImages[type] || [])];
    newImages[index] = placeholderImages[index % placeholderImages.length];
    
    setSelfieImages(prev => ({
      ...prev,
      [type]: newImages
    }));
    
    // Save to localStorage
    localStorage.setItem(`${type}-selfies-today`, JSON.stringify(newImages));
  };

  return (
    <div className="ios-section">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <Card className="ios-card">
        <CardContent className="p-4">
          <SelfieSection 
            amImages={selfieImages.am}
            pmImages={selfieImages.pm}
            onAddImage={handleAddSelfie}
            maxImages={4}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DailySkinSnapshot;
