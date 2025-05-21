
import { ReactNode } from "react";

export type FactorType = "Food" | "Supplement" | "Makeup" | "Weather" | "Lifestyle" | "Environment" | "Skincare" | "Health" | "Sleep" | "Stress";
  
export type Factor = {
  type: FactorType;
  status: string;
  icon: ReactNode;
};

export type RecommendationType = "skincare" | "food" | "supplements" | "makeup" | "lifestyle";

export type Recommendation = {
  type: RecommendationType;
  text: string;
  icon: ReactNode;
  linkTo: string;
};

export type DayRating = {
  day: string;
  rating: number;
  date: string;
};

export type RecentLogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  rating?: number;
  id?: string;
  linkTo?: string;
};

export type InsightType = {
  title: string;
  description: string;
  icon: string;
  id: string;
  iconName: string;
  category: "positive" | "negative" | "neutral";
};

export type SuggestedActionType = {
  text: string;
  linkTo?: string;
  id?: string;
  supplementId?: string;
  type?: string;
};

export type ExploreItemType = {
  title: string;
  subtitle: string;
  image?: string;
  id?: string;
  linkTo?: string;
};

export type MealPlanType = {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
  hydration: string;
};

// Create a unified SkinFactorType that matches both definitions
export {
  SkinFactorType,
  SkinFactor,
  DaySkinData,
  SkinParameter,
  ImpactFactor,
  WeeklySkinData,
  AIPattern,
  AIFocusArea,
  AIMetrics,
  AIChallenge,
  AIAnalysis,
  RecommendationItem,
  SkinViewType
} from '@/Skin/types';
