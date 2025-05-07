
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { Check } from "lucide-react";

const Step5 = () => {
  const { goToNextStep } = useSurvey();
  const [checks, setChecks] = useState({
    saved: false,
    eligible: false,
    rewards: false,
    reserved: false
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setChecks(prev => ({ ...prev, saved: true })), 1000),
      setTimeout(() => setChecks(prev => ({ ...prev, eligible: true })), 2000),
      setTimeout(() => setChecks(prev => ({ ...prev, rewards: true })), 3000),
      setTimeout(() => setChecks(prev => ({ ...prev, reserved: true })), 4000)
    ];

    // Auto-progress after all checks complete
    const autoProgress = setTimeout(() => {
      goToNextStep();
    }, 5000);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(autoProgress);
    };
  }, [goToNextStep]);

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title="Thanks for your time!" 
        subtitle="Please wait a few seconds while we process your responses."
      />
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.saved ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.saved && <Check className="w-4 h-4" />}
          </div>
          <p className="text-lg">Survey responses are saved</p>
        </div>
        
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.eligible ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.eligible && <Check className="w-4 h-4" />}
          </div>
          <p className="text-lg">You are an eligible participant</p>
        </div>
        
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.rewards ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.rewards && <Check className="w-4 h-4" />}
          </div>
          <p className="text-lg">Only 15 Gift Cards left</p>
        </div>
        
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.reserved ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.reserved && <Check className="w-4 h-4" />}
          </div>
          <p className="text-lg">Your $500 gift card is reserved until the timer runs out</p>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-md h-2 mt-6">
        <div className="bg-blue-800 h-2 rounded-md animate-pulse" style={{ width: '100%' }}></div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-2 mb-6">Processing your information...</p>
      
      {/* Added manual continue button for mobile users */}
      <Button 
        onClick={goToNextStep} 
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-6 text-lg font-bold fixed bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto md:py-4 z-10 max-w-full mx-auto shadow-lg md:shadow-none cta-button"
      >
        Continue
      </Button>
    </div>
  );
};

export default Step5;
