import React, {useState} from "react";
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
import userIcon from '../assets/user.png';
import { usePosts } from "../Context/PostContext";

export default function Dashboard() {


    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const sampleImage = userIcon;

    const { DeleteUser, user } = useGlobal();
    const { posts } = usePosts();

    const [deleting, setDeleting] = useState(false);
    const DeleteUserProfile = async () => {
        if (!user?._id) return;
        setDeleting(true)
        try {

            const res = await DeleteUser(user._id);
            if (res?.ok) {
                navigate("/");
                setDeleting(false)
            }
        } finally {
            setDeleting(false);
        }
    };


    const myPosts = posts.filter(
        (post) => post.userId?._id === user?._id
    );

    const likeCount = myPosts.reduce((total, post) => total + post.likes.length, 0)

    const commentCount = myPosts.reduce((total, post) => total + post.comments.length, 0)
    

    return (
        <>
            <div className='mt-4 px-2'>
                <ChevronLeft size={30} disabled={deleting} onClick={() => { navigate('/settings') }} />
            </div>

            <div className='flex h-full w-full flex-col px-2'>

                <h1 className="px-2 text-4xl font-bold">Dashboard</h1>


                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    <h1 className="px-2 text-xl font-bold">User Profile</h1>
                    {/*UserProfile*/}
                    <div className="flex items-center justify-between">
                        <div className='flex flex-row justify-start gap-2'><User /><p>{user?.name}</p></div>
                        <div>
                            <img
                                src={user?.userProfile || sampleImage}
                                alt="Profile"
                                className='h-18 w-18 rounded-full border border-gray-600 object-cover'
                            />
                        </div>
                    </div>
                    {/*UserProfile*/}
                </div>
                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    <h1 className="px-2 text-xl font-bold">Analytics</h1>
                    {/*Analytics*/}
                    <div className="my-2 flex items-center justify-center gap-2">

                        <div className='w-full md:h-30 flex flex-col items-center justify-center gap-1 md:gap-6 rounded-md border border-gray-600 p-2'>
                            <Heart />
                            <p className='text-center text-md font-semibold'>{likeCount} Likes</p>
                        </div>

                        <div className='w-full md:h-30 flex flex-col items-center justify-center gap-1 md:gap-6 rounded-md border border-gray-600 p-2'>
                            <MessageCircle />
                            <p className='text-center text-md font-semibold'>{commentCount} Comments</p>
                        </div>
                        {/*<div className='flex flex-col items-center justify-center gap-1 rounded-md border border-gray-600 p-2'>*/}
                        {/*    <Send />*/}
                        {/*    <p className='text-center text-sm'>20k Shares</p>*/}
                        {/*</div>*/}
                        {/*<div className='flex flex-col items-center justify-center gap-1 rounded-md border border-gray-600 p-2'>*/}
                        {/*    <Bookmark />*/}
                        {/*    <p className='text-center text-sm'>20k Save</p>*/}
                        {/*</div>*/}
                    </div>
                    {/*Analytics*/}
                </div>

                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    <h1 className="px-2 text-xl font-bold">Support</h1>
                    {/*Help & Contact*/}
                    <div className="">
                        <p className="px-2">Contact & Support</p>
                        <div className='flex flex-col items-center gap-2 p-1'>
                            <Input type="email" placeholder="Email" />
                            <Textarea placeholder="Type your message here." />
                            <Button disabled={deleting} className='text-md w-full'>Send</Button>
                        </div>
                        <p className="text-center text-xs">Send use eamil, and we will respond to your request.</p>
                    </div>
                    {/*Help & Contact*/}
                </div>

                {/*Admin*/}
                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    {/*Help & Contact*/}
                    <h1 className="px-2 text-xl font-bold">Admin Login</h1>

                    <Button disabled={deleting} className="text-md my-1 w-full" onClick={() => { navigate('/admin') }}>
                        Login as Admin
                    </Button>
                    {/*Help & Contact*/}
                </div>
                {/*Admin*/}



                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">
                    <h1 className="px-2 text-xl font-bold">Account Deactivation</h1>
                    {/*Delete Account*/}
                    <div className="my-2 flex items-center justify-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button disabled={deleting} className="text-md h-11 w-full rounded-md border border-gray-600 py-2 font-semibold shadow">Delete Account
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
                                    <AlertDialogAction className='text-md bg-red-500 font-semibold' onClick={DeleteUserProfile} disabled={deleting}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                       
                    </div>
                    {/*Delete Account*/}
                </div>
                <footer>
                    <p className='p-2 text-center text-sm'>&copy; 2025 SM ORIGINALS. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
