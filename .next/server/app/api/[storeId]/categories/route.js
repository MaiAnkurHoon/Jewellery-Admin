"use strict";(()=>{var e={};e.id=699,e.ids=[699],e.modules={53524:e=>{e.exports=require("@prisma/client")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},6005:e=>{e.exports=require("node:crypto")},21770:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>w,patchFetch:()=>I,requestAsyncStorage:()=>x,routeModule:()=>l,serverHooks:()=>g,staticGenerationAsyncStorage:()=>m});var s={};r.r(s),r.d(s,{GET:()=>c,POST:()=>d});var o=r(73278),n=r(45002),a=r(54877),i=r(92988),u=r(71309),p=r(71228);async function d(e,{params:t}){try{let{userId:r}=await (0,i.I)(),{name:s,billboardId:o}=await e.json();if(!r)return new u.NextResponse("Unauthenticated",{status:400});if(!s)return new u.NextResponse("Name is required",{status:401});if(!o)return new u.NextResponse("billboardId is required",{status:401});if(!t.storeId)return console.log(t.storeId),new u.NextResponse("Store Id is required manish",{status:401});if(!await p.N.store.findFirst({where:{id:t.storeId,userId:r}}))return new u.NextResponse("Unauthorized",{status:403});let n=await p.N.category.create({data:{name:s,billboardId:o,storeId:t.storeId}});return u.NextResponse.json(n)}catch(e){return console.error("[Categories_POST]",e),new u.NextResponse("Internal Server Error",{status:500})}}async function c(e,{params:t}){try{if(!t.storeId)return new u.NextResponse("Stored Id is required",{status:401});let e=await p.N.category.findMany({where:{storeId:t.storeId}});return u.NextResponse.json(e)}catch(e){return console.error("[CATEGORY_GET]",e),new u.NextResponse("Internal Server Error",{status:500})}}let l=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/[storeId]/categories/route",pathname:"/api/[storeId]/categories",filename:"route",bundlePath:"app/api/[storeId]/categories/route"},resolvedPagePath:"/Users/manishkumarsharma/Documents/projects/jewellery/admin/app/api/[storeId]/categories/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:x,staticGenerationAsyncStorage:m,serverHooks:g}=l,w="/api/[storeId]/categories/route";function I(){return(0,a.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:m})}},71228:(e,t,r)=>{r.d(t,{N:()=>o});var s=r(53524);let o=global.prisma||new s.PrismaClient},73278:(e,t,r)=>{e.exports=r(30517)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[379,988],()=>r(21770));module.exports=s})();