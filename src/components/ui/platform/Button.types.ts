
import { ReactNode } from 'react';

/**
 * Shared Button interface used by both web and native implementations
 */
export interface PlatformButtonProps {
  /**
   * Function to call when the button is pressed
   */
  onPress: () => void;
  
  /**
   * The button's label text
   */
  label?: string;
  
  /**
   * Optional icon to display in the button
   */
  icon?: ReactNode;
  
  /**
   * Visual style variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  
  /**
   * Optional children (alternative to label)
   */
  children?: ReactNode;
  
  /**
   * Additional class names (web only)
   */
  className?: string;
}
