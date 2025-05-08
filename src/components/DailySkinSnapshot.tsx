
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type FactorType = "Food" | "Supplement" | "Makeup" | "Weather";

type Factor = {
  type: FactorType;
  status: string;
  icon: string;
};

type SkinSnapshotProps = {
  emoji: string;
  status: string;
  factors: Factor[];
  className?: string;
};

const getFactorColor = (type: FactorType) => {
  switch (type) {
    case "Food":
      return "bg-green-100 text-green-800";
    case "Supplement":
      return "bg-blue-100 text-blue-800";
    case "Makeup":
      return "bg-purple-100 text-purple-800";
    case "Weather":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const DailySkinSnapshot: React.FC<SkinSnapshotProps> = ({
  emoji,
  status,
  factors,
  className,
}) => {
  return (
    <Link to="/skin-analysis">
      <Card className={cn("ios-card hover:shadow-lg transition-shadow", className)}>
        <CardContent className="p-4">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-3">{emoji}</span>
            <div>
              <h2 className="font-medium text-lg">Today's Skin</h2>
              <p className="text-xl font-semibold">{status}</p>
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-sm text-muted-foreground mb-2">Contributing Factors:</p>
            <div className="flex flex-wrap">
              {factors.map((factor, index) => (
                <span 
                  key={index} 
                  className={`factor-tag ${getFactorColor(factor.type)}`}
                >
                  {factor.icon} {factor.type}: {factor.status}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-4">
            View Full Analysis →
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DailySkinSnapshot;
