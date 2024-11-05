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

        const { name ,value } = body;
        if(!userId){
            return new NextResponse("Unauthenticated", { status: 400 });
        }
        if(!name){
            return new NextResponse("Label is required", { status: 401 });
        }
        if(!value){
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



        const size = await prismadb.size.create({
            data:{
                name,
                value,
                storeId:params.storeId
            }
        })

        return NextResponse.json(size)
    }
    catch(e){
        console.error('[SIZE_POST]',e);
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
        

        const size = await prismadb.size.findMany({
            where:{
                storeId:params.storeId
            }
        })
        return NextResponse.json(size)
    }
    catch(e){
        console.error('[SIZES_GET]',e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}