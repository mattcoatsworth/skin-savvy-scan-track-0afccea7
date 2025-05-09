
/**
 * Typography definitions for the application.
 * These are configured via Tailwind and used throughout the app for consistent text styling.
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  
  // Font sizes - matches iOS typical sizing
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
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em'
  },

  // Usage examples
  styles: {
    heading1: 'text-3xl font-bold text-skin-black tracking-tight',
    heading2: 'text-2xl font-semibold text-skin-black',
    heading3: 'text-xl font-medium text-skin-black',
    body: 'text-base text-skin-black',
    bodyMuted: 'text-base text-muted-foreground',
    small: 'text-sm text-muted-foreground',
    link: 'text-blue-600 hover:underline cursor-pointer'
  }
};

export default typography;
