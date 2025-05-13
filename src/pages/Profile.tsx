
import React, { useState, useEffect } from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Smile } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import SelfieGrid from "@/components/SelfieGrid";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Profile = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  // Sample selfie images for demonstration
  const [selfieImages, setSelfieImages] = useState<{
    id: string;
    url: string;
    date: string;
    type: "am" | "pm";
    rating: number;
  }[]>([]);
  
  // Function to load all selfie images from localStorage
  useEffect(() => {
    // Get all keys from localStorage that contain selfie data
    const selfieKeys = Object.keys(localStorage).filter(
      key => key.includes('-selfies-')
    );
    
    // If there are actual selfies in localStorage, use them instead of samples
    if (selfieKeys.length > 0) {
      const images: {
        id: string;
        url: string;
        date: string;
        type: "am" | "pm";
        rating: number;
      }[] = [];
      
      // Process each key to extract selfies
      selfieKeys.forEach(key => {
        try {
          // Extract date and type from the key
          const keyParts = key.split('-');
          const type = keyParts[0] as "am" | "pm";
          const dateId = keyParts[2]; // This will be like "day-1" or "today"
          
          // Convert dateId to a display date
          let displayDate = "Today";
          if (dateId !== "today") {
            const dayNumber = parseInt(dateId.replace('day-', ''), 10);
            if (!isNaN(dayNumber)) {
              const date = new Date();
              date.setDate(date.getDate() - dayNumber);
              displayDate = date.toLocaleDateString();
            }
          }
          
          // Get selfies from localStorage
          const storedSelfies = localStorage.getItem(key);
          if (storedSelfies) {
            const selfies = JSON.parse(storedSelfies) as (string | null)[];
            
            // Add each valid selfie to the images array
            selfies.forEach((url, index) => {
              if (url) {
                const rating = Math.floor(Math.random() * (95 - 60 + 1)) + 60; // Random rating between 60-95
                images.push({
                  id: `${key}-${index}`,
                  url,
                  date: displayDate,
                  type,
                  rating
                });
              }
            });
          }
        } catch (error) {
          console.error(`Error processing selfie key ${key}:`, error);
        }
      });
      
      // Only replace sample images if we found real ones
      setSelfieImages(images);
    } else {
      // Use sample images only if no real ones exist in localStorage
      setSelfieImages([
        {
          id: "sample-1",
          url: "https://images.unsplash.com/photo-1599842057874-37393e9342df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          date: "Today",
          type: "am",
          rating: 85
        },
        {
          id: "sample-2",
          url: "https://images.unsplash.com/photo-1508216310976-c518daae0cdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          date: "Today",
          type: "pm",
          rating: 78
        },
        {
          id: "sample-3",
          url: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          date: "Yesterday",
          type: "am",
          rating: 72
        },
        {
          id: "sample-4",
          url: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          date: "Yesterday",
          type: "pm",
          rating: 79
        },
        {
          id: "sample-5",
          url: "https://images.unsplash.com/photo-1519143591231-28371a10b1c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          date: "2 days ago",
          type: "am",
          rating: 65
        },
        {
          id: "sample-6",
          url: "https://images.unsplash.com/photo-1526758097130-bab247274f58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          date: "2 days ago",
          type: "pm",
          rating: 71
        }
      ]);
    }
  }, []);

  return (
    <div>
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Link to="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </header>
      
      <main className="space-y-6">
        {/* Today's Skin Card - Added at the top */}
        <Card className="ios-card">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <Smile className="text-4xl mr-3" />
              <div>
                <h2 className="font-medium text-lg">Today's Skin</h2>
                <p className="text-xl font-semibold">Balanced</p>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-sm font-medium mb-2">Detailed Analysis:</p>
              <p className="text-sm text-muted-foreground mb-4">
                Your skin appears balanced today with good hydration levels. Inflammation is minimal and there's
                an improvement in overall tone compared to yesterday.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Selfie Grid - Always visible now with images from localStorage */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Your Skin Photos</h2>
          <SelfieGrid images={selfieImages} />
        </div>
      </main>
    </div>
  );
};

export default Profile;
