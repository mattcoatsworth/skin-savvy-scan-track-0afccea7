
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type InsightType = {
  title: string;
  description: string;
  icon?: string;
};

type InsightsTrendsProps = {
  insights: InsightType[];
  className?: string;
};

const InsightsTrends: React.FC<InsightsTrendsProps> = ({ insights, className }) => {
  return (
    <div className={cn("ios-section", className)}>
      <h2 className="text-xl font-semibold mb-3">Insights & Trends</h2>
      <h3 className="text-base mb-3 text-muted-foreground">What's Been Helping Your Skin</h3>
      
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-4 px-1">
          {insights.map((insight, index) => (
            <Card key={index} className="ios-card min-w-[280px] bg-skin-light border-0">
              <CardContent className="p-4">
                <div className="flex items-start">
                  {insight.icon && <span className="text-2xl mr-3">{insight.icon}</span>}
                  <div>
                    <h3 className="font-medium">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default InsightsTrends;
