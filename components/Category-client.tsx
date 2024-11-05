"use client"

import { Plus, SpeakerIcon } from "lucide-react";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./category-column";
import { DataTable } from "./category-data-table";
import ApiList from "./api-list";
import { CategoryColumn } from "./category-column";

interface CategoryClientProps {
    data:CategoryColumn[]
}

const CategoryClient:React.FC<CategoryClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()


    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading
                title={`Categories (${data.length}) `}
                description="Manage Categories for your store"
            />
            <Button onClick={()=>{
                router.push(`/${params.storeId}/categories/new`)
            }}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data}/>
        <Heading title="API" description="API calls for Categories" />
        <Separator/>
        <ApiList entityName="categories" entityIdName="categoryId"/>
        </>
     );
}
 
export default CategoryClient;