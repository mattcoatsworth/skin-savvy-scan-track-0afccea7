
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const ViewScoringMethod = () => {
  return (
    <Link to="/scoring-method" className="block mt-8 mb-8">
      <Card className="ios-card hover:shadow-md transition-all">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium">View scoring method</h3>
            <p className="text-sm text-muted-foreground">
              Learn how we calculate ratings and scores
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-skin-teal" />
        </CardContent>
      </Card>
    </Link>
  );
};

export default ViewScoringMethod;
