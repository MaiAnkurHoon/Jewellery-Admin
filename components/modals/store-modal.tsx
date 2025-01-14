"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { Modal } from "@/components/ui/Modal";
import { useStoreModel } from "@/hooks/use-store-model";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name:z.string().min(1),
})

export const StoreModal = () => {
  const storeModal= useStoreModel();

  const [loading,setLoading] = useState(false);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:"",
    }
  })

  const onSubmit = async (values:z.infer<typeof formSchema>)=>{
    try{
      setLoading(true);
      const response = await axios.post('/api/stores',values)
      window.location.assign((`${response.data.id}`));
      console.log(response.data);
    }catch(e){
      console.log(e);
      toast.error("Something went wrong");
    }finally{
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={storeModal.isOpen}
     onClose={storeModal.onClose}
     title="Create Store" 
     description="Add a new store to manage products">

      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
              control={form.control}
              name="name"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E-commerce" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )} 
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                disabled={loading}
                variant="outline"
                onClick={storeModal.onClose}
                >Cancel</Button>
                <Button 
                disabled={loading}
                type="submit"
                >Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}