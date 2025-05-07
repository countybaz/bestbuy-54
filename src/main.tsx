
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Function to remove loading spinner
const hideLoadingSpinner = () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.classList.add('root-loaded');
    
    // Also remove any loading elements directly
    const loadingEl = document.querySelector('.loading');
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
  }
};

// Create root and render app
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Render the app
root.render(<App />);

// Mark as loaded to remove spinner
hideLoadingSpinner();

// Also set a timer as a failsafe
setTimeout(hideLoadingSpinner, 1000);
