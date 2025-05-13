
/**
 * Design System Index - exports all design system elements for easy import
 */

export { default as colors } from './colors';
export { default as typography } from './typography';
export { default as spacing } from './spacing';
export { default as borders } from './borders';
export { default as shadows } from './shadows';
export { default as animations } from './animations';

/**
 * Design token usage example:
 * 
 * Import specific design elements:
 * ```
 * import { colors, typography } from '@/design';
 * ```
 * 
 * Or import everything:
 * ```
 * import * as design from '@/design';
 * ```
 * 
 * These design tokens correspond to the values configured in Tailwind config
 * and can be used as a reference when creating new components.
 */
