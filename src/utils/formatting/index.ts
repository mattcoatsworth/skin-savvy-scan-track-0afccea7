
/**
 * Platform-agnostic formatting utilities
 */

import { formatDate as formatDateUtil, calculateAge } from './dateUtils';

// Date formatting that doesn't rely on browser APIs
export const formatDate = formatDateUtil;

// Export calculateAge function
export const getAge = calculateAge;

// Simple text formatting
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Number formatting
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const formatDecimal = (value: number, places: number = 2): string => {
  return value.toFixed(places);
};
