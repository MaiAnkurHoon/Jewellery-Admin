import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prismadb";

export async function POST(
    req:Request
){
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { name } = body;
        if(!name){
            return new NextResponse("Name is required", { status: 400 });
        }
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const store = await prismadb.store.create({
            data:{
                name,
                userId
            }
        })

        return NextResponse.json(store)
    }
    catch(e){
        console.error('[STORES_ROUTE_ERROR]',e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

