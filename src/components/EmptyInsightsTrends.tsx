
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

const EmptyInsightsTrends = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-base">Insights & Trends</h3>
          <Link to="/insights-trends">
            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center py-6">
          <TrendingUp className="h-10 w-10 text-gray-300 mb-2" />
          <p className="text-sm text-center text-muted-foreground">No insights available yet</p>
          <p className="text-xs text-center text-muted-foreground mb-2">
            Log your skin condition regularly to generate insights
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyInsightsTrends;
