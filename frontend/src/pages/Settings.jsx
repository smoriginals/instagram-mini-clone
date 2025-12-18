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
import { LayoutDashboard, ChevronRight, UserRoundPen, Database, LogIn, Moon, LockKeyhole } from 'lucide-react'
import UserTheme from '../components/Theme/UserTheme';
export default function Settings() {

    const navigate = useNavigate();

    const { LogoutUser,DeleteUser,user } = useGlobal();

    //const ToggleTheme = () => {
    //    setMode(prev => (prev === "light" ? "dark" : "light"));
    //};

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
        <div className="flex h-full w-full flex-col gap-2 px-2 pb-2 pt-6">

            <h1 className="px-2 text-4xl font-bold">Settings</h1>

            {/* Theme */}
            <div className="mt-2 space-y-3 rounded-lg border border-gray-600 p-4">

                {/*Edit Profile*/}
                <button className="flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-600 p-2" onClick={() => { navigate('/dashboard') }}>
                    <div className='flex items-center justify-start'><UserRoundPen /><p className='text-md px-2 font-bold'>Edit Profile</p></div>
                    <div><ChevronRight /></div>
                </button>
                {/*Edit Profile*/}

                {/*Privacy Section*/}
                <button className="flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-600 p-2" onClick={() => { navigate('/dashboard') }}>
                    <div className='flex items-center justify-start'><LockKeyhole /><p className='text-md px-2 font-bold'>Privacy</p></div>
                    <div><ChevronRight /></div>
                </button>
                {/*Privacy Section*/}

                {/*Dashboard*/}
                <button className="flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-600 p-2" onClick={() => { navigate('/dashboard') }}>
                    <div className='flex items-center justify-start'><LayoutDashboard /><p className='text-md px-2 font-bold'>Dashboard</p></div>
                    <div><ChevronRight /></div>
                </button>
                {/*Dashboard*/}

                {/*Downloading user Data*/}
                <button className="flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-600 p-2" onClick={() => { navigate('/dashboard') }}>
                    <div className='flex items-center justify-start'><Database /><p className='text-md px-2 font-bold'>Download UserData</p></div>
                    <div><ChevronRight /></div>
                </button>
                {/*Downloading user Data*/}


                <button className="flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-600 p-2" onClick={() => { navigate('/dashboard') }}>

                    <div className='flex items-center justify-start'>
                        <LogIn /><p className='text-md px-2 font-bold'>Log Out</p>
                    </div>

                    <div>
                        <ChevronRight />
                    </div>

                </button>

                



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
