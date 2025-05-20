
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getRatingColor, getRatingBgColor, getRatingLabel } from './utils';

interface SkinAnalysisCardProps {
  title: string;
  score: number;
  description: string;
  linkTo: string;
  date?: string; 
}

const SkinAnalysisCard: React.FC<SkinAnalysisCardProps> = ({ 
  title, 
  score, 
  description, 
  linkTo,
  date 
}) => {
  const ratingColor = getRatingColor(score);
  const ratingBgColor = getRatingBgColor(score);
  const label = getRatingLabel(score);
  
  return (
    <Link to={linkTo}>
      <Card className="ios-card hover:shadow-md transition-all">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{title}</h3>
            <div 
              className="ml-2 px-2 py-1 rounded-full text-xs font-medium" 
              style={{ 
                backgroundColor: ratingBgColor,
                color: ratingColor
              }}
            >
              {score} - {label}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-1">{description}</p>
          
          {date && (
            <p className="text-xs text-muted-foreground mt-2">{date}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default SkinAnalysisCard;
