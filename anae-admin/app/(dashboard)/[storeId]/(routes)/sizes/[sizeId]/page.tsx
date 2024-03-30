import prismadb from "@/lib/prismadb";
import { ObjectId } from "mongodb";

import { SizeForm } from "./components/size-form";

const SizePage = async ({
    params
}: {
    params: { sizeId: string }
}) => {
    // const size = await prismadb.size.findUnique({
    //     where: {
    //         id: params.sizeId
    //     }
    // });

    let size;

    if (!ObjectId.isValid(params.sizeId)) {
        size = null;
        console.error('Invalid categoryId provided:', params.sizeId);
    } else {
        size = await prismadb.category.findUnique({
            where: { 
                id: params.sizeId 
            },
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size} />
            </div>
        </div>
        
    );
}
 
export default SizePage;