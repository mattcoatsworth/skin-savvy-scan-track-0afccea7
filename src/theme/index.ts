
/**
 * Theme system export file
 * Centralizes access to all theme variables
 */

export { default as colors } from './colors';
export { default as typography } from './typography';
export { default as spacing } from './spacing';
export { default as borders } from './borders';
export { default as shadows } from './shadows';
export { default as animations } from './animations';

// Let's also create some component-specific style objects
export * from './components/card.styles';
export * from './components/button.styles';
export * from './components/navigation.styles';
