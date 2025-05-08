
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import main page eagerly for fast initial load
import Index from "./pages/Index";

// Lazy load less critical pages
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NonAffiliationDisclaimer = lazy(() => import("./pages/NonAffiliationDisclaimer"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RejectionPage = lazy(() => import("./pages/RejectionPage"));

// Create QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    }
  }
});

// Loading fallback for lazy-loaded routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const hideLoadingSpinner = () => {
  // Mark as loaded to remove spinner
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.classList.add('root-loaded');
  }
  
  // Remove any dedicated loading elements
  const loadingElements = document.getElementsByClassName('loading');
  if (loadingElements && loadingElements.length > 0) {
    for (let i = 0; i < loadingElements.length; i++) {
      if (loadingElements[i] && loadingElements[i].parentNode) {
        loadingElements[i].classList.add('force-hide');
        loadingElements[i].parentNode.removeChild(loadingElements[i]);
      }
    }
  }
  
  // Additionally, remove the initial loader if it exists
  const initialLoader = document.getElementById('initial-loader');
  if (initialLoader && initialLoader.parentNode) {
    initialLoader.classList.add('force-hide');
    initialLoader.parentNode.removeChild(initialLoader);
  }
};

const App = () => {
  // Hide loading spinner when App component mounts
  useEffect(() => {
    // Hide spinner immediately
    hideLoadingSpinner();

    // Also set a timeout as a backup
    setTimeout(hideLoadingSpinner, 100);
    setTimeout(hideLoadingSpinner, 500);
    
    // Use MutationObserver to watch for root content changes
    const observer = new MutationObserver(() => {
      if (document.getElementById("root")?.children.length > 1) {
        hideLoadingSpinner();
      }
    });
    
    observer.observe(document.getElementById("root") || document.body, {
      childList: true,
      subtree: true
    });

    // Add a final style to ensure no white overlay remains
    const style = document.createElement('style');
    style.innerHTML = `
      .loading { display: none !important; opacity: 0 !important; } 
      #initial-loader { display: none !important; opacity: 0 !important; }
      body.fully-loaded .loading { display: none !important; }
    `;
    document.head.appendChild(style);
    document.body.classList.add('fully-loaded');
    
    return () => {
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rejection" element={<RejectionPage />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/non-affiliation" element={<NonAffiliationDisclaimer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
