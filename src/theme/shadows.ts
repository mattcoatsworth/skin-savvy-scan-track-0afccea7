
/**
 * Shadow definitions for the application.
 * Provides consistent elevation and depth across components.
 */

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // iOS-specific shadows
  ios: {
    card: '0 2px 6px rgba(0, 0, 0, 0.06)',
    elevated: '0 4px 10px rgba(0, 0, 0, 0.08)',
    modal: '0 10px 25px rgba(0, 0, 0, 0.12)'
  }
};

export default shadows;
