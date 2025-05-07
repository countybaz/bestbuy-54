
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSurvey } from "@/contexts/SurveyContext";
import ProductOffer from "@/components/ProductOffer";
import SurveyHeader from "@/components/SurveyHeader";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import IPhoneImageFetcher from "@/components/IPhoneImageFetcher";
import { useIsMobile } from "@/hooks/use-mobile";

const Results = () => {
  const { answers } = useSurvey();
  const { toast } = useToast();
  const [showingOffer, setShowingOffer] = useState(false);
  const [giftCardImage, setGiftCardImage] = useState<{src: string, alt: string} | null>(null);
  const [imagesLoading, setImagesLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Guaranteed local fallback image that loads instantly - with quality parameters
  const giftCardFallbackImage = {
    src: "/lovable-uploads/4077eeb2-5480-4589-a146-d19d2f13b3dd.png?q=60&w=300",
    alt: "Best Buy $750 Gift Card"
  };
  
  // Initialize with fallback images and preload them immediately
  useEffect(() => {
    // Set fallback image right away
    setGiftCardImage(giftCardFallbackImage);
    
    // Preload the image
    const image = new Image();
    image.onload = () => setImagesLoading(false);
    image.onerror = () => setImagesLoading(false);
    image.src = giftCardFallbackImage.src;
    
    // Fallback timeout to ensure loading state doesn't persist
    setTimeout(() => setImagesLoading(false), 300);
  }, []);

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
                    {imagesLoading ? (
                      <div className="w-full h-full bg-gray-50 rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-100"></div>
                      </div>
                    ) : (
                      <img 
                        src={giftCardImage?.src || giftCardFallbackImage.src}
                        alt={giftCardImage?.alt || giftCardFallbackImage.alt}
                        className="rounded-md object-contain w-full h-full"
                        loading="eager"
                        decoding="async"
                        width="300"
                        height="188"
                        fetchPriority="high"
                      />
                    )}
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
