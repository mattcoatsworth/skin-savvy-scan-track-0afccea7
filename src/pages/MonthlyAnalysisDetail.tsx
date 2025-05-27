import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Progress } from "@/components/ui/progress";
import TrendChart from "@/components/TrendChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useScrollToTop from "@/hooks/useScrollToTop";
import { getRatingColor, getRatingBgColor, getRatingLabel } from "@/utils/skin-utils";

type FactorType = {
  name: string;
  description: string;
  impact: number;
  consistency: number;
  trend: {
    date: string;
    value: number;
  }[];
};

const MonthlyAnalysisDetail = () => {
  // Apply the scroll to top hook
  useScrollToTop();
  
  // State for selected day in calendar
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Sample calendar data for May 2025
  const calendarData = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    score: Math.floor(Math.random() * 100),
    hasEntry: Math.random() > 0.2 // 80% chance of having data
  }));
  
  // Get day summary data
  const getDaySummary = (day: number) => {
    const dayData = calendarData.find(d => d.day === day);
    if (!dayData || !dayData.hasEntry) return null;
    
    return {
      score: dayData.score,
      status: getRatingLabel(dayData.score),
      color: getRatingColor(dayData.score)
    };
  };
  
  // Selected day summary
  const selectedDaySummary = selectedDay ? getDaySummary(selectedDay) : null;

  // Sample data for the monthly analysis
  const positiveFactors: FactorType[] = [
    {
      name: "Regular hydration",
      description: "Drinking 8+ glasses of water daily has significantly improved skin hydration and elasticity.",
      impact: 85,
      consistency: 78,
      trend: [
        { date: "Week 1", value: 65 },
        { date: "Week 2", value: 72 },
        { date: "Week 3", value: 78 },
        { date: "Week 4", value: 85 }
      ]
    },
    {
      name: "Consistent SPF usage",
      description: "Daily application of SPF 30+ has reduced redness and prevented new sunspots.",
      impact: 92,
      consistency: 95,
      trend: [
        { date: "Week 1", value: 80 },
        { date: "Week 2", value: 85 },
        { date: "Week 3", value: 90 },
        { date: "Week 4", value: 92 }
      ]
    },
    {
      name: "Vitamin C serum application",
      description: "Morning application has shown measurable improvements in skin brightness and texture.",
      impact: 78,
      consistency: 68,
      trend: [
        { date: "Week 1", value: 60 },
        { date: "Week 2", value: 65 },
        { date: "Week 3", value: 72 },
        { date: "Week 4", value: 78 }
      ]
    },
  ];
  
  const negativeFactors: FactorType[] = [
    {
      name: "Processed sugar consumption",
      description: "Days with high sugar intake showed increased inflammation and breakouts within 24-48 hours.",
      impact: 65,
      consistency: 42,
      trend: [
        { date: "Week 1", value: 40 },
        { date: "Week 2", value: 52 },
        { date: "Week 3", value: 58 },
        { date: "Week 4", value: 65 }
      ]
    },
    {
      name: "Less than 6 hours of sleep",
      description: "Insufficient sleep correlates with increased dullness, dark circles, and reduced skin recovery.",
      impact: 72,
      consistency: 58,
      trend: [
        { date: "Week 1", value: 45 },
        { date: "Week 2", value: 55 },
        { date: "Week 3", value: 65 },
        { date: "Week 4", value: 72 }
      ]
    },
    {
      name: "Forgetting evening cleansing routine",
      description: "Skipping evening cleansing led to clogged pores and increased oil production the next day.",
      impact: 58,
      consistency: 35,
      trend: [
        { date: "Week 1", value: 30 },
        { date: "Week 2", value: 42 },
        { date: "Week 3", value: 50 },
        { date: "Week 4", value: 58 }
      ]
    },
  ];

  const getImpactColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  const getConsistencyColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-gray-400";
  };

  return (
    <div className="pb-8">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Monthly Analysis</h1>
      </header>
      
      {/* Monthly Calendar Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">May 2025 Skin Calendar</h2>
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={i} className="text-center text-xs font-medium py-1">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Offset for the first day of the month (May 1st starts on Thursday) */}
              {Array.from({ length: 3 }, (_, i) => (
                <div key={`offset-${i}`} className="aspect-square"></div>
              ))}
              
              {/* Calendar days with skin ratings */}
              {calendarData.map((day, i) => (
                <button
                  key={i}
                  className={`flex items-center justify-center aspect-square rounded-md text-xs font-medium
                            ${day.hasEntry 
                              ? '' 
                              : 'bg-gray-100 text-gray-400'} 
                            ${selectedDay === day.day ? 'ring-2 ring-blue-500' : ''}
                            ${day.hasEntry ? 'hover:opacity-80 transition-opacity' : ''}`}
                  style={day.hasEntry ? { 
                    backgroundColor: getRatingBgColor(day.score),
                    color: getRatingColor(day.score)
                  } : {}}
                  onClick={() => day.hasEntry ? setSelectedDay(day.day) : null}
                  disabled={!day.hasEntry}
                >
                  {day.day}
                </button>
              ))}
            </div>
            
            {/* Selected day summary */}
            {selectedDay && selectedDaySummary && (
              <div className="mt-4 p-3 bg-slate-50 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">May {selectedDay}, 2025</span>
                  <span 
                    className="px-2 py-0.5 text-xs rounded-full font-medium"
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
            
            {/* Legend */}
            <div className="mt-4 flex justify-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: getRatingBgColor(85) }}></div>
                <span>Great</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: getRatingBgColor(65) }}></div>
                <span>Good</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: getRatingBgColor(45) }}></div>
                <span>OK</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: getRatingBgColor(25) }}></div>
                <span>Poor</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-gray-100"></div>
                <span>No data</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">May 2025 Overview</h2>
            <p className="text-muted-foreground mb-4">
              This month's analysis shows significant improvements in overall skin health. 
              Your consistency with key positive habits has increased by 14% compared to last month.
            </p>
            
            <div className="space-y-2 mb-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Skin Health</span>
                  <span className="text-sm font-medium text-green-600">78/100</span>
                </div>
                <Progress value={78} className="h-2" indicatorClassName="bg-green-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Routine Consistency</span>
                  <span className="text-sm font-medium text-amber-600">65/100</span>
                </div>
                <Progress value={65} className="h-2" indicatorClassName="bg-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="positive" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="positive">Positive Factors</TabsTrigger>
          <TabsTrigger value="negative">Negative Factors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="positive" className="space-y-4">
          {positiveFactors.map((factor, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{factor.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Impact</span>
                      <span className="text-sm font-medium">{factor.impact}/100</span>
                    </div>
                    <Progress value={factor.impact} className="h-2" indicatorClassName={getImpactColor(factor.impact)} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Consistency</span>
                      <span className="text-sm font-medium">{factor.consistency}%</span>
                    </div>
                    <Progress value={factor.consistency} className="h-2" indicatorClassName={getConsistencyColor(factor.consistency)} />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Monthly Trend</h4>
                  <TrendChart data={factor.trend} height={120} />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Recommendations</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Continue your hydration routine - it's showing excellent results</li>
                <li>Maintain your SPF application, especially as summer approaches</li>
                <li>Try to increase consistency with vitamin C application for even better results</li>
                <li>Consider adding a hyaluronic acid product to enhance hydration benefits</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="negative" className="space-y-4">
          {negativeFactors.map((factor, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{factor.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Impact</span>
                      <span className="text-sm font-medium">{factor.impact}/100</span>
                    </div>
                    <Progress value={factor.impact} className="h-2" indicatorClassName={getImpactColor(factor.impact)} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Frequency</span>
                      <span className="text-sm font-medium">{factor.consistency}%</span>
                    </div>
                    <Progress value={factor.consistency} className="h-2" indicatorClassName={getConsistencyColor(factor.consistency)} />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Monthly Trend</h4>
                  <TrendChart data={factor.trend} height={120} />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Suggestions</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Try substituting processed sugars with natural alternatives like fruit</li>
                <li>Set a consistent sleep schedule to improve your rest quality</li>
                <li>Use reminder notifications for your evening cleansing routine</li>
                <li>Consider using micellar water on nights when you're too tired for full cleansing</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Month-to-Month Comparison</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">April</span>
                  <span className="text-sm font-medium">65/100</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">May (Current)</span>
                  <span className="text-sm font-medium text-green-600">78/100</span>
                </div>
                <Progress value={78} className="h-2" indicatorClassName="bg-green-500" />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium mb-2">Key Improvements</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Hydration consistency improved by 28%</li>
                <li>SPF usage increased to near-daily application</li>
                <li>Sugar consumption reduced by 15%</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyAnalysisDetail;
