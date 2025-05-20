
/**
 * Typography definitions for the application.
 * These are configured via Tailwind and used throughout the app for consistent text styling.
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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

  // Usage examples - predefined typography combinations
  styles: {
    // Headings
    h1: 'text-3xl font-bold text-skin-black tracking-tight',
    h2: 'text-2xl font-semibold text-skin-black',
    h3: 'text-xl font-medium text-skin-black',
    h4: 'text-lg font-medium text-skin-black',
    
    // Body text
    body: 'text-base text-skin-black',
    bodySmall: 'text-sm text-skin-black',
    bodyMuted: 'text-base text-muted-foreground',
    
    // Special text
    small: 'text-sm text-muted-foreground',
    tiny: 'text-xs text-muted-foreground',
    label: 'text-xs font-medium text-muted-foreground',
    link: 'text-blue-600 hover:underline cursor-pointer',
    
    // Card specific
    cardTitle: 'font-medium text-base',
    cardLabel: 'text-xs text-muted-foreground',
    cardValue: 'text-sm',
    cardFooter: 'text-xs text-muted-foreground'
  },
  
  // Component specific text
  components: {
    // Card typography
    card: {
      title: 'font-medium text-base',
      header: 'flex justify-between items-center mb-3',
      label: 'text-xs text-muted-foreground mb-1',
      value: 'text-sm',
      footer: 'mt-3 pt-3 border-t border-gray-100',
      footerText: 'text-xs'
    },
    
    // Button typography
    button: {
      primary: 'font-medium',
      secondary: 'font-medium',
      ghost: 'text-xs'
    },
    
    // Rating typography
    rating: {
      value: 'text-2xl font-semibold',
      label: 'text-xs font-medium'
    }
  }
};

export default typography;
