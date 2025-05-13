
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTestAiMode() {
  // Check if the URL path contains '/testai' anywhere
  return window.location.pathname.includes('/testai');
}

/**
 * Get theme-specific color based on current theme
 * @param summerColor - Color to use for summer theme
 * @param springColor - Color to use for spring theme
 * @param defaultColor - Color to use for default theme
 * @returns The appropriate color for the current theme
 */
export function getThemeColor(theme: string, summerColor: string, springColor: string, defaultColor: string) {
  switch (theme) {
    case 'summer':
      return summerColor;
    case 'spring':
      return springColor;
    default:
      return defaultColor;
  }
}
