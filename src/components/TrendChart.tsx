
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  ReferenceDot,
  Tooltip,
  CartesianGrid,
  Area
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface DataPoint {
  date: string;
  value: number;
}

interface TrendChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
  showLabels?: boolean;
}

const TrendChart = ({ 
  data, 
  height = 120, 
  className = "", 
  showLabels = true 
}: TrendChartProps) => {
  if (!data || data.length === 0) return null;

  // Calculate min and max for domain padding
  const values = data.map(item => item.value);
  const minValue = Math.min(...values) * 0.8;
  const maxValue = Math.max(...values) * 1.1;
  
  // Get color based on the trend
  const getColor = (value: number) => {
    if (value >= 70) return "#10B981"; // green
    if (value >= 40) return "#FBBF24"; // yellow
    return "#EF4444"; // red
  };
  
  // Calculate the overall trend for gradient color
  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;
  const trendColor = lastValue >= firstValue ? "#8B5CF6" : "#EF4444";
  const secondaryColor = lastValue >= firstValue ? "#6BB9FF" : "#F97316";
  
  return (
    <div className={`w-full ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between text-sm mb-1">
          {data.map((point) => (
            <span key={point.date} className="text-sm font-medium">
              {point.date}
            </span>
          ))}
        </div>
      )}
      
      <div className="relative" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={secondaryColor} />
                <stop offset="100%" stopColor={trendColor} />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={trendColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#888' }}
              dy={5}
            />
            
            {!showLabels && (
              <YAxis 
                hide 
                domain={[minValue, maxValue]}
              />
            )}
            
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#areaGradient)"
              fillOpacity={0.6}
            />
            
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#colorGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{ stroke: '#FFF', strokeWidth: 2, r: 6, fill: trendColor }}
            />
            
            {data.map((point, index) => {
              // Only show dots on the first and last points for cleaner look
              if (index === 0 || index === data.length - 1) {
                const dotColor = getColor(point.value);
                
                return (
                  <ReferenceDot
                    key={`dot-${index}`}
                    x={point.date}
                    y={point.value}
                    r={4}
                    fill={dotColor}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                );
              }
              return null;
            })}
          </LineChart>
        </ResponsiveContainer>
        
        {/* Data points & labels */}
        {showLabels && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="flex justify-between items-end h-full pb-2">
              {data.map((point, index) => {
                const prevValue = index > 0 ? data[index - 1].value : point.value;
                const trend = point.value > prevValue ? "up" : point.value < prevValue ? "down" : "flat";
                
                return (
                  <div key={`label-${index}`} className="flex flex-col items-center">
                    <span className="text-xs font-medium mt-16">
                      {trend === "up" && <TrendingUp className="h-3 w-3 text-green-500 inline mr-0.5" />}
                      {trend === "down" && <TrendingDown className="h-3 w-3 text-red-500 inline mr-0.5" />}
                      {point.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendChart;
