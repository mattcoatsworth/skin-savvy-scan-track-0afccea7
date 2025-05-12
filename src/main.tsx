
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simple console log for debugging
console.log("Main component rendering started");

const container = document.getElementById("root");

if (!container) {
  console.error("Failed to find the root element");
} else {
  const root = createRoot(container);
  root.render(<App />);
  console.log("App mounted successfully");
}
