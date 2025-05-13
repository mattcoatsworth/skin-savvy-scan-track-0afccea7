
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTestAiMode() {
  // Check if the URL path contains '/testai' anywhere
  return window.location.pathname.includes('/testai');
}
