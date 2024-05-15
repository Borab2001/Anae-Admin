"use client";

import { Size } from "@prisma/client";
import { useState } from "react";
import { X } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusSquareIcon } from "lucide-react";

// interface MultiSelectProps {
//   placeholder: string;
//   sizes: Size[];
//   value: string[];
//   onChange: (value: string) => void;
//   onRemove: (value: string) => void;
// }

interface MultiSelectProps {
  title: string;
  sizes: Size[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  // placeholder,
  // sizes,
  // value,
  // onChange,
  // onRemove,
  title,
  sizes
}) => {
  // const [inputValue, setInputValue] = useState("");
  // const [open, setOpen] = useState(false);

  // let selected: Size[];

  // if (value.length === 0) {
  //   selected = [];
  // } else {
  //   selected = value.map((id) =>
  //     sizes.find((size) => size.id === id)
  //   ) as Size[];
  // }

  // const selectables = sizes.filter((size) => !selected.includes(size));

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    // <Command className="overflow-visible bg-background">
    //   <div className="flex gap-1 flex-wrap border rounded-md">
    //     {selected.map((size) => (
    //       <Badge key={size.id} className="rounded-md">
    //         {size.value}
    //         <button
    //           type="button"
    //           className="ml-1 hover:text-red-600"
    //           onClick={() => onRemove(size.id)}
    //         >
    //           <X className="h-3 w-3" />
    //         </button>
    //       </Badge>
    //     ))}

    //     <CommandInput
    //       placeholder={placeholder}
    //       value={inputValue}
    //       onValueChange={setInputValue}
    //       onBlur={() => setOpen(false)}
    //       onFocus={() => setOpen(true)}
    //     />
    //   </div>

    //   <div className="relative mt-2">
    //     {open && (
    //       <CommandGroup className="bg-background absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
    //         {selectables.map((size) => (
    //           <CommandItem
    //             key={size.id}
    //             onMouseDown={(e) => e.preventDefault()}
    //             onSelect={() => {
    //               onChange(size.id);
    //               setInputValue("");
    //             }}
    //             className="hover:bg-gray-800 cursor-pointer"
    //           >
    //             {size.value}
    //           </CommandItem>
    //         ))}
    //       </CommandGroup>
    //     )}
    //   </div>
    // </Command>

    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {/* <PlusSquareIcon className="mr-2 size-4" /> */}
          
          {selectedValues?.length > 0 ? (
            <>
              {/* <Separator orientation="vertical" className="mx-2 h-4" /> */}
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
            <div className="font-normal">
              {title}
            </div>
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
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedValues(
                          selectedValues.filter((v) => v !== size.id)
                        );
                      } else {
                        setSelectedValues([...selectedValues, size.id]);
                      }
                    }}
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
                    onSelect={() => setSelectedValues([])}
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
