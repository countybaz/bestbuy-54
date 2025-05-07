
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductOfferProps {
  onClaim: () => void;
}

const ProductOffer = ({ onClaim }: ProductOfferProps) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.onload = () => {
      setImageLoading(false);
    };
    img.onerror = () => {
      setImageLoading(false);
    };
    
    // Set src after defining handlers
    img.src = "/lovable-uploads/647e8416-3a63-4d9b-8be0-5dc82c427cb9.png";
    
    // Set a timeout to stop showing loading state regardless
    const timer = setTimeout(() => {
      setImageLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-4 md:p-6 max-w-md mx-auto bg-white">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Congratulations!</h3>
        <p className="text-green-600 font-medium">You've qualified for our special offer!</p>
      </div>

      <div className="mb-5">
        {/* Display loading skeleton during image fetch */}
        {imageLoading ? (
          <Skeleton className="w-full h-40 md:h-48" />
        ) : (
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/647e8416-3a63-4d9b-8be0-5dc82c427cb9.png" 
              alt="$500 Best Buy Gift Card" 
              className={`${isMobile ? 'w-4/5' : 'w-3/4'} h-auto object-contain rounded-md`}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width="300"
              height="188"
            />
          </div>
        )}
      </div>

      <div className="mb-5">
        <h4 className="font-bold text-lg mb-2 text-center">$500 Best Buy Gift Card</h4>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700">Redeemable in-store or online</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700">Shop thousands of products</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700">Valid at all Best Buy locations</span>
        </div>
      </div>

      <div className="mb-5 text-center">
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-green-600">$500.00 VALUE</span>
        </div>
        <p className="text-blue-800 font-medium text-sm mt-1">+ FREE Digital Delivery</p>
      </div>

      <Timer minutes={15} />

      <Button 
        onClick={onClaim} 
        className="w-full py-5 md:py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-md cta-button"
      >
        CONTINUE TO OFFER
      </Button>

      <p className="text-xs text-center text-gray-500 mt-4">
        Limited quantity available. Offer valid while supplies last.
      </p>
    </div>
  );
};

export default ProductOffer;
