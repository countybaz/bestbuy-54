
import { useEffect, lazy, Suspense } from "react";
import { useSurvey } from "@/contexts/SurveyContext";
import SurveyProgress from "@/components/SurveyProgress";
import Timer from "@/components/Timer";
import { Skeleton } from "@/components/ui/skeleton";

// Eagerly load most critical components
import StartScreen from "@/components/survey/StartScreen";
import Step1 from "@/components/survey/Step1";

// Lazy load less critical components
const Step2 = lazy(() => import("@/components/survey/Step2"));
const Step3 = lazy(() => import("@/components/survey/Step3"));
const Step5 = lazy(() => import("@/components/survey/Step5"));
const Results = lazy(() => import("@/components/survey/Results"));
const RejectionPage = lazy(() => import("@/components/survey/RejectionPage"));
const FacebookReviews = lazy(() => import("@/components/FacebookReviews"));

// Loading fallback
const StepLoader = () => (
  <div className="space-y-4 p-4">
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-3/4 h-8 mx-auto" />
    <Skeleton className="w-full h-40" />
    <Skeleton className="w-full h-10" />
  </div>
);

const ReviewsLoader = () => (
  <div className="mt-8 space-y-2">
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-36" />
  </div>
);

const SurveyContainer = () => {
  const { currentStep, totalSteps } = useSurvey();

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8">
      {/* Timer only visible during active survey steps (not on start screen) */}
      {currentStep > 0 && currentStep <= totalSteps && <Timer minutes={3} />}
      
      {/* Progress bar only shown during active survey steps */}
      {currentStep > 0 && currentStep <= totalSteps && (
        <SurveyProgress currentStep={currentStep} totalSteps={totalSteps} />
      )}
      
      {/* Survey steps */}
      {currentStep === 0 && <StartScreen />}
      {currentStep === 1 && <Step1 />}
      
      <Suspense fallback={<StepLoader />}>
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
        {currentStep === 4 && <Step5 />}
        {currentStep === 5 && <Results />}
        {currentStep === 6 && <RejectionPage />}
      </Suspense>
      
      {/* Facebook Reviews - shown in all steps except start screen and rejection page */}
      {currentStep !== 0 && currentStep !== 6 && (
        <Suspense fallback={<ReviewsLoader />}>
          <FacebookReviews />
        </Suspense>
      )}
    </div>
  );
};

export default SurveyContainer;
