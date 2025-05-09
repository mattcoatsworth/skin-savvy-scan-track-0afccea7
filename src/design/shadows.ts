
/**
 * Shadow definitions for the application.
 * These provide depth and elevation to UI elements.
 */

export const shadows = {
  // Base shadows
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  
  // iOS specific shadows
  ios: {
    card: '0 2px 10px rgba(0, 0, 0, 0.05)',
    button: '0 3px 6px rgba(0, 0, 0, 0.1)',
    modal: '0 10px 25px rgba(0, 0, 0, 0.15)',
    popover: '0 4px 15px rgba(0, 0, 0, 0.1)'
  },
  
  // Elevated components
  elevation: {
    1: '0 1px 3px rgba(0, 0, 0, 0.08)',
    2: '0 3px 8px rgba(0, 0, 0, 0.1)',
    3: '0 6px 15px rgba(0, 0, 0, 0.12)',
    4: '0 15px 30px rgba(0, 0, 0, 0.15)'
  }
};

export default shadows;
