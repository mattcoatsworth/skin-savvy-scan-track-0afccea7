
import { colors, typography, borders, spacing } from '../index';

/**
 * Navigation component styles
 * These styles are for navigation elements like back buttons
 */
export const navigationStyles = {
  // Back button styling
  backButton: {
    container: {
      display: 'flex',
      alignItems: 'center',
      marginRight: spacing.md,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.xs,
    },
    icon: {
      color: colors.text.primary,
      size: '1.25rem',
    }
  },
  
  // Header styling for recommendation pages
  recommendationHeader: {
    container: {
      marginBottom: spacing.xl,
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: typography.fontSize.sm,
      color: colors.skin.teal,
    },
    dateContainer: {
      display: 'flex',
      alignItems: 'center',
      fontSize: typography.fontSize.sm,
      color: 'hsl(var(--muted-foreground))',
    },
    dateIcon: {
      height: '1rem',
      width: '1rem',
      marginRight: spacing.xs,
    }
  }
};

/**
 * Progress bar styles used in recommendation pages
 */
export const progressStyles = {
  container: {
    marginBottom: spacing.md,
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  value: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  track: {
    height: spacing.sm,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'hsl(var(--muted))',
    borderRadius: borders.radius.full,
  },
  indicator: {
    height: '100%',
    transition: 'width 0.2s ease',
  }
};
