import React from "react";
import Feedcard from "./Feedcard.jsx";
import { usePosts } from "../../Context/PostContext.jsx";
import { Loader2 } from 'lucide-react'
export default function Feeds() {

    const { posts, loading } = usePosts();

    return (
        <>
            {
                /*
                 <div className='relative flex h-full w-full flex-col gap-4 p-1 pt-2 mb-16 transition-all duration-300 ease-in-out [scroll-behavior:smooth]'>
                     
                     {
                         loading ? <Loader2 className='relative top-0 mx-auto animate-spin' /> : posts.map((post) => (
                             <Feedcard key={post._id} post={post } />
                         ))
                     }
                     </div>
                      */
            }
            <div
                className="
                grid grid-cols-1
                gap-4 p-2 mb-16
                md:grid-cols-2
                xl:grid-cols-2
            "
            >
                {loading ? (
                    <div className='h-auto p-1 w-dvw flex justify-center items-center'>
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    posts.map((post) => (
                        <Feedcard key={post._id} post={post} />
                    ))
                )}
            </div>
        </>
    )
}