(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[442],{8073:function(e,t,r){Promise.resolve().then(r.bind(r,1043))},6303:function(e,t,r){"use strict";r.d(t,{V:function(){return i}});var n=r(7437),a=r(2265),s=r(5998),o=r(2869);let i=e=>{let{isOpen:t,onClose:r,onConfirm:i,loading:l}=e,[c,d]=(0,a.useState)(!1);return((0,a.useEffect)(()=>(d(!0),()=>{d(!1)})),c)?(0,n.jsx)(s.u,{title:"Are you sure?",description:"This action cannot be undone",isOpen:t,onClose:r,children:(0,n.jsxs)("div",{className:"pt-6 space-x-2 flex items-center justify-end w-full",children:[(0,n.jsx)(o.z,{disabled:l,onClick:r,variant:"secondary",children:"Cancel"}),(0,n.jsx)(o.z,{disabled:l,onClick:i,variant:"destructive",children:"Delete"})]})}):null}},1043:function(e,t,r){"use strict";var n=r(7437),a=r(3464),s=r(7571),o=r(2869),i=r(7413),l=r(6512),c=r(1229),d=r(9501),u=r(3590),f=r(2265),m=r(8642),x=r(5186),p=r(9064),h=r(9376),g=r(6303),v=r(8360);let j=c.Ry({name:c.Z_().min(1),value:c.Z_().min(4).regex(/^#/,{message:"String must be a valid hex color"})});t.default=e=>{let{initialData:t}=e,[r,c]=(0,f.useState)(!1),[y,N]=(0,f.useState)(!1),b=(0,h.useParams)(),w=(0,h.useRouter)();(0,v.N)(),console.log(b);let k=t?"Edit ":"New color",C=t?"Edit a color":"Add a new color",I=t?"Save Changes":"Create",z=(0,d.cI)({resolver:(0,u.F)(j),defaultValues:t||{name:"",value:""}}),Z=async e=>{try{N(!0),t?await a.Z.patch("/api/".concat(b.storeId,"/colors/").concat(b.colorId),e):await a.Z.post("/api/".concat(b.storeId,"/colors"),e),w.refresh(),p.ZP.success("color update")}catch(e){p.ZP.error("Something went wrong")}finally{N(!1)}},R=async()=>{try{N(!0),await a.Z.delete("/api/".concat(b.storeId,"/colors/").concat(b.colorId)),w.refresh(),w.push("/".concat(b.storeId,"/colors")),p.ZP.success("color deleted")}catch(e){p.ZP.error("Make sure you removed all products using this color first")}finally{N(!1),c(!1)}};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g.V,{isOpen:r,onClose:()=>c(!1),onConfirm:R,loading:y}),(0,n.jsxs)("div",{className:"flex items-center justify-between",children:[(0,n.jsx)(s.Z,{title:k,description:C}),t&&(0,n.jsx)(o.z,{disabled:y,variant:"destructive",color:"sm",onClick:()=>c(!0),children:(0,n.jsx)(i.Z,{className:"h-4 w-4"})})]}),(0,n.jsx)(l.Z,{}),(0,n.jsx)(m.l0,{...z,children:(0,n.jsxs)("form",{onSubmit:z.handleSubmit(Z),className:"space-y-8 w-full",children:[(0,n.jsxs)("div",{className:"grid grid-cols-3 gap-8",children:[(0,n.jsx)(m.Wi,{control:z.control,name:"name",render:e=>{let{field:t}=e;return(0,n.jsxs)(m.xJ,{children:[(0,n.jsx)(m.lX,{children:"Name"}),(0,n.jsx)(m.NI,{children:(0,n.jsx)(x.I,{disabled:y,placeholder:"color Name",...t})}),(0,n.jsx)(m.zG,{})]})}}),(0,n.jsx)(m.Wi,{control:z.control,name:"value",render:e=>{let{field:t}=e;return(0,n.jsxs)(m.xJ,{children:[(0,n.jsx)(m.lX,{children:"Value"}),(0,n.jsx)(m.NI,{children:(0,n.jsxs)("div",{className:"flex items-center gap-x-4",children:[(0,n.jsx)(x.I,{disabled:y,placeholder:"color Value",...t}),(0,n.jsx)("div",{className:"border p-4 rounded-full",style:{backgroundColor:t.value}})]})}),(0,n.jsx)(m.zG,{})]})}})]}),(0,n.jsx)(o.z,{disabled:y,className:"ml-auto",children:I})]})}),(0,n.jsx)(l.Z,{})]})}},7571:function(e,t,r){"use strict";var n=r(7437);t.Z=e=>{let{title:t,description:r}=e;return(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{className:"text-3xl font-bold tracting-tight",children:t}),(0,n.jsx)("p",{className:"text-sm text-muted-foreground ",children:r})]})}},5998:function(e,t,r){"use strict";r.d(t,{u:function(){return s}});var n=r(7437),a=r(6110);let s=e=>{let{title:t,description:r,isOpen:s,onClose:o,children:i}=e;return(0,n.jsx)(a.Vq,{open:s,onOpenChange:e=>{e||o()},children:(0,n.jsxs)(a.cZ,{children:[(0,n.jsxs)(a.fK,{children:[(0,n.jsx)(a.$N,{children:t}),(0,n.jsx)(a.Be,{children:r})]}),(0,n.jsx)("div",{children:i})]})})}},2869:function(e,t,r){"use strict";r.d(t,{z:function(){return c}});var n=r(7437),a=r(2265),s=r(7053),o=r(7712),i=r(4508);let l=(0,o.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),c=a.forwardRef((e,t)=>{let{className:r,variant:a,size:o,asChild:c=!1,...d}=e,u=c?s.g7:"button";return(0,n.jsx)(u,{className:(0,i.cn)(l({variant:a,size:o,className:r})),ref:t,...d})});c.displayName="Button"},6110:function(e,t,r){"use strict";r.d(t,{$N:function(){return m},Be:function(){return x},Vq:function(){return l},cZ:function(){return u},fK:function(){return f}});var n=r(7437),a=r(2265),s=r(9027),o=r(653),i=r(4508);let l=s.fC;s.xz;let c=s.h_;s.x8;let d=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.aV,{ref:t,className:(0,i.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",r),...a})});d.displayName=s.aV.displayName;let u=a.forwardRef((e,t)=>{let{className:r,children:a,...l}=e;return(0,n.jsxs)(c,{children:[(0,n.jsx)(d,{}),(0,n.jsxs)(s.VY,{ref:t,className:(0,i.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",r),...l,children:[a,(0,n.jsxs)(s.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,n.jsx)(o.Pxu,{className:"h-4 w-4"}),(0,n.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});u.displayName=s.VY.displayName;let f=e=>{let{className:t,...r}=e;return(0,n.jsx)("div",{className:(0,i.cn)("flex flex-col space-y-1.5 text-center sm:text-left",t),...r})};f.displayName="DialogHeader";let m=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.Dx,{ref:t,className:(0,i.cn)("text-lg font-semibold leading-none tracking-tight",r),...a})});m.displayName=s.Dx.displayName;let x=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.dk,{ref:t,className:(0,i.cn)("text-sm text-muted-foreground",r),...a})});x.displayName=s.dk.displayName},8642:function(e,t,r){"use strict";r.d(t,{l0:function(){return u},NI:function(){return v},pf:function(){return j},Wi:function(){return m},xJ:function(){return h},lX:function(){return g},zG:function(){return y}});var n=r(7437),a=r(2265),s=r(7053),o=r(9501),i=r(4508),l=r(6394);let c=(0,r(7712).j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),d=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(l.f,{ref:t,className:(0,i.cn)(c(),r),...a})});d.displayName=l.f.displayName;let u=o.RV,f=a.createContext({}),m=e=>{let{...t}=e;return(0,n.jsx)(f.Provider,{value:{name:t.name},children:(0,n.jsx)(o.Qr,{...t})})},x=()=>{let e=a.useContext(f),t=a.useContext(p),{getFieldState:r,formState:n}=(0,o.Gc)(),s=r(e.name,n);if(!e)throw Error("useFormField should be used within <FormField>");let{id:i}=t;return{id:i,name:e.name,formItemId:"".concat(i,"-form-item"),formDescriptionId:"".concat(i,"-form-item-description"),formMessageId:"".concat(i,"-form-item-message"),...s}},p=a.createContext({}),h=a.forwardRef((e,t)=>{let{className:r,...s}=e,o=a.useId();return(0,n.jsx)(p.Provider,{value:{id:o},children:(0,n.jsx)("div",{ref:t,className:(0,i.cn)("space-y-2",r),...s})})});h.displayName="FormItem";let g=a.forwardRef((e,t)=>{let{className:r,...a}=e,{error:s,formItemId:o}=x();return(0,n.jsx)(d,{ref:t,className:(0,i.cn)(s&&"text-destructive",r),htmlFor:o,...a})});g.displayName="FormLabel";let v=a.forwardRef((e,t)=>{let{...r}=e,{error:a,formItemId:o,formDescriptionId:i,formMessageId:l}=x();return(0,n.jsx)(s.g7,{ref:t,id:o,"aria-describedby":a?"".concat(i," ").concat(l):"".concat(i),"aria-invalid":!!a,...r})});v.displayName="FormControl";let j=a.forwardRef((e,t)=>{let{className:r,...a}=e,{formDescriptionId:s}=x();return(0,n.jsx)("p",{ref:t,id:s,className:(0,i.cn)("text-[0.8rem] text-muted-foreground",r),...a})});j.displayName="FormDescription";let y=a.forwardRef((e,t)=>{let{className:r,children:a,...s}=e,{error:o,formMessageId:l}=x(),c=o?String(null==o?void 0:o.message):a;return c?(0,n.jsx)("p",{ref:t,id:l,className:(0,i.cn)("text-[0.8rem] font-medium text-destructive",r),...s,children:c}):null});y.displayName="FormMessage"},5186:function(e,t,r){"use strict";r.d(t,{I:function(){return o}});var n=r(7437),a=r(2265),s=r(4508);let o=a.forwardRef((e,t)=>{let{className:r,type:a,...o}=e;return(0,n.jsx)("input",{type:a,className:(0,s.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...o})});o.displayName="Input"},6512:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(7437),a=r(2265),s=r(5156),o=r(4508);let i=a.forwardRef((e,t)=>{let{className:r,orientation:a="horizontal",decorative:i=!0,...l}=e;return(0,n.jsx)(s.f,{ref:t,decorative:i,orientation:a,className:(0,o.cn)("shrink-0 bg-border","horizontal"===a?"h-[1px] w-full":"h-full w-[1px]",r),...l})});i.displayName=s.f.displayName},8360:function(e,t,r){"use strict";r.d(t,{N:function(){return a}});var n=r(2265);let a=()=>{let[e,t]=(0,n.useState)(!1),r=window.location.origin?window.location.origin:"";return((0,n.useEffect)(()=>{t(!0)},[]),e)?r:" "}},4508:function(e,t,r){"use strict";r.d(t,{cn:function(){return s}});var n=r(1994),a=r(3335);function s(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.m6)((0,n.W)(t))}new Intl.NumberFormat("en-in",{style:"currency",currency:"INR"})},9205:function(e,t,r){"use strict";r.d(t,{Z:function(){return l}});var n=r(2265);let a=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),s=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:a=24,strokeWidth:i=2,absoluteStrokeWidth:l,className:c="",children:d,iconNode:u,...f}=e;return(0,n.createElement)("svg",{ref:t,...o,width:a,height:a,stroke:r,strokeWidth:l?24*Number(i)/Number(a):i,className:s("lucide",c),...f},[...u.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(d)?d:[d]])}),l=(e,t)=>{let r=(0,n.forwardRef)((r,o)=>{let{className:l,...c}=r;return(0,n.createElement)(i,{ref:o,iconNode:t,className:s("lucide-".concat(a(e)),l),...c})});return r.displayName="".concat(e),r}},7413:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});let n=(0,r(9205).Z)("Trash",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]])},5156:function(e,t,r){"use strict";r.d(t,{f:function(){return c}});var n=r(2265),a=r(6840),s=r(7437),o="horizontal",i=["horizontal","vertical"],l=n.forwardRef((e,t)=>{let{decorative:r,orientation:n=o,...l}=e,c=i.includes(n)?n:o;return(0,s.jsx)(a.WV.div,{"data-orientation":c,...r?{role:"none"}:{"aria-orientation":"vertical"===c?c:void 0,role:"separator"},...l,ref:t})});l.displayName="Separator";var c=l}},function(e){e.O(0,[310,676,707,668,971,117,744],function(){return e(e.s=8073)}),_N_E=e.O()}]);