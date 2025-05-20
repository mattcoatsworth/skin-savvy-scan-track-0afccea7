
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
    default: `bg-primary text-primary-foreground hover:bg-primary/90`,
    outline: `border border-primary text-primary hover:bg-primary/10 hover:text-primary`,
    ghost: `text-primary hover:bg-primary/10 hover:text-primary`,
  },
  secondary: {
    default: `bg-secondary text-secondary-foreground hover:bg-secondary/80`,
    outline: `border border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary`,
    ghost: `text-secondary hover:bg-secondary/10 hover:text-secondary`,
  },
  accent: {
    default: `bg-accent text-accent-foreground hover:bg-accent/80`,
    outline: `border border-accent text-accent-foreground hover:bg-accent/20 hover:text-accent-foreground`,
    ghost: `text-accent-foreground hover:bg-accent/20 hover:text-accent-foreground`,
  },
  destructive: {
    default: `bg-destructive text-destructive-foreground hover:bg-destructive/90`,
    outline: `border border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive`,
    ghost: `text-destructive hover:bg-destructive/10 hover:text-destructive`,
  },
  muted: {
    default: `bg-muted text-muted-foreground hover:bg-muted/80`,
    outline: `border border-muted text-muted-foreground hover:bg-muted/10 hover:text-muted-foreground`,
    ghost: `text-muted-foreground hover:bg-muted/10 hover:text-muted-foreground`,
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
  // Use theme specific colors for these semantic variants
  positive: {
    default: `bg-green-500 text-white hover:bg-green-600`,
    outline: `border border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600`,
    ghost: `text-green-500 hover:bg-green-50 hover:text-green-600`,
  },
  warning: {
    default: `bg-amber-500 text-white hover:bg-amber-600`,
    outline: `border border-amber-500 text-amber-500 hover:bg-amber-50 hover:text-amber-600`,
    ghost: `text-amber-500 hover:bg-amber-50 hover:text-amber-600`,
  },
  danger: {
    default: `bg-red-500 text-white hover:bg-red-600`,
    outline: `border border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600`,
    ghost: `text-red-500 hover:bg-red-50 hover:text-red-600`,
  },
  info: {
    default: `bg-blue-500 text-white hover:bg-blue-600`,
    outline: `border border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600`,
    ghost: `text-blue-500 hover:bg-blue-50 hover:text-blue-600`,
  },
  light: {
    default: `bg-gray-200 text-gray-800 hover:bg-gray-300`,
    outline: `border border-gray-200 text-gray-200 hover:bg-gray-50 hover:text-gray-300`,
    ghost: `text-gray-200 hover:bg-gray-50 hover:text-gray-300`,
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
    default: "shadow-[0_4px_6px_-1px_rgba(var(--primary),0.1),0_2px_4px_-1px_rgba(var(--primary),0.06)]",
    sm: "shadow-[0_1px_2px_0_rgba(var(--primary),0.05)]",
    lg: "shadow-[0_10px_15px_-3px_rgba(var(--primary),0.1),0_4px_6px_-2px_rgba(var(--primary),0.05)]",
    xl: "shadow-[0_20px_25px_-5px_rgba(var(--primary),0.1),0_10px_10px_-5px_rgba(var(--primary),0.04)]",
    inner: "shadow-[inset_0_2px_4px_0_rgba(var(--primary),0.06)]",
    none: "shadow-none"
  }
};

export const buttonVariants = {
  rounded: 'rounded-full',
  default: 'rounded-md',
  square: 'rounded-none',
};
