
import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { PlatformButtonProps } from '../Button.types';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * Web implementation of the Platform Button
 */
export const PlatformButton: React.FC<PlatformButtonProps> = ({
  onPress,
  label,
  icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className,
}) => {
  // Map platform-agnostic props to web-specific props
  const getVariant = () => {
    switch (variant) {
      case 'primary': return 'default';
      case 'secondary': return 'secondary';
      case 'outline': return 'outline';
      case 'ghost': return 'ghost';
      case 'link': return 'link';
      default: return 'default';
    }
  };
  
  const getSize = () => {
    switch (size) {
      case 'sm': return 'sm';
      case 'md': return 'default';
      case 'lg': return 'lg';
      default: return 'default';
    }
  };
  
  return (
    <ShadcnButton
      onClick={onPress}
      variant={getVariant()}
      size={getSize()}
      disabled={disabled || loading}
      className={cn(className)}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {icon && <span className="mr-2">{icon}</span>}
      {label || children}
    </ShadcnButton>
  );
};
