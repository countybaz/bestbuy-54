
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root and render app
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Render the app
root.render(<App />);

// Mark as loaded to remove spinner
rootElement.classList.add('root-loaded');
