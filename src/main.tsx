
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './print-styles.css'  // Add the print styles
import { Toaster } from "@/components/ui/toaster"

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
