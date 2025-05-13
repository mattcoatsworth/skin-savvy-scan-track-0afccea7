import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import SkinFactorsList from "@/components/SkinFactorsList";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";

type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";

interface DailySkinSnapshotProps {
  emoji: string;
  status: string;
  factors: {
    type: "Food" | "Supplement" | "Makeup" | "Weather";
    status: string;
    icon: React.ReactNode;
  }[];
  recommendations: {
    type: RecommendationType;
    text: string;
    icon: React.ReactNode;
    linkTo: string;
  }[];
}

const DailySkinSnapshot = ({ emoji, status, factors, recommendations }: DailySkinSnapshotProps) => {
  return (
    <div className="ios-section">
      <h2 className="text-xl font-semibold mb-3">Today's Skin</h2>
      <Card className="ios-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="text-4xl mr-3">{emoji}</div>
              <div>
                <h2 className="font-medium text-lg">Status</h2>
                <p className="text-xl font-semibold">{status}</p>
              </div>
            </div>
          </div>
          
          <SkinFactorsList factors={factors} />
          
          <div className="mt-6">
            <h3 className="text-base font-semibold mb-3">For You Recommendations</h3>
            <PersonalizedRecommendations />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailySkinSnapshot;
