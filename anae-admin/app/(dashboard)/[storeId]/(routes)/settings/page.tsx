import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect("/");
    }
    return (
        <div>
            Settings
        </div>
    );
}
 
export default SettingsPage;