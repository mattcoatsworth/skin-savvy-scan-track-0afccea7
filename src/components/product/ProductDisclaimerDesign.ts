
/**
 * Design specifications for the ProductDisclaimer component
 */

import { recommendationDetailComponents } from '../../design/components/RecommendationDetailComponents';

export const ProductDisclaimerDesign = {
  ...recommendationDetailComponents.disclaimer,
  
  // Specific overrides for the ProductDisclaimer component
  fontSize: 'text-[8px]', // Even smaller text for product disclaimer
  
  // Animation specs for loading dots
  loadingDot: {
    size: 'w-2 h-2',
    spacing: 'space-x-2',
    borderRadius: 'rounded-full',
    backgroundColor: 'bg-gray-400',
    animation: 'animate-bounce',
  }
};

export default ProductDisclaimerDesign;
