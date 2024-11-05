import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prismadb";

export async function POST(
    req:Request,
    { params } :{
        params:{
            storeId:string
        }
    }
    
){
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { label,imageUrl } = body;
        if(!userId){
            return new NextResponse("Unauthenticated", { status: 400 });
        }
        if(!label){
            return new NextResponse("Label is required", { status: 401 });
        }
        if(!imageUrl){
            return new NextResponse("Image URL is required", { status: 401 });
        }
        if(!params.storeId){
            console.log(params.storeId)
            return new NextResponse("Store Id is required manish", { status: 401 });
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



        const billboard = await prismadb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId:params.storeId
            }
        })

        return NextResponse.json(billboard)
    }
    catch(e){
        console.error('[BILLBOARD_POST]',e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function GET(
    req:Request,
    { params } :{
        params:{
            storeId:string
        }
    }
    
    
){
    try {

        if(!params.storeId){
            return new NextResponse("Stored Id is required", { status: 401 });
        }
        

        const billboards = await prismadb.billboard.findMany({
            where:{
                storeId:params.storeId
            }
        })
        return NextResponse.json(billboards)
    }
    catch(e){
        console.error('[BILLBOARD_GET]',e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}