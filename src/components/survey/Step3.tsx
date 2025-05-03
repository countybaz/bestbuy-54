
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
      setAnswer("upgrade_frequency", selected);
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
        <h2 className="text-lg font-medium mb-4">How often do you upgrade your tech devices?</h2>
        <div className="space-y-3">
          <SurveyOption 
            label="Every year" 
            selected={selected === "every_year"} 
            onClick={() => setSelected("every_year")}
          />
          <SurveyOption 
            label="Every few years" 
            selected={selected === "every_few_years"} 
            onClick={() => setSelected("every_few_years")}
          />
          <SurveyOption 
            label="Never upgrade" 
            selected={selected === "never"} 
            onClick={() => setSelected("never")}
          />
        </div>
      </div>

      <Button 
        onClick={handleNext} 
        disabled={!selected}
        className="w-full bg-blue-600 hover:bg-blue-700 py-6 md:py-4 text-lg shadow-lg md:shadow-none fixed bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto z-10 max-w-full mx-auto"
      >
        Continue
      </Button>
    </div>
  );
};

export default Step3;
