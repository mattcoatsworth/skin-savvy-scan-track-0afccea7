
import { colors } from '../colors';
import { spacing } from '../spacing';
import typography from '../typography';

export const cardVariants = {
  default: "rounded-lg border bg-card text-card-foreground shadow-sm",
  primary: "rounded-lg border-2 border-primary bg-card text-card-foreground shadow-md",
  secondary: "rounded-lg border-2 border-secondary bg-card text-card-foreground shadow-md",
  success: "rounded-lg border-2 border-green-500 bg-card text-card-foreground shadow-md",
  warning: "rounded-lg border-2 border-amber-500 bg-card text-card-foreground shadow-md",
  error: "rounded-lg border-2 border-red-500 bg-card text-card-foreground shadow-md",
  info: "rounded-lg border-2 border-blue-500 bg-card text-card-foreground shadow-md",
  
  elevated: {
    default: "rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    primary: "rounded-lg border-2 border-primary bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    secondary: "rounded-lg border-2 border-secondary bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    success: "rounded-lg border-2 border-green-500 bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    warning: "rounded-lg border-2 border-amber-500 bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    error: "rounded-lg border-2 border-red-500 bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200",
    info: "rounded-lg border-2 border-blue-500 bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-200"
  },
  
  interactive: {
    default: "rounded-lg border bg-card text-card-foreground hover:bg-muted transition-colors duration-200",
    primary: "rounded-lg border-2 border-primary bg-card text-card-foreground hover:bg-primary/10 transition-colors duration-200",
    secondary: "rounded-lg border-2 border-secondary bg-card text-card-foreground hover:bg-secondary/10 transition-colors duration-200",
    success: "rounded-lg border-2 border-green-500 bg-card text-card-foreground hover:bg-green-500/10 transition-colors duration-200",
    warning: "rounded-lg border-2 border-amber-500 bg-card text-card-foreground hover:bg-amber-500/10 transition-colors duration-200",
    error: "rounded-lg border-2 border-red-500 bg-card text-card-foreground hover:bg-red-500/10 transition-colors duration-200",
    info: "rounded-lg border-2 border-blue-500 bg-card text-card-foreground hover:bg-blue-500/10 transition-colors duration-200"
  },
  
  shadowed: {
    default: "rounded-lg border bg-card text-card-foreground shadow-md",
    primary: "rounded-lg border-2 border-primary bg-card text-card-foreground shadow-md",
    secondary: "rounded-lg border-2 border-secondary bg-card text-card-foreground shadow-md",
    success: "rounded-lg border-2 border-green-500 bg-card text-card-foreground shadow-md",
    warning: "rounded-lg border-2 border-amber-500 bg-card text-card-foreground shadow-md",
    error: "rounded-lg border-2 border-red-500 bg-card text-card-foreground shadow-md",
    info: "rounded-lg border-2 border-blue-500 bg-card text-card-foreground shadow-md"
  },
  
  glass: "rounded-lg border border-border/50 bg-card/50 backdrop-blur-md text-card-foreground",
  
  dashed: "rounded-lg border-2 border-dashed border-border bg-card text-card-foreground",
  
  gradient: {
    default: "rounded-lg border bg-gradient-to-r from-primary to-secondary text-card-foreground shadow-md",
    primary: "rounded-lg border bg-gradient-to-r from-primary to-primary-foreground text-card-foreground shadow-md",
    secondary: "rounded-lg border bg-gradient-to-r from-secondary to-secondary-foreground text-card-foreground shadow-md",
    success: "rounded-lg border bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md",
    warning: "rounded-lg border bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md",
    error: "rounded-lg border bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md",
    info: "rounded-lg border bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
  },
  
  skinSavvy: {
    default: "relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm",
    sm: "relative overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm",
    lg: "relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md",
    xl: "relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg",
    outline: "relative overflow-hidden rounded-lg border-2 border-primary bg-white dark:bg-slate-950",
    ghost: "relative overflow-hidden rounded-lg bg-transparent shadow-none",
    header: {
      padding: "0.875rem", // Typography font size for body small
      fontSize: "1.25rem", // Typography font size for h3
    },
  }
};
