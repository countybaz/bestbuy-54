
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyOption from "@/components/SurveyOption";
import { useSurvey } from "@/contexts/SurveyContext";

const Step2 = () => {
  const { goToNextStep, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (selected) {
      setAnswer("tech_importance", selected);
      goToNextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title=""
        subtitle="Just a few more questions to go!"
      />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">How important is product quality when you shop at Best Buy?</h2>
        <div className="space-y-3">
          <SurveyOption 
            label="Very important" 
            selected={selected === "very_important"} 
            onClick={() => setSelected("very_important")}
          />
          <SurveyOption 
            label="Somewhat important" 
            selected={selected === "somewhat_important"} 
            onClick={() => setSelected("somewhat_important")}
          />
          <SurveyOption 
            label="Not important at all" 
            selected={selected === "not_important"} 
            onClick={() => setSelected("not_important")}
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

export default Step2;
