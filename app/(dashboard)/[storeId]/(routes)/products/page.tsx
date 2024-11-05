import ProductClient from "@/components/product-client";
import ColorForm from "@/components/color-form";
import { ProductColumn } from "@/components/product-column";
import { prismadb } from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { format } from "date-fns";
import { create } from "domain";

const ProductsPage = async (
    {
        params
    }:{
        params:{storeId :string}
    }
) => {
    const products = await prismadb.product.findMany({
        where:{
            storeId:params.storeId
        },
        include:{ 
            category:true,
            size:true,
            color:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    // @ts-ignore
    const formattedProducts:ProductColumn[] = products.map((item) =>({
        id:item.id,
        name:item.name,
        isFeatured:item.isFeatured,
        isArchieved:item.isArchieved,
        price:formatter.format(item.price.toNumber()),
        category:item.category.name,
        size:item.size.name,
        color:item.color.value,
        createdAt:format(new Date(item.createdAt),"MMM dd, yyyy"),
    }))


    return (  
        <div className="flex-col">
            <div className="flex-1 space-y- 4 p-8 pt-6">
                <ProductClient  data={formattedProducts}/>
            </div>
        </div>
    );
}
 
export default ProductsPage;