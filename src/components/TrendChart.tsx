
import React from "react";
import { LineChart, Line, XAxis, ResponsiveContainer, ReferenceDot } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DataPoint {
  date: string;
  value: number;
}

interface TrendChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
}

const TrendChart = ({ data, height = 120, className }: TrendChartProps) => {
  if (!data || data.length === 0) return null;

  // Calculate min and max for domain padding
  const values = data.map(item => item.value);
  const minValue = Math.min(...values) - 5;
  const maxValue = Math.max(...values) + 5;
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between text-sm mb-1">
        {data.map((point) => (
          <span key={point.date} className="text-sm font-medium">
            {point.date}
          </span>
        ))}
      </div>
      
      <div className="relative h-[120px]">
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 20, right: 15, left: 15, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6BB9FF" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={false} axisLine={false} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#colorValue)"
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />
            {data.map((point, index) => {
              const prevValue = index > 0 ? data[index - 1].value : point.value;
              const trend = point.value > prevValue ? "up" : point.value < prevValue ? "down" : "flat";
              
              // Calculate color based on value
              const dotColor = point.value >= 70 ? "#10B981" : point.value >= 40 ? "#FBBF24" : "#EF4444";
              
              return (
                <ReferenceDot
                  key={`dot-${index}`}
                  x={point.date}
                  y={point.value}
                  r={6}
                  fill={dotColor}
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
        
        {/* Data points & labels */}
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
      </div>
    </div>
  );
};

export default TrendChart;
