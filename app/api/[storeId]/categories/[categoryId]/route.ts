import { prismadb } from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"



export async function GET(
    req:Request,
    { params }:{
        params:{ storeId:string ,categoryId:string}
    }
) {
    try {


        
        if(!params.categoryId){
            return new NextResponse("Billboard id is required",{
                status:400
            })
        }
        

        const category = await prismadb.category.findUnique({
            where:{
                id:params.categoryId,
            },
            include:{
                billboard:true
            }
        })

        return NextResponse.json(category);
    } catch(e) {
        console.log('[BILLBOARD_GET]', e)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}

export async function PATCH(
    req:Request,
    { params }:{
        params:{storeId:string, categoryId:string}
    }
) {
    try {
        const { userId } = await auth()
        const body = await req.json()

        const { name,billboardId } = body;

        if(!userId){
            return new NextResponse("Unauthenticated",{
                status:401
            })
        }

        if(!name){
            return new NextResponse("label is required",{
                status:400
            })
        }

        if(!billboardId){
            return new NextResponse("imageUrl is required",{
                status:400
            })
        }
        if(!params.categoryId){
            return new NextResponse("category id is required",{
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

        const category = await prismadb.category.updateMany({
            where:{
                id:params.categoryId,
            },
            data:{
                name,
                billboardId
            }
        })

        return NextResponse.json(category);
    } catch(e) {
        console.log('[CATEGORY_PATCH]', e)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}

export async function DELETE(
    req:Request,
    { params }:{
        params:{ storeId:string ,categoryID:string}
    }
) {
    try {
        const { userId } = await auth()


        if(!userId){
            return new NextResponse("Unauthenticated",{
                status:401
            })
        }
        if(!params.categoryID){
            return new NextResponse("Billboard id is required",{
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

        
        const category = await prismadb.category.deleteMany({
            where:{
                id:params.categoryID,
            }
        })

        return NextResponse.json(category);
    } catch(e) {
        console.log('[CATEGORY_DELETED]', e)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}