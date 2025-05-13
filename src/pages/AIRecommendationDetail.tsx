
import React from "react";
import { useParams } from "react-router-dom";
import RecommendationDetailTemplate from "@/components/RecommendationDetailTemplate";
import { useRecommendationContent } from "@/hooks/useRecommendationContent";
import { useRecommendationIdParser } from "@/hooks/useRecommendationIdParser";

const AIRecommendationDetail = () => {
  const { type = "", id = "" } = useParams();
  const { parsedType, parsedId } = useRecommendationIdParser(type, id);
  const { content, loading, error } = useRecommendationContent(parsedType, parsedId);
  
  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-6 text-center">
        <p className="text-red-500">Failed to load recommendation content.</p>
        <p className="text-sm text-gray-600 mt-2">{error}</p>
      </div>
    );
  }
  
  return (
    <RecommendationDetailTemplate
      id={parsedId}
      type={parsedType}
      loading={loading}
      content={content || undefined}
    />
  );
};

export default AIRecommendationDetail;
