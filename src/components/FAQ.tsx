
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { MessageCircleQuestion } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FAQ = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full shadow-lg transition-all duration-300 relative overflow-hidden",
            "bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600",
            "border-2 border-white/20"
          )}
          style={{ width: "3.5rem", height: "3.5rem" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className={cn(
            "absolute inset-0 bg-white/10 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )} />
          
          <MessageCircleQuestion 
            className={cn(
              "text-blue-900 transition-all duration-300",
              isHovered ? "scale-110" : "scale-100"
            )} 
            size={42}
            strokeWidth={1.8}
          />
          <span className="sr-only">FAQ</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md rounded-xl border border-yellow-100 shadow-xl bg-white/95 backdrop-blur-sm">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center text-2xl bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent font-bold">
            Frequently Asked Questions
          </DialogTitle>
        </DialogHeader>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-yellow-100">
            <AccordionTrigger className="font-semibold text-blue-900 hover:text-blue-700 hover:no-underline">
              WHAT ARE THE PARTICIPATION REQUIREMENTS?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              You must be over 18 years old, live in the US, and have made at least one purchase at Best Buy in the last 6 months.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border-yellow-100">
            <AccordionTrigger className="font-semibold text-blue-900 hover:text-blue-700 hover:no-underline">
              WHAT CAN I GET FROM THIS PROGRAM?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              By participating in this Review Program, you can receive a $500 Best Buy gift card. 
              This gift card can be used for any purchases at Best Buy stores nationwide or at BestBuy.com.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-yellow-100">
            <AccordionTrigger className="font-semibold text-blue-900 hover:text-blue-700 hover:no-underline">
              WHAT HAPPENS IF I APPLY WITHOUT MEETING THE REQUIREMENTS?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Our applications are reviewed daily by our team and those who do not meet the requirements will not be accepted, 
              but we will contact them as soon as they are able to participate.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};

export default FAQ;
