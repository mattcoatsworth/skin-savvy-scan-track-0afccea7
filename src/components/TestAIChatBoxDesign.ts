
/**
 * Design specifications for the TestAIChatBox component
 */

import { recommendationDetailComponents } from '../design/components/RecommendationDetailComponents';

export const TestAIChatBoxDesign = {
  ...recommendationDetailComponents.chatBox,
  
  // Specific overrides for the TestAIChatBox component
  iconSizes: {
    messageCircle: 'h-4 w-4',
    chevron: 'h-5 w-5',
    send: 'h-4 w-4',
  },
  
  gradients: {
    leftScroll: 'bg-gradient-to-r from-slate-50 to-transparent',
    rightScroll: 'bg-gradient-to-l from-slate-50 to-transparent',
  },
  
  // Responsive design
  container: {
    maxWidth: 'max-w-md',
    padding: 'px-4',
  },
  
  // Interaction states
  button: {
    disabled: 'opacity-50 cursor-not-allowed',
    hover: 'hover:bg-gray-50 transition-colors',
  }
};

export default TestAIChatBoxDesign;
