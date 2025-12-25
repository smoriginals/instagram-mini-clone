import React from "react";
import Feedcard from "./Feedcard.jsx";
import { usePosts } from "../../Context/PostContext.jsx";
import { Loader2 } from 'lucide-react'
export default function Feeds() {

    const { posts, loading } = usePosts();
    
    return (
        <>
            <div className='mb-15 flex h-full w-full flex-col flex-nowrap gap-2 p-1 pt-2 transition-all duration-300 ease-in-out [scroll-behavior:smooth]'>
                
                {
                    loading ? <Loader2 className='relative top-0 mx-auto animate-spin' /> : posts.map((post) => (
                        <Feedcard key={post._id} post={post } />
                    ))
                }
            </div>
        </>
    )
}