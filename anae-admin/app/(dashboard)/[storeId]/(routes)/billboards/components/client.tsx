"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title="Billboards (0)"
                    description="Manage billboards for your store"
                />
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
        </>
    )
}