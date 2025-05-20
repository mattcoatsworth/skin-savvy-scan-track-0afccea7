import { colors } from '../colors';
import { spacing } from '../spacing';
import typography from '../typography';

export const cardVariants = {
  default: "rounded-lg border bg-card text-card-foreground shadow-sm",
  primary: "rounded-lg border-2 border-primary bg-card text-card-foreground shadow-md",
  secondary: "rounded-lg border-2 border-secondary bg-card text-card-foreground shadow-md",
  success: "rounded-lg border-2 border-success bg-card text-card-foreground shadow-md",
  warning: "rounded-lg border-2 border-warning bg-card text-card-foreground shadow-md",
  error: "rounded-lg border-2 border-error bg-card text-card-foreground shadow-md",
  info: "rounded-lg border-2 border-info bg-card text-card-foreground shadow-md",
  
  elevated: {
    default: "rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    primary: "rounded-lg border-2 border-primary bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    secondary: "rounded-lg border-2 border-secondary bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    success: "rounded-lg border-2 border-success bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    warning: "rounded-lg border-2 border-warning bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    error: "rounded-lg border-2 border-error bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    info: "rounded-lg border-2 border-info bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200"
  },
  
  interactive: {
    default: "rounded-lg border bg-card text-card-foreground hover:bg-muted transition-colors duration-200",
    primary: "rounded-lg border-2 border-primary bg-card text-card-foreground hover:bg-primary/10 transition-colors duration-200",
    secondary: "rounded-lg border-2 border-secondary bg-card text-card-foreground hover:bg-secondary/10 transition-colors duration-200",
    success: "rounded-lg border-2 border-success bg-card text-card-foreground hover:bg-success/10 transition-colors duration-200",
    warning: "rounded-lg border-2 border-warning bg-card text-card-foreground hover:bg-warning/10 transition-colors duration-200",
    error: "rounded-lg border-2 border-error bg-card text-card-foreground hover:bg-error/10 transition-colors duration-200",
    info: "rounded-lg border-2 border-info bg-card text-card-foreground hover:bg-info/10 transition-colors duration-200"
  },
  
  shadowed: {
    default: "rounded-lg border bg-card text-card-foreground shadow-md",
    primary: "rounded-lg border-2 border-primary bg-card text-card-foreground shadow-md",
    secondary: "rounded-lg border-2 border-secondary bg-card text-card-foreground shadow-md",
    success: "rounded-lg border-2 border-success bg-card text-card-foreground shadow-md",
    warning: "rounded-lg border-2 border-warning bg-card text-card-foreground shadow-md",
    error: "rounded-lg border-2 border-error bg-card text-card-foreground shadow-md",
    info: "rounded-lg border-2 border-info bg-card text-card-foreground shadow-md"
  },
  
  glass: "rounded-lg border border-border/50 bg-card/50 backdrop-blur-md text-card-foreground",
  
  dashed: "rounded-lg border-2 border-dashed border-border bg-card text-card-foreground",
  
  gradient: {
    default: "rounded-lg border bg-gradient-to-r from-primary to-secondary text-card-foreground shadow-md",
    primary: "rounded-lg border bg-gradient-to-r from-primary to-primary-foreground text-card-foreground shadow-md",
    secondary: "rounded-lg border bg-gradient-to-r from-secondary to-secondary-foreground text-card-foreground shadow-md",
    success: "rounded-lg border bg-gradient-to-r from-success to-success-foreground text-card-foreground shadow-md",
    warning: "rounded-lg border bg-gradient-to-r from-warning to-warning-foreground text-card-foreground shadow-md",
    error: "rounded-lg border bg-gradient-to-r from-error to-error-foreground text-card-foreground shadow-md",
    info: "rounded-lg border bg-gradient-to-r from-info to-info-foreground text-card-foreground shadow-md"
  },
  
  skinSavvy: {
    default: "relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm",
    sm: "relative overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm",
    lg: "relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md",
    xl: "relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg",
    outline: "relative overflow-hidden rounded-lg border-2 border-primary bg-white dark:bg-slate-950",
    ghost: "relative overflow-hidden rounded-lg bg-transparent shadow-none",
    header: {
      padding: typography.variants.bodySmall.fontSize, // "0.875rem"
      fontSize: typography.variants.h3.fontSize, // "1.25rem"
    },
  }
};
