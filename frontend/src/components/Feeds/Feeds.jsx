import React from "react";
import Feedcard from "./Feedcard.jsx";
export default function Feeds() {
    return (
        <>
            <div className='h-full w-full bg-white relative top-14 left-0 pb-14 transition-all duration-300 ease-in-out  [scroll-behavior:smooth]'>
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