
import React from "react";
import PersonalizedRecommendationPage from "@/components/PersonalizedRecommendationPage";

const PersonalizedMeditationPage = () => {
  return (
    <PersonalizedRecommendationPage 
      recommendationType="meditation"
      title="Meditation Recommendation"
    />
  );
};

export default PersonalizedMeditationPage;
