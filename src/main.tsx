
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
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      
      // By data attribute
      const spinnerElements = document.querySelectorAll('[data-loading]');
      spinnerElements.forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      
      // By id - specifically target the initial-loader
      const initialLoader = document.getElementById('initial-loader');
      if (initialLoader && initialLoader.parentNode) {
        initialLoader.parentNode.removeChild(initialLoader);
      }
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
  }
};

// Run init immediately
init();

// Also set backup timeouts to ensure spinner is removed
setTimeout(hideLoadingSpinner, 500);
setTimeout(hideLoadingSpinner, 1500);
setTimeout(hideLoadingSpinner, 3000); // Add an extra long timeout for slow connections

// Add standard event listeners
window.addEventListener('load', hideLoadingSpinner);
document.addEventListener('DOMContentLoaded', hideLoadingSpinner);
