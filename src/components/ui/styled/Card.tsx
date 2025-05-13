import React from "react";
import { cardStyles } from "@/theme";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  interactive?: boolean;
  ios?: boolean;
}

/**
 * Card component using our JavaScript styles system
 * This makes it easier to adapt to React Native later
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  interactive = false,
  ios = false,
  ...props
}, ref) => {
  // Apply our style object with Tailwind classes
  const baseStyles = ios ? 'ios-card' : 'rounded-lg border bg-card text-card-foreground shadow-sm';
  const interactiveStyles = interactive ? 'transition-transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-md' : '';
  const variantStyles = variant === 'elevated' ? 'shadow-md' : variant === 'bordered' ? 'border-2' : '';
  
  return (
    <div
      ref={ref}
      className={cn(baseStyles, interactiveStyles, variantStyles, className)}
      style={{
        // We can use inline styles for properties that don't have Tailwind equivalents
        // or to prepare for React Native conversion
      }}
      {...props}
    />
  );
});

Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  CardTitleProps
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<
  HTMLDivElement,
  CardContentProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  CardFooterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export {
  // Re-export the existing components
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};
