import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyPosts() {

    const navigate = useNavigate();

    const sampleImage = 'https://i.pravatar.cc/150?img=5';

    return (
        <>
            <div className='px-2 mt-4'>
                <ChevronLeft size={30} onClick={() => { navigate('/settings') }} />
            </div>

            <div className="flex h-full w-full flex-col gap-2 px-2 pb-2 pt-6">

                <h1 className="px-2 text-2xl font-bold">MyPosts</h1>

                {/* Theme */}
                <div className="mt-3 space-y-3 rounded-lg border border-gray-600 p-4">
                    <img src={sampleImage} className='h-24 w-24 rounded-md' />
                   
                </div>
            </div>

            <div className="flex h-full w-full flex-col gap-2 px-2 pb-2 pt-6">

                <h1 className="px-2 text-2xl font-bold">Following</h1>

                {/* Theme */}
                <div className="mt-3 space-y-3 rounded-lg border border-gray-600 p-4">
                    <img src={sampleImage} className='h-24 w-24 rounded-md' />

                </div>
            </div>

            <div className="flex h-full w-full flex-col gap-2 px-2 pb-2 pt-6">

                <h1 className="px-2 text-2xl font-bold">Followers</h1>

                {/* Theme */}
                <div className="mt-3 space-y-3 rounded-lg border border-gray-600 p-4">
                    <img src={sampleImage} className='h-24 w-24 rounded-md' />

                </div>
            </div>

        </>
    )
}