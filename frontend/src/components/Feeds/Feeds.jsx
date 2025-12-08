import React from "react";
import Feedcard from "./Feedcard.jsx";
export default function Feeds() {
    return (
        <>
            <div className='mb-15 flex h-full w-full flex-col flex-nowrap gap-2 p-1 pt-2 transition-all duration-300 ease-in-out [scroll-behavior:smooth]'>
                <Feedcard />
                <Feedcard />
                <Feedcard />
                <Feedcard />
                <Feedcard />
                <Feedcard />
                <Feedcard />
                <Feedcard />
                <Feedcard />
                <Feedcard />
                <Feedcard />
                <Feedcard />
            </div>
        </>
    )
}