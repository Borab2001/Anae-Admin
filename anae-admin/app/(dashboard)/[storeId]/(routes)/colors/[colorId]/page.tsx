import prismadb from "@/lib/prismadb";
import { ObjectId } from "mongodb";

import { ColorForm } from "./components/color-form";

const ColorPage = async ({
    params
}: {
    params: { colorId: string }
}) => {
    // const color = await prismadb.color.findUnique({
    //     where: {
    //         id: params.colorId
    //     }
    // });

    let color;

    if (!ObjectId.isValid(params.colorId)) {
        color = null;
        console.error('Invalid categoryId provided:', params.colorId);
    } else {
        color = await prismadb.category.findUnique({
            where: { 
                id: params.colorId 
            },
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm initialData={color} />
            </div>
        </div>
        
    );
}
 
export default ColorPage;