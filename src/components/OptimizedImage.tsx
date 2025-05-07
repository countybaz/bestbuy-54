
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string;
  quality?: number;
  priority?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc,
  quality = 60,
  priority = false
}: OptimizedImageProps) => {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [error, setError] = useState(false);
  
  // Tiny, extremely low quality placeholder
  const tinyPlaceholder = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAgACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIHMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC/FEsjZLE+lNnt0kPPAPrUkcQSPHc96ryIVfPrWDZvFEByqEA9KaS7d8U+RXcZWoT5gOPXpSLQpG5uO9NNuN3ymnZlUANg5OKmCAgc9qV0NXM6e3CnABzTTb7RzgfWtGVFHTkVBI4yQFJ9KTTNCB9vy/KD60+OMkEEYFTxmRRww/KlctJEbxKE4FUG+Vjk8VpOhkXGAfrVRYAJMFeTWM4O5tFkaZDDBJ96uROq4GciozheMDFQMrhs+tEIuI5SVouLod+K8+ttdjjJAhkJ9SRXaXD5t3Havm7XvFjadqbRqwdVOFYdDVpXZDdj1RpFJ+UkGo5JE5zz9K8Usvil4htJA32kXCjosg/xrrbH4k6FqECNcxTWk5HzKw3KPof8AGoqQlHdDjJM//9k=";

  useEffect(() => {
    // Set initial state
    setLoading(true);
    setError(false);
    
    // For priority images, don't show the placeholder to avoid flashing
    setImageSrc(priority ? src : tinyPlaceholder);
    
    // Optimize the image URL if needed
    let optimizedSrc = src;
    
    // Create image object to preload
    const img = new Image();
    img.onload = () => {
      setImageSrc(optimizedSrc);
      setLoading(false);
    };
    img.onerror = () => {
      setError(true);
      setLoading(false);
      if (fallbackSrc) {
        setImageSrc(fallbackSrc);
      }
    };
    img.src = optimizedSrc;
    
    // Set a maximum time to wait for image loading to prevent freezing the UI
    const timer = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 800); // Shorter timeout to ensure UI responsiveness
    
    return () => clearTimeout(timer);
  }, [src, fallbackSrc, width, priority]);
  
  if (loading && !priority) {
    return <Skeleton className={`${className} bg-gray-100`} style={{ width, height }} />;
  }
  
  return (
    <img 
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={priority ? "high" : "auto"}
      onError={() => {
        if (fallbackSrc && !error) {
          setImageSrc(fallbackSrc);
          setError(true);
        }
      }}
    />
  );
};

export default OptimizedImage;
