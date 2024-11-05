import SizesClient from "@/components/sizes-client";
import { SizesColumn } from "@/components/sizes-column";
import { prismadb } from "@/lib/prismadb";

import { format } from "date-fns";

const SizesPage = async (
    {
        params
    }:{
        params:{sizeId :string}
    }
) => {
    const sizes = await prismadb.size.findMany({
        where:{
            id:params.sizeId
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    const formattedSizes:SizesColumn[] = sizes.map((item:any) =>({
        id:item.id,
        name:item.name,
        value:item.value,
        createdAt:format(item.createdAt,"dd/MM/yyyy"),

    }))


    return (  
        <div className="flex-col">
            <div className="flex-1 space-y- 4 p-8 pt-6">
                <SizesClient  data={formattedSizes}/>
            </div>
        </div>
    );
}
 
export default SizesPage;