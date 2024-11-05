"use client"

import { Plus, SpeakerIcon } from "lucide-react";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn,columns } from "./color-column";
import { DataTable } from "./category-data-table";
import ApiList from "./api-list";

interface ColorsClientProps {
    data:ColorColumn[]
}

const ColorsClient:React.FC<ColorsClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()


    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading
                title={`Colors (${data.length}) `}
                description="Manage Colors for your store"
            />
            <Button onClick={()=>{
                router.push(`/${params.storeId}/colors/new`)
            }}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="label" columns={columns} data={data}
        />
        <Heading title="API" description="API calls for Colors" />
        <Separator/>
        <ApiList entityName="colors" entityIdName="colorId"/>
        </>
     );
}
 
export default ColorsClient;