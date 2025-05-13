
/**
 * Spacing definitions for cross-platform use
 */

// Base spacing units in pixels
const baseSpacing = {
  px: 1,
  '0': 0,
  '0.5': 2, // 0.125rem
  '1': 4,   // 0.25rem
  '1.5': 6, // 0.375rem
  '2': 8,   // 0.5rem
  '2.5': 10, // 0.625rem
  '3': 12,  // 0.75rem
  '3.5': 14, // 0.875rem
  '4': 16,  // 1rem
  '5': 20,  // 1.25rem
  '6': 24,  // 1.5rem
  '7': 28,  // 1.75rem
  '8': 32,  // 2rem
  '9': 36,  // 2.25rem
  '10': 40, // 2.5rem
  '11': 44, // 2.75rem
  '12': 48, // 3rem
  '14': 56, // 3.5rem
  '16': 64, // 4rem
  '20': 80, // 5rem
  '24': 96, // 6rem
  '28': 112, // 7rem
  '32': 128, // 8rem
  '36': 144, // 9rem
  '40': 160, // 10rem
  '44': 176, // 11rem
  '48': 192, // 12rem
};

// Layout specific spacing
const layout = {
  page: {
    padding: 32, // 2rem
    maxWidth: 1280
  },
  section: {
    margin: 32, // 2rem
    padding: 24 // 1.5rem
  },
  card: {
    padding: 20, // 1.25rem
    gap: 16 // 1rem
  }
};

// Component specific spacing
const components = {
  button: {
    paddingX: 24, // 1.5rem
    paddingY: 12, // 0.75rem
    gap: 8 // 0.5rem
  },
  input: {
    paddingX: 12, // 0.75rem
    paddingY: 8 // 0.5rem
  },
  card: {
    paddingX: 24, // 1.5rem
    paddingY: 20 // 1.25rem
  },
  modal: {
    padding: 24 // 1.5rem
  },
  chatInput: {
    paddingTop: 24, // 1.5rem
    paddingBottom: 64, // 4rem
  },
  pageContent: {
    bottomMargin: 0
  }
};

// Utility function to create screen sizes
const screenSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const spacing = {
  base: baseSpacing,
  layout,
  components,
  screenSizes
};

export type SpacingType = typeof spacing;
