
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type RecentLogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  rating?: number;
};

type RecentLogsCarouselProps = {
  logs: RecentLogType[];
  className?: string;
};

const getStatusIndicator = (status: RecentLogType['status']) => {
  switch (status) {
    case "positive":
      return "🟢";
    case "negative":
      return "🔴";
    case "neutral":
      return "🟡";
  }
};

// Determine progress color based on rating
const getProgressColor = (rating: number) => {
  if (rating >= 70) return "#4ADE80"; // Green for good ratings
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  return "#F87171"; // Red for poor ratings
};

// Get the lighter background color for the circle
const getBackgroundColor = (rating: number) => {
  if (rating >= 70) return "#E6F8EA"; // Light green
  if (rating >= 40) return "#FEF7CD"; // Light yellow
  return "#FFDEE2"; // Light red
};

// Determine label based on rating
const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};

const RecentLogsCarousel: React.FC<RecentLogsCarouselProps> = ({ logs, className }) => {
  return (
    <div className={cn("ios-section", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Recent Logs & Scans</h2>
        <Link to="/recent-logs" className="text-sm text-skin-black">
          View all
        </Link>
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-4 px-1">
          {logs.map((log, index) => (
            <Link key={index} to="/recent-logs" className="min-w-[260px]">
              <Card className="ios-card animate-fade-in hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">{log.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {getStatusIndicator(log.status)} {log.description}
                        <br />
                        <span className="text-xs">{log.description.includes("days") ? "" : "3 days"}</span>
                      </p>
                    </div>
                    {log.rating !== undefined && (
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          {/* Background circle */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getBackgroundColor(log.rating)}
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Foreground circle - the actual progress */}
                          <svg className="w-12 h-12 absolute" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={getProgressColor(log.rating)}
                              strokeWidth="4"
                              strokeDasharray={`${log.rating}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          
                          {/* Rating number in the center */}
                          <div className="text-sm font-semibold">
                            {log.rating}
                          </div>
                        </div>
                        <span className="text-xs mt-1 text-muted-foreground">
                          {getRatingLabel(log.rating)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecentLogsCarousel;
