import BillboardClient from "@/components/billboard-client";
import { BillboardColumn } from "@/components/columns";
import { prismadb } from "@/lib/prismadb";

import { format } from "date-fns";

const BillboardsPage = async (
    {
        params
    }:{
        params:{storeId :string}
    }
) => {
    const billboards = await prismadb.billboard.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    const formattedBillboard:BillboardColumn[] = billboards.map((item:any) =>({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "dd/MM/yyyy"),
        amount: item.amount,
        status: item.status,
        email: item.email,
        name: item.name,
        value: item.value,
    }))


    return (  
        <div className="flex-col">
            <div className="flex-1 space-y- 4 p-8 pt-6">
                <BillboardClient  data={formattedBillboard}/>
            </div>
        </div>
    );
}
 
export default BillboardsPage;