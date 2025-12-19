import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Privacy() {

    const navigate = useNavigate();

    return (
        <>
            <div className='px-2 mt-4'>
                <ChevronLeft size={30} onClick={() => { navigate('/settings') }} />
            </div>

            <div className='flex h-full w-full flex-col px-2 pt-6'>

                <h1 className="px-2 text-4xl font-bold">Privacy</h1>
               

                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">

                    <h1 className="text-xl font-bold px-2">User Profile</h1>
                    <hr></hr>
                    {/*Privacy*/}
                    <div className="flex flex-col justify-start gap-4 p-2">
                        <div className='flex items-center justify-between space-x-2'>
                            <Label className='text-xl'>Private Profile</Label>
                            <Switch />
                        </div>
                        <div className='flex items-center justify-between space-x-2'>
                            <Label className='text-xl'>Step-To-Verification</Label>
                            <Switch />
                        </div>
                        <hr></hr>
                        <div className='flex items-center justify-between space-x-2'>
                            <Label className='text-xl'>Login Alerts</Label>
                            <Switch />
                        </div>
                        <div className='flex items-center justify-between space-x-2'>
                            <Label className='text-xl'>Active Sessions</Label>
                            <Switch />
                        </div>
                        <div className='flex items-center justify-between space-x-2'>
                            <Label className='text-xl'>Show online status</Label>
                            <Switch />
                        </div>
                    </div>
                    {/*Privacy*/}


                </div>

            </div>
        </>
    )
}