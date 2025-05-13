
/**
 * Platform detection utility
 * This helps conditionally render components or run logic based on platform
 */

// Platform detection
export const isPlatform = {
  web: () => typeof window !== 'undefined' && typeof document !== 'undefined',
  native: () => false, // Will be true in React Native environment
};

// Device type detection (to be expanded in React Native)
export const isDevice = {
  mobile: () => 
    typeof window !== 'undefined' && 
    window.matchMedia('(max-width: 767px)').matches,
  tablet: () => 
    typeof window !== 'undefined' && 
    window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches,
  desktop: () => 
    typeof window !== 'undefined' && 
    window.matchMedia('(min-width: 1024px)').matches,
};

// Safe access to window object
export const safeWindow = () => {
  return typeof window !== 'undefined' ? window : undefined;
};

// Safe access to localStorage with fallbacks
export const storage = {
  get: (key: string) => {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error('Error accessing storage:', error);
      return null;
    }
  },
  set: (key: string, value: string) => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error setting storage:', error);
      return false;
    }
  },
  remove: (key: string) => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing from storage:', error);
      return false;
    }
  }
};
