
/**
 * Border definitions for the application.
 * These are used for consistent border styling across components.
 */

export const borders = {
  // Border radii
  radius: {
    none: '0',
    sm: '0.125rem',    // 2px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px 
    xl: '0.75rem',     // 12px - standard card radius
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px'     // Fully rounded (circles, pills)
  },
  
  // Border widths
  width: {
    none: '0',
    thin: '1px',
    normal: '2px',
    thick: '4px',      // Used for left borders on highlight cards
    accent: '4px'      // Used for accents like left borders
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
  inputDefault: '1px solid hsl(214.3 31.8% 91.4%)',
  inputFocus: '2px solid hsl(222.2 84% 4.9%)',
  
  // Card highlight borders
  cardHighlight: {
    health: '4px solid #4ADE80', // Green for health-related cards
    energy: '4px solid #6BB9FF', // Blue for energy/hydration cards
    warning: '4px solid #FFC170', // Amber for warning/alert cards
    error: '4px solid #FF4559', // Red for error/critical cards
    neutral: '4px solid #94A3B8' // Slate for informational cards
  },
  
  // Component specific borders
  components: {
    card: {
      default: 'border rounded-xl', // Standard card border
      highlighted: 'border-l-4 rounded-xl', // Card with left border accent
      divider: 'border-t border-gray-100' // Internal card divider
    },
    button: {
      default: 'rounded-md',
      pill: 'rounded-full'
    },
    input: {
      default: 'border rounded-md',
      focus: 'outline-none ring-2 ring-offset-2 ring-primary'
    },
    progress: {
      container: 'rounded-full',
      bar: 'rounded-full'
    }
  }
};

export default borders;
