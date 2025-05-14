
/**
 * Platform-agnostic theme utilities
 * These can be used in both React web and React Native
 */
import { colors, typography, spacing, borders, shadows } from '@/theme';

// Helper to get theme value by path
export const getThemeValue = (
  obj: Record<string, any>, 
  path: string, 
  fallback?: any
): any => {
  const keys = path.split('.');
  let value = obj;
  
  for (const key of keys) {
    if (value === undefined || value === null) break;
    value = value[key];
  }
  
  return value !== undefined ? value : fallback;
};

// Theme getters that work across platforms
export const getColor = (path: string, fallback?: string): string => {
  return getThemeValue(colors, path, fallback) as string;
};

export const getSpacing = (size: string | number, fallback?: number): number => {
  if (typeof size === 'number') return size;
  return getThemeValue(spacing, size, fallback) as number;
};

export const getTypography = (path: string, fallback?: any): any => {
  return getThemeValue(typography, path, fallback);
};

export const getBorder = (path: string, fallback?: any): any => {
  return getThemeValue(borders, path, fallback);
};

export const getShadow = (path: string, fallback?: any): any => {
  return getThemeValue(shadows, path, fallback);
};

/**
 * Get theme-specific color based on current theme
 * Platform-agnostic version of the existing function
 */
export function getThemeColor(
  theme: string, 
  summerColor: string, 
  springColor: string, 
  defaultColor: string
): string {
  switch (theme) {
    case 'summer':
      return summerColor;
    case 'spring':
      return springColor;
    default:
      return defaultColor;
  }
}
