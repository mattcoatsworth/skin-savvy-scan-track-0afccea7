
/**
 * Animation definitions for the application.
 * These provide consistent transitions and animations across components.
 */

export const animations = {
  // Transition durations
  duration: {
    DEFAULT: '150ms',
    fast: '100ms',
    normal: '150ms',
    slow: '300ms',
    slower: '500ms'
  },
  
  // Transition timing functions
  easing: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  // Keyframes
  keyframes: {
    'accordion-down': {
      from: { height: '0' },
      to: { height: 'var(--radix-accordion-content-height)' }
    },
    'accordion-up': {
      from: { height: 'var(--radix-accordion-content-height)' },
      to: { height: '0' }
    },
    'fade-in': {
      "0%": {
        opacity: "0",
        transform: "translateY(10px)"
      },
      "100%": {
        opacity: "1",
        transform: "translateY(0)"
      }
    },
    'bounce': {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' }
    },
    'pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.6 }
    },
    'scale-in': {
      '0%': { 
        transform: 'scale(0.95)', 
        opacity: '0' 
      },
      '100%': { 
        transform: 'scale(1)', 
        opacity: '1' 
      }
    },
    'progress-bar': {
      '0%': { width: '0%' },
      '100%': { width: '100%' }
    }
  },
  
  // Animation presets
  presets: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
    'fade-in': 'fade-in 0.3s ease-out',
    'bounce': 'bounce 2s infinite',
    'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'scale-in': 'scale-in 0.2s ease-out',
    'progress-bar': 'progress-bar 2.5s ease-in-out forwards'
  },
  
  // Common animations
  hover: {
    scale: 'transition-transform hover:scale-105',
    opacity: 'transition-opacity hover:opacity-80',
    shadow: 'transition-shadow hover:shadow-md',
    border: 'transition-colors hover:border-primary'
  },
  
  // Active state animations
  active: {
    scale: 'active:scale-[0.98]',
    opacity: 'active:opacity-70'
  }
};

export default animations;
