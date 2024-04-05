import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import Product from "@prisma/client";

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({
    params,
}: {
    params: { storeId: string, productId: string },
}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            sizes: true,
            color: true,
            images: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedProducts: ProductColumn[] = products.map((item) => {
        const sizes = item.sizes?item.sizes.map((size) => size.value):["No size"];
        let image = item.images.length > 0 ? item.images[0].url:"";

        return {
            id: item.id,
            images: [image],
            name: item.name,
            description: item.description,
            composition: item.composition,
            isFeatured: item.isFeatured,
            isArchived: item.isArchived,
            isNew: item.isNew,
            onSale: item.onSale,
            salePrice: item.salePrice.toString(),
            price: item.price.toString(),
            category: item.category.name,
            sizes: sizes,
            color: item.color.value,
            createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    );
}

export default ProductsPage;
