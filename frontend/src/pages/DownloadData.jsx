import React from 'react';
import { ChevronLeft, BadgeCheck, ArrowDownToLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../Context/GlobalContext';
import { Button } from "@/components/ui/button"
import userIcon from '../assets/user.png';

export default function DownloadData() {
    const navigate = useNavigate();
    const { user } = useGlobal();

    const sampleImage = userIcon;

    return (
        <>
            <div className='mt-4 px-2'>
                <ChevronLeft size={30} onClick={() => { navigate('/settings') }} />
            </div>

            <div className="flex h-full w-full flex-col gap-2 px-2 pt-6 pb-2">

                <h1 className="px-2 text-center text-4xl font-bold">Download Center</h1>

                {/* Theme */}
                <div className="bordermode mt-3 flex flex-col items-center justify-center space-y-3 rounded-lg border p-4">
                    <img src={user?.userProfile || sampleImage} className='h-28 w-28 rounded-full border-2 border-blue-500 object-cover' />

                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='flex flex-row items-center justify-between gap-1 px-2 text-2xl'>{user?.name}</h1>
                        <h1 className='text-xl'>{user?.username}</h1>
                    </div>
                </div>

                <div>
                    <Button variant="outline" className='text-md w-full p-6'><ArrowDownToLine />Download Data<ArrowDownToLine /></Button>
                </div>
            </div>
        </>
    )
}