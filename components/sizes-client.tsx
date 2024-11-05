"use client"

import { Plus, SpeakerIcon } from "lucide-react";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { SizesColumn,columns } from "./sizes-column";
import { DataTable } from "./data-table";
import ApiList from "./api-list";

interface SizesClientProps {
    data:SizesColumn[]
}

const SizesClient:React.FC<SizesClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()


    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading
                title={`Sizes (${data.length}) `}
                description="Manage Sizes for your store"
            />
            <Button onClick={()=>{
                router.push(`/${params.storeId}/sizes/new`)
            }}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="label" columns={columns} data={data}
        />
        <Heading title="API" description="API calls for Billboards" />
        <Separator/>
        <ApiList entityName="sizes" entityIdName="sizeId"/>
        </>
     );
}
 
export default SizesClient;