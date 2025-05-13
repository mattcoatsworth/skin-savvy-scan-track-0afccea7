/**
 * Typography definitions for the application.
 * These are named variants for consistent text styling across the app.
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  },
  
  // Font sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem'     // 48px
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },
  
  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  },
  
  // Text variants (combinations of font properties)
  variants: {
    // Headings
    h1: {
      fontSize: '1.875rem',
      fontWeight: '700',
      lineHeight: '1.25',
      color: '#1E1E1E'
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.25',
      color: '#1E1E1E' 
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: '600',
      lineHeight: '1.375',
      color: '#1E1E1E'
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: '500',
      lineHeight: '1.375',
      color: '#1E1E1E'
    },
    
    // Body text
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      color: '#1E1E1E'
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.5',
      color: '#1E1E1E'
    },
    bodyXSmall: {
      fontSize: '0.75rem',
      fontWeight: '400',
      lineHeight: '1.5',
      color: '#888888'
    },
    
    // Special text
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.375',
      color: '#555555'
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: '400',
      lineHeight: '1.25',
      color: '#888888'
    },
    link: {
      fontSize: '1rem',
      fontWeight: '500',
      lineHeight: '1.5',
      color: '#6BB9FF',
      textDecoration: 'none'
    }
  }
};

export default typography;
