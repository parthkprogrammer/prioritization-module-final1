
import React from 'react';
import { PriorityLevel } from '@/types';
import { useDefinitionsStore } from '@/store/definitionsStore';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrioritySelectorProps {
  currentPriority: PriorityLevel | null;
  onChange: (newPriority: PriorityLevel) => void;
  disabled?: boolean;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  currentPriority,
  onChange,
  disabled = false,
}) => {
  const { priorities } = useDefinitionsStore();

  const getIconForPriority = (level: PriorityLevel) => {
    switch (level) {
      case 'high':
        return <ArrowUp className="h-4 w-4" />;
      case 'medium':
        return <Minus className="h-4 w-4" />;
      case 'low':
        return <ArrowDown className="h-4 w-4" />;
    }
  };

  return (
    <Select
      value={currentPriority || undefined}
      onValueChange={(value: PriorityLevel) => onChange(value)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        {priorities.map((priority) => (
          <SelectItem
            key={priority.level}
            value={priority.level}
            className="flex items-center gap-2"
          >
            <span className={cn("mr-2", priority.color)}>
              {getIconForPriority(priority.level)}
            </span>
            {priority.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PrioritySelector;
