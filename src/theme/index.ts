
/**
 * Theme system for cross-platform styling
 * 
 * This centralized theme system helps maintain consistency between 
 * web and React Native implementations by defining styles as JavaScript objects.
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { borders } from './borders';
import { shadows } from './shadows';
import { components } from './components';

export const theme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  components
};

export type ThemeType = typeof theme;

// Re-export individual theme parts for direct imports
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './borders';
export * from './shadows';
export * from './components';
