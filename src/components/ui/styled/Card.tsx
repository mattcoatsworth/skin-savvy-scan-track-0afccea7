
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  ios?: boolean; // Added ios property to fix type errors
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ios, ...props }, ref) => {
    return (
      <div
        className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
