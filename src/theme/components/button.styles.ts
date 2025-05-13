
import { colors, typography, borders, spacing } from '../index';

/**
 * Button component styles
 * These styles match the existing button styling in the application
 */
export const buttonStyles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    whiteSpace: 'nowrap',
    borderRadius: borders.radius.md,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    transition: 'colors 0.2s, opacity 0.2s',
    cursor: 'pointer',
    lineHeight: typography.lineHeight.none,
    outline: 'none',
  },
  
  // Icon styling inside buttons
  icon: {
    pointerEvents: 'none',
    size: '1rem',
    flexShrink: 0,
  },
  
  // Size variants
  sizes: {
    default: {
      height: '2.5rem', // h-10
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    sm: {
      height: '2.25rem', // h-9
      borderRadius: borders.radius.md,
      paddingHorizontal: spacing.sm,
    },
    lg: {
      height: '2.75rem', // h-11
      borderRadius: borders.radius.md,
      paddingHorizontal: '2rem', // px-8
    },
    icon: {
      height: '2.5rem', // h-10
      width: '2.5rem', // w-10
    }
  },
  
  // Style variants
  variants: {
    default: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      hover: {
        backgroundColor: 'hsla(var(--primary), 0.9)',
      }
    },
    destructive: {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))',
      hover: {
        backgroundColor: 'hsla(var(--destructive), 0.9)',
      }
    },
    outline: {
      border: borders.default,
      backgroundColor: 'hsl(var(--background))',
      hover: {
        backgroundColor: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))',
      }
    },
    secondary: {
      backgroundColor: 'hsl(var(--secondary))',
      color: 'hsl(var(--secondary-foreground))',
      hover: {
        backgroundColor: 'hsla(var(--secondary), 0.8)',
      }
    },
    ghost: {
      backgroundColor: 'transparent',
      hover: {
        backgroundColor: 'hsl(var(--ghost-hover))',
        color: 'hsl(var(--accent-foreground))',
      }
    },
    link: {
      color: 'hsl(var(--primary))',
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textUnderlineOffset: '4px',
      hover: {
        textDecorationStyle: 'solid',
      }
    },
    // Special "skin goals" button from CSS
    skinGoals: {
      color: '#ffffff',
      borderRadius: borders.radius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      width: '100%',
      textAlign: 'center',
      fontWeight: typography.fontWeight.medium,
      backgroundColor: '#000000',
      transition: 'opacity 0.2s ease',
      hover: {
        opacity: 0.9,
      }
    }
  },
  
  // Disabled state
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5
  }
};
