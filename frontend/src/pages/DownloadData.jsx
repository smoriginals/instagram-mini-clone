import React from 'react';
import { ChevronLeft, BadgeCheck, ArrowDownToLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../Context/GlobalContext';
import { Button } from "@/components/ui/button"
export default function DownloadData() {
    const navigate = useNavigate();
    const { user } = useGlobal();
    const sampleImage = 'https://i.pravatar.cc/150?img=5';

    return (
        <>
            <div className='px-2 mt-4'>
                <ChevronLeft size={30} onClick={() => { navigate('/settings') }} />
            </div>

            <div className="flex h-full w-full flex-col gap-2 px-2 pb-2 pt-6">

                <h1 className="px-2 text-4xl text-center font-bold">Download Center</h1>

                {/* Theme */}
                <div className="mt-3 space-y-3 rounded-lg border border-gray-600 p-4 flex justify-center items-center flex-col">
                    <img src={user?.userProfile || sampleImage} className=' h-28 w-28 border-2 border-blue-500 rounded-full' />

                    <div className='flex justify-center flex-col items-center'>
                        <h1 className='text-2xl flex justify-between items-center flex-row gap-1 px-2'>{user?.name}<BadgeCheck fill='blue' size={30} /></h1>
                        <h1 className='text-2xl'>{user?.username}</h1>
                    </div>
                </div>

                <div>
                    <Button variant="outline" className='w-full p-6 text-md'><ArrowDownToLine />Download Data<ArrowDownToLine /></Button>
                </div>
            </div>
        </>
    )
}