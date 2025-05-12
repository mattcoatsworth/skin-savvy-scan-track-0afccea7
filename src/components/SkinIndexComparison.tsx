
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
  Tooltip 
} from "recharts";
import { Info } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Generate mock data
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
  
  return (
    <div className={cn("block", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Skin Index Comparison</h2>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-500">
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
      
      <Card className="ios-card">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-3">
            Your skin condition compared to {gender}s of age {age}
          </p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Score']}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
                <Line 
                  name="Your Score" 
                  type="monotone" 
                  dataKey="userScore" 
                  stroke="#8884d8" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  name={`Avg. ${gender}s (${age})`} 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="#82ca9d" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  strokeDasharray="5 5" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <p className="text-xs text-center text-muted-foreground mt-2">
            Data represents daily skin score averages over the past week
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkinIndexComparison;
