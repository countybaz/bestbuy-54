
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyOption from "@/components/SurveyOption";
import { useSurvey } from "@/contexts/SurveyContext";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const { goToNextStep, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected) {
      setAnswer("us_resident", selected);
      
      if (selected === "no") {
        // Redirect to the standalone rejection page
        navigate("/rejection");
      } else {
        goToNextStep();
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title=""
        subtitle="We need some information to get started."
      />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Do you live in the United States?</h2>
        <p className="text-sm text-gray-600 mb-4">We are looking for participants from the US only</p>
        <div className="space-y-3">
          <SurveyOption 
            label="Yes" 
            selected={selected === "yes"} 
            onClick={() => setSelected("yes")}
          />
          <SurveyOption 
            label="No" 
            selected={selected === "no"} 
            onClick={() => setSelected("no")}
          />
        </div>
      </div>

      <Button 
        onClick={handleNext} 
        disabled={!selected}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-6 md:py-4 text-lg font-bold shadow-lg md:shadow-none fixed bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-10 max-w-full mx-auto cta-button"
      >
        Continue
      </Button>
    </div>
  );
};

export default Step1;
