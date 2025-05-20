import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Legend, 
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from "recharts";
import { Info } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

// Generate mock data for all 7 days of the week
const generateComparisonData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => {
    // Generate random scores for user and average values
    const userScore = Math.floor(Math.random() * (95 - 40) + 40);
    const avgScore = Math.floor(Math.random() * (85 - 55) + 55);
    
    return {
      day,
      userScore,
      avgScore
    };
  });
};

type SkinIndexComparisonProps = {
  className?: string;
  age?: number;
  gender?: string;
};

const SkinIndexComparison: React.FC<SkinIndexComparisonProps> = ({ 
  className,
  age = 30,
  gender = "female"
}) => {
  // In a real app, this would fetch data from an API based on user's age and gender
  const comparisonData = generateComparisonData();
  
  // Define chart colors with enhanced visual appeal
  const chartConfig = {
    userScore: {
      label: "Your Score",
      color: "#8B5CF6" // Vivid purple
    },
    avgScore: {
      label: `Avg. ${gender}s (${age})`,
      color: "#0EA5E9" // Ocean blue
    }
  };

  // Helper function to get value domain from data
  const getValueDomain = () => {
    const scores = comparisonData.flatMap(item => [item.userScore, item.avgScore]);
    const min = Math.max(0, Math.min(...scores) - 10);
    const max = Math.min(100, Math.max(...scores) + 10);
    return [min, max];
  };
  
  return (
    <div className={cn("block", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Skin Index Comparison</h2>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <Info size={18} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h3 className="font-medium">About this data</h3>
              <p className="text-sm text-muted-foreground">
                This chart compares your daily skin scores with the average scores of {gender}s 
                aged {age}. Data is anonymized and aggregated from our user base.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <Card className="ios-card overflow-hidden backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-md">
        <CardContent className="p-5">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900/50 dark:to-indigo-900/30 -m-5 p-5 pb-2 mb-3 rounded-t-lg">
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 font-medium">
              Your skin condition compared to {gender}s of age {age}
            </p>
            
            <div className="h-[240px]">
              <ChartContainer className="h-full" config={chartConfig}>
                <LineChart 
                  data={comparisonData} 
                  margin={{ top: 20, right: 5, bottom: 5, left: -20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    padding={{ left: 0, right: 0 }}
                    tickMargin={5}
                    interval={0}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    domain={getValueDomain()} 
                    stroke="#94a3b8" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(value) => `${value}`}
                    width={25}
                  />
                  <ReferenceLine y={70} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Good', position: 'right', fill: '#94a3b8', fontSize: 10 }} />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent 
                        formatter={(value: number) => [`${value}`, 'Score']}
                        labelFormatter={(label) => `${label}`}
                      />
                    }
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line 
                    name="Your Score" 
                    type="monotone" 
                    dataKey="userScore" 
                    stroke="#8B5CF6" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: "#8B5CF6", stroke: "white", strokeWidth: 2 }} 
                    activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
                    animationDuration={1000}
                  />
                  <Line 
                    name={`Avg. ${gender}s (${age})`} 
                    type="monotone" 
                    dataKey="avgScore" 
                    stroke="#0EA5E9" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: "#0EA5E9", stroke: "white", strokeWidth: 2 }} 
                    strokeDasharray="5 5"
                    animationDuration={1500}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
              Data represents daily skin score averages over the past week
            </p>
            <div className="flex gap-3 mt-2 md:mt-0">
              <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="inline-block w-3 h-3 bg-[#8B5CF6] rounded-full"></span>
                Your Score
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="inline-block w-3 h-3 bg-[#0EA5E9] rounded-full"></span>
                Average
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkinIndexComparison;
