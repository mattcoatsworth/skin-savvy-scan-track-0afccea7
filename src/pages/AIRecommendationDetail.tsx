
import React from 'react';
import { useParams } from 'react-router-dom';
import RecommendationDetailTemplate from '@/components/RecommendationDetailTemplate';
import { useRecommendationContent } from '@/hooks/useRecommendationContent';
import { useRecommendationIdParser } from '@/hooks/useRecommendationIdParser';

const AIRecommendationDetail = () => {
  const { type = '', id = '' } = useParams();
  const idParser = useRecommendationIdParser();
  const { content, loading, error } = useRecommendationContent(type, id);

  if (loading) {
    return <div className="p-4">Loading recommendation details...</div>;
  }

  if (error || !content) {
    return <div className="p-4">Failed to load recommendation details: {error}</div>;
  }

  return <RecommendationDetailTemplate {...content} />;
};

export default AIRecommendationDetail;
