import { prismadb } from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"



export async function GET(
    req:Request,
    { params }:{
        params:{ productId:string}
    }
) {
    try {


        
        if(!params.productId){
            return new NextResponse("PRODUCT id is required",{
                status:400
            })
        }
        

        const product = await prismadb.product.findUnique({
            where:{
                id:params.productId,
            },
            include:{
                category:true,
                color:true,
                size:true,
                images:true
            }
        })

        return NextResponse.json(product);
    } catch(e) {
        console.log('[PRODUCT_GET]', e)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}

export async function PATCH(
    req:Request,
    { params }:{
        params:{storeId:string, productId:string}
    }
) {
    try {
        const { userId } = await auth()
        const body = await req.json()
        const { 
            name,
            label,
            categoryId,
            colorId,
            price,
            sizeId,
            images,
            isFeatured,
            isArchieved,
         } = body;
         

         if (!userId) {
            return new NextResponse("Unauthenticated", { status: 400 });
        }
        
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }
        
        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 });
        }
        
        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 });
        }
        
        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }
        
        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 });
        }
        
        if (!images || !Array.isArray(images) || images.length === 0) {
            return new NextResponse("At least one image is required", { status: 400 });
        }
        
        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await prismadb.product.update({
            where:{
                id:params.productId,
            },
            data:{
                name,
                categoryId,
                colorId,
                price,
                sizeId,
                images:{
                    deleteMany:{},
                },
                isFeatured,
                isArchieved,
            }
        })

        const product = await prismadb.product.update({
            where:{
                id:params.productId,
            },
            data:{
                images:{
                    createMany:{
                        data:[
                            ...images.map((image:string)=>({
                                url:image
                            }))
                        ]
                    }
                }
            }
        })
    } catch(e) {
        console.log('[PRODUCT_PATCH]', e)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}

export async function DELETE(
    req:Request,
    { params }:{
        params:{ storeId:string ,productId:string}
    }
) {
    try {
        const { userId } = await auth()


        if(!userId){
            return new NextResponse("Unauthenticated",{
                status:401
            })
        }
        if(!params.productId){
            return new NextResponse("PRODUCT id is required",{
                status:400
            })
        }
        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })
        if(!storeByUserId){

            return new NextResponse("Unauthorized", { status: 403 });
        }

        
        const product = await prismadb.product.deleteMany({
            where:{
                id:params.productId,
            }
        })

        return NextResponse.json(product);
    } catch(e) {
        console.log('[Product_DELETED]', e)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}