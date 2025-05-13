
/**
 * Platform-agnostic toast hook
 * Can be implemented differently on web and native platforms
 */

import { toast as sonnerToast } from "@/components/ui/toaster";
import { toast as sonner } from "sonner";
import { isPlatform } from "@/utils/platform";

// Toast variant types
export type ToastVariant = "default" | "destructive" | "success" | "warning" | "loading";

// Toast props interface
export interface Toast {
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
  duration?: number;
}

// ToasterToast includes more properties than what we need for cross-platform compatibility
export interface ToasterToast extends Toast {
  id: string;
  className?: string;
  actionAltText?: string;
  onDismiss?: () => void;
}

/**
 * The actual toast implementation for the current platform
 */
export const useToast = () => {
  // On web, use the existing toast system
  // This would be replaced with a native toast implementation in React Native
  
  return {
    toast: (props: Toast) => {
      // Check if we're on web or native
      if (isPlatform.web()) {
        // Use the sonner toast on web
        return sonnerToast(props);
      } else {
        // This would be replaced with native implementation
        console.log("Toast would show on native:", props);
        // Placeholder for native implementation
        return { id: "native-toast-placeholder", dismiss: () => {} };
      }
    },
    dismiss: (toastId: string) => {
      if (isPlatform.web()) {
        // Dismiss on web
        sonner.dismiss(toastId);
      } else {
        // This would be the native implementation
        console.log("Dismissing toast on native:", toastId);
      }
    }
  };
};

/**
 * Simpler toast function for direct use
 */
export const toast = (props: Toast) => {
  const { toast: showToast } = useToast();
  return showToast(props);
};
