
/**
 * Platform-agnostic toast hook
 * Can be implemented differently on web and native platforms
 */

import { toast as sonnerToast } from "sonner";
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

// Define an array to store toasts in our hook implementation
type State = {
  toasts: ToasterToast[]
}

const TOAST_LIMIT = 20
let count = 0

const toastState: State = {
  toasts: [],
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
        const id = props.id || `toast-${count++}`
        const newToast = { ...props, id }
        
        // Store the toast in our state
        toastState.toasts = [
          ...toastState.toasts.filter(
            (toast) => toast.id !== id,
          ),
          newToast,
        ].slice(-TOAST_LIMIT)
        
        // Use sonner for display
        return sonnerToast(props.title || '', {
          id,
          description: props.description,
          action: props.action,
          duration: props.duration,
        });
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
        sonnerToast.dismiss(toastId);
      } else {
        // This would be the native implementation
        console.log("Dismissing toast on native:", toastId);
      }
    },
    // Add the toasts array getter for compatibility with the UI component
    get toasts() {
      return toastState.toasts;
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
