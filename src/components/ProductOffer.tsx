import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductOfferProps {
  onClaim: () => void;
}

// Tiny, extremely low quality fallback image that will load instantly
const FALLBACK_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAgACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC/FEsjZLE+lNnt0kPPAPrUkcQSPHc96ryIVfPrWDZvFEByqEA9KaS7d8U+RXcZWoT5gOPXpSLQpG5uO9NNuN3ymnZlUANg5OKmCAgc9qV0NXM6e3CnABzTTb7RzgfWtGVFHTkVBI4yQFJ9KTTNCB9vy/KD60+OMkEEYFShJs/dFTxmRRww/KlctJEbxKE4FUG+Vjk8VpOhkXGAfrVRYAJMFeTWM4O5tFkaZDDBJ96uROq4GciozheMDFQMrhs+tEIuI5SVouLod+K8+ttdjjJAhkJ9SRXaXD5t3Havm7XvFjadqbRqwdVOFYdDVpXZDdj1RpFJ+UkGo5JE5zz9K8Usvil4htJA32kXCjosg/xrrbH4k6FqECNcxTWk5HzKw3KPof8AGoqQlHdDjJM//9k=";

const ProductOffer = ({ onClaim }: ProductOfferProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(FALLBACK_IMAGE);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  
  // Preload the fallback image on component mount
  useEffect(() => {
    // Define the iPhone image we want to load (optimized for size/quality)
    const optimizedImageUrl = "/lovable-uploads/b58d9fe6-a7c6-416a-9594-20451eb86002.png?w=300&q=30";
    
    // Start with the tiny placeholder
    setSelectedImage(FALLBACK_IMAGE);
    
    // Load the optimized image
    const img = new Image();
    img.onload = () => {
      setSelectedImage(optimizedImageUrl);
      setImageLoading(false);
    };
    img.onerror = () => {
      // Keep using the tiny placeholder on error
      setImageLoading(false);
    };
    
    // Set src after defining handlers
    img.src = optimizedImageUrl;
    
    // Set a timeout to stop showing loading state regardless
    const timer = setTimeout(() => {
      setImageLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 max-w-md mx-auto bg-white">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Congratulations!</h3>
        <p className="text-green-600 font-medium">You've qualified for our special offer!</p>
      </div>

      <div className="mb-6">
        {/* Display loading skeleton during image fetch */}
        {imageLoading ? (
          <Skeleton className="w-full h-48" />
        ) : (
          <img 
            src={selectedImage} 
            alt="iPhone 16 Pro Max" 
            className="w-full h-48 object-contain rounded-md bg-gray-50" 
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width="300"
            height="225"
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
