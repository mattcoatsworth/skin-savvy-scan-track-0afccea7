
/**
 * Component Naming and Structure Conventions
 * 
 * This file documents the naming and structure conventions for components
 * to facilitate the transition from React web to React Native.
 */

// Folder Structure Conventions
export const folderStructure = {
  // Root-level organization
  components: {
    ui: 'Base UI components (buttons, inputs, etc.)',
    features: 'Feature-specific components',
    layout: 'Layout components (headers, footers, etc.)',
    screens: 'Screen-specific components',
  },
  
  // Feature-specific organization
  featureStructure: {
    components: 'Components specific to this feature',
    hooks: 'Hooks specific to this feature',
    utils: 'Utility functions specific to this feature',
  }
};

// Component Naming Conventions
export const namingConventions = {
  // Component Types
  componentTypes: {
    base: 'Base[ComponentName] - Base components with shared logic',
    web: '[ComponentName]Web - Web-specific implementation',
    native: '[ComponentName]Native - Native-specific implementation',
    responsive: '[ComponentName] - Components that work on both platforms',
  },
  
  // File Naming
  fileNaming: {
    component: '[ComponentName].tsx - Component implementation',
    types: '[ComponentName].types.ts - TypeScript types for the component',
    styles: '[ComponentName].styles.ts - Component styles',
    utils: '[ComponentName].utils.ts - Component utilities',
    tests: '[ComponentName].test.tsx - Component tests',
  },
};

/**
 * Guidelines for Cross-Platform Components:
 * 
 * 1. Separate Business Logic from UI
 *    - Create hooks for business logic that can be shared
 *    - UI components should focus only on rendering
 * 
 * 2. Use Platform-Specific Folders
 *    - /components/ui/web/[ComponentName].tsx
 *    - /components/ui/native/[ComponentName].tsx
 * 
 * 3. Create Platform-Agnostic Interfaces
 *    - Define shared interfaces in .types.ts files
 *    - Implement platform-specific components that follow the same interface
 * 
 * 4. Use Platform Detection
 *    - Import from appropriate path based on platform detection
 *    - Example: import Button from '@/components/ui/${platformType}/Button';
 *    - Where platformType is determined at runtime or build time
 */

// Example Usage
export const exampleImplementation = `
// Button.types.ts
export interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'secondary';
}

// /components/ui/web/Button.tsx
import type { ButtonProps } from '../Button.types';
export const Button = ({ onPress, label, variant = 'primary' }: ButtonProps) => {
  // Web-specific implementation
};

// /components/ui/native/Button.tsx  
import type { ButtonProps } from '../Button.types';
export const Button = ({ onPress, label, variant = 'primary' }: ButtonProps) => {
  // React Native-specific implementation
};

// Usage with platform detection
// First, determine the platform:
const platformType = typeof window !== 'undefined' ? 'web' : 'native';
// Then import the appropriate component:
import { Button } from '@/components/ui/${platformType}/Button';
`;

/**
 * Migration Strategy:
 * 
 * 1. Start with UI components
 *    - Begin with basic UI components like buttons, inputs, etc.
 *    - Create platform-specific implementations with the same interface
 * 
 * 2. Extract business logic
 *    - Move business logic to hooks
 *    - Ensure hooks are platform-agnostic
 * 
 * 3. Create screen components
 *    - Use shared hooks for business logic
 *    - Implement platform-specific UI
 * 
 * 4. Test incremental migration
 *    - Test components on both platforms as you migrate
 */
