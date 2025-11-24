import React from "react";
import { Heart,MessageCircleDashed } from "lucide-react";

export default function Navbar() {
    return (
        <nav className='fixed top-0 left-0 right-0 h-14 bg-white border-b flex justify-between items-center z-50'>
            <div className='flex h-14 w-full items-center justify-between bg-gray-200 px-2 border-b border-gray-300'>
                <div className='flex h-10 w-auto items-center justify-center bg-red-500 px-2'>
                    <p className='text-xl font-bold'>Instagram</p>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <div className='flex h-10 w-10 items-center justify-center bg-red-500'>
                        <Heart size={30} />
                    </div>
                    <div className='flex h-10 w-10 items-center justify-center bg-red-500'>
                        <MessageCircleDashed  size={30}/>
                    </div>
                </div>
            </div>
        </nav>
    );
}
