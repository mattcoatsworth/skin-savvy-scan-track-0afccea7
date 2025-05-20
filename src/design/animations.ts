
/**
 * Animation definitions for the application.
 * Provides reusable animation styles for components.
 */

export const animations = {
  // Keyframes - match the ones in Tailwind config
  keyframes: {
    'accordion-down': {
      from: { height: '0' },
      to: { height: 'var(--radix-accordion-content-height)' },
    },
    'accordion-up': {
      from: { height: 'var(--radix-accordion-content-height)' },
      to: { height: '0' },
    },
    'fade-in': {
      '0%': {
        opacity: "0",
        transform: "translateY(10px)"
      },
      '100%': {
        opacity: "1",
        transform: "translateY(0)"
      }
    }
  },
  
  // Animation definitions
  transitions: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
    button: 'background-color 0.2s ease, opacity 0.2s ease',
    transform: 'transform 0.2s ease',
    opacity: 'opacity 0.3s ease'
  },
  
  // Named animations
  variants: {
    fadeIn: {
      animation: 'fade-in 0.3s ease-out'
    },
    accordionDown: {
      animation: 'accordion-down 0.2s ease-out'
    },
    accordionUp: {
      animation: 'accordion-up 0.2s ease-out'
    }
  },
  
  // Hover effects
  hover: {
    scale: 'hover:scale-105 transition-transform duration-200',
    brightness: 'hover:brightness-95 transition-all duration-200',
    shadow: 'hover:shadow-md transition-shadow duration-200'
  },
  
  // Active/pressed effects
  active: {
    scale: 'active:scale-95 transition-transform duration-100',
    shadow: 'active:shadow-inner transition-shadow duration-100'
  }
};

export default animations;
