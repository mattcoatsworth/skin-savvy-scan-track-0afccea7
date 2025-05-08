
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-xl font-semibold">Insights & Trends</h2>
          <h3 className="text-base text-muted-foreground">What's Been Helping Your Skin</h3>
        </div>
        <Link to="/insights-trends" className="text-sm text-skin-teal">
          View all
        </Link>
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-4 px-1">
          {insights.map((insight, index) => (
            <Link key={index} to="/insights-trends" className="min-w-[280px]">
              <Card className="ios-card bg-skin-light border-0 hover:shadow-md transition-all">
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
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default InsightsTrends;
