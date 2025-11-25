import React from 'react';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
export default function Settings() {

    const navigate = useNavigate();

    return (
        <div className="h-full w-full px-2 pt-6 flex flex-col gap-2">
            <h1 className="text-4xl font-bold px-2 ">Settings</h1>

            {/* Theme */}
            <div className="p-4 border rounded-lg space-y-3 mt-2">
                <h2 className="text-lg font-semibold">Theme</h2>

                <div className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                    </div>
                </div>

                <h2 className="text-lg font-semibold">Account & Security</h2>

                <div className="flex items-center justify-between">
                    <span>Two-Step Verification</span>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                    </div>
                </div>

                <button className="w-full py-2 border bg-white text-black rounded-md text-md font-semibold shadow" onClick={() => { navigate('/dashboard')} }>
                    Dashboard
                </button>


                <button className="w-full py-2 border rounded-md font-semibold shadow" onClick={() => { navigate('/login') }}>
                    Log Out
                </button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full py-2 h-11 border rounded-md text-md font-semibold shadow">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel className='text-md bg-gray-50 font-semibold'>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-red-500 text-md font-semibold' onClick={() => {navigate('/signup')} }>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                
            </div>

            

            <div className="p-3 border-2 border-gray-300 rounded-lg space-y-2">
                <h2 className="text-lg font-semibold text-gray-600">Admin Login</h2>

               

                <button className="w-full py-2 bg-green-600 text-white rounded-md font-bold" onClick={() => { navigate('/admin') }}>
                    Login as Admin
                </button>
            </div>
        </div>
    );
}
