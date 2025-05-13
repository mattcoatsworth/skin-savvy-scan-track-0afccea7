
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a consistent empty selfie state display with proper styling
 * @param type The time of day (am/pm)
 * @returns JSX element with consistent empty state styling
 */
export function createEmptySelfieState() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span className="text-gray-400 text-base">No Photo</span>
    </div>
  )
}
