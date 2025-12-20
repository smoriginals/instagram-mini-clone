import React from "react";
import { ChevronLeft, User, Heart, MessageCircle, Send, Bookmark, SendHorizontal } from 'lucide-react';
import { useGlobal } from "../Context/GlobalContext";
import { useNavigate } from 'react-router-dom';
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast'

export default function Dashboard() {


    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const sampleImage = 'https://i.pravatar.cc/150?img=65';

    const { DeleteUser, user } = useGlobal();

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
        <>
            <div className='px-2 mt-4'>
                <ChevronLeft size={30} onClick={() => { navigate('/settings') }} />
            </div>

            <div className='flex h-full w-full flex-col px-2'>

                <h1 className="px-2 text-4xl font-bold">Dashboard</h1>


                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    <h1 className="text-xl font-bold px-2">User Profile</h1>
                    {/*UserProfile*/}
                    <div className="flex justify-between items-center">
                        <div className='flex justify-start gap-2 flex-row'><User /><p>{user?.name}</p></div>
                        <div>
                            <img
                                src={user?.userProfile || sampleImage}
                                alt="Profile"
                                className='h-18 w-18 rounded-full object-cover border border-gray-600'
                            />
                        </div>
                    </div>
                    {/*UserProfile*/}
                </div>
                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    <h1 className="text-xl font-bold px-2">Analytics</h1>
                    {/*Analytics*/}
                    <div className="flex justify-center items-center gap-2 my-2">

                        <div className='flex flex-col justify-center items-center p-2 rounded-md gap-1 border border-gray-600'>
                            <Heart />
                            <p className='text-sm text-center'>20k Likes</p>
                        </div>
                        <div className='flex flex-col justify-center items-center p-2 rounded-md gap-1 border border-gray-600'>
                            <MessageCircle />
                            <p className='text-sm text-center'>20k Comments</p>
                        </div>
                        <div className='flex flex-col justify-center items-center p-2 rounded-md gap-1 border border-gray-600'>
                            <Send />
                            <p className='text-sm text-center'>20k Shares</p>
                        </div>
                        <div className='flex flex-col justify-center items-center p-2 rounded-md gap-1 border border-gray-600'>
                            <Bookmark />
                            <p className='text-sm text-center'>20k Save</p>
                        </div>
                    </div>
                    {/*Analytics*/}
                </div>

                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    <h1 className="text-xl font-bold px-2">Support</h1>
                    {/*Help & Contact*/}
                    <div className="">
                        <p className="px-2">Contact & Support</p>
                        <div className='flex flex-col items-center p-1 gap-2'>
                            <Input type="email" placeholder="Email" />
                            <Textarea placeholder="Type your message here." />
                            <Button className='w-full text-md'>Send</Button>
                        </div>
                        <p className="text-xs text-center">Send use eamil, and we will respond to your request.</p>
                    </div>
                    {/*Help & Contact*/}
                </div>

                {/*Admin*/}
                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    {/*Help & Contact*/}
                    <h1 className="text-xl font-bold px-2">Admin Login</h1>

                    <Button className="w-full text-md my-1" onClick={() => { navigate('/admin') }}>
                        Login as Admin
                    </Button>
                    {/*Help & Contact*/}
                </div>
                {/*Admin*/}



                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    <h1 className="text-xl font-bold px-2">Account Deactivation</h1>
                    {/*Delete Account*/}
                    <div className="flex justify-center items-center gap-2 my-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="text-md h-11 w-full rounded-md border border-gray-600 py-2 font-semibold shadow">Delete Account
                                </Button>

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
                    {/*Delete Account*/}
                </div>
                <footer>
                    <p className='text-sm text-center p-2'>&copy; 2025 SM ORIGINALS. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
