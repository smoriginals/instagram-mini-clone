import React from "react";
import Feedcard from "./Feedcard.jsx";
export default function Feeds() {
    return (
        <>
            <div className='h-full w-full bg-pink-300 relative top-14 pb-14'>
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