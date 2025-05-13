
/**
 * Border definitions for the application.
 * These are used for consistent border styling across components.
 */

export const borders = {
  // Border widths
  width: {
    none: '0',
    thin: '1px',
    normal: '2px',
    thick: '4px'
  },
  
  // Border radii
  radius: {
    none: '0',
    sm: '0.125rem',    // 2px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px 
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    full: '9999px'     // Fully rounded
  },
  
  // Border styles
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted'
  },
  
  // Premade border combinations
  default: '1px solid hsl(214.3 31.8% 91.4%)',
  card: '1px solid hsl(214.3 31.8% 91.4%)',
  divider: '1px solid hsl(214.3 31.8% 91.4%)',
  input: '1px solid hsl(214.3 31.8% 91.4%)',
  focus: '2px solid hsl(222.2 84% 4.9%)',
  interactive: '1px solid transparent'
};

export default borders;
