
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './print-styles.css'  // Add the print styles
import { Toaster } from "@/components/ui/toaster"

const rootElement = document.getElementById("root");

// Make sure the root element exists before trying to render
if (!rootElement) {
  console.error("Could not find root element");
} else {
  createRoot(rootElement).render(
    <>
      <App />
      <Toaster />
    </>
  );
}
