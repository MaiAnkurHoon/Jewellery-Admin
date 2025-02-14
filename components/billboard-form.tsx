"use client"
import axios from "axios"

import { Billboard, Store } from "@prisma/client"
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


interface BillboardFormProps{
    initialData: Billboard | null;
}

const formSchema = z.object({
    label:z.string().min(1),
    imageUrl:z.string().url()

})

type BillboardFormValues = z.infer<typeof formSchema>

const BillboardForm :React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    console.log(params)

    const title = initialData ? "Edit Billboard" : "New Billboard"
    const description = initialData ? "Edit a Billboard" : "Add a new billboard"
    const toastMessage = initialData ? "Billboard Updated" : "Billboard Created"
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<BillboardFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData || {
            label:"",
            imageUrl:""
        }
    })

    const onSubmit = async (data:BillboardFormValues) =>{
        try{
            setLoading(true)
            if(initialData){
              await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,data)
            }else{
              await axios.post(`/api/${params.storeId}/billboards`,data)

            }
            router.refresh()
            toast.success("Store update")
        }catch(e){
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

    const onDelete = async () =>{
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success("Billboard deleted")
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first") 
                
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
                <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                    value={field.value ? [field.value] : []}
                                    disabled={loading}
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange("")}

                                     />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                          )}
                        />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                        control={form.control}
                        name="label"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Billboard label" {...field}/>
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

export default BillboardForm;  