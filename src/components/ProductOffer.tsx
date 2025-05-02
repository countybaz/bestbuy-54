
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import IPhoneImageFetcher from "@/components/IPhoneImageFetcher";

interface ProductOfferProps {
  onClaim: () => void;
}

interface IPhoneImage {
  src: string;
  alt: string;
}

// Low quality fallback image that will load instantly
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&auto=format&q=60";

const ProductOffer = ({ onClaim }: ProductOfferProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(FALLBACK_IMAGE);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  
  // Preload the fallback image on component mount
  useEffect(() => {
    const img = new Image();
    img.src = FALLBACK_IMAGE;
    
    // Show a loading state initially but for a short time
    const timer = setTimeout(() => {
      setImageLoading(false);
    }, 200); // Reduced from 300ms to 200ms for faster perception
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleImagesFetched = (images: IPhoneImage[]) => {
    if (images.length > 0) {
      // Prefetch the chosen image before displaying
      setImageLoading(true);
      
      // Randomly select one image
      const randomIndex = Math.floor(Math.random() * images.length);
      
      // Add quality parameters to lower image quality
      let selectedSrc = images[randomIndex].src;
      
      // Add quality parameter if URL supports it (like Unsplash)
      if (selectedSrc.includes('unsplash.com')) {
        selectedSrc = selectedSrc.includes('?') 
          ? selectedSrc + '&w=400&auto=format&q=60' // Lower quality and size
          : selectedSrc + '?w=400&auto=format&q=60';
      }
      
      const img = new Image();
      img.onload = () => {
        setSelectedImage(selectedSrc);
        setImageLoading(false);
        setImageError(false);
      };
      img.onerror = () => {
        setSelectedImage(FALLBACK_IMAGE);
        setImageLoading(false);
        setImageError(true);
      };
      img.src = selectedSrc;
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 max-w-md mx-auto bg-white">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Congratulations!</h3>
        <p className="text-green-600 font-medium">You've qualified for our special offer!</p>
      </div>

      <div className="mb-6">
        {/* Hidden image fetcher that provides images */}
        <div className="hidden">
          <IPhoneImageFetcher onComplete={handleImagesFetched} />
        </div>
        
        {/* Display loading skeleton during image fetch */}
        {imageLoading ? (
          <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500 text-sm">Loading...</p>
          </div>
        ) : (
          <img 
            src={selectedImage} 
            alt="iPhone 16 Pro Max" 
            className="w-full h-48 object-contain rounded-md bg-gray-50" 
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width="400"
            height="300"
            onError={() => {
              setSelectedImage(FALLBACK_IMAGE);
              setImageError(true);
            }}
          />
        )}
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-lg mb-2">iPhone 16 Pro Max</h4>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-700">Latest A18 Pro chip</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-700">48MP camera system</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-700">All-day battery life</span>
        </div>
      </div>

      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          <span className="text-gray-500 line-through text-lg mr-2">$1299.99</span>
          <span className="text-2xl font-bold text-green-600">$299.99</span>
        </div>
        <p className="text-blue-700 font-medium text-sm mt-1">+ FREE Shipping</p>
      </div>

      <Timer minutes={15} />

      <Button 
        onClick={onClaim} 
        className="w-full py-6 text-lg bg-green-600 hover:bg-green-700"
      >
        CLAIM NOW
      </Button>

      <p className="text-xs text-center text-gray-500 mt-4">
        Limited quantity available. Offer valid while supplies last.
      </p>
    </div>
  );
};

export default ProductOffer;
