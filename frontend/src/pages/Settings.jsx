import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ChevronRight, UserRoundPen, Database, LockKeyhole, Images } from 'lucide-react'
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
export default function Settings() {

    const navigate = useNavigate();

    return (

        <>
            <div className='mt-4 px-2'>
                <ChevronLeft size={30} onClick={() => { navigate('/home') }} />
            </div>

            <div className="flex h-full w-full flex-col gap-2 px-2 pt-6 pb-2">

                <h1 className="px-2 text-4xl font-bold">Settings</h1>

                {/* Theme */}
                <div className="bordermode mt-3 space-y-3 rounded-md border p-2">

                    {/*Edit Profile*/}
                    <button className="bordermode flex w-full cursor-pointer items-center justify-between rounded-md border p-2" onClick={() => { navigate('/myposts') }}>
                        <div className='flex items-center justify-start'><Images /><p className='text-md px-2 font-bold'>Manage Posts</p></div>
                        <div><ChevronRight /></div>
                    </button>
                    {/*Edit Profile*/}


                    {/*Edit Profile*/}
                    <button className="bordermode flex w-full cursor-pointer items-center justify-between rounded-md border p-2" onClick={() => { navigate('/editprofile') }}>
                        <div className='flex items-center justify-start'><UserRoundPen /><p className='text-md px-2 font-bold'>Edit Profile</p></div>
                        <div><ChevronRight /></div>
                    </button>
                    {/*Edit Profile*/}

                    {/*Privacy Section*/}
                    <button className="bordermode flex w-full cursor-pointer items-center justify-between rounded-md border p-2" onClick={() => { navigate('/privacy') }}>
                        <div className='flex items-center justify-start'><LockKeyhole /><p className='text-md px-2 font-bold'>Privacy</p></div>
                        <div><ChevronRight /></div>
                    </button>
                    {/*Privacy Section*/}

                    {/*Dashboard*/}
                    <button className="bordermode flex w-full cursor-pointer items-center justify-between rounded-md border p-2" onClick={() => { navigate('/dashboard') }}>
                        <div className='flex items-center justify-start'><LayoutDashboard /><p className='text-md px-2 font-bold'>Dashboard</p></div>
                        <div><ChevronRight /></div>
                    </button>
                    {/*Dashboard*/}

                    {/*Downloading user Data*/}
                    <button className="bordermode flex w-full cursor-pointer items-center justify-between rounded-md border p-2" onClick={() => { navigate('/download') }}>
                        <div className='flex items-center justify-start'><Database /><p className='text-md px-2 font-bold'>Download UserData</p></div>
                        <div><ChevronRight /></div>
                    </button>
                    {/*Downloading user Data*/}

                    <div className="bordermode space-y-2 rounded-md border p-3">
                        <h2 className="text-lg font-semibold">Admin Login</h2>

                        <Button className="bordermode w-full rounded-md border py-2 font-bold" onClick={() => { navigate('/admin') }}>
                            Login as Admin
                        </Button>
                    </div>
                </div>

            </div>
        </>
    );
}
