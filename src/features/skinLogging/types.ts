
/**
 * Shared types for the skin logging feature
 */

export interface SkinLogEntry {
  id: string;
  date: string;
  overallCondition: string;
  acneLevel?: number;
  oilinessLevel?: number;
  hydrationLevel?: number;
  rednessLevel?: number;
  notes?: string;
}

export interface SkinFactor {
  type: 'Food' | 'Supplement' | 'Makeup' | 'Weather';
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  description?: string;
}

export interface SkinRecommendation {
  id: string;
  type: 'Product' | 'Habit' | 'Diet' | 'Treatment';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}
