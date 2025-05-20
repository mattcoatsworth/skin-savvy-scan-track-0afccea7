
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const EmptyRecentLogsCarousel = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-base">Recent Scans</h3>
          <Link to="/recent-logs">
            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center py-6">
          <FileText className="h-10 w-10 text-gray-300 mb-2" />
          <p className="text-sm text-center text-muted-foreground">No recent scans</p>
          <p className="text-xs text-center text-muted-foreground mb-2">
            Scans will appear here as you log data
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyRecentLogsCarousel;
