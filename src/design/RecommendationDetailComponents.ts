
/**
 * Design specifications for components used in recommendation detail pages
 */

export const recommendationDetailDesign = {
  // Main layout
  layout: {
    maxWidth: 'md',
    padding: 'px-4 py-6',
    background: 'bg-slate-50',
    minHeight: 'min-h-screen'
  },
  
  // Button styling
  buttons: {
    skinGoals: {
      base: 'text-white rounded-md py-3 px-4 w-full text-center font-medium skin-goals-button',
      backgroundColor: 'black', // Always black across all themes
      hoverState: 'opacity-90',
      transition: 'transition-opacity duration-200 ease-in-out',
      textSize: 'text-base',
      fontWeight: 'font-medium'
    }
  },
  
  // Card styling
  cards: {
    disclaimer: {
      padding: 'p-4',
      margin: 'mt-6',
      background: 'bg-gray-50',
      border: 'border border-gray-200',
      borderRadius: 'rounded-lg'
    },
    chatBox: {
      padding: 'p-4',
      margin: 'mt-4 mb-6',
      background: 'bg-white',
      border: 'border border-gray-200',
      borderRadius: 'rounded-lg',
      shadow: 'shadow-sm'
    }
  },
  
  // Text styling
  text: {
    heading: {
      large: 'text-2xl font-bold text-gray-900',
      medium: 'text-xl font-semibold text-gray-800',
      small: 'text-lg font-medium text-gray-800'
    },
    body: {
      regular: 'text-sm text-gray-600 leading-relaxed',
      small: 'text-xs text-gray-500'
    },
    disclaimer: {
      title: 'text-sm font-medium text-gray-700',
      content: 'text-xs text-gray-500 mt-1'
    }
  }
};

export default recommendationDetailDesign;
