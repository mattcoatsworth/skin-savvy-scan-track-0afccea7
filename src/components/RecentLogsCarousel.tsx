
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type RecentLogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
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

const RecentLogsCarousel: React.FC<RecentLogsCarouselProps> = ({ logs, className }) => {
  return (
    <div className={cn("ios-section", className)}>
      <h2 className="text-xl font-semibold mb-3">Recent Logs & Scans</h2>
      
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-4 px-1">
          {logs.map((log, index) => (
            <Card key={index} className="ios-card min-w-[260px] animate-fade-in">
              <CardContent className="p-4">
                <h3 className="font-medium mb-1">{log.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {getStatusIndicator(log.status)} {log.description}
                </p>
                <button className="text-xs text-skin-teal font-medium mt-3">
                  View Details
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecentLogsCarousel;
