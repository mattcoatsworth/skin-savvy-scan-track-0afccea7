
import { colors, borders, shadows, spacing } from '../index';

/**
 * Card component styles
 * These styles match the existing card styling in the application
 */
export const cardStyles = {
  base: {
    backgroundColor: colors.background.card,
    borderRadius: borders.radius.xl,
    border: borders.card,
    boxShadow: shadows.ios.card,
    overflow: 'hidden',
  },
  
  // Card with iOS-style design
  ios: {
    backgroundColor: colors.background.card, 
    borderRadius: borders.radius.xl,
    border: borders.card,
    boxShadow: shadows.ios.card,
    overflow: 'hidden',
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
    padding: spacing.layout.card.padding,
    paddingBottom: spacing.sm,
  },
  
  content: {
    padding: spacing.layout.card.padding,
    paddingTop: 0,
  },
  
  footer: {
    padding: spacing.layout.card.padding,
    paddingTop: 0,
    display: 'flex',
    alignItems: 'center',
  },
  
  // Card variants
  variants: {
    bordered: {
      border: '1px solid hsl(var(--border))',
      boxShadow: 'none',
    },
    elevated: {
      boxShadow: shadows.ios.elevated,
    },
  }
};
