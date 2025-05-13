/**
 * Color palette definitions for the application.
 * These colors are configured in the Tailwind config and can be accessed via CSS variables.
 */

export const colors = {
  // Base colors
  skin: {
    black: '#1E1E1E',
    gray: '#F8F8FA',
    lightgray: '#F2F2F7',
    white: '#FFFFFF',
    flame: '#FF6B01',
    red: '#FF4559',
    blue: '#6BB9FF',
    amber: '#FFC170',
    teal: '#20B2AA'
  },
  
  // Theme colors
  theme: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: 'hsl(var(--primary))',
    'primary-foreground': 'hsl(var(--primary-foreground))',
    secondary: 'hsl(var(--secondary))',
    'secondary-foreground': 'hsl(var(--secondary-foreground))',
    muted: 'hsl(var(--muted))',
    'muted-foreground': 'hsl(var(--muted-foreground))',
    accent: 'hsl(var(--accent))',
    'accent-foreground': 'hsl(var(--accent-foreground))',
    destructive: 'hsl(var(--destructive))',
    'destructive-foreground': 'hsl(var(--destructive-foreground))',
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    card: 'hsl(var(--card))',
    'card-foreground': 'hsl(var(--card-foreground))',
    popover: 'hsl(var(--popover))',
    'popover-foreground': 'hsl(var(--popover-foreground))',
    sidebar: {
      background: 'hsl(var(--sidebar-background))',
      foreground: 'hsl(var(--sidebar-foreground))',
      primary: 'hsl(var(--sidebar-primary))',
      'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
      accent: 'hsl(var(--sidebar-accent))',
      'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
      border: 'hsl(var(--sidebar-border))',
      ring: 'hsl(var(--sidebar-ring))'
    },
    // Spring theme specific colors
    spring: {
      blue: 'hsl(var(--spring-blue))',
      teal: 'hsl(var(--spring-teal))'
    },
    
    // Summer theme specific colors - masculine palette
    summer: {
      sage: 'hsl(var(--summer-sage))',
      slate: 'hsl(var(--summer-slate))',
      sand: 'hsl(var(--summer-sand))',
      stone: 'hsl(var(--summer-stone))',
      steel: 'hsl(var(--summer-steel))',
      navy: 'hsl(var(--summer-navy))', 
      brightBlue: 'hsl(var(--summer-bright-blue))',
      // Colors for the Today's Skin card
      emerald: 'hsl(var(--summer-emerald))', // For food factors
      azure: 'hsl(var(--summer-azure))',     // For supplement factors
      violet: 'hsl(var(--summer-violet))',   // For makeup factors
      amber: 'hsl(var(--summer-amber))'      // For weather factors
    }
  },

  // Status colors for feedback
  status: {
    success: '#34C759',
    warning: '#FFC170',
    error: '#FF4559',
    info: '#6BB9FF'
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
    energetic: 'linear-gradient(180deg, rgb(254,100,121) 0%, rgb(251,221,186) 100%)',
    calm: 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
    warm: 'linear-gradient(111.4deg, rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58%)',
    // Spring theme gradient 
    spring: 'linear-gradient(120deg, #FF6B01 0%, #FFC170 100%)',
    // Summer theme gradient
    summer: 'linear-gradient(120deg, #66B3D9 0%, #8CD2BE 100%)'
  }
};

export default colors;
