
import { ReactNode } from "react";

// Types for skin factors
export type FactorType = "Food" | "Supplement" | "Makeup" | "Weather" | "Lifestyle" | "Environment" | "Skincare" | "Health";
  
export type Factor = {
  type: FactorType;
  status: string;
  icon: ReactNode;
};

// Types for recommendations
export type RecommendationType = "skincare" | "food" | "lifestyle" | "supplements";

export type Recommendation = {
  type: RecommendationType;
  text: string;
  icon: ReactNode;
  linkTo: string;
};

// Types for skin history
export type DayRating = {
  day: string;
  rating: number;
  date: string;
};

// Types for recent logs
export type RecentLogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  rating?: number;
  id?: string;
  linkTo?: string;
};

// Types for insights
export type InsightType = {
  title: string;
  description: string;
  icon: string;
  id: string;
  iconName: string;
  category: "positive" | "negative" | "neutral";
};

// Types for suggested actions
export type SuggestedActionType = {
  text: string;
  linkTo?: string;
  supplementId?: string;
  id: string;
  type: string;
};

// Types for explore items
export type ExploreItemType = {
  title: string;
  subtitle: string;
  id: string;
  linkTo: string;
};

// Type for meal plan
export type MealPlanType = {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
  hydration: string;
};
