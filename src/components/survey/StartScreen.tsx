
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { ArrowRight } from "lucide-react";
import FacebookReviews from "@/components/FacebookReviews";

const StartScreen = () => {
  const {
    goToNextStep
  } = useSurvey();
  
  const handleStart = () => {
    goToNextStep();
  };
  
  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title="Great news! You are among the first to join our Best Buy Review Program!"
      />
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-center text-lg mb-4">
          Get a <span className="text-blue-800 font-semibold">$500 Best Buy Gift Card</span> with our Review Program. Simply answer 3 short questions about your shopping experiences and this fantastic opportunity is yours!
        </p>
        
        <p className="text-center mb-6">
          Ready to share your thoughts and get rewarded? Click on the <span className="text-blue-800 font-semibold">Start</span> button below.
        </p>
        
        <p className="text-sm text-red-600 text-center font-medium mb-6">
          As soon as you click the button, a timer starts and you have 3 minutes to complete the process.
        </p>
      </div>

      <Button onClick={handleStart} className="w-full py-6 text-lg font-bold bg-yellow-400 hover:bg-yellow-500 text-blue-900 shadow-lg cta-button">
        Start <ArrowRight className="ml-2" />
      </Button>

      {/* Facebook Review Section - kept in the start screen */}
      <FacebookReviews />

      {/* Add some space at the bottom */}
      <div className="h-10"></div>
    </div>
  );
};

export default StartScreen;
