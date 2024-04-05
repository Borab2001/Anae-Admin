"use client";

import { Size } from "@prisma/client";
import { useState } from "react";
import { X } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
  placeholder: string;
  sizes: Size[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  sizes,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: Size[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      sizes.find((size) => size.id === id)
    ) as Size[];
  }

  const selectables = sizes.filter((size) => !selected.includes(size));

  return (
    <Command className="overflow-visible bg-background">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((size) => (
          <Badge key={size.id} className="rounded-md">
            {size.value}
            <button
              type="button"
              className="ml-1 hover:text-red-600"
              onClick={() => onRemove(size.id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="bg-background absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((size) => (
              <CommandItem
                key={size.id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(size.id);
                  setInputValue("");
                }}
                className="hover:bg-gray-800 cursor-pointer"
              >
                {size.value}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
