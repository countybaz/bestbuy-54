
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyOption from "@/components/SurveyOption";
import { useSurvey } from "@/contexts/SurveyContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Step3 = () => {
  const { goToNextStep, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (selected) {
      setAnswer("shopping_frequency", selected);
      goToNextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
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

      <div className={isMobile ? "sticky bottom-4 z-10 mt-4 px-4" : ""}>
        <Button 
          onClick={handleNext} 
          disabled={!selected}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-6 text-lg font-bold shadow-lg max-w-full mx-auto"
        >
          Continue
        </Button>
      </div>
      
      {isMobile && <div className="h-16"></div>}
    </div>
  );
};

export default Step3;
