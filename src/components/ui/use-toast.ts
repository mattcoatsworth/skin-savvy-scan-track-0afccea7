
// Direct implementation instead of re-export
// This avoids circular dependencies
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Re-export the hooks and toast function from the real implementation
import { useToast, toast } from "@/hooks/use-toast"

export { useToast, toast }
