
import React from "react";
import RecommendationDetail from "@/components/RecommendationDetail";
import useScrollToTop from "@/hooks/useScrollToTop";

const MeditationPage = () => {
  useScrollToTop();
  
  return <RecommendationDetail recommendationType="meditation" />;
};

export default MeditationPage;
