"use client";

import { Size } from "@prisma/client";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusSquareIcon } from "lucide-react";

interface MultiSelectProps {
  title: string;
  sizes: Size[];
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  title,
  sizes,
  value,
  onChange,
  onRemove,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);

  const handleSelect = (id: string) => {
    const newValue = selectedValues.includes(id)
      ? selectedValues.filter((v) => v !== id)
      : [...selectedValues, id];
    setSelectedValues(newValue);
    onChange(newValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedValues.length > 0 ? (
            <>
              <div className="space-x-1">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  sizes
                    .filter((size) => selectedValues.includes(size.id))
                    .map((size) => (
                      <Badge
                        key={size.id}
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {size.name}
                      </Badge>
                    ))
                )}
              </div>
            </>
          ) : (
            <div className="font-normal">{title}</div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command className="w-full">
          <CommandInput placeholder="Search sizes" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {sizes.map((size) => {
                const isSelected = selectedValues.includes(size.id);

                return (
                  <CommandItem
                    key={size.id}
                    onSelect={() => handleSelect(size.id)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>{size.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValues([]);
                      onChange([]);
                    }}
                    className="justify-center text-center"
                  >
                    Clear
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
