
import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '@/components/BackButton';
import { useRecommendationContent } from '@/hooks/useRecommendationContent';
import { Skeleton } from '@/components/ui/skeleton';

// Define the prop types explicitly
export interface RecommendationDetailProps {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  emoji: string;
  impactType: "positive" | "negative";
  impactLabel: string;
  impactScore: number;
  overview: string;
  sections: Array<{
    title: string;
    content: React.ReactNode;
  }>;
}

const AIRecommendationDetail = () => {
  // Get the recommendation type and ID from URL params
  const { type = "", id = "" } = useParams<{ type: string; id: string }>();
  
  // Fetch the recommendation content using our custom hook
  const { content, loading, error } = useRecommendationContent(type, id);

  if (loading) {
    return (
      <div className="p-4">
        <BackButton />
        <div className="mt-4 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="mt-8">
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="p-4">
        <BackButton />
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-red-500">
            {error || "Failed to load recommendation details"}
          </h2>
          <p className="mt-2 text-gray-600">
            Please try again later or check your network connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <BackButton />
      
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{content.emoji}</span>
          <h1 className="text-2xl font-bold">{content.title}</h1>
        </div>
        <p className="text-muted-foreground mt-1">{content.subtitle}</p>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${content.impactType === "positive" ? "text-green-600" : "text-red-600"}`}>
            {content.impactLabel}
          </span>
          <span className="text-sm font-bold">
            {content.impactScore}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${content.impactType === "positive" ? "bg-green-500" : "bg-red-500"}`}
            style={{ width: `${content.impactScore}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-gray-800">{content.overview}</p>
      </div>
      
      <div className="mt-8 space-y-8">
        {content.sections.map((section, index) => (
          <div key={index} className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
            <div>{section.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendationDetail;
