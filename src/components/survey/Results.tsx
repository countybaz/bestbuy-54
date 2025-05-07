
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSurvey } from "@/contexts/SurveyContext";
import ProductOffer from "@/components/ProductOffer";
import SurveyHeader from "@/components/SurveyHeader";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import OptimizedImage from "@/components/OptimizedImage";

const Results = () => {
  const { answers } = useSurvey();
  const { toast } = useToast();
  const [showingOffer, setShowingOffer] = useState(false);
  const isMobile = useIsMobile();
  
  // Gift card image path
  const giftCardPath = "/lovable-uploads/4077eeb2-5480-4589-a146-d19d2f13b3dd.png";

  const handleClaim = () => {
    toast({
      title: "Offer Claimed!",
      description: "Thank you! Check your email for next steps.",
      duration: 5000,
    });
  };

  return (
    <div className="max-w-md mx-auto px-4">
      {!showingOffer ? (
        <>
          <SurveyHeader 
            title="Congratulations!" 
            subtitle="Fantastic news! Your participation is confirmed. Continue to receive your $750 Best Buy Gift Card:"
            className="mb-4"
          />
          
          <div className="mb-4 space-y-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="flex justify-center">
                <div className={`${isMobile ? 'w-3/4' : 'w-1/2'} mx-auto`}>
                  <AspectRatio ratio={16/10}>
                    <OptimizedImage
                      src={giftCardPath}
                      alt="$750 Best Buy Gift Card"
                      width={300}
                      height={188}
                      className="rounded-md object-contain w-full h-full"
                      priority={true}
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
            
            {/* Blue promotional text */}
            <div className="text-center px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-blue-600 font-medium text-sm">
                Get your $750 Best Buy Gift Card! Shop electronics, appliances, computers, and more at any Best Buy store nationwide.
              </p>
            </div>
          </div>
          
          {/* Fixed CTA button for mobile */}
          <div className={isMobile ? "sticky bottom-4 z-10 mt-4" : ""}>
            <a 
              href="https://unlockrwrd.com/Boq2T97"
              className="block w-full" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                className={`w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg animate-pulse ${isMobile ? 'shadow-lg' : ''}`}
              >
                Continue to Offer
              </Button>
            </a>
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-4 pb-16">
            Limited time offer. Your reward is reserved for the time shown in the timer.
          </p>
        </>
      ) : (
        <ProductOffer onClaim={handleClaim} />
      )}
    </div>
  );
};

export default Results;
