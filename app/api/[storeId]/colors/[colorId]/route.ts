import { prismadb } from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"



export async function GET(
    req:Request,
    { params }:{
        params:{ colorId:string}
    }
) {
    try {


        
        if(!params.colorId){
            return new NextResponse("Sized id is required",{
                status:400
            })
        }
        

        const color = await prismadb.color.findUnique({
            where:{
                id:params.colorId,
            }
        })

        return NextResponse.json(color);
    } catch(e) {
        console.log('[COLOR_GET]', e)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}

export async function PATCH(
    req:Request,
    { params }:{
        params:{storeId:string, colorId:string}
    }
) {
    try {
        const { userId } = await auth()
        const body = await req.json()

        const { name,value } = body;

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

        if(!value){
            return new NextResponse("imageUrl is required",{
                status:400
            })
        }
        if(!params.colorId){
            return new NextResponse("Sized id is required",{
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

        const color = await prismadb.color.updateMany({
            where:{
                id:params.colorId,
            },
            data:{
                name,
                value
            }
        })

        return NextResponse.json(color);
    } catch(e) {
        console.log('[COLOR_PATCH]', e)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}

export async function DELETE(
    req:Request,
    { params }:{
        params:{ storeId:string ,colorId:string}
    }
) {
    try {
        const { userId } = await auth()


        if(!userId){
            return new NextResponse("Unauthenticated",{
                status:401
            })
        }
        if(!params.colorId){
            return new NextResponse("colorId id is required",{
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

        
        const color = await prismadb.color.deleteMany({
            where:{
                id:params.colorId,
            }
        })

        return NextResponse.json(color);
    } catch(e) {
        console.log('[SIZE_DELETED]', e)
        return new NextResponse("Internal Error",{
            status:500
        })
    }
}