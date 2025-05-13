
import React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a consistent empty selfie state display with proper styling
 * @returns JSX element with consistent empty state styling
 */
export const createEmptySelfieState = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span className="text-gray-400 text-base">No Photo</span>
    </div>
  )
}
