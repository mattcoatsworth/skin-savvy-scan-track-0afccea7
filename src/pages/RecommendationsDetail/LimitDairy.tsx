
import React from "react";
import RecommendationDetail from "@/components/RecommendationDetail";
import useScrollToTop from "@/hooks/useScrollToTop";

const LimitDairyPage = () => {
  useScrollToTop();
  
  return <RecommendationDetail recommendationType="limit-dairy" />;
};

export default LimitDairyPage;
