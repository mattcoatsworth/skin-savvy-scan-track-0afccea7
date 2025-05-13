
/**
 * Platform Dependencies Helper
 * This file helps identify and document web-specific dependencies to prepare for React Native migration
 */

// List of web-specific dependencies in use
export const webDependencies = [
  {
    name: "recharts",
    usage: "Used for data visualization in charts and graphs",
    nativeAlternative: "react-native-chart-kit or victory-native",
    affectedComponents: ["TrendChart.tsx", "SkinIndexComparison.tsx", "InsightsTrends.tsx"]
  },
  {
    name: "shadcn/ui",
    usage: "Used for UI components throughout the application",
    nativeAlternative: "react-native-paper or custom components",
    affectedComponents: ["Multiple components using UI primitives"]
  },
  {
    name: "Tailwind CSS",
    usage: "Used for styling throughout the application",
    nativeAlternative: "React Native StyleSheet or a library like NativeWind",
    affectedComponents: ["All components using Tailwind classes"]
  },
  {
    name: "radix-ui",
    usage: "Used for accessible UI primitives",
    nativeAlternative: "react-native-accessibility",
    affectedComponents: ["UI components like dialogs, popovers, etc."]
  },
  {
    name: "sonner",
    usage: "Used for toast notifications",
    nativeAlternative: "react-native-toast-message",
    affectedComponents: ["Components that show toast notifications"]
  },
  {
    name: "date-fns",
    usage: "Date manipulation",
    nativeAlternative: "date-fns (compatible with React Native)",
    affectedComponents: ["Components with date handling"]
  },
  {
    name: "localStorage",
    usage: "Used for client-side storage",
    nativeAlternative: "AsyncStorage from @react-native-async-storage/async-storage",
    affectedComponents: ["utils/platform/index.ts", "hooks/useAIContentCache.ts", "ChatPage.tsx"]
  }
];

/**
 * Function to check if a component depends on web-only APIs
 * This can help identify components that need special attention during migration
 */
export const checkComponentDependencies = (componentName: string): string[] => {
  return webDependencies
    .filter(dep => dep.affectedComponents.some(comp => comp.includes(componentName)))
    .map(dep => dep.name);
};

/**
 * Migration planning helper
 * This function provides guidance on converting specific web components
 */
export const getMigrationPlan = (componentName: string): string => {
  // Find dependencies for this component
  const dependencies = checkComponentDependencies(componentName);
  
  if (dependencies.length === 0) {
    return "This component appears to use cross-platform APIs and should be easier to migrate.";
  }
  
  // Generate specific advice based on the component
  if (componentName.includes("Chart") || componentName.includes("Graph")) {
    return "This component uses web charting libraries. Consider replacing with react-native-chart-kit or Victory Native. Data processing logic can be reused, but the rendering will need to be reimplemented.";
  }
  
  if (dependencies.includes("Tailwind CSS")) {
    return "This component uses Tailwind CSS for styling. Convert styles to React Native StyleSheet or consider using NativeWind to maintain Tailwind workflow in React Native.";
  }
  
  if (dependencies.includes("localStorage")) {
    return "This component uses localStorage which is not available in React Native. Replace with AsyncStorage from @react-native-async-storage/async-storage.";
  }
  
  return `This component depends on web-specific libraries: ${dependencies.join(", ")}. Consider alternatives or custom implementations for React Native.`;
};
