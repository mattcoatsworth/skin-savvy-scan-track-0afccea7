import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Info, TrendingUp, Droplet, Crown, Clock, Thermometer } from "lucide-react";
import { Link } from "react-router-dom";
import { WeeklySkinData } from "@/Skin/types";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

// Sample data for weekly skin health
const sampleWeeklyData: WeeklySkinData = {
  weekStartDate: "2024-07-15",
  weekEndDate: "2024-07-21",
  overallScore: 82,
  previousWeekScore: 75,
  weeklyTrend: [
    { date: "Mon", value: 65 },
    { date: "Tue", value: 72 },
    { date: "Wed", value: 78 },
    { date: "Thu", value: 80 },
    { date: "Fri", value: 85 },
    { date: "Sat", value: 88 },
    { date: "Sun", value: 82 }
  ],
  dailyScores: [
    { day: "Monday", date: "2024-07-15", score: 65, note: "Slightly dehydrated" },
    { day: "Tuesday", date: "2024-07-16", score: 72, note: "Improved after increased water intake" },
    { day: "Wednesday", date: "2024-07-17", score: 78, note: "Minor breakout on chin" },
    { day: "Thursday", date: "2024-07-18", score: 80, note: "Calmer skin after using aloe" },
    { day: "Friday", date: "2024-07-19", score: 85, note: "Good skin day overall" },
    { day: "Saturday", date: "2024-07-20", score: 88, note: "Best skin day this week" },
    { day: "Sunday", date: "2024-07-21", score: 82, note: "Slight dullness in the evening" }
  ],
  skinParameters: [
    { name: "Hydration", current: 78, previous: 65 },
    { name: "Elasticity", current: 85, previous: 82 },
    { name: "Oil Control", current: 72, previous: 68 },
    { name: "Texture", current: 88, previous: 75 }
  ],
  positiveFactors: [
    { name: "Consistent hydration", impact: "+15%" },
    { name: "Regular exfoliation", impact: "+12%" },
    { name: "Quality sleep (7+ hrs)", impact: "+10%" }
  ],
  negativeFactors: [
    { name: "Stress levels", impact: "-8%" },
    { name: "Sugar consumption", impact: "-5%" }
  ]
};

