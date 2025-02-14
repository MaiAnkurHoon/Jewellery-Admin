"use client"
import axios from "axios"

import { Store } from "@prisma/client"
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
import { ApiAlert } from "./ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";


interface SettingFormProps{
    initialData: Store;
}

const formSchema = z.object({
    name:z.string().min(1),

})

type SettingFormValues = z.infer<typeof formSchema>

const SettingsForm :React.FC<SettingFormProps> = ({
    initialData
}) => {
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()



    const form = useForm<SettingFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData
    })

    const onSubmit = async (data:SettingFormValues) =>{
        try{
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`,data)
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
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push("/")
            toast.success("Store deleted")
        } catch (error) {
            console.log(error)
            toast.error("Make sure you removed all products and categories first") 
                
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
                title="Settings"
                description="Manage store preferences"
                />
                <Button
                disabled={loading}
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
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
                                    <Input disabled={loading} placeholder="Store name" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                          )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" >
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert title="test" description={`${origin}/api/${params.storeId}`} variant="public"/>
        </>
        
     );
}

export default SettingsForm;  