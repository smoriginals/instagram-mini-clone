import React from 'react';
import { Plus } from 'lucide-react';

export default function Storybar() {
    return (
        <>
            <nav className="h-24 w-full bg-gray-400 flex justify-between items-center">
                <div className='h-24 w-20 flex justify-start flex-col items-center bg-red-200 p-1 gap-1'>
                    <div className='h-16 w-16 bg-white rounded-full border-3 border-pink-500'>
                        <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="User Avatar" className="h-14.8 w-14.8 rounded-full" />

                        <button className="relative bottom-6.5 left-10 translate-x-1 translate-y-1 bg-blue-500 h-6 w-6 rounded-full border">
                            <Plus strokeWidth={3} color='white'/>
                        </button>
                    </div>
                    <p className='text-sm'>Your Story</p>
                </div>
                <div className='h-24 w-9/12 bg-red-300'>
                    {/* Other user Stories will go here */}
                </div>
            </nav>
        </>
    )
}