import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const {
            name,
            description,
            composition,
            price,
            categoryId,
            colorId,
            sizeIds,
            images,
            isFeatured,
            isArchived,
            isNew,
            onSale,
            salePrice
         } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }

        if (!composition) {
            return new NextResponse("Composition is required", { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 });
        }

        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 });
        }

        if (!sizeIds) {
            return new NextResponse("Size ID is required", { status: 400 });
        }

        if (!salePrice) {
            return new NextResponse("Sale Price is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        console.log(body);

        const product = await prismadb.product.create({
            data: {
                name,
                description,
                composition,
                price,
                categoryId,
                colorId,
                sizeIds,
                isFeatured,
                isArchived,
                isNew,
                onSale,
                salePrice,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        // const sizeIds = searchParams.get("sizeIds") || undefined;
        const isFeatured = searchParams.get("isFeatured");


        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                // sizeIds,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
                isNew: false,
                // onSale: true
            },
            include: {
                images: true,
                category: true,
                color: true,
                sizes: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(products);

    } catch (error) {
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}