
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { ApiKeyProvider } from './contexts/ApiKeyContext'

createRoot(document.getElementById("root")!).render(
  <>
    <ApiKeyProvider>
      <App />
    </ApiKeyProvider>
    <Toaster />
  </>
);
