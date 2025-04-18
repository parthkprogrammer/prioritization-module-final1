
import React from 'react';
import { Flame } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UrgencyIndicatorProps {
  isUrgent: boolean;
}

const UrgencyIndicator: React.FC<UrgencyIndicatorProps> = ({ isUrgent }) => {
  if (!isUrgent) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Flame className="h-5 w-5 text-red-500" />
        </TooltipTrigger>
        <TooltipContent>
          <p>This task requires urgent attention</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UrgencyIndicator;
