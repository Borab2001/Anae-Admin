"use client"

import { ColumnDef } from "@tanstack/react-table"
// import Image from "next/image"

import { CellAction } from "./cell-action"

export type ProductColumn = {
    id: string
    name: string
    description: string
    composition: string
    price: string
    category: string
    sizes: string[]
    color: string
    isNew: boolean
    onSale: boolean
    salePrice: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: string
    // images: string[]
}

export const columns: ColumnDef<ProductColumn>[] = [
    // {
    //     accessorKey: "images",
    //     header: "Image",
    //     cell: ({ row }) => (
    //         <div className="flex items-center justify-center">
    //             {row.original?.images.map((image, index) => (
    //                 <Image key={index} objectFit='contain' className="rounded-md border" width="42" height="42" alt="" src={image} />
    //             ))}
    //         </div>
    //     )
    // },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "composition",
        header: "Composition",
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "sizes",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div 
                    className="h-6 w-6 rounded-full border" 
                    style={{ backgroundColor: row.original.color }}
                />
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
