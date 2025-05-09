
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { format, subDays } from "date-fns";
import SkinHistory from "@/components/SkinHistory";
import BackButton from "@/components/BackButton";

// Generate data for the past 7 days for skin history chart
const generatePastWeekData = () => {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return Array(7).fill(null).map((_, index) => {
    const date = subDays(today, 6 - index);
    const dayName = days[date.getDay()];
    const dateStr = format(date, "M/d");
    // Generate a random rating between 40 and 95 for demo purposes
    const rating = Math.floor(Math.random() * (95 - 40 + 1)) + 40;
    
    return {
      day: dayName,
      date: dateStr,
      rating
    };
  });
};

// Data for skin history chart
const skinRatings = generatePastWeekData();

// Define the type for a day log
type DayLogType = {
  id: string;
  date: Date;
  rating: number;
  summary: string;
  factors: {
    food: string[];
    products: string[];
    skin: string[];
  };
};

// Determine progress color based on rating
const getProgressColor = (rating: number) => {
  if (rating >= 70) return "#4ADE80"; // Green for good ratings
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  return "#F87171"; // Red for poor ratings
};

// Get the lighter background color for the circle
const getBackgroundColor = (rating: number) => {
  if (rating >= 70) return "#E6F8EA"; // Light green
  if (rating >= 40) return "#FEF7CD"; // Light yellow
  return "#FFDEE2"; // Light red
};

// Determine label based on rating
const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

const History = () => {
  // Generate 7 days of mock data
  const dayLogs: DayLogType[] = Array.from({ length: 7 }).map((_, index) => {
    const date = subDays(new Date(), index);
    const rating = Math.floor(Math.random() * 100) + 1; // Random rating between 1-100
    
    return {
      id: `day-${index}`,
      date,
      rating,
      summary: rating >= 70 
        ? "Skin looking great today" 
        : rating >= 40 
          ? "Some minor issues" 
          : "Having a rough skin day",
      factors: {
        food: getRandomFactors(["Avocado", "Nuts", "Water", "Green Tea", "Dairy", "Sugar", "Processed Foods"], 2),
        products: getRandomFactors(["Retinol", "Vitamin C Serum", "Moisturizer", "Sunscreen", "Cleanser"], 2),
        skin: getRandomFactors(["Hydrated", "Dry", "Oily", "Irritated", "Calm", "Breakout"], 1),
      }
    };
  });

  function getRandomFactors(array: string[], count: number): string[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Skin</h1>
        </header>
        
        {/* Add SkinHistory at the top with moderate margin */}
        <SkinHistory ratings={skinRatings} className="mb-6" />
        
        {/* Use gap-y-6 for moderate spacing between cards to match scans page */}
        <div className="flex flex-col gap-y-6">
          {dayLogs.map((log) => (
            <Link key={log.id} to={`/day-log/${log.id}`}>
              <Card className="ios-card hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{format(log.date, "EEEE")}</h3>
                      <p className="text-sm text-muted-foreground">{format(log.date, "MMM d, yyyy")}</p>
                      <p className="text-sm mt-2">{log.summary}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {log.factors.skin.map((factor, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Background circle */}
                        <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={getBackgroundColor(log.rating)}
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        {/* Foreground circle - the actual progress */}
                        <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={getProgressColor(log.rating)}
                            strokeWidth="4"
                            strokeDasharray={`${log.rating}, 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        {/* Rating number in the center */}
                        <div className="text-sm font-semibold">
                          {log.rating}
                        </div>
                      </div>
                      <span className="text-xs mt-1 text-muted-foreground">
                        {getRatingLabel(log.rating)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
