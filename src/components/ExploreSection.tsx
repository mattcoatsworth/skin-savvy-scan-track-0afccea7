
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type ExploreItemType = {
  title: string;
  subtitle: string;
  image?: string;
};

type ExploreSectionProps = {
  items: ExploreItemType[];
  className?: string;
};

const ExploreSection: React.FC<ExploreSectionProps> = ({ items, className }) => {
  return (
    <div className={cn("ios-section", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Explore</h2>
        <Link to="/explore" className="text-sm text-skin-teal">
          View all
        </Link>
      </div>
      
      <div className="relative">
        <ScrollArea className="w-full pb-4">
          <div className="flex space-x-4 px-1">
            {items.map((item, index) => (
              <Link to="/explore" key={index} className="flex-shrink-0">
                <Card className="ios-card min-w-[180px] overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-skin-teal/40 to-skin-lavender/60 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                    ) : (
                      <div className="text-xl font-semibold text-white">✨</div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
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

export default ExploreSection;
