
/**
 * Border definitions for the application.
 * This includes border radii, widths, and styles.
 */

export const borders = {
  // Border radius
  radius: {
    none: '0',
    sm: 'calc(var(--radius) - 4px)', // 11px
    md: 'calc(var(--radius) - 2px)', // 13px
    lg: 'var(--radius)',             // 15px
    xl: '1rem',                      // 16px
    '2xl': '1.5rem',                 // 24px
    '3xl': '1.75rem',                // 28px
    full: '9999px'
  },
  
  // Border widths
  width: {
    DEFAULT: '1px',
    '0': '0',
    '2': '2px',
    '4': '4px',
    '8': '8px'
  },
  
  // Border styles
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
    none: 'none'
  },
  
  // Common border applications
  presets: {
    card: 'border-0 rounded-3xl',
    input: 'border border-input rounded-xl',
    button: 'rounded-full',
    buttonRect: 'rounded-xl',
    pill: 'rounded-full',
    tag: 'rounded-full'
  }
};

export default borders;
