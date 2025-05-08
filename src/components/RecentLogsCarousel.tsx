
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type RecentLogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  rating?: number; // Add optional rating field
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

const getRatingColor = (rating: number) => {
  if (rating >= 80) return "bg-green-500";
  if (rating >= 60) return "bg-green-300";
  if (rating >= 40) return "bg-yellow-300";
  if (rating >= 20) return "bg-orange-300";
  return "bg-red-400";
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
            <Card key={index} className="ios-card min-w-[260px] animate-fade-in">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{log.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getStatusIndicator(log.status)} {log.description}
                    </p>
                  </div>
                  {log.rating !== undefined && (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRatingColor(log.rating)} text-white font-medium`}>
                      {log.rating}
                    </div>
                  )}
                </div>
                <Link to="/recent-logs" className="text-xs text-skin-black font-medium mt-3 inline-block">
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecentLogsCarousel;
