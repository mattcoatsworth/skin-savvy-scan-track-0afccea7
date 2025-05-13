
/**
 * Platform-agnostic formatting utilities
 */

// Date formatting that doesn't rely on browser APIs
export const formatDate = (date: Date | string | number): string => {
  const d = new Date(date);
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

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
