import ColorClient from "@/components/color-client";
import { ColorColumn } from "@/components/color-column";
import { prismadb } from "@/lib/prismadb";

import { format } from "date-fns";

const ColorsPage = async (
    {
        params
    }:{
        params:{sizeId :string}
    }
) => {
    const colors = await prismadb.color.findMany({
        where:{
            storeId:params.sizeId
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    const formattedColors:ColorColumn[] = colors.map((item:any) =>({
        id:item.id,
        name:item.name,
        value:item.value,
        createdAt:format(item.createdAt,"dd/MM/yyyy"),

    }))


    return (  
        <div className="flex-col">
            <div className="flex-1 space-y- 4 p-8 pt-6">
                <ColorClient  data={formattedColors}/>
            </div>
        </div>
    );
}
 
export default ColorsPage;