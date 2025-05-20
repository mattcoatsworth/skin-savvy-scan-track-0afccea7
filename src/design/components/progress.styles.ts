
import { colors, borders } from '../index';

/**
 * Progress bar component styles
 * Used for ratings, energy levels, and other progress indicators
 */
export const progressStyles = {
  // Base progress bar container
  container: {
    width: '100%',
    height: '0.5rem', // 8px
    backgroundColor: '#F3F4F6', // light gray
    borderRadius: borders.radius.full,
    overflow: 'hidden',
  },
  
  // Progress bar indicator
  bar: {
    height: '100%',
    borderRadius: borders.radius.full,
    transition: 'width 0.3s ease',
  },
  
  // Color variants based on context
  variants: {
    // Energy progress (blue)
    energy: {
      backgroundColor: colors.skin.blue,
    },
    // Health progress (green)
    health: {
      backgroundColor: colors.status.success,
    },
    // Warning progress (amber)
    warning: {
      backgroundColor: colors.status.warning,
    },
    // Error progress (red)
    error: {
      backgroundColor: colors.status.error,
    },
    // Rating progress (dynamically colored)
    rating: {
      // These will be set dynamically based on rating value
      excellent: colors.rating.excellent,
      good: colors.rating.good,
      average: colors.rating.average,
      fair: colors.rating.fair,
      poor: colors.rating.poor,
    },
  },
  
  // Sizes for different contexts
  sizes: {
    xs: {
      height: '0.25rem', // 4px
    },
    sm: {
      height: '0.375rem', // 6px
    },
    md: {
      height: '0.5rem', // 8px - default
    },
    lg: {
      height: '0.75rem', // 12px
    },
  },
  
  // Tailwind classes for quick reference
  tailwind: {
    container: 'w-full bg-gray-200 rounded-full',
    bar: {
      base: 'h-full rounded-full',
      energy: 'bg-blue-500',
      health: 'bg-green-500',
      warning: 'bg-amber-500',
      error: 'bg-red-500',
    },
    sizes: {
      xs: 'h-1',
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3',
    },
  }
};

export default progressStyles;
