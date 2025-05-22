
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FactorCardSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  description?: string;
}

const FactorCardSection: React.FC<FactorCardSectionProps> = ({ 
  title, 
  icon, 
  children,
  description
}) => {
  return (
    <Card className="ios-card mb-5">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-primary">{icon}</span>
          <h3 className="font-medium">{title}</h3>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}
        
        {children}
      </CardContent>
    </Card>
  );
};

export default FactorCardSection;
