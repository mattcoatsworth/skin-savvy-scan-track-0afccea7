
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationStyles } from '@/theme/components/navigation.styles';

/**
 * BackButton Props
 * This interface follows our new conventions for cross-platform compatibility
 */
export interface BackButtonProps {
  /**
   * Custom path to navigate to when clicked
   * If not provided, it will go back in history
   */
  to?: string;
  
  /**
   * Alternative action to perform when clicked
   * Overrides the default navigation behavior
   */
  onPress?: () => void;
  
  /**
   * Additional class names
   */
  className?: string;
  
  /**
   * Text to display next to the back icon
   */
  label?: string;
}

/**
 * BackButton Component
 * 
 * A platform-agnostic back button that can be used in both web and native
 * The web implementation is shown here; the native implementation would
 * use React Navigation's goBack() function instead.
 */
const BackButton: React.FC<BackButtonProps> = ({
  to,
  onPress,
  className,
  label,
}) => {
  const navigate = useNavigate();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <button
      type="button"
      onClick={handlePress}
      className={cn(
        "flex items-center mr-4 py-1 px-1",
        className
      )}
      aria-label="Go back"
    >
      <ChevronLeft 
        className="h-5 w-5 text-foreground" 
        aria-hidden="true" 
      />
      {label && <span className="ml-1">{label}</span>}
    </button>
  );
};

export default BackButton;
