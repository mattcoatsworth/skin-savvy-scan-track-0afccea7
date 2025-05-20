
import { ReactNode } from 'react';

export type ProductType = 'skincare' | 'food' | 'supplement';

export type Product = {
  id: string;
  name: string;
  brand: string;
  rating: number;
  impact: 'Positive' | 'Neutral' | 'Negative';
  description: string;
  image?: string;
  benefits?: string[];
  concerns?: string[];
};

export type ProductRecommendation = {
  id: string;
  productId: string;
  productType: ProductType;
  reason: string;
  confidence: number;
  created: string;
};

export type ProductUsage = {
  id: string;
  productId: string;
  productType: ProductType;
  date: string;
  rating: number;
  notes?: string;
};

export type ProductAnalysis = {
  overallEffect: string;
  impactScore: number;
  skinBenefits: string[];
  potentialConcerns: string[];
  ingredients?: {
    beneficial: string[];
    concerning: string[];
    neutral: string[];
  };
  userCompatibility?: number;
  recommendedUse?: string;
};

export type ProductViewType = 'used' | 'scanned' | 'trending';
