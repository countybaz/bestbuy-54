
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove loading spinner and show content
const hideLoadingSpinner = () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.classList.add('root-loaded');
    
    // Try multiple methods to remove loading elements
    try {
      // By class
      const loadingElements = document.querySelectorAll('.loading');
      loadingElements.forEach(el => {
        if (el) {
          el.classList.add('force-hide');
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      });
      
      // By data attribute
      const spinnerElements = document.querySelectorAll('[data-loading]');
      spinnerElements.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      
      // By id - specifically target the initial-loader
      const initialLoader = document.getElementById('initial-loader');
      if (initialLoader && initialLoader.parentNode) {
        initialLoader.classList.add('force-hide');
        initialLoader.parentNode.removeChild(initialLoader);
      }

      // Remove any white overlay that might be causing issues
      const overlays = document.querySelectorAll('.white-overlay, .loading-overlay');
      overlays.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });

    } catch (e) {
      console.error("Error removing loading elements:", e);
    }
  }
};

// Initialize app immediately
const init = () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found!");
    return;
  }
  
  try {
    // Create root
    const root = createRoot(rootElement);
    
    // Render app
    root.render(<App />);
    
    // Remove loading spinner after render
    hideLoadingSpinner();
    
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Failed to render React application:", error);
    // Still try to remove loading indicators even if render fails
    hideLoadingSpinner();
  }
};

// Run init immediately
init();

// Also set backup timeouts to ensure spinner is removed
setTimeout(hideLoadingSpinner, 300); // Quick first attempt
setTimeout(hideLoadingSpinner, 1000);
setTimeout(hideLoadingSpinner, 2000);
setTimeout(hideLoadingSpinner, 5000); // Extra long timeout for slow connections

// Add standard event listeners
window.addEventListener('load', hideLoadingSpinner);
document.addEventListener('DOMContentLoaded', hideLoadingSpinner);

// Final failsafe - always clear any loaders after 8 seconds
setTimeout(() => {
  try {
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader && initialLoader.parentNode) {
      initialLoader.classList.add('force-hide');
      initialLoader.parentNode.removeChild(initialLoader);
    }
    
    document.body.classList.add('fully-loaded');
    console.log("Failsafe loader removal triggered");
  } catch (e) {
    console.error("Error in failsafe loader removal:", e);
  }
}, 8000);