const WeeklySkinView: React.FC = () => {
  // State for week navigation
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentWeekIndex(prev => prev + 1);
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(prev => prev - 1);
    }
  };
  
  // Check if this is the current week
  const isCurrentWeek = currentWeekIndex === 0;

  // Helper function for rating backgrounds - updated for consistency with FYP
  const getRatingBgColor = (rating: number) => {
    if (rating >= 80) return "bg-emerald-50";
    if (rating >= 60) return "bg-lime-50";
    if (rating >= 40) return "bg-amber-50";
    if (rating >= 20) return "bg-orange-50";
    return "bg-red-50";
  };
  
  // Helper function for rating text colors - updated for consistency
  const getRatingTextColor = (rating: number) => {
    if (rating >= 80) return "text-emerald-600";
    if (rating >= 60) return "text-lime-600";
    if (rating >= 40) return "text-amber-600";
    if (rating >= 20) return "text-orange-600";
    return "text-red-600";
  };
  
  // Get indicator color for progress - updated for consistency
  const getIndicatorColor = (value: number) => {
    if (value >= 80) return "bg-emerald-500";
    if (value >= 60) return "bg-lime-500";
    if (value >= 40) return "bg-amber-500";
    if (value >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  // Define chart colors with enhanced visual appeal - matching SkinIndexComparison
  const chartConfig = {
    skinScore: {
      label: "Skin Score",
      color: "#8B5CF6" // Vivid purple - matching SkinIndexComparison
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header with Info Popover - Styled like FYP */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Weekly Skin Report</h2>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <Info size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h3 className="font-medium">About your weekly skin report</h3>
              <p className="text-sm text-muted-foreground">
                This report analyzes your skin data for the week and provides insights
                on trends, progress, and factors that influence your skin health.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Week Selector - Styled to match FYP meal plan */}
      <Card className="overflow-hidden border-l-4 border-blue-400">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={goToPreviousWeek}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <p className="font-medium">
                {isCurrentWeek ? "This Week" : `Week ${currentWeekIndex} ago`}
              </p>
              <p className="text-sm text-muted-foreground">
                {sampleWeeklyData.weekStartDate} to {sampleWeeklyData.weekEndDate}
              </p>
            </div>
            
            <button 
              className={`p-2 rounded-full ${!isCurrentWeek ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
              onClick={goToNextWeek}
              disabled={isCurrentWeek}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Overview - Enhanced with improved chart styling */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <h3 className="font-medium text-blue-800">Weekly Skin Score</h3>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-3xl font-bold">{sampleWeeklyData.overallScore}</span>
                {sampleWeeklyData.previousWeekScore && (
                  <span className={`text-sm ${sampleWeeklyData.overallScore > sampleWeeklyData.previousWeekScore ? 'text-green-600' : 'text-red-600'}`}>
                    {sampleWeeklyData.overallScore > sampleWeeklyData.previousWeekScore ? '+' : ''}
                    {sampleWeeklyData.overallScore - sampleWeeklyData.previousWeekScore} from last week
                  </span>
                )}
              </div>
              <Progress 
                value={sampleWeeklyData.overallScore} 
                className="h-2" 
                indicatorClassName={getIndicatorColor(sampleWeeklyData.overallScore)} 
              />
            </div>
            
            {/* Enhanced Weekly Trend Chart - Styled to match SkinIndexComparison */}
            <div>
              <p className="text-sm text-muted-foreground mb-3">Weekly Trend</p>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900/50 dark:to-indigo-900/30 -mx-2 p-4 rounded-lg">
                <div className="h-[180px]">
                  <ChartContainer className="h-full" config={chartConfig}>
                    <LineChart 
                      data={sampleWeeklyData.weeklyTrend} 
                      margin={{ top: 10, right: 5, bottom: 10, left: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8" 
                        fontSize={10}
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                        padding={{ left: 5, right: 5 }}
                        interval={0}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        stroke="#94a3b8" 
                        fontSize={10}
                        tickLine={false}
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickFormatter={(value) => `${value}`}
                        width={25}
                      />
                      <ReferenceLine y={70} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Good', position: 'right', fill: '#94a3b8', fontSize: 8 }} />
                      <ChartTooltip 
                        content={
                          <ChartTooltipContent 
                            formatter={(value: number) => [`${value}`, 'Score']}
                            labelFormatter={(label) => `${label}`}
                          />
                        }
                      />
                      <Line 
                        name="Skin Score" 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8B5CF6" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: "#8B5CF6", stroke: "white", strokeWidth: 1.5 }} 
                        activeDot={{ r: 6, stroke: "white", strokeWidth: 1.5 }}
                        animationDuration={1000}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>

                <div className="flex items-center justify-end mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <span className="inline-block w-3 h-3 bg-[#8B5CF6] rounded-full"></span>
                      Skin Score
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Score Summary - Enhanced Visual Display */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">Daily Scores</p>
              <div className="flex items-center justify-between space-x-1">
                {sampleWeeklyData.weeklyTrend.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-xs font-medium mb-1">{day.date}</span>
                    <div 
                      className={cn("w-8 h-8 flex items-center justify-center rounded-full mb-1", getRatingBgColor(day.value))}
                    >
                      <span className={cn("text-xs font-medium", getRatingTextColor(day.value))}>
                        {day.value}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {day.value >= 80 ? "Great" : 
                       day.value >= 60 ? "Good" : 
                       day.value >= 40 ? "Ok" : 
                       day.value >= 20 ? "Fair" : "Poor"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Skin Parameters - Styled with colored borders like FYP */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Skin Parameters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleWeeklyData.skinParameters.map((param, index) => {
            // Select border color based on parameter type
            const borderColor = index % 4 === 0 ? "border-blue-400" : 
                              index % 4 === 1 ? "border-purple-400" :
                              index % 4 === 2 ? "border-amber-400" :
                              "border-green-400";
            
            // Select icon based on parameter name
            const getIcon = (name: string) => {
              switch(name.toLowerCase()) {
                case 'hydration': return <Droplet className="h-4 w-4 text-blue-500" />;
                case 'elasticity': return <Crown className="h-4 w-4 text-purple-500" />;
                case 'oil control': return <Thermometer className="h-4 w-4 text-amber-500" />;
                case 'texture': return <Clock className="h-4 w-4 text-green-500" />;
                default: return <Info className="h-4 w-4 text-gray-500" />;
              }
            };

            return (
              <Card key={index} className={`overflow-hidden border-l-4 ${borderColor}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {getIcon(param.name)}
                    <h3 className="font-medium">{param.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{param.current}%</span>
                      <span className="text-sm text-green-600">
                        +{param.current - param.previous}%
                      </span>
                    </div>
                    <Progress 
                      value={param.current} 
                      className="h-2" 
                      indicatorClassName={getIndicatorColor(param.current)} 
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Key Factors - Styled with colorful cards like FYP */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Key Factors</h2>
        
        <div className="space-y-4">
          {/* Positive Factors */}
          <Card className="overflow-hidden border-l-4 border-green-400">
            <CardContent className="p-4">
              <h3 className="font-medium text-green-600 mb-2">Positive Impact</h3>
              <ul className="space-y-2">
                {sampleWeeklyData.positiveFactors.map((factor, index) => (
                  <li key={index} className="flex justify-between items-center text-sm">
                    <span>{factor.name}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">{factor.impact}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          {/* Negative Factors */}
          <Card className="overflow-hidden border-l-4 border-red-400">
            <CardContent className="p-4">
              <h3 className="font-medium text-red-600 mb-2">Negative Impact</h3>
              <ul className="space-y-2">
                {sampleWeeklyData.negativeFactors.map((factor, index) => (
                  <li key={index} className="flex justify-between items-center text-sm">
                    <span>{factor.name}</span>
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">{factor.impact}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Daily Scores - Enhanced styling to match FYP cards */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Daily Scores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sampleWeeklyData.dailyScores.map((day, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{day.day}</h3>
                    <p className="text-xs text-muted-foreground">{day.date}</p>
                    <p className="text-sm mt-1">{day.note}</p>
                  </div>
                  <div className={cn("rounded-full w-12 h-12 flex items-center justify-center", getRatingBgColor(day.score))}>
                    <span className={cn("font-medium", getRatingTextColor(day.score))}>{day.score}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* View More Link - Styled like in the meal plan */}
      <Link 
        to="/weekly-skin-analysis"
        className="block bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors p-4 rounded-lg text-center"
      >
        View Full Weekly Analysis
      </Link>
    </div>
  );
};

export default WeeklySkinView;
