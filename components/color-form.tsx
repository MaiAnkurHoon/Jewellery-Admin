"use client"
import axios from "axios"

import { Color } from "@prisma/client"
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



interface ColorFormProps{
    initialData: Color | null;
}

const formSchema = z.object({
    name:z.string().min(1),
    value:z.string().min(4).regex(/^#/,{
        message:"String must be a valid hex color"
    })

})

type ColorFormValues = z.infer<typeof formSchema>

const ColorForm :React.FC<ColorFormProps> = ({
    initialData
}) => {
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    console.log(params)

    const title = initialData ? "Edit " : "New color"
    const description = initialData ? "Edit a color" : "Add a new color"
    const toastMessage = initialData ? "color Updated" : "color Created"
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<ColorFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData || {
            name:"",
            value:""
        }
    })

    const onSubmit = async (data:ColorFormValues) =>{
        try{
            setLoading(true)
            if(initialData){
              await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`,data)
            }else{
              await axios.post(`/api/${params.storeId}/colors`,data)

            }
            router.refresh()
            toast.success("color update")
        }catch(e){
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

    const onDelete = async () =>{
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success("color deleted")
        } catch (error) {
            toast.error("Make sure you removed all products using this color first") 
                
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
                    color="sm"
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
                                    <Input disabled={loading} placeholder="color Name" {...field}/>
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
                                    <div className="flex items-center gap-x-4">
                                    <Input disabled={loading} placeholder="color Value" {...field}/>
                                    <div 
                                       className="border p-4 rounded-full"
                                       style={{
                                             backgroundColor:field.value
                                       }}
                                    />
                                    </div>
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

export default ColorForm;  