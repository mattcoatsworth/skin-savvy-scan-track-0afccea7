
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Salad, 
  Pill, 
  Palette, 
  CloudSun, 
  MoonStar, 
  Activity, 
  Cloud, 
  Droplet, 
  Heart,
  Circle
} from "lucide-react";
import { SkinFactor } from "./types";

interface FactorsListProps {
  factors: SkinFactor[];
}

const FactorsList: React.FC<FactorsListProps> = ({ factors }) => {
  // Function to get icon component based on iconName
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "salad":
        return <Salad className="text-2xl mr-3" />;
      case "pill":
        return <Pill className="text-2xl mr-3" />;
      case "palette":
        return <Palette className="text-2xl mr-3" />;
      case "cloud-sun":
        return <CloudSun className="text-2xl mr-3" />;
      case "moon-star":
        return <MoonStar className="text-2xl mr-3" />;
      case "activity":
        return <Activity className="text-2xl mr-3" />;
      case "cloud":
        return <Cloud className="text-2xl mr-3" />;
      case "droplet":
        return <Droplet className="text-2xl mr-3" />;
      case "heart":
        return <Heart className="text-2xl mr-3" />;
      default:
        return <Circle className="text-2xl mr-3" />;
    }
  };

  return (
    <div className="space-y-3">
      {factors.map((factor, index) => (
        <Card key={index} className="ios-card">
          <CardContent className="p-4">
            <div className="flex items-start">
              {getIconComponent(factor.iconName)}
              <div>
                <h3 className="font-medium">{factor.type}: {factor.status}</h3>
                {factor.details && (
                  <p className="text-sm text-muted-foreground">{factor.details}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FactorsList;
