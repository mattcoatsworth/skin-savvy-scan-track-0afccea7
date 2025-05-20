
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type RecentLogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  rating?: number;
  id?: string; // Add optional id for specific log identification
  linkTo?: string; // Add optional linkTo for custom navigation
};

type RecentLogsCarouselProps = {
  logs: RecentLogType[];
  className?: string;
};

// Determine color based on rating
const getRatingColor = (rating: number) => {
  if (rating >= 70) return "#4ADE80"; // Green for good ratings
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  return "#F87171"; // Red for poor ratings
};

// Get background color for the rating
const getRatingBgColor = (rating: number) => {
  if (rating >= 70) return "#ECFDF5"; // Light green bg
  if (rating >= 40) return "#FEFCE8"; // Light yellow bg
  return "#FEF2F2"; // Light red bg
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
  // Function to determine where each log should link to
  const getLogLink = (log: RecentLogType) => {
    // If a custom link is provided, use it
    if (log.linkTo) {
      return log.linkTo;
    }
    
    // If an ID is provided, link to a specific log detail page
    if (log.id) {
      return `/recent-logs/${log.id}`;
    }
    
    // Default to the recent logs page
    return "/recent-logs";
  };

  return (
    <div className={cn("ios-section", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Recent Scans</h2>
        <Link to="/recent-logs" className="text-sm text-skin-black">
          View all
        </Link>
      </div>
      
      <div className="relative">
        <ScrollArea className="w-full pb-4">
          <div className="flex space-x-4 px-1">
            {logs.map((log, index) => (
              <Link 
                key={index} 
                to={getLogLink(log)} 
                state={{ log }}
                className="min-w-[260px] flex-shrink-0"
              >
                <Card className="ios-card animate-fade-in hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium mb-1">{log.title}</h3>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-start">
                            <div>
                              {log.description}
                              <br />
                              <span className="text-xs">{log.description.includes("days") ? "" : "3 days"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {log.rating !== undefined && (
                        <div className="flex flex-col items-center">
                          {/* Rating circle with updated design */}
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: getRatingBgColor(log.rating) }}
                          >
                            <div 
                              className="text-base font-semibold" 
                              style={{ color: getRatingColor(log.rating) }}
                            >
                              {log.rating}
                            </div>
                          </div>
                          
                          {/* Rating label */}
                          <span 
                            className="text-xs mt-1" 
                            style={{ color: getRatingColor(log.rating) }}
                          >
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default RecentLogsCarousel;
