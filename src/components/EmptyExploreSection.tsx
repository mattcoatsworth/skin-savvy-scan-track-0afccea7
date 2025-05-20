
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const EmptyExploreSection = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-base">Explore</h3>
          <Link to="/explore">
            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center py-6">
          <Sparkles className="h-10 w-10 text-gray-300 mb-2" />
          <p className="text-sm text-center text-muted-foreground">Explore content coming soon</p>
          <p className="text-xs text-center text-muted-foreground mb-2">
            Check back for skin tips and community updates
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyExploreSection;
