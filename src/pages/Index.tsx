
import { SurveyProvider, useSurvey } from "@/contexts/SurveyContext";
import SurveyContainer from "@/components/SurveyContainer";
import FAQ from "@/components/FAQ";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy-load FAQ component since it's not needed for initial render
const LazyFAQ = lazy(() => import("@/components/FAQ"));

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center">
      <SurveyProvider>
        <header className="shadow-sm py-2 bg-blue-900 h-24 flex items-center">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <HeaderContent />
          </div>
        </header>
        
        <main className="container mx-auto relative">
          <SurveyContainer />
        </main>
      </SurveyProvider>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          {/* Legal Links Section - Header stands out, links are Best Buy style */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-gray-800 bg-gray-100 inline-block px-4 py-2 rounded-md">Legal Links</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/terms" className="text-blue-800 hover:underline">Terms and Conditions</Link>
              <Link to="/privacy" className="text-blue-800 hover:underline">Privacy Policy</Link>
              <Link to="/non-affiliation" className="text-blue-800 hover:underline">Non-Affiliation Disclaimer</Link>
            </div>
          </div>
          
          {/* Legal Disclaimers */}
          <div className="text-xs text-gray-600 space-y-2">
            <p>Trade names or rights associated with all trademarks on this website are the property of their respective owners and are not associated with this promotion. This offer ends at the end of 2025.</p>
            <p>This website is not part of the Facebook website or of Facebook Inc.</p>
            <p>Furthermore, this website is not endorsed in any way by Facebook. Facebook is a trademark of Facebook, Inc.</p>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-center text-gray-500 mt-6">
            © {new Date().getFullYear()} Best Buy Review Program. All rights reserved.
            <br />
            This is a limited time promotional offer. Terms and conditions apply.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Create a separate component for the header content
const HeaderContent = () => {
  const { goToStep } = useSurvey();
  
  const handleLogoClick = () => {
    goToStep(0);
  };
  
  return (
    <div 
      className="flex items-center cursor-pointer" 
      onClick={handleLogoClick}
    >
      <img 
        src="/lovable-uploads/80114780-632f-4b11-9079-1fae1dfe040e.png" 
        alt="Best Buy Review Program Logo" 
        className="h-20 md:h-24 mr-4"
        width="96"
        height="96"
        loading="eager"
        fetchPriority="high"
      />
      <h1 className="text-xl font-bold text-yellow-400">Best Buy Review Program</h1>
      <div className="ml-4">
        <Suspense fallback={<div className="w-8 h-8" />}>
          <LazyFAQ />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
