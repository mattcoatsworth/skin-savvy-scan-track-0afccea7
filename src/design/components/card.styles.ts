
import { colors, borders, shadows, spacing } from '../index';

/**
 * Card component styles
 * These styles match the existing card styling in the application
 */
export const cardStyles = {
  base: {
    backgroundColor: colors.theme.card,
    borderRadius: borders.radius.xl,
    border: borders.card,
    boxShadow: shadows.ios.card,
    padding: spacing.components.card.paddingX,
    overflow: 'hidden',
  },
  
  // Card with left border highlight
  highlighted: {
    borderLeftWidth: borders.width.thick,
    borderLeftStyle: borders.style.solid,
    variants: {
      health: {
        borderLeftColor: colors.cardHighlight.health,
      },
      energy: {
        borderLeftColor: colors.cardHighlight.energy,
      },
      warning: {
        borderLeftColor: colors.cardHighlight.warning,
      },
      error: {
        borderLeftColor: colors.cardHighlight.error,
      },
      neutral: {
        borderLeftColor: colors.cardHighlight.neutral,
      },
    }
  },
  
  // Card transitions and hover effects
  interactive: {
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    hover: {
      boxShadow: shadows.ios.elevated,
      transform: 'scale(1.01)',
    },
    active: {
      transform: 'scale(0.99)',
    }
  },
  
  // Card parts
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.components.card.header.marginBottom,
  },
  
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.components.iconText.gap,
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.base,
  },
  
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.components.card.content.gap,
  },
  
  footer: {
    marginTop: spacing.components.card.footer.marginTop,
    paddingTop: spacing.components.card.footer.paddingTop,
    borderTop: borders.components.card.divider,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // Card icon
  icon: {
    size: '1.25rem', // 20px
    marginRight: '0.5rem', // 8px
  },
  
  // Tailwind classes for quick reference
  tailwind: {
    base: 'bg-card rounded-xl border shadow-sm overflow-hidden',
    highlighted: 'border-l-4',
    header: 'flex justify-between items-center mb-3',
    title: 'flex items-center gap-2 font-medium text-base',
    content: 'space-y-2',
    footer: 'mt-3 pt-3 border-t border-gray-100 flex items-center justify-between',
    icon: {
      default: 'h-5 w-5',
      small: 'h-4 w-4'
    }
  }
};

export default cardStyles;
