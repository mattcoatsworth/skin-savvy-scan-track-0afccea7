
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const ExploreDetail = () => {
  useScrollToTop();
  const { exploreId } = useParams<{ exploreId: string }>();
  const navigate = useNavigate();

  // Sample content based on exploreId
  const getExploreContent = () => {
    switch (exploreId) {
      case 'skin-tips':
        return {
          title: "Skin Tips for Your Skin Type",
          content: "This section provides personalized skin care advice based on your skin type. Whether you have dry, oily, combination, or sensitive skin, these tips will help you maintain healthy skin and address specific concerns."
        };
      case 'vitamin-c-science':
        return {
          title: "Science Behind Vitamin C",
          content: "Vitamin C is a powerful antioxidant that can help protect your skin from damage caused by free radicals. It also plays a crucial role in collagen production, which helps maintain skin elasticity and firmness."
        };
      case 'community':
        return {
          title: "New in the Community",
          content: "Connect with others who share similar skin care interests and concerns. Share your experiences, ask questions, and learn from others in our growing community of skin care enthusiasts."
        };
      default:
        return {
          title: "Article Not Found",
          content: "The requested article could not be found."
        };
    }
  };

  const content = getExploreContent();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold truncate">{content.title}</h1>
        </header>

        <Card className="ios-card mb-6">
          <CardContent className="p-6">
            <p className="text-gray-700">{content.content}</p>
          </CardContent>
        </Card>
      </div>
      <AppNavigation />
    </div>
  );
};

export default ExploreDetail;
