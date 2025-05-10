
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

type ExploreItemType = {
  title: string;
  subtitle: string;
  image?: string;
  id?: string; // Add optional id for specific item identification
  linkTo?: string; // Add optional linkTo for custom navigation
};

type ExploreSectionProps = {
  items: ExploreItemType[];
  className?: string;
};

const ExploreSection: React.FC<ExploreSectionProps> = ({ items, className }) => {
  const navigate = useNavigate();
  
  // Function to determine where each explore item should link to
  const getExploreLink = (item: ExploreItemType) => {
    // If a custom link is provided, use it
    if (item.linkTo) {
      return item.linkTo;
    }
    
    // If an ID is provided, link to a specific explore page
    if (item.id) {
      return `/explore/${item.id}`;
    }
    
    // Default to the explore page
    return "/explore";
  };
  
  // Enhanced click handler for navigating with scroll-to-top
  const handleExploreItemClick = (item: ExploreItemType) => {
    // First scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    
    // Then navigate with state
    navigate(getExploreLink(item), { state: { item } });
  };
  
  return (
    <div className={cn("ios-section", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Explore</h2>
        <Link 
          to="/explore" 
          className="text-sm text-skin-teal"
          onClick={() => window.scrollTo(0, 0)}
        >
          View all
        </Link>
      </div>
      
      <div className="relative">
        <ScrollArea className="w-full pb-4">
          <div className="flex space-x-4 px-1">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 min-w-[180px] cursor-pointer"
                onClick={() => handleExploreItemClick(item)}
              >
                <Card className="ios-card overflow-hidden hover:shadow-md transition-all">
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
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ExploreSection;
