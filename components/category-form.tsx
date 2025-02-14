"use client"
import axios from "axios"

import { Billboard, Category } from "@prisma/client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


interface CategoryFormProps{
    initialData: Category | null;
    billboards: Billboard[]
}

const formSchema = z.object({
    name:z.string().min(1),
    billboardId:z.string().min(1)

})

type CategoryFormValues = z.infer<typeof formSchema>

const CategoryForm :React.FC<CategoryFormProps> = ({
    initialData,
    billboards
}) => {
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    console.log(params)

    const title = initialData ? "Edit Category" : "New Category"
    const description = initialData ? "Edit a Category" : "Add a new Category"
    const toastMessage = initialData ? "Category Updated" : "Category Created"
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<CategoryFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues: initialData || {
            name:"",
            billboardId:""
        }
    })
    console.log("hello",initialData," ",billboards )


    const onSubmit = async (data:CategoryFormValues) =>{
        try{
            setLoading(true)
            if(initialData){
              await axios.patch(`/api/${params.storeId}/categories/${params.CategoryId}`,data)
            }else{
              await axios.post(`/api/${params.storeId}/categories`,data)

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
            await axios.delete(`/api/${params.storeId}/categories/${params.CategoryId}`)
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success("Category deleted")
        } catch (error) {
            toast.error("Make sure you removed all categories using this Category first") 
                
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
                                    <Input disabled={loading} placeholder="Category Name" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                          )}
                        />
                        <FormField
                        control={form.control}
                        name="billboardId"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Billboard</FormLabel>
                                <Select disabled={loading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                            defaultValue={field.value}
                                            placeholder="Select a billboard"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {billboards.map((billboard) =>(
                                            <SelectItem
                                            key={billboard.id}
                                            value={billboard.id}
                                            >
                                                {billboard.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>
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

export default CategoryForm;  