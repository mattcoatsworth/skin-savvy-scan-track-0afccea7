
import React from "react";
import PersonalizedRecommendationPage from "@/components/PersonalizedRecommendationPage";

const PersonalizedLimitDairyPage = () => {
  return (
    <PersonalizedRecommendationPage 
      recommendationType="limit_dairy"
      title="Dairy Intake Recommendation"
    />
  );
};

export default PersonalizedLimitDairyPage;
