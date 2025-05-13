
/**
 * Spacing definitions for the application.
 * Based on a 4px base unit for consistent layout spacing.
 */

export const spacing = {
  // Base spacing units
  unit: 4, // 4px base unit
  
  // Named spacing values
  none: 0,
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
  
  // Function to generate custom spacing
  getValue: (multiplier: number) => `${multiplier * 0.25}rem`, // returns spacing in rem
  
  // Layout spacing
  layout: {
    page: {
      paddingX: '1rem',
      paddingY: '1.5rem',
      maxWidth: '32rem' // 512px (matches max-w-md in Tailwind)
    },
    card: {
      padding: '1.5rem',
      gap: '1rem',
      marginBottom: '1.5rem',
      borderRadius: '0.75rem'
    },
    section: {
      marginBottom: '1.5rem'
    },
    stack: {
      gapSmall: '0.5rem',
      gapMedium: '1rem',
      gapLarge: '1.5rem'
    }
  }
};

export default spacing;
