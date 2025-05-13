
/**
 * Component styles for cross-platform use
 * 
 * These are ready-to-use style objects for common components
 * that can be adapted for React Native.
 */

// Import theme elements for reference
import { colors } from './colors';
import { fontFamily, fontSize, fontWeight } from './typography';
import { borders } from './borders';

export const components = {
  // Button styles
  button: {
    base: {
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: borders.radius.full,
      minHeight: 40,
      gap: 8,
      fontWeight: fontWeight.medium,
      fontSize: fontSize.base
    },
    primary: {
      backgroundColor: colors.primary,
      color: colors.skin.white
    },
    secondary: {
      backgroundColor: colors.skin.gray,
      color: colors.skin.black
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: borders.width.thin,
      borderColor: colors.skin.lightgray,
      color: colors.skin.black
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.skin.black
    },
    destructive: {
      backgroundColor: colors.error,
      color: colors.skin.white
    },
    sizes: {
      sm: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        fontSize: fontSize.sm,
        minHeight: 32
      },
      md: {
        paddingHorizontal: 16, 
        paddingVertical: 10,
        fontSize: fontSize.base,
        minHeight: 40
      },
      lg: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        fontSize: fontSize.lg,
        minHeight: 48
      }
    }
  },
  
  // Card styles
  card: {
    base: {
      backgroundColor: colors.skin.white,
      borderRadius: borders.radius['3xl'],
      padding: 20,
      overflow: 'hidden'
    },
    interactive: {
      cursor: 'pointer',
      // Rest is the same as base
    }
  },
  
  // Input styles
  input: {
    base: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: borders.width.thin,
      borderColor: colors.gray[300],
      borderRadius: borders.radius.xl,
      backgroundColor: colors.skin.white,
      fontSize: fontSize.base,
      height: 40
    },
    focus: {
      borderColor: colors.primary,
      // React Native doesn't have outline, will use borderColor instead
    },
    error: {
      borderColor: colors.error
    },
    disabled: {
      backgroundColor: colors.gray[100],
      opacity: 0.7
    }
  },
  
  // Badge/Tag styles
  badge: {
    base: {
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: borders.radius.full,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
      textAlign: 'center'
    },
    primary: {
      backgroundColor: colors.primary,
      color: colors.skin.white
    },
    secondary: {
      backgroundColor: colors.skin.gray,
      color: colors.skin.black
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: borders.width.thin,
      borderColor: colors.skin.lightgray,
      color: colors.skin.black
    },
    success: {
      backgroundColor: colors.status.success,
      color: colors.skin.white
    },
    warning: {
      backgroundColor: colors.status.warning,
      color: colors.skin.black
    },
    error: {
      backgroundColor: colors.status.error,
      color: colors.skin.white
    },
    info: {
      backgroundColor: colors.status.info,
      color: colors.skin.white
    }
  },
  
  // Tab styles
  tab: {
    base: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontWeight: fontWeight.medium
    },
    active: {
      color: colors.primary,
      borderBottomWidth: borders.width.thick,
      borderBottomColor: colors.primary
    },
    inactive: {
      color: colors.gray[500],
      borderBottomWidth: borders.width.thin,
      borderBottomColor: 'transparent'
    }
  },
  
  // Avatar styles
  avatar: {
    base: {
      width: 40,
      height: 40,
      borderRadius: borders.radius.full,
      overflow: 'hidden',
      backgroundColor: colors.gray[300],
      alignItems: 'center',
      justifyContent: 'center'
    },
    sizes: {
      sm: { width: 24, height: 24 },
      md: { width: 40, height: 40 },
      lg: { width: 56, height: 56 },
      xl: { width: 80, height: 80 }
    }
  },
  
  // Common layout patterns
  layouts: {
    screenContainer: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    column: {
      flexDirection: 'column'
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
};

export type ComponentsType = typeof components;
