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

        const { name,billboardId } = body;
        if(!userId){
            return new NextResponse("Unauthenticated", { status: 400 });
        }
        if(!name){
            return new NextResponse("Name is required", { status: 401 });
        }
        if(!billboardId){
            return new NextResponse("billboardId is required", { status: 401 });
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



        const category = await prismadb.category.create({
            data:{
                name,
                billboardId,
                storeId:params.storeId
            }
        })

        return NextResponse.json(category)
    }
    catch(e){
        console.error('[Categories_POST]',e);
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
        

        const categories = await prismadb.category.findMany({
            where:{
                storeId:params.storeId
            }
        })
        return NextResponse.json(categories)
    }
    catch(e){
        console.error('[CATEGORY_GET]',e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}