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
import toast from 'react-hot-toast';
export default function Settings({ mode, setMode }) {

    const navigate = useNavigate();

    const { LogoutUser,DeleteUser,user } = useGlobal();

    const ToggleTheme = () => {
        setMode(prev => (prev === "light" ? "dark" : "light"));
    };

    const DeleteUserProfile = async () => {
        if (!user?._id) {
            toast.error("User id Missing");
            return;
        }
        const res = await DeleteUser(user._id);
        if (!res) {
            toast.error(res.error);
            return;
        }
        toast.success("Account Deleted Successfully")
        console.log("Deleting user with ID:", user._id);

        navigate('/');

    }

    return (
        <div className="flex h-full w-full flex-col gap-2 px-2 pt-6 pb-2">
            <h1 className="px-2 text-4xl font-bold">Settings</h1>

            {/* Theme */}
            <div className="mt-2 space-y-3 rounded-lg border border-gray-600 p-4">
                <h2 className="text-lg font-semibold">Theme</h2>

                <div className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <div className="flex items-center space-x-2">
                        <Switch checked={mode === "dark"} onClick={ToggleTheme} />
                    </div>
                </div>



                <h2 className="text-lg font-semibold">Account & Security</h2>

                {/*<div className="flex items-center justify-between">*/}
                {/*    <span>Two-Step Verification</span>*/}
                {/*    <div className="flex space-x-2">*/}
                {/*        <Switch />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className='flex flex-col justify-start'>*/}
                {/*    <MobileNo />*/}
                {/*</div>*/}

                <button className="text-md w-full rounded-md border border-gray-600 py-2 font-semibold shadow" onClick={() => { navigate('/dashboard') }}>
                    Dashboard
                </button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="w-full rounded-md border border-gray-600 py-2 font-semibold shadow" >
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
                            <AlertDialogAction className='text-md font-semibold' onClick={() => { LogoutUser();navigate('/login') } }>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>



                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button variant="outline" className="text-md h-11 w-full rounded-md border border-gray-600 py-2 font-semibold shadow">Delete Account
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
                            <AlertDialogAction className='text-md bg-red-500 font-semibold' onClick={DeleteUserProfile}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>



            <div className="space-y-2 rounded-lg border border-gray-600 p-3">
                <h2 className="text-lg font-semibold">Admin Login</h2>



                <button className="w-full rounded-md border border-gray-600 py-2 font-bold" onClick={() => { navigate('/admin') }}>
                    Login as Admin
                </button>
            </div>
        </div>
    );
}
