
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge as ShadcnBadge } from '@/components/ui/badge';

interface StyledBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info';
  value?: number | string;
  label?: string;
  className?: string;
}

export function StyledBadge({ variant = 'default', value, label, className, ...props }: StyledBadgeProps) {
  // Determine color based on variant
  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border-border text-foreground',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    info: 'bg-blue-100 text-blue-800'
  };

  // For rating values, determine color based on value
  const getRatingColor = (rating: number) => {
    if (rating >= 80) return 'bg-emerald-100 text-emerald-800';
    if (rating >= 60) return 'bg-blue-100 text-blue-800';
    if (rating >= 40) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  const isRating = typeof value === 'number' && !label;
  const badgeClass = isRating 
    ? getRatingColor(value as number) 
    : variantClasses[variant];

  return (
    <ShadcnBadge
      className={cn(
        'flex items-center gap-1 py-1 px-2 text-xs font-medium rounded-full',
        badgeClass,
        className
      )}
      {...props}
    >
      {value !== undefined && <span>{value}{isRating && '%'}</span>}
      {label && <span>{label}</span>}
    </ShadcnBadge>
  );
}

export default StyledBadge;
