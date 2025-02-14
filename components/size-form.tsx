"use client"
import axios from "axios"

import { Size } from "@prisma/client"
import Heading from "./heading";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "./alert-modal";

import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "./ui/image-upload";


interface SizeFormProps{
    initialData: Size | null;
}

const formSchema = z.object({
    name:z.string().min(1),
    value:z.string().min(1)

})

type SizeFormValues = z.infer<typeof formSchema>

const SizeForm :React.FC<SizeFormProps> = ({
    initialData
}) => {
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    console.log(params)

    const title = initialData ? "Edit " : "New Size"
    const description = initialData ? "Edit a Size" : "Add a new Size"
    const toastMessage = initialData ? "Size Updated" : "Size Created"
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<SizeFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData || {
            name:"",
            value:""
        }
    })

    const onSubmit = async (data:SizeFormValues) =>{
        try{
            setLoading(true)
            if(initialData){
              await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data)
            }else{
              await axios.post(`/api/${params.storeId}/sizes`,data)

            }
            router.refresh()
            toast.success("Size update")
        }catch(e){
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

    const onDelete = async () =>{
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success("Size deleted")
        } catch (error) {
            toast.error("Make sure you removed all products using this size first") 
                
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
            <div className="flex items-center justify-between">
                <Heading
                title={title}
                description={description}
                />
                {initialData && (
                    <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4"/>
                    </Button>
                )}
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className = "space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field}) =>(
                            <FormItem> 
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Size Name" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                          )}
                        />
                        <FormField
                        control={form.control}
                        name="value"
                        render={({field}) =>(
                            <FormItem> 
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Size Value" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                          )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" >
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator/>
        </>
        
     );
}

export default SizeForm;  