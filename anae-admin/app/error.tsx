'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ErrorProps {
    error: Error;
    title?: string;
    subtitle?: string;
}

const Error: React.FC<ErrorProps> = ({
    error,
    title = "Oops...",
    subtitle = "Something has gone wrong",
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const router = useRouter();


    return (
        <div className="h-screen flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2 mb-4">
                {subtitle}
            </div>
            <Button variant="default" size="default" onClick={() => router.push('/')}>
                Return Home
            </Button>
        </div>
    )
};

export default Error;
// h-[60vh] flex flex-col gap-2 justify-center items-center