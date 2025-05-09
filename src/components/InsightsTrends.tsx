import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Droplet, Sun, Thermometer, CloudSun, Star, BadgeCheck, Activity, Heart, Bandage, Smile, Frown, Wine } from "lucide-react";

type InsightType = {
  title: string;
  description: string;
  icon?: string;
  iconName?: string;
  id?: string; // Adding id to uniquely identify each insight
};

type InsightsTrendsProps = {
  insights: InsightType[];
  className?: string;
};

const InsightsTrends: React.FC<InsightsTrendsProps> = ({ insights, className }) => {
  // Map string icon names to Lucide components
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case "droplet":
        return <Droplet className="h-6 w-6 text-skin-teal mr-3" />;
      case "sun":
        return <Sun className="h-6 w-6 text-skin-amber mr-3" />;
      case "thermometer":
        return <Thermometer className="h-6 w-6 text-skin-red mr-3" />;
      case "cloud-sun":
        return <CloudSun className="h-6 w-6 text-skin-blue mr-3" />;
      case "star":
        return <Star className="h-6 w-6 text-skin-amber mr-3" />;
      case "badge-check":
        return <BadgeCheck className="h-6 w-6 text-skin-teal mr-3" />;
      case "activity":
        return <Activity className="h-6 w-6 text-skin-blue mr-3" />;
      case "heart":
        return <Heart className="h-6 w-6 text-skin-red mr-3" />;
      case "bandage":
        return <Bandage className="h-6 w-6 text-skin-teal mr-3" />;
      case "smile":
        return <Smile className="h-6 w-6 text-skin-amber mr-3" />;
      case "frown":
        return <Frown className="h-6 w-6 text-skin-red mr-3" />;
      case "wine":
        return <Wine className="h-6 w-6 text-skin-amber mr-3" />;
      default:
        return <Star className="h-6 w-6 text-skin-amber mr-3" />; // Default icon
    }
  };

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
            <Link 
              key={index} 
              to={`/insights-trends/${insight.id || index}`} 
              state={{ insight }} 
              className="min-w-[280px]"
            >
              <Card className="ios-card bg-skin-light border-0 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    {insight.iconName ? getIconComponent(insight.iconName) : (insight.icon && <span className="text-2xl mr-3">{insight.icon}</span>)}
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
