
/**
 * Cross-platform storage utilities
 * These utilities provide a consistent storage API that will work in both React (web) and React Native
 */

// Web implementation of storage
const webStorage = {
  get: (key: string): string | null => {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error('[Storage] Error getting item:', error);
      return null;
    }
  },
  
  set: (key: string, value: string): boolean => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
        return true;
      }
      return false;
    } catch (error) {
      console.error('[Storage] Error setting item:', error);
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
        return true;
      }
      return false;
    } catch (error) {
      console.error('[Storage] Error removing item:', error);
      return false;
    }
  },
  
  clear: (): boolean => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
        return true;
      }
      return false;
    } catch (error) {
      console.error('[Storage] Error clearing storage:', error);
      return false;
    }
  },
  
  getObject: <T>(key: string): T | null => {
    try {
      const item = webStorage.get(key);
      if (item) {
        return JSON.parse(item) as T;
      }
      return null;
    } catch (error) {
      console.error('[Storage] Error parsing stored object:', error);
      return null;
    }
  },
  
  setObject: <T>(key: string, value: T): boolean => {
    try {
      const serialized = JSON.stringify(value);
      return webStorage.set(key, serialized);
    } catch (error) {
      console.error('[Storage] Error stringifying object:', error);
      return false;
    }
  }
};

// When we have a React Native implementation, we'll add it here
// and use platform detection to choose the right implementation

// Export the appropriate storage implementation based on platform
export const storage = webStorage;

// Convenience function to get a stored date
export const getStoredDate = (key: string): Date | null => {
  const dateString = storage.get(key);
  if (!dateString) return null;
  
  try {
    return new Date(dateString);
  } catch (error) {
    console.error('[Storage] Error parsing date:', error);
    return null;
  }
};

// Convenience function to store a date
export const storeDate = (key: string, date: Date): boolean => {
  return storage.set(key, date.toISOString());
};

// Export platform-agnostic storage as default
export default storage;
