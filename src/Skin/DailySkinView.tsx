
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Info, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import FactorsList from "./FactorsList";
import { DaySkinData, SkinFactor } from "./types";
import { getRatingColor, getRatingBgColor, getRatingLabel } from "@/utils/skin-utils";

// Sample data for the daily skin condition
const sampleDailySkinData = {
  today: {
    date: new Date().toISOString(),
    isLogged: true,
    condition: "Balanced",
    score: 75,
    analysis: "Your skin appears balanced today with good hydration levels. Inflammation is minimal and there's an improvement in overall tone compared to yesterday."
  },
  
  calendarDates: [
    { day: "2024-07-20", hasEntry: true, rating: 65 },
    { day: "2024-07-19", hasEntry: true, rating: 72 },
    { day: "2024-07-18", hasEntry: true, rating: 78 },
    { day: "2024-07-17", hasEntry: true, rating: 80 },
    { day: "2024-07-16", hasEntry: false, rating: 0 },
    { day: "2024-07-15", hasEntry: true, rating: 85 },
    { day: "2024-07-14", hasEntry: true, rating: 88 },
  ]
};

// Sample data for skin factors
const sampleFactors: SkinFactor[] = [
  { type: "Food", status: "Hydrating", iconName: "salad", details: "Increased water-rich foods and avoided dairy this week" },
  { type: "Supplement", status: "New", iconName: "pill", details: "Started collagen supplement 3 days ago" },
  { type: "Makeup", status: "Same as usual", iconName: "palette", details: "Using the same foundation and concealer" },
  { type: "Weather", status: "Dry + Cold", iconName: "cloud-sun", details: "Low humidity affecting skin hydration" },
  { type: "Sleep", status: "Improved", iconName: "moon-star", details: "Getting 7+ hours consistently this week" },
  { type: "Stress", status: "Moderate", iconName: "activity", details: "Work deadline approaching" },
];

const DailySkinView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  
  const isToday = selectedDate === new Date().toISOString().split("T")[0];
  const hasLoggedEntry = isToday ? sampleDailySkinData.today.isLogged : 
    sampleDailySkinData.calendarDates.some(date => 
      date.day === selectedDate && date.hasEntry
    );
    
  return (
    <div className="space-y-6">
      {/* Calendar/Date Selector */}
      <div className="mb-4">
        <Card className="ios-card">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <Calendar className="text-2xl mr-3" />
              <h2 className="font-medium">Calendar</h2>
            </div>
            
            {/* Calendar visualization - Updated with circular rating display */}
            <div className="grid grid-cols-7 gap-2">
              {sampleDailySkinData.calendarDates.map((date, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center justify-center aspect-square rounded-md p-2
                             ${selectedDate === date.day ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedDate(date.day)}
                >
                  <span className="text-xs text-gray-500 mb-1">
                    {new Date(date.day).getDate()}
                  </span>
                  
                  {date.hasEntry ? (
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getRatingBgColor(date.rating) }}
                    >
                      <span 
                        className="text-xs font-semibold"
                        style={{ color: getRatingColor(date.rating) }}
                      >
                        {date.rating}
                      </span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Today's Skin Card */}
      <div className="mb-6">
        <Card className="ios-card">
          <CardContent className="p-4">
            {hasLoggedEntry ? (
              // Logged skin condition view
              <Link to={`/day-log/${selectedDate}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Smile className="text-4xl mr-3" />
                    <div>
                      <h2 className="font-medium text-lg">
                        {isToday ? "Today's" : "Selected Day's"} Skin
                      </h2>
                      <p className="text-xl font-semibold">
                        {sampleDailySkinData.today.condition}
                      </p>
                    </div>
                  </div>
                  
                  {/* Updated Rating Circle to match Weekly Skin Report */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getRatingBgColor(sampleDailySkinData.today.score) }}
                    >
                      <span 
                        className="text-lg font-semibold"
                        style={{ color: getRatingColor(sampleDailySkinData.today.score) }}
                      >
                        {sampleDailySkinData.today.score}
                      </span>
                    </div>
                    <span 
                      className="text-xs mt-1 font-medium"
                      style={{ color: getRatingColor(sampleDailySkinData.today.score) }}
                    >
                      {getRatingLabel(sampleDailySkinData.today.score)}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Detailed Analysis:</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {sampleDailySkinData.today.analysis}
                  </p>
                </div>
              </Link>
            ) : (
              // Not logged yet view
              <Link to="/log-skin-condition">
                <div className="flex flex-col items-center py-6">
                  <Info className="h-12 w-12 text-blue-500 mb-3" />
                  <h3 className="text-lg font-medium mb-2">
                    {isToday ? "Log Today's Skin" : "No Data For This Day"}
                  </h3>
                  <p className="text-sm text-center text-muted-foreground mb-3">
                    {isToday 
                      ? "Track your skin condition to get personalized insights" 
                      : "Log data for this date to view analysis"}
                  </p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    {isToday ? "Log Now" : "Add Entry"}
                  </button>
                </div>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Daily Factors */}
      {hasLoggedEntry && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Daily Factors</h2>
          <FactorsList factors={sampleFactors} />
        </div>
      )}
    </div>
  );
};

export default DailySkinView;
