
import React from "react";
import RecommendationDetail from "@/components/RecommendationDetail";
import useScrollToTop from "@/hooks/useScrollToTop";

const ZincSupplementPage = () => {
  useScrollToTop();
  
  return <RecommendationDetail recommendationType="zinc-supplement" />;
};

export default ZincSupplementPage;
