
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ios?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className,
  ios = false,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow p-4",
        ios && "rounded-2xl shadow-md",
        className
      )}
      {...props}
    />
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className,
  ...props 
}) => {
  return (
    <div
      className={cn("mb-2", className)}
      {...props}
    />
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ 
  className,
  ...props 
}) => {
  return (
    <h3
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ 
  className,
  ...props 
}) => {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className,
  ...props 
}) => {
  return (
    <div
      className={cn("", className)}
      {...props}
    />
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className,
  ...props 
}) => {
  return (
    <div
      className={cn("flex items-center mt-4 pt-2 border-t", className)}
      {...props}
    />
  );
};
