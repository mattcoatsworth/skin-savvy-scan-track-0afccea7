
import { colors, borders, shadows, spacing, typography } from '../index';

/**
 * Button component styles
 * These styles match the existing button styling in the application
 */
export const buttonStyles = {
  // Base button - shared properties across all variants
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.components.button.gap,
    fontWeight: typography.fontWeight.medium,
    transition: 'background-color 0.2s ease, opacity 0.2s ease',
    cursor: 'pointer',
  },
  
  // Size variations
  sizes: {
    sm: {
      padding: '0.375rem 0.75rem', // 6px 12px
      fontSize: typography.fontSize.xs,
      borderRadius: borders.radius.md,
    },
    md: {
      padding: '0.5rem 1rem', // 8px 16px
      fontSize: typography.fontSize.sm,
      borderRadius: borders.radius.lg,
    },
    lg: {
      padding: '0.625rem 1.25rem', // 10px 20px
      fontSize: typography.fontSize.base,
      borderRadius: borders.radius.lg,
    },
    icon: {
      padding: '0.5rem', // 8px all sides
      borderRadius: borders.radius.full,
    }
  },
  
  // Style variants
  variants: {
    // Primary button - high emphasis, main actions
    primary: {
      backgroundColor: colors.theme.primary,
      color: colors.theme['primary-foreground'],
      hover: {
        opacity: 0.9,
      },
      active: {
        opacity: 0.8,
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    
    // Secondary button - medium emphasis actions
    secondary: {
      backgroundColor: colors.theme.secondary,
      color: colors.theme['secondary-foreground'],
      hover: {
        backgroundColor: 'hsl(var(--secondary)/80)'
      },
      active: {
        opacity: 0.8,
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    
    // Outline button - lower emphasis actions
    outline: {
      backgroundColor: 'transparent',
      color: colors.theme.foreground,
      border: `1px solid ${colors.theme.border}`,
      hover: {
        backgroundColor: colors.theme.accent,
        color: colors.theme['accent-foreground'],
      },
      active: {
        backgroundColor: 'hsl(var(--accent)/0.8)',
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    
    // Ghost button - lowest emphasis, often used in cards
    ghost: {
      backgroundColor: 'transparent',
      color: colors.theme.foreground,
      hover: {
        backgroundColor: 'hsl(var(--ghost-hover))',
      },
      active: {
        backgroundColor: 'hsl(var(--ghost-hover)/0.8)',
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    
    // Link button - for text links
    link: {
      backgroundColor: 'transparent',
      color: colors.theme.primary,
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
      padding: 0,
      hover: {
        color: 'hsl(var(--primary)/0.9)',
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    
    // Destructive button - for destructive actions
    destructive: {
      backgroundColor: colors.theme.destructive,
      color: colors.theme['destructive-foreground'],
      hover: {
        backgroundColor: 'hsl(var(--destructive)/0.9)',
      },
      active: {
        opacity: 0.8,
      },
      disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  
  // Button with specific colors that don't change with theme
  constants: {
    skinGoals: {
      backgroundColor: colors.constantColors.skinGoalsButton,
      color: '#FFFFFF',
      borderRadius: borders.radius.md,
      padding: '0.75rem 1rem',
      width: '100%',
      fontWeight: typography.fontWeight.medium,
      transition: 'opacity 0.2s ease',
      hover: {
        opacity: 0.9,
      },
    }
  },
  
  // Icon styles within buttons
  icon: {
    marginRight: '0.25rem',
    size: {
      sm: '0.875rem', // 14px
      md: '1rem',     // 16px
      lg: '1.25rem',  // 20px
    },
  },
  
  // Tailwind classes for quick reference
  tailwind: {
    base: 'inline-flex items-center justify-center whitespace-nowrap',
    sizes: {
      sm: 'text-xs py-1.5 px-3 rounded-md',
      md: 'text-sm py-2 px-4 rounded-lg',
      lg: 'text-base py-2.5 px-5 rounded-lg',
      icon: 'p-2 rounded-full'
    },
    variants: {
      primary: 'bg-primary text-primary-foreground hover:opacity-90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-[hsl(var(--ghost-hover))]',
      link: 'text-primary underline-offset-4 hover:underline',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
    }
  }
};

export default buttonStyles;
