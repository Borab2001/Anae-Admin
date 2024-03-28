'use client';

import { ClipLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="
            h-screen
            flex
            flex-col
            justify-center
            items-center
        ">
            <ClipLoader size={100} color="bg-black" />
        </div>
    )
};

export default Loader;