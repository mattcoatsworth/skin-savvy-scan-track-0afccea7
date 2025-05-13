
import React from "react";
import RecommendationDetail from "@/components/RecommendationDetail";
import useScrollToTop from "@/hooks/useScrollToTop";

const VitaminCSerumPage = () => {
  useScrollToTop();
  
  return <RecommendationDetail recommendationType="vitamin-c-serum" />;
};

export default VitaminCSerumPage;
