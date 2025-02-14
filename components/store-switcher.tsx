"use client"
import { useStoreModel } from "@/hooks/use-store-model";
import { Store } from "@prisma/client";
import { useParams,useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command } from "./ui/command";
import { CommandEmpty, CommandGroup, CommandInput, CommandList,CommandItem } from "@/components/ui/command";
import { PopoverContent,PopoverTrigger,Popover} from "@/components/ui/popover";



type PopoverTriggerProps = React.ComponentProps<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps{
    items:Store[];
}


const StoreSwitcher = ({
    className,
    items = [],
}:StoreSwitcherProps) => {
    const [open,setOpen] = useState(false)
    const storeModal = useStoreModel();
    const params = useParams()
    const router = useRouter();

    const formatterItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))

    const currentStore = formatterItems.find((item) =>item.value ===params.storeId);

    const onStoreSelect = (store:{value:string, label:string}) =>{
        setOpen(false);
        router.push(`${store.value}`);
    }
    return ( 

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button 
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between",className)}
                    >
                        <StoreIcon className="mr-2 h-4 w-4"/>
                        {currentStore?.label || "Select a store"}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search store ....."/>
                            <CommandEmpty>No Store found.</CommandEmpty>
                            <CommandGroup heading="Stores">
                                {formatterItems.map((store) => 
                                   <CommandItem
                                   key={store.value}
                                   onSelect ={() => onStoreSelect(store)}
                                   className="text-sm"
                                   >
                                    <StoreIcon className="mr-2 h-4 w-4"/>
                                    {store.label}   
                                     <Check
                                     className={cn("ml-auto h-4 w-4",
                                        currentStore?.value === store.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                     )}
                                     />
                                   </CommandItem>
                                )}
                            </CommandGroup>
                        </CommandList>
                        <CommandGroup>
                            <CommandItem
                            onSelect={() =>{
                                setOpen(false);
                                storeModal.onOpen();
                            }}
                            >
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

     );
}
 
export default StoreSwitcher;