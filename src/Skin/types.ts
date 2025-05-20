
import { ReactNode } from "react";

export type SkinFactorType = "Food" | "Supplement" | "Makeup" | "Weather" | "Lifestyle" | "Environment" | "Skincare" | "Health" | "Sleep" | "Stress";

export type SkinFactor = {
  type: SkinFactorType;
  status: string;
  iconName: string;
  details?: string;
};

export type DaySkinData = {
  day: string;
  date: string;
  score: number;
  note?: string;
};

export type SkinParameter = {
  name: string;
  current: number;
  previous: number;
};

export type ImpactFactor = {
  name: string;
  impact: string;
};

export type WeeklySkinData = {
  weekStartDate: string;
  weekEndDate: string;
  overallScore: number;
  previousWeekScore?: number;
  dailyScores: DaySkinData[];
  skinParameters: SkinParameter[];
  positiveFactors: ImpactFactor[];
  negativeFactors: ImpactFactor[];
  weeklyTrend: { date: string; value: number }[];
};

export type AIPattern = {
  category: string;
  title: string;
  description: string;
  correlation: number;
};

export type AIFocusArea = {
  title: string;
  description: string;
  priority: "primary" | "secondary" | "tertiary";
  type: string;
};

export type AIMetrics = {
  [key: string]: string;
};

export type AIChallenge = {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
};

export type AIAnalysis = {
  patternAnalysis: string;
  detectedPatterns: AIPattern[];
  focusAreas: AIFocusArea[];
  metrics: AIMetrics;
  challenges: AIChallenge[];
};

export type RecommendationItem = {
  type: string;
  text: string;
  iconName: string;
  linkTo: string;
  details?: string;
};

export type SkinViewType = "daily" | "weekly" | "monthly";
