"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./ui/api-alert";

interface ApiListProps {
    entityName:string;
    entityIdName:string;
}


const ApiList:React.FC<ApiListProps> = ({
    entityName,
    entityIdName
}) => {
    const params = useParams()
    const origin = useOrigin()

    const baseUrl = `${origin}/api/${params.storeId}`
    return ( 
        <div>
            <ApiAlert title="GET"
            variant="public"
            description={`${baseUrl}/${entityName}`}
            />
            <br />
            <ApiAlert title="GET"
            variant="public"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            /> 
            <br />
            <ApiAlert title="POST"
            variant="admin"
            description={`${baseUrl}/${entityName}`}
            />
            <br />
            <ApiAlert title="PATCH"
            variant="admin"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
            <br />
            <ApiAlert title="DELETE"
            variant="admin"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
            />
        </div>
     );
}
 
export default ApiList;