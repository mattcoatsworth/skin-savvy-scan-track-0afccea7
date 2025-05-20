import { colors } from '../colors';
import { spacing } from '../spacing';
import typography from '../typography';

/**
 * Button style variants for different appearances.
 * Includes size, color, and shadow options.
 */
export const buttonSizeVariants = {
  xs: {
    padding: `${spacing.components.button.paddingY} ${spacing.components.button.paddingX}`,
    fontSize: typography.fontSize.xs,
  },
  sm: {
    padding: `${spacing.components.button.paddingY} ${spacing.components.button.paddingX}`,
    fontSize: typography.fontSize.sm,
  },
  md: {
    padding: `${spacing.components.button.paddingY} ${spacing.components.button.paddingX}`,
    fontSize: typography.fontSize.base,
  },
  lg: {
    padding: `${spacing.components.button.paddingY} ${spacing.components.button.paddingX}`,
    fontSize: typography.fontSize.lg,
  },
};

export const buttonColorVariants = {
  primary: {
    default: `bg-${colors.theme.primary} text-white hover:bg-${colors.theme.primary}Dark`,
    outline: `border border-${colors.theme.primary} text-${colors.theme.primary} hover:bg-${colors.theme.primary}Light hover:text-white`,
    ghost: `text-${colors.theme.primary} hover:bg-${colors.theme.primary}Light hover:text-white`,
  },
  secondary: {
    default: `bg-${colors.theme.secondary} text-white hover:bg-${colors.theme.secondary}Dark`,
    outline: `border border-${colors.theme.secondary} text-${colors.theme.secondary} hover:bg-${colors.theme.secondary}Light hover:text-white`,
    ghost: `text-${colors.theme.secondary} hover:bg-${colors.theme.secondary}Light hover:text-white`,
  },
  success: {
    default: `bg-${colors.theme.success} text-white hover:bg-${colors.theme.success}Dark`,
    outline: `border border-${colors.theme.success} text-${colors.theme.success} hover:bg-${colors.theme.success}Light hover:text-white`,
    ghost: `text-${colors.theme.success} hover:bg-${colors.theme.success}Light hover:text-white`,
  },
  warning: {
    default: `bg-${colors.theme.warning} text-white hover:bg-${colors.theme.warning}Dark`,
    outline: `border border-${colors.theme.warning} text-${colors.theme.warning} hover:bg-${colors.theme.warning}Light hover:text-white`,
    ghost: `text-${colors.theme.warning} hover:bg-${colors.theme.warning}Light hover:text-white`,
  },
  error: {
    default: `bg-${colors.theme.error} text-white hover:bg-${colors.theme.error}Dark`,
    outline: `border border-${colors.theme.error} text-${colors.theme.error} hover:bg-${colors.theme.error}Light hover:text-white`,
    ghost: `text-${colors.theme.error} hover:bg-${colors.theme.error}Light hover:text-white`,
  },
  info: {
    default: `bg-${colors.theme.info} text-white hover:bg-${colors.theme.info}Dark`,
    outline: `border border-${colors.theme.info} text-${colors.theme.info} hover:bg-${colors.theme.info}Light hover:text-white`,
    ghost: `text-${colors.theme.info} hover:bg-${colors.theme.info}Light hover:text-white`,
  },
  light: {
    default: `bg-${colors.theme.light} text-gray-800 hover:bg-${colors.theme.light}Dark`,
    outline: `border border-${colors.theme.light} text-${colors.theme.light} hover:bg-${colors.theme.light}Light hover:text-gray-800`,
    ghost: `text-${colors.theme.light} hover:bg-${colors.theme.light}Light hover:text-gray-800`,
  },
  dark: {
    default: `bg-${colors.theme.dark} text-white hover:bg-${colors.theme.dark}Dark`,
    outline: `border border-${colors.theme.dark} text-${colors.theme.dark} hover:bg-${colors.theme.dark}Light hover:text-white`,
    ghost: `text-${colors.theme.dark} hover:bg-${colors.theme.dark}Light hover:text-white`,
  },
  white: {
    default: `bg-white text-gray-800 hover:bg-gray-100`,
    outline: `border border-white text-white hover:bg-gray-100 hover:text-gray-800`,
    ghost: `text-white hover:bg-gray-100 hover:text-gray-800`,
  },
  gray: {
    default: `bg-gray-500 text-white hover:bg-gray-600`,
    outline: `border border-gray-500 text-gray-500 hover:bg-gray-100 hover:text-gray-800`,
    ghost: `text-gray-500 hover:bg-gray-100 hover:text-gray-800`,
  },
};

export const buttonShadowVariants = {
  default: {
    default: "shadow-md hover:shadow-lg",
    sm: "shadow-sm hover:shadow",
    lg: "shadow-lg hover:shadow-xl",
    xl: "shadow-xl hover:shadow-2xl",
    "2xl": "shadow-2xl hover:shadow-3xl",
    inner: "shadow-inner hover:shadow-inner",
    none: "shadow-none hover:shadow-none"
  },
  inset: {
    default: "shadow-inner hover:shadow-inner",
    sm: "shadow-inner hover:shadow-inner",
    lg: "shadow-inner hover:shadow-inner",
    xl: "shadow-inner hover:shadow-inner",
    "2xl": "shadow-inner hover:shadow-inner",
    inner: "shadow-inner hover:shadow-inner",
    none: "shadow-none hover:shadow-none"
  },
  // Shadcn style shadows
  shadcn: {
    default: "shadow-sm hover:shadow",
    sm: "shadow-sm hover:shadow",
    lg: "shadow-md hover:shadow-lg",
    xl: "shadow-lg hover:shadow-xl",
    "2xl": "shadow-xl hover:shadow-2xl",
    inner: "shadow-inner hover:shadow-inner",
    none: "shadow-none hover:shadow-none"
  },
  
  colorful: {
    default: `shadow-[0_4px_6px_-1px_rgba(${colors.theme.primary},0.1),0_2px_4px_-1px_rgba(${colors.theme.primary},0.06)]`,
    sm: `shadow-[0_1px_2px_0_rgba(${colors.theme.primary},0.05)]`,
    lg: `shadow-[0_10px_15px_-3px_rgba(${colors.theme.primary},0.1),0_4px_6px_-2px_rgba(${colors.theme.primary},0.05)]`,
    xl: `shadow-[0_20px_25px_-5px_rgba(${colors.theme.primary},0.1),0_10px_10px_-5px_rgba(${colors.theme.primary},0.04)]`,
    inner: `shadow-[inset_0_2px_4px_0_rgba(${colors.theme.primary},0.06)]`,
    none: "shadow-none"
  }
};

export const buttonVariants = {
  rounded: 'rounded-full',
  default: 'rounded-md',
  square: 'rounded-none',
};
