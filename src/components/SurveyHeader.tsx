
import { cn } from "@/lib/utils";

interface SurveyHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SurveyHeader = ({
  title,
  subtitle,
  className
}: SurveyHeaderProps) => {
  return (
    <div className={cn("text-center mb-6 md:mb-8", className)}>
      {title && <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-800 mb-2">{title}</h1>}
      {subtitle && <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>}
    </div>
  );
};

export default SurveyHeader;
