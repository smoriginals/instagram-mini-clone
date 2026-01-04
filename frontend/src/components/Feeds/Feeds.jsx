import React from "react";
import Feedcard from "./Feedcard.jsx";
import { usePosts } from "../../Context/PostContext.jsx";
import { Loader2 } from 'lucide-react'
export default function Feeds() {

    const { posts, loading } = usePosts();

    return (
        <>
           
            <div
                className="
                mb-16 grid
                grid-cols-1 gap-4 p-2
                md:grid-cols-2
                xl:grid-cols-2"
            >
                {loading ? (
                    <div className='flex h-auto w-dvw items-center justify-center p-1'>
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