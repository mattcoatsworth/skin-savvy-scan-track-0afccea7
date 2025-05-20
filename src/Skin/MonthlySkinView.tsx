
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import TrendChart from "@/components/TrendChart";
import { getRatingColor } from "./utils";

// Sample data for monthly view
const sampleMonthlyData = {
  month: "July 2024",
  averageScore: 76,
  previousMonthScore: 72,
  monthlyTrend: [
    { date: "Week 1", value: 65 },
    { date: "Week 2", value: 72 },
    { date: "Week 3", value: 80 },
    { date: "Week 4", value: 85 }
  ],
  topPositiveFactors: [
    { name: "Regular hydration", impact: "+20%" },
    { name: "Vitamin C serum", impact: "+15%" }
  ],
  topNegativeFactors: [
    { name: "Stress levels", impact: "-10%" },
    { name: "Dairy consumption", impact: "-8%" }
  ],
  calendarData: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    score: Math.floor(Math.random() * 100),
    hasEntry: Math.random() > 0.2 // 80% chance of having data
  }))
};

const MonthlySkinView: React.FC = () => {
  // State for month navigation
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonthIndex(prev => prev + 1);
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };
  
  // Check if this is the current month
  const isCurrentMonth = currentMonthIndex === 0;
  
  // Get day summary data
  const getDaySummary = (day: number) => {
    const dayData = sampleMonthlyData.calendarData.find(d => d.day === day);
    if (!dayData || !dayData.hasEntry) return null;
    
    return {
      score: dayData.score,
      status: dayData.score >= 70 ? "Good" : dayData.score >= 40 ? "Average" : "Poor",
      color: getRatingColor(dayData.score)
    };
  };
  
  // Day summary for selected day
  const selectedDaySummary = selectedDay ? getDaySummary(selectedDay) : null;
  
  return (
    <div className="space-y-6">
      {/* Month Selector */}
      <Card className="ios-card">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={goToPreviousMonth}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <p className="font-medium">
                {isCurrentMonth ? "This Month" : `Month ${currentMonthIndex} ago`}
              </p>
              <p className="text-sm text-muted-foreground">
                {sampleMonthlyData.month}
              </p>
            </div>
            
            <button 
              className={`p-2 rounded-full ${!isCurrentMonth ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
              onClick={goToNextMonth}
              disabled={isCurrentMonth}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* Monthly Calendar */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Monthly Overview</h2>
        <Card className="ios-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={i} className="text-center text-xs font-medium py-1">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Offset for the first day of the month */}
              {Array.from({ length: 5 }, (_, i) => (
                <div key={`offset-${i}`} className="aspect-square"></div>
              ))}
              
              {/* Calendar days */}
              {sampleMonthlyData.calendarData.map((day, i) => (
                <button
                  key={i}
                  className={`flex items-center justify-center aspect-square rounded-md text-xs
                            ${day.hasEntry 
                              ? `bg-${day.score >= 70 ? 'green' : day.score >= 40 ? 'yellow' : 'red'}-100` 
                              : 'bg-gray-100'} 
                            ${selectedDay === day.day ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedDay(day.day)}
                >
                  {day.day}
                </button>
              ))}
            </div>
            
            {/* Selected day summary */}
            {selectedDay && selectedDaySummary && (
              <div className="mt-4 p-3 bg-slate-50 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">July {selectedDay}</span>
                  <span 
                    className="px-2 py-0.5 text-xs rounded-full"
                    style={{ 
                      backgroundColor: `${selectedDaySummary.color}20`, 
                      color: selectedDaySummary.color 
                    }}
                  >
                    {selectedDaySummary.status}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Skin Score</span>
                    <span className="text-sm font-medium">{selectedDaySummary.score}</span>
                  </div>
                  <Progress value={selectedDaySummary.score} className="h-1.5" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Monthly Stats</h2>
        <Card className="ios-card">
          <CardContent className="p-4 space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-3xl font-bold">{sampleMonthlyData.averageScore}</span>
                <span className="text-green-600 text-sm">+{sampleMonthlyData.averageScore - sampleMonthlyData.previousMonthScore} from last month</span>
              </div>
              <Progress value={sampleMonthlyData.averageScore} className="h-2" />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-3">Monthly Trend</p>
              <TrendChart data={sampleMonthlyData.monthlyTrend} height={100} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Insights */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Monthly Insights</h2>
        
        <div className="space-y-4">
          {/* Positive Factors */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <h3 className="font-medium text-green-600 mb-2">Top Positive Factors</h3>
              <ul className="space-y-2">
                {sampleMonthlyData.topPositiveFactors.map((factor, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{factor.name}</span>
                    <span className="font-medium text-green-600">{factor.impact}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Negative Factors */}
          <Card className="ios-card">
            <CardContent className="p-4">
              <h3 className="font-medium text-red-600 mb-2">Top Negative Factors</h3>
              <ul className="space-y-2">
                {sampleMonthlyData.topNegativeFactors.map((factor, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{factor.name}</span>
                    <span className="font-medium text-red-600">{factor.impact}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MonthlySkinView;
