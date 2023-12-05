import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils"; // Ensure this is the correct path

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({
    params,
    userLocale = 'fr-FR', // Default locale
    userCurrency = 'EUR' // Default currency
}: {
    params: { storeId: string },
    userLocale?: string,
    userCurrency?: string
}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Create an instance of the formatter with the user's locale and currency
    const priceFormatter = formatter(userLocale, userCurrency);

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: priceFormatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.category.name,
        color: item.color.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    );
}

export default ProductsPage;
