
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
      <h2 className="text-xl font-semibold mb-3">Explore</h2>
      
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-4 px-1">
          {items.map((item, index) => (
            <Card key={index} className="ios-card min-w-[180px] overflow-hidden">
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
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ExploreSection;
