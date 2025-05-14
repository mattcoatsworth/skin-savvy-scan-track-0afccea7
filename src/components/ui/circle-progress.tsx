
import React from "react";
import { cn } from "@/lib/utils";

interface CircleProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

/**
 * CircleProgress component renders a circular progress indicator
 * similar to the one used in iOS designs.
 */
const CircleProgress = React.forwardRef<HTMLDivElement, CircleProgressProps>(
  ({ 
    value, 
    size = 36, 
    strokeWidth = 4, 
    progressColor, 
    backgroundColor, 
    className,
    children,
    ...props 
  }, ref) => {
    // Calculate radius and circumference
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = value / 100;
    const offset = circumference - progress * circumference;
    
    // Dynamically determine color based on value if not provided
    const getDefaultProgressColor = (value: number) => {
      if (value >= 80) return "#4ADE80"; // Green for good ratings
      if (value >= 60) return "#4ADE80"; // Also green for good ratings
      if (value >= 40) return "#FACC15"; // Yellow for medium ratings
      if (value >= 20) return "#FB923C"; // Orange for fair ratings
      return "#F87171"; // Red for poor ratings
    };
    
    // Dynamically determine background color based on value if not provided
    const getDefaultBackgroundColor = (value: number) => {
      if (value >= 80) return "#E6F8EA"; // Light green
      if (value >= 60) return "#E6F8EA"; // Also light green
      if (value >= 40) return "#FEF7CD"; // Light yellow
      if (value >= 20) return "#FEF0E6"; // Light orange
      return "#FFDEE2"; // Light red
    };
    
    const actualProgressColor = progressColor || getDefaultProgressColor(value);
    const actualBackgroundColor = backgroundColor || getDefaultBackgroundColor(value);
    
    return (
      <div 
        ref={ref} 
        className={cn("relative inline-flex items-center justify-center", className)} 
        style={{ width: size, height: size }}
        {...props}
      >
        {/* Background circle */}
        <svg className="absolute" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={actualBackgroundColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Progress circle */}
        <svg className="absolute" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={actualProgressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        
        {/* Center content (typically the rating number) */}
        <div className="z-10 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }
);

CircleProgress.displayName = "CircleProgress";

export { CircleProgress };
