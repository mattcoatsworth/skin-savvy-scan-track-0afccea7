
/**
 * Design specifications for the Recommendation Detail page components
 * Including Disclaimer and Ask a Question chat box components
 */

import { colors } from '../colors';
import { spacing } from '../spacing';
import { typography } from '../typography';

export const recommendationDetailComponents = {
  /**
   * Disclaimer component design specifications
   */
  disclaimer: {
    container: {
      marginTop: spacing.base['6'], // 1.5rem (24px)
      marginBottom: spacing.base['4'], // 1rem (16px)
    },
    heading: {
      fontSize: typography.fontSize.lg, // 1.125rem (18px)
      fontWeight: typography.fontWeight.semibold,
      marginBottom: spacing.base['4'], // 1rem (16px)
      color: 'text-gray-600',
    },
    card: {
      padding: spacing.base['4'], // 1rem (16px)
      borderRadius: 'rounded-md',
      backgroundColor: 'bg-card',
      border: '1px solid',
      borderColor: 'border-gray-100',
      boxShadow: 'shadow-sm',
    },
    content: {
      fontSize: typography.fontSize.xs, // 0.75rem (12px)
      lineHeight: typography.lineHeight.relaxed,
      color: 'text-muted-foreground',
    },
    loadingIndicator: {
      height: spacing.base['4'], // 1rem (16px)
      marginY: spacing.base['4'], // 1rem (16px)
      dotSize: '0.5rem', // 2px
      dotColor: 'bg-gray-400',
      dotSpacing: '0.5rem', // 8px
      animationDelay: {
        first: '0ms',
        second: '300ms',
        third: '600ms'
      }
    },
  },
  
  /**
   * Ask a Question chat box design specifications
   */
  chatBox: {
    container: {
      marginTop: spacing.base['8'], // 2rem (32px)
      marginBottom: spacing.base['20'], // 5rem (80px)
    },
    suggestionScroll: {
      marginBottom: spacing.base['3'], // 0.75rem (12px)
      height: 'auto',
      paddingX: spacing.base['6'], // 1.5rem (24px)
      paddingBottom: '0.375rem', // 6px
      scrollIndicatorWidth: spacing.base['8'], // 2rem (32px)
    },
    suggestionButton: {
      paddingX: spacing.base['3'], // 0.75rem (12px)
      paddingY: '0.375rem', // 6px
      backgroundColor: 'bg-white',
      borderRadius: 'rounded-full',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700',
      fontSize: typography.fontSize.sm, // 0.875rem (14px)
      gap: '0.375rem', // 6px
      iconSize: '0.875rem', // 14px
    },
    scrollIndicator: {
      iconSize: '1.25rem', // 20px
      iconColor: 'text-gray-500',
      gradientFrom: 'from-slate-50',
      gradientTo: 'to-transparent',
    },
    card: {
      padding: spacing.base['4'], // 1rem (16px)
      borderRadius: 'rounded-md',
      backgroundColor: 'bg-card',
      borderColor: 'border-slate-200',
    },
    heading: {
      fontSize: typography.fontSize.base, // 1rem (16px)
      fontWeight: typography.fontWeight.medium,
      marginBottom: spacing.base['3'], // 0.75rem (12px)
      gap: spacing.base['2'], // 0.5rem (8px)
      iconColor: 'text-skin-teal',
      iconSize: '1rem', // 16px
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    input: {
      flex: '1',
      borderRadius: 'rounded-full',
      borderColor: 'border-gray-200',
      paddingRight: '2.5rem', // 40px
      paddingLeft: '1rem', // 16px
      backgroundColor: 'bg-white',
      boxShadow: 'shadow-sm',
      fontSize: typography.fontSize.sm, // 0.875rem (14px)
    },
    sendButton: {
      position: 'absolute',
      right: '0.25rem', // 4px
      padding: '0.25rem', // 4px
      backgroundColor: 'bg-transparent',
      hoverBackgroundColor: 'hover:bg-transparent',
      textColor: 'text-skin-teal',
      iconSize: '1rem', // 16px
    },
    helpText: {
      marginTop: spacing.base['2'], // 0.5rem (8px)
      fontSize: typography.fontSize.xs, // 0.75rem (12px)
      color: 'text-muted-foreground',
    },
    // Dynamic placeholder pattern uses the current product/recommendation title
    dynamicPlaceholder: "Ask about {title}...",
    defaultPlaceholder: "Ask a question..."
  }
};

export default recommendationDetailComponents;
