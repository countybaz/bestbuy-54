
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
  const [iphoneImages, setIphoneImages] = useState<Array<{src: string, alt: string}>>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Default fallback images that are guaranteed to work
  const fallbackImages = [
    {
      src: "/lovable-uploads/b58d9fe6-a7c6-416a-9594-20451eb86002.png",
      alt: "iPhone 16 Pro colors"
    },
    {
      src: "/lovable-uploads/b96a5830-12f3-497d-966a-b0930df4e6d0.png", 
      alt: "iPhone 16 Pro display"
    }
  ];
  
  useEffect(() => {
    // Initialize with fallback images to ensure something always displays
    setIphoneImages(fallbackImages);
  }, []);

  const handleClaim = () => {
    toast({
      title: "Offer Claimed!",
      description: "Thank you! Check your email for next steps.",
      duration: 5000,
    });
  };
  
  const handleImagesFetched = (images: Array<{src: string, alt: string}>) => {
    if (images.length >= 2) {
      // Get two random images for the display
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      setIphoneImages(shuffled.slice(0, 2));
      setImagesLoaded(true);
    } else if (images.length === 1) {
      // If only one image is returned, duplicate it for the second slot
      setIphoneImages([images[0], images[0]]);
      setImagesLoaded(true);
    } else {
      // Fallback to default images if no images were fetched
      setIphoneImages(fallbackImages);
      setImagesLoaded(true);
    }
  };

  // Function to handle image errors
  const handleImageError = (index: number) => {
    setIphoneImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index] = fallbackImages[index] || fallbackImages[0];
      return newImages;
    });
  };

  return (
    <div className="max-w-md mx-auto px-4">
      {!showingOffer ? (
        <>
          <SurveyHeader 
            title="Congratulations!" 
            subtitle="Fantastic news! Your participation is confirmed. Continue to the next step to receive your iPhone 16 Pro:"
            className="mb-4"
          />
          
          <div className="mb-4 space-y-3">
            {/* Hidden iPhone Image Fetcher with callback */}
            <div className="hidden">
              <IPhoneImageFetcher onComplete={handleImagesFetched} />
            </div>
            
            {/* iPhone Images - optimized for mobile */}
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row justify-center'} gap-2`}>
                <div className={`${isMobile ? 'w-[140px]' : 'w-[120px]'}`}>
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={iphoneImages[0]?.src || fallbackImages[0].src}
                      alt={iphoneImages[0]?.alt || fallbackImages[0].alt}
                      className="rounded-md object-contain w-full h-full" 
                      onError={() => handleImageError(0)}
                    />
                  </AspectRatio>
                </div>
                {!isMobile && (
                  <div className="w-[120px]">
                    <AspectRatio ratio={1/1}>
                      <img 
                        src={iphoneImages[1]?.src || fallbackImages[1].src} 
                        alt={iphoneImages[1]?.alt || fallbackImages[1].alt}
                        className="rounded-md object-contain w-full h-full" 
                        onError={() => handleImageError(1)}
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>
            </div>
            
            {/* Blue promotional text */}
            <div className="text-center px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-blue-600 font-medium text-sm">
                Upgrade your tech and Cash In! Claim $1000 Towards a iPhone 16 Pro Max Elevate your productivity and your wallet!
              </p>
            </div>
          </div>
          
          {/* Fixed CTA button for mobile */}
          <div className={isMobile ? "sticky bottom-4 z-10 mt-4" : ""}>
            <a 
              href="https://unlockrwrd.com/nqA5Sq7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
            >
              <Button 
                className={`w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg animate-pulse ${isMobile ? 'shadow-lg' : ''}`}
              >
                Continue to Claim Your Reward
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
