"use client"

import { Plus, SpeakerIcon } from "lucide-react";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn,columns } from "./product-column";
import { DataTable } from "./data-table";
import ApiList from "./api-list";

interface BillboardClientProps {
    data:ProductColumn[]
}

const ProductClient:React.FC<BillboardClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()


    return ( 
        <>
        <div className="flex items-center justify-between">
            <Heading
                title={`Billboards (${data.length}) `}
                description="Manage products for your store"
            />
            <Button onClick={()=>{
                router.push(`/${params.storeId}/products/new`)
            }}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable searchKey="name" columns={columns} data={data}
        />
        <Heading title="API" description="API calls for Products" />
        <Separator/>
        <ApiList entityName="products" entityIdName="productId" />
        </>
     );
}
 
export default ProductClient;