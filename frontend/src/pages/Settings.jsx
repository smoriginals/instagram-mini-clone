import React, { } from 'react';
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
import { useNavigate } from 'react-router-dom';
import MobileNo from '../components/Profile/MobileNo';
import { useGlobal } from '../Context/GlobalContext';
export default function Settings({ mode, setMode }) {

    const navigate = useNavigate();

    const { LogoutUser } = useGlobal();

    const ToggleTheme = () => {
        setMode(prev => (prev === "light" ? "dark" : "light"));
    };


    return (
        <div className="h-full w-full px-2 pt-6 flex flex-col gap-2 pb-2">
            <h1 className="text-4xl font-bold px-2 ">Settings</h1>

            {/* Theme */}
            <div className="p-4  rounded-lg space-y-3 mt-2 border border-gray-600">
                <h2 className="text-lg font-semibold">Theme</h2>

                <div className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <div className="flex items-center space-x-2">
                        <Switch checked={mode === "dark"} onClick={ToggleTheme} />
                    </div>
                </div>



                <h2 className="text-lg font-semibold">Account & Security</h2>

                {/*<div className="flex justify-between items-center">*/}
                {/*    <span>Two-Step Verification</span>*/}
                {/*    <div className="flex space-x-2">*/}
                {/*        <Switch />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className='flex justify-start flex-col'>*/}
                {/*    <MobileNo />*/}
                {/*</div>*/}

                <button className="w-full py-2 border border-gray-600 rounded-md text-md font-semibold shadow" onClick={() => { navigate('/dashboard') }}>
                    Dashboard
                </button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="w-full py-2 border border-gray-600 rounded-md font-semibold shadow" >
                            Log Out
                        </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure want to LogOut?</AlertDialogTitle>
                            <AlertDialogDescription className='text-md font-semibold'>
                                You've been logged out of your account. Next time, please enter your credentials to log in.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className='text-md bg-gray-50 font-semibold'>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='text-md font-semibold' onClick={() => { LogoutUser();navigate('/') } }>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>



                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button variant="outline" className="w-full py-2 h-11 border border-gray-600 rounded-md text-md font-semibold shadow">Delete Account
                        </button>

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
                            <AlertDialogAction className='bg-red-500 text-md font-semibold' onClick={() => { navigate('/signup') }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>



            <div className="p-3 border border-gray-600 rounded-lg space-y-2">
                <h2 className="text-lg font-semibold">Admin Login</h2>



                <button className="w-full py-2 border border-gray-600 rounded-md font-bold" onClick={() => { navigate('/admin') }}>
                    Login as Admin
                </button>
            </div>
        </div>
    );
}
