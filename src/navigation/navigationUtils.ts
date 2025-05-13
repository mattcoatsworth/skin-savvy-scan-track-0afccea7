
/**
 * Cross-platform navigation utilities
 * These utilities provide a consistent API for navigation 
 * that can work across both web (React Router) and mobile (React Navigation)
 */
import { useNavigate, useLocation, useParams } from "react-router-dom";

/**
 * Hook to handle navigation in a platform-agnostic way
 * In React Native, this would use React Navigation's navigation prop
 */
export function useAppNavigation() {
  const navigate = useNavigate();
  
  return {
    // Navigate to a screen - matches React Navigation's navigate function
    navigate: (routeName: string, params?: Record<string, any>) => {
      if (params) {
        // For web, we pass params as state
        navigate(routeName, { state: params });
      } else {
        navigate(routeName);
      }
    },
    
    // Go back - matches React Navigation's goBack function
    goBack: () => {
      navigate(-1);
    },
    
    // Reset to a route - simplified version of React Navigation's reset
    reset: (routeName: string) => {
      navigate(routeName, { replace: true });
    },
    
    // Replace current screen - matches React Navigation's replace
    replace: (routeName: string) => {
      navigate(routeName, { replace: true });
    }
  };
}

/**
 * Hook to get route params in a platform-agnostic way
 * In React Native, this would use React Navigation's route.params
 */
export function useRouteParams<T extends Record<string, any>>() {
  const params = useParams();
  const location = useLocation();
  
  // Combine URL params and state params to mirror React Navigation's route.params
  return {
    ...params,
    ...(location.state as Partial<T> || {})
  };
}

/**
 * Returns the current route name (last part of the path)
 * Helps with screen tracking and analytics
 */
export function useRouteName() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  return pathSegments[pathSegments.length - 1] || 'home';
}

/**
 * Navigation container props interface
 * Makes it easier to adapt to React Navigation's NavigationContainer
 */
export interface NavigationContainerProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  onReady?: () => void;
}

/**
 * Wrapper for navigation container
 * In web, this is just a simple wrapper
 * In React Native, this would be replaced with NavigationContainer
 */
export function NavigationContainer({ 
  children,
  theme,
  onReady
}: NavigationContainerProps) {
  // In web, this does very little
  // In React Native, this would be the NavigationContainer from React Navigation
  return <>{children}</>;
}
