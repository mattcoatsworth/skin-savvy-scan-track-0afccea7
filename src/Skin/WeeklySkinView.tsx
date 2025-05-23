
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Activity, ArrowRight, TrendingUp, ListFilter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TrendChart from "@/components/TrendChart";
import { getRatingColor, getRatingBgColor, getRatingLabel } from "@/utils/skin-utils";

const WeeklySkinView = () => {
  // Sample weekly data
  const weeklyData = {
    rating: 78,
    previousWeek: 72,
    weekStartDate: "2024-07-14",
    weekEndDate: "2024-07-20",
    weeklyTrend: [
      { date: "Mon", value: 65 },
      { date: "Tue", value: 72 },
      { date: "Wed", value: 78 },
      { date: "Thu", value: 80 },
      { date: "Fri", value: 85 },
      { date: "Sat", value: 88 },
      { date: "Sun", value: 78 }
    ],
    topFactors: [
      { name: "Hydration", change: "+12%" },
      { name: "Sleep Quality", change: "+8%" },
      { name: "Stress Levels", change: "-5%" }
    ],
    summary: "Your skin health improved steadily through the week. Hydration levels showed the most significant improvement. Your consistent sleep schedule appears to be having a positive effect."
  };
  
  return (
    <div className="space-y-6">
      {/* Weekly Rating Card */}
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Weekly Rating</h2>
                <p className="text-sm text-muted-foreground">
                  {weeklyData.weekStartDate} - {weeklyData.weekEndDate}
                </p>
              </div>
              {/* Rating Display */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getRatingBgColor(weeklyData.rating) }}
                >
                  <span 
                    className="text-xl font-semibold"
                    style={{ color: getRatingColor(weeklyData.rating) }}
                  >
                    {weeklyData.rating}
                  </span>
                </div>
                <span 
                  className="text-xs mt-1 font-medium"
                  style={{ color: getRatingColor(weeklyData.rating) }}
                >
                  {getRatingLabel(weeklyData.rating)}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <Activity className="h-5 w-5 mr-2 text-muted-foreground" />
                <h3 className="text-base font-medium">Skin Health</h3>
              </div>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <Progress 
                    value={weeklyData.rating} 
                    className="h-3 bg-gray-100" 
                    indicatorClassName={getRatingColor(weeklyData.rating)} 
                  />
                </div>
                <div className="text-base font-semibold">{weeklyData.rating}/100</div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-muted-foreground">{getRatingLabel(weeklyData.rating)}</p>
                <p className="text-sm text-green-600">{`+${weeklyData.rating - weeklyData.previousWeek} from last week`}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Trend Chart Card */}
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            <h2 className="font-medium">Weekly Trend</h2>
          </div>
          <TrendChart data={weeklyData.weeklyTrend} height={150} />
        </CardContent>
      </Card>
      
      {/* Top Factors Card */}
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <ListFilter className="h-5 w-5 mr-2 text-purple-500" />
            <h2 className="font-medium">Top Factors</h2>
          </div>
          <div className="space-y-3">
            {weeklyData.topFactors.map((factor, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{factor.name}</span>
                <span 
                  className={`text-sm font-medium ${
                    factor.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {factor.change}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Summary Card */}
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 mr-2 text-emerald-500" />
            <h2 className="font-medium">Weekly Summary</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {weeklyData.summary}
          </p>
          
          <Link to="/weekly-skin-analysis" className="block">
            <Button 
              className="w-full flex items-center justify-center"
              variant="outline"
            >
              <span>View Detailed Analysis</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklySkinView;
