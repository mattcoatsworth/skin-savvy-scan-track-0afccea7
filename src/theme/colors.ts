
/**
 * Color definitions for cross-platform use
 * 
 * Instead of CSS variables, we use JavaScript objects that can be 
 * consumed by both web (via CSS-in-JS) and React Native.
 */

// Base colors - duplicated from CSS variables for direct JS access
export const colors = {
  // Base colors
  skin: {
    black: '#1E1E1E',
    gray: '#F8F8FA',
    lightgray: '#F2F2F7',
    white: '#FFFFFF',
    flame: '#FF6B01',
    red: '#FF4559',
    blue: '#6BB9FF',
    amber: '#FFC170',
    teal: '#20B2AA'
  },
  
  // Semantic colors
  primary: '#FF6B01', // skin-flame
  primaryLight: '#FFC170', // skin-amber
  secondary: '#6BB9FF', // skin-blue
  error: '#FF4559', // skin-red
  success: '#20B2AA', // skin-teal
  background: '#FFFFFF',
  foreground: '#1E1E1E',
  
  // Grays
  gray: {
    50: '#F8F8FA', // skin-gray
    100: '#F2F2F7', // skin-lightgray
    200: '#E5E5EA',
    300: '#D1D1D6',
    400: '#C7C7CC',
    500: '#AEAEB2',
    600: '#8E8E93',
    700: '#636366',
    800: '#48484A',
    900: '#3A3A3C'
  },
  
  // Status colors
  status: {
    success: '#34C759',
    warning: '#FFC170',
    error: '#FF4559',
    info: '#6BB9FF'
  },
  
  // Transparent colors
  transparent: 'transparent',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',
  
  // Theme-specific colors
  spring: {
    primary: '#FF6B01', // skin-flame
    accent: '#FFC170', // skin-amber
    blue: '#6BB9FF', // skin-blue
    teal: '#20B2AA' // skin-teal
  }
};

export type ColorType = typeof colors;
