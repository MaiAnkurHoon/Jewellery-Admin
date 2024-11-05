"use client"

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface AlertAlertProps {
    title:string;
    description:string;
    variant:"public" | "admin";
}


const textMap:Record<AlertAlertProps["variant"],string> = {
    public:"public",
    admin:"Admin"
}


const variantMap:Record<AlertAlertProps["variant"],BadgeProps["variant"]> = {
    public:"secondary",
    admin:"destructive"
}

export const ApiAlert:React.FC<AlertAlertProps> = ({
    title,
    description,
    variant = "public"
}) => {
    const onCopy = () =>{
        navigator.clipboard.writeText(description)
        toast.success("Copied to clipboard")
    }
    return(
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className="flex items-center justify-between gap-x-2">
                <code className="relative rounded bg-muted px-[0.3rem] py=[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button variant="outline" size="icon" onClick={onCopy} >
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}