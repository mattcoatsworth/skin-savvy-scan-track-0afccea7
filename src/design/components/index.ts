
/**
 * Component style exports for consistent styling across the application
 */

import { cardVariants } from './card.styles';
import { 
  buttonColorVariants,
  buttonSizeVariants,
  buttonShadowVariants,
  buttonVariants
} from './button.styles';
import { progressVariants } from './progress.styles';
import { ratingVariants } from './rating.styles';

/**
 * Usage example:
 * 
 * ```
 * import { cardVariants } from '@/design/components';
 * 
 * // Access card styling properties
 * console.log(cardVariants.header);
 * 
 * // Access Tailwind classes for quick use
 * <div className={cardVariants.tailwind.header}>
 *   Card Header
 * </div>
 * ```
 */

export {
  cardVariants,
  buttonColorVariants,
  buttonSizeVariants,
  buttonShadowVariants,
  buttonVariants,
  progressVariants,
  ratingVariants
};
