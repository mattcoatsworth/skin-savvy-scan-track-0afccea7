
/**
 * Design component exports
 * This file re-exports all design components and styles for easy import
 */

// Export component styles
export * from './index';

// Export design tokens
export * from '../index';

// Export additional component-specific style objects
export { default as cardStyles } from './card.styles';
export { default as buttonStyles } from './button.styles';
export { default as progressStyles } from './progress.styles';
export { default as ratingStyles } from './rating.styles';

// Design system utilities
export const getRatingColor = (rating: number) => {
  if (rating >= 80) return "#4ADE80"; // Green for good ratings
  if (rating >= 60) return "#22C55E"; // Lower green
  if (rating >= 40) return "#FACC15"; // Yellow for medium ratings
  if (rating >= 20) return "#FB923C"; // Orange for fair
  return "#F87171"; // Red for poor ratings
};

export const getRatingBgColor = (rating: number) => {
  if (rating >= 80) return "#ECFDF5"; // Light green bg
  if (rating >= 60) return "#F0FDF4"; // Lower light green bg
  if (rating >= 40) return "#FEFCE8"; // Light yellow bg
  if (rating >= 20) return "#FFF7ED"; // Light orange bg
  return "#FEF2F2"; // Light red bg
};

export const getRatingLabel = (rating: number) => {
  if (rating >= 80) return "Great";
  if (rating >= 60) return "Good";
  if (rating >= 40) return "OK";
  if (rating >= 20) return "Fair";
  return "Poor";
};
