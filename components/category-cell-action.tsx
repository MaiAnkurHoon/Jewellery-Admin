"use client"


import { CategoryColumn } from "./category-column";
import axios from "axios";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuContent, DropdownMenuLabel } from "./ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash, UserPen } from "lucide-react";
import toast from "react-hot-toast";
import { useParams,useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "./alert-modal";

interface CellActionProps {
    data:CategoryColumn;
}

const CellAction:React.FC<CellActionProps> = ({
    data
}) => {
    
    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)
    const router = useRouter()
    const params = useParams()

    const onCopy = (id:string) =>{
        navigator.clipboard.writeText(id)
        toast.success(" Category copied to the clipboard")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/categories/${data.id}`)
            router.refresh()
            toast.success("Category deleted")
        } catch (error) {
            toast.error("Make sure you removed all products using this Category first") 
                
        }
        finally{
                setLoading(false)
                setOpen(false)
        }
    }

    return ( 
        <>
        <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}

        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4"/>
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
     );
}
 
export default CellAction;