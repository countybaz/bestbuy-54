
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Function to remove loading spinner
const hideLoadingSpinner = () => {
  console.log("Attempting to hide loading spinner");
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.classList.add('root-loaded');
    
    // Try multiple selectors to ensure we catch all loading elements
    try {
      // Remove by class
      const loadingElements = document.querySelectorAll('.loading');
      loadingElements.forEach(el => {
        console.log("Removing loading element by class");
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } else {
          el.classList.add('force-hide');
        }
      });
      
      // Also try to remove by data attribute if present
      const spinnerElements = document.querySelectorAll('[data-loading]');
      spinnerElements.forEach(el => {
        console.log("Removing loading element by data attribute");
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } else {
          el.classList.add('force-hide');
        }
      });
    } catch (e) {
      console.error("Error removing loading elements:", e);
    }
  }
};

// Create root and render app
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Render the app
root.render(<App />);

// Mark as loaded to remove spinner immediately
hideLoadingSpinner();

// Also set timers at different intervals as failsafes
setTimeout(hideLoadingSpinner, 500);
setTimeout(hideLoadingSpinner, 1500);
setTimeout(hideLoadingSpinner, 3000);

// Add event listener for when content is fully loaded
window.addEventListener('load', hideLoadingSpinner);
document.addEventListener('DOMContentLoaded', hideLoadingSpinner);
