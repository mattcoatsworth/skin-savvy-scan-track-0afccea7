import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StyledBadge } from "@/components/ui/styled/Badge";

type LogStatus = "positive" | "negative" | "neutral";

type Log = {
  title: string;
  status: LogStatus;
  description: string;
  rating: number;
  id: string;
};

type RecentLogsCarouselProps = {
  logs: Log[];
  className?: string;
};

const RecentLogsCarousel: React.FC<RecentLogsCarouselProps> = ({ logs, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollRef.current) {
        const element = scrollRef.current;
        setMaxScroll(element.scrollWidth - element.clientWidth);
      }
    };
    
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };
  
  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };
  
  return (
    <div className={cn("ios-section", className)}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Recent Scans</h2>
        <Link 
          to="/recent-logs" 
          className="text-skin-teal text-sm font-medium flex items-center"
        >
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="relative">
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full bg-white shadow-md border border-gray-100"
          disabled={scrollPosition <= 0}
          style={{ opacity: scrollPosition <= 0 ? 0 : 1 }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div 
          className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide scroll-smooth"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {logs.map((log, index) => (
            <Link to={`/recent-log/${log.id}`} key={index}>
              <Card className="ios-card min-w-[240px] hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-base">{log.title}</h3>
                    
                    {/* Updated to use StyledBadge */}
                    <StyledBadge 
                      value={log.rating}
                      variant={
                        log.status === 'positive' ? 'success' : 
                        log.status === 'negative' ? 'destructive' : 'info'
                      }
                      className="ml-2"
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {log.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full bg-white shadow-md border border-gray-100"
          disabled={scrollPosition >= maxScroll}
          style={{ opacity: scrollPosition >= maxScroll ? 0 : 1 }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default RecentLogsCarousel;
