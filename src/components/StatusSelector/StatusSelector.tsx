
import React from 'react';
import { StatusType } from '@/types';
import { useDefinitionsStore } from '@/store/definitionsStore';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusSelectorProps {
  currentStatus: StatusType | null;
  onChange: (newStatus: StatusType) => void;
  disabled?: boolean;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({
  currentStatus,
  onChange,
  disabled = false,
}) => {
  const { statuses } = useDefinitionsStore();

  return (
    <Select
      value={currentStatus || undefined}
      onValueChange={(value: StatusType) => onChange(value)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem
            key={status.type}
            value={status.type}
            className="flex items-center gap-2"
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full mr-2",
                status.color
              )}
            />
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelector;
