
import { colors, borders, shadows, typography } from '../index';

/**
 * Rating component styles
 * Used for skin condition ratings and history
 */
export const ratingVariants = {
  // Rating circle for history display
  circle: {
    width: '2.5rem', // 40px
    height: '2.5rem', // 40px
    borderRadius: borders.radius.full,
    backgroundColor: '#FFFFFF',
    boxShadow: shadows.sm,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem', // 4px
  },
  
  // Day text in rating circle
  day: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: '#6B7280', // text-gray-500
    marginBottom: '0.125rem', // 2px
  },
  
  // Date text in rating display
  date: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: '#6B7280', // text-gray-500
    marginTop: '0.25rem', // 4px
  },
  
  // Rating indicator dot
  dot: {
    width: '0.5rem', // 8px
    height: '0.5rem', // 8px
    borderRadius: borders.radius.full,
  },
  
  // Rating label (Excellent, Good, etc.)
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  
  // Rating value (numeric)
  value: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  
  // Rating colors based on score
  colors: {
    excellent: {
      text: colors.rating.excellent,
      bg: colors.ratingBg.excellent,
      dot: colors.rating.excellent,
    },
    good: {
      text: colors.rating.good,
      bg: colors.ratingBg.good,
      dot: colors.rating.good,
    },
    average: {
      text: colors.rating.average,
      bg: colors.ratingBg.average,
      dot: colors.rating.average,
    },
    fair: {
      text: colors.rating.fair,
      bg: colors.ratingBg.fair,
      dot: colors.rating.fair,
    },
    poor: {
      text: colors.rating.poor,
      bg: colors.ratingBg.poor,
      dot: colors.rating.poor,
    },
  },
  
  // Rating history container
  history: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '0.5rem', // 8px
  },
  
  // Current day highlight in history
  currentDay: {
    transform: 'scale(1.05)',
    border: `2px solid ${colors.theme.border}`,
  },
  
  // Tailwind classes for quick reference
  tailwind: {
    circle: 'w-10 h-10 rounded-full bg-white shadow-sm flex flex-col items-center justify-center p-1',
    day: 'text-xs text-gray-500 mb-0.5',
    date: 'text-xs text-gray-500 mt-1',
    dot: 'w-2 h-2 rounded-full',
    label: 'text-xs font-medium',
    value: 'text-sm font-semibold',
    history: 'flex items-end justify-between gap-2',
    currentDay: 'scale-105 border-2 border-gray-200',
    colors: {
      excellent: {
        text: 'text-green-500',
        bg: 'bg-green-50',
        dot: 'bg-green-500',
      },
      good: {
        text: 'text-green-600',
        bg: 'bg-green-50',
        dot: 'bg-green-600',
      },
      average: {
        text: 'text-yellow-500',
        bg: 'bg-yellow-50',
        dot: 'bg-yellow-500',
      },
      fair: {
        text: 'text-orange-500',
        bg: 'bg-orange-50',
        dot: 'bg-orange-500',
      },
      poor: {
        text: 'text-red-500',
        bg: 'bg-red-50',
        dot: 'bg-red-500',
      },
    }
  }
};

export default ratingVariants;
