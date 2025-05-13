
import React from "react";
import RecommendationDetail from "@/components/RecommendationDetail";
import useScrollToTop from "@/hooks/useScrollToTop";

const GentleCleanserPage = () => {
  useScrollToTop();
  
  return <RecommendationDetail recommendationType="gentle-cleanser" />;
};

export default GentleCleanserPage;
