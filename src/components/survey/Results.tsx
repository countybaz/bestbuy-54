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
  const [imagesLoading, setImagesLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Guaranteed local fallback images that load instantly - with quality parameters
  const fallbackImages = [
    {
      src: "/lovable-uploads/b58d9fe6-a7c6-416a-9594-20451eb86002.png?q=60&w=200",
      alt: "iPhone 16 Pro colors"
    },
    {
      src: "/lovable-uploads/b96a5830-12f3-497d-966a-b0930df4e6d0.png?q=60&w=200", 
      alt: "iPhone 16 Pro display"
    }
  ];
  
  // Initialize with fallback images and preload them immediately
  useEffect(() => {
    // Set fallback images right away
    setIphoneImages(fallbackImages);
    
    // Aggressively preload all fallback images
    const preloadPromises = fallbackImages.map(img => {
      return new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => resolve(); // Continue even if load fails
        image.src = img.src;
      });
    });
    
    // After all images are preloaded or after a timeout, consider images loaded
    Promise.race([
      Promise.all(preloadPromises),
      new Promise(resolve => setTimeout(resolve, 300)) // Fallback timeout
    ]).then(() => {
      setImagesLoading(false);
    });
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
      // Add quality parameters to the images
      const optimizedImages = images.slice(0, 2).map(img => {
        let optimizedSrc = img.src;
        
        // Add quality parameter if URL supports it (like Unsplash)
        if (optimizedSrc.includes('unsplash.com')) {
          optimizedSrc = optimizedSrc.includes('?') 
            ? optimizedSrc + '&w=200&auto=format&q=60' 
            : optimizedSrc + '?w=200&auto=format&q=60';
        }
        
        return {
          ...img,
          src: optimizedSrc
        };
      });
      
      // Create an array of image preloading promises
      const preloadPromises = optimizedImages.map((img, index) => {
        return new Promise<boolean>((resolve) => {
          const image = new Image();
          image.onload = () => resolve(true);  // Image loaded successfully
          image.onerror = () => resolve(false); // Image failed to load
          image.src = img.src;
        });
      });
      
      // Process results after all images have been attempted to load
      Promise.all(preloadPromises).then(results => {
        // Filter out any images that failed to load
        const successfulImages = optimizedImages.filter((_, index) => 
          index < 2 && results[index]
        );
        
        if (successfulImages.length > 0) {
          // If we got at least some successful images, use them
          setIphoneImages([
            ...successfulImages,
            // Fill any missing spots with fallback images
            ...(successfulImages.length < 2 ? 
                fallbackImages.slice(0, 2 - successfulImages.length) : [])
          ]);
        }
        // Always mark loading as done
        setImagesLoading(false);
      });
    } else if (images.length === 1) {
      // If only one image is returned, optimize it and verify it loads before using
      let optimizedSrc = images[0].src;
      
      // Add quality parameter if URL supports it (like Unsplash)
      if (optimizedSrc.includes('unsplash.com')) {
        optimizedSrc = optimizedSrc.includes('?') 
          ? optimizedSrc + '&w=200&auto=format&q=60' 
          : optimizedSrc + '?w=200&auto=format&q=60';
      }
      
      const optimizedImage = {
        ...images[0],
        src: optimizedSrc
      };
      
      const image = new Image();
      image.onload = () => {
        setIphoneImages([optimizedImage, fallbackImages[0]]);
        setImagesLoading(false);
      };
      image.onerror = () => {
        // Keep using fallbacks if the image fails to load
        setImagesLoading(false);
      };
      image.src = optimizedImage.src;
    } else {
      // No images returned, ensure loading state is finished
      setImagesLoading(false);
    }
  };

  // Function to handle image errors - immediately swap with fallback
  const handleImageError = (index: number) => {
    setIphoneImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index] = fallbackImages[index % fallbackImages.length];
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
            
            {/* iPhone Images with optimized loading */}
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row justify-center'} gap-2`}>
                <div className={`${isMobile ? 'w-[140px]' : 'w-[120px]'}`}>
                  <AspectRatio ratio={1/1}>
                    {imagesLoading ? (
                      <div className="w-full h-full bg-gray-50 rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-100"></div>
                      </div>
                    ) : (
                      <img 
                        src={iphoneImages[0]?.src || fallbackImages[0].src}
                        alt={iphoneImages[0]?.alt || fallbackImages[0].alt}
                        className="rounded-md object-contain w-full h-full"
                        onError={() => handleImageError(0)}
                        loading="eager"
                        decoding="async"
                        width="140"
                        height="140"
                        fetchPriority="high"
                      />
                    )}
                  </AspectRatio>
                </div>
                {!isMobile && (
                  <div className="w-[120px]">
                    <AspectRatio ratio={1/1}>
                      {imagesLoading ? (
                        <div className="w-full h-full bg-gray-50 rounded-md flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-100"></div>
                        </div>
                      ) : (
                        <img 
                          src={iphoneImages[1]?.src || fallbackImages[1].src} 
                          alt={iphoneImages[1]?.alt || fallbackImages[1].alt}
                          className="rounded-md object-contain w-full h-full" 
                          onError={() => handleImageError(1)}
                          loading="eager"
                          decoding="async"
                          width="120"
                          height="120"
                          fetchPriority="high"
                        />
                      )}
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
