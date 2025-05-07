
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyOption from "@/components/SurveyOption";
import { useSurvey } from "@/contexts/SurveyContext";

const Step3 = () => {
  const { goToNextStep, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (selected) {
      setAnswer("shopping_frequency", selected);
      goToNextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title=""
        subtitle="We're making progress!"
      />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">How often do you shop at Best Buy?</h2>
        <div className="space-y-3">
          <SurveyOption 
            label="Weekly" 
            selected={selected === "weekly"} 
            onClick={() => setSelected("weekly")}
          />
          <SurveyOption 
            label="Monthly" 
            selected={selected === "monthly"} 
            onClick={() => setSelected("monthly")}
          />
          <SurveyOption 
            label="A few times a year" 
            selected={selected === "few_times_year"} 
            onClick={() => setSelected("few_times_year")}
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

export default Step3;
