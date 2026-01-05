import React, { useState } from "react";
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
import toast from 'react-hot-toast';
import { usePosts } from "../Context/PostContext";
import API from "../lib/instance";

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

    const [userReport, setUserReport] = useState({
        name: '',
        email: '',
        message: ''
    });

    const HandleChange = (e) => {
        setUserReport({ ...userReport, [e.target.name]: e.target.value });
    }

    const SubmitReport = async () => {

        if (!userReport.name || !userReport.email || !userReport.message) {
            toast.error('All Fields Required')
            return;
        }

        const reportPromise = API.post('/api/send/report', userReport);

        toast.promise(reportPromise, {
            loading: 'Sending...',
            success: 'Report sent successfully 📩',
            error:'Failed to Report',
        })

        try {
            const res = await reportPromise;

            if (res.data?.success) {
                setUserReport({ name: '', email: '', message: '' });
            }
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Server error");
        }
    }

    return (
        <>
            <div className='mt-4 px-2'>
                <ChevronLeft size={30} disabled={deleting} onClick={() => { navigate('/settings') }} />
            </div>

            <div className='flex h-full w-full flex-col px-2'>

                <h1 className="px-2 text-4xl font-bold">Dashboard</h1>

                <div className="bordermode mt-3 space-y-1 rounded-lg border p-2">
                    <h1 className="px-2 text-xl font-bold">User Profile</h1>
                    {/*UserProfile*/}
                    <div className="flex items-center justify-between">
                        <div className='flex flex-row justify-start gap-2'><User /><p>{user?.name}</p></div>
                        <div>
                            <img
                                src={user?.userProfile || sampleImage}
                                alt="Profile"
                                className='bordermode h-18 w-18 rounded-full border object-cover'
                            />
                        </div>
                    </div>
                    {/*UserProfile*/}
                </div>

                <div className="bordermode mt-3 space-y-1 rounded-lg border p-2">
                    <h1 className="px-2 text-xl font-bold">Analytics</h1>
                    {/*Analytics*/}
                    <div className="my-2 flex items-center justify-center gap-2">

                        <div className='bordermode flex w-full flex-col items-center justify-center gap-1 rounded-md border p-2 md:h-30 md:gap-6'>
                            <Heart />
                            <p className='text-md text-center font-semibold'>{likeCount} Likes</p>
                        </div>

                        <div className='bordermode flex w-full flex-col items-center justify-center gap-1 rounded-md border p-2 md:h-30 md:gap-6'>
                            <MessageCircle />
                            <p className='text-md text-center font-semibold'>{commentCount} Comments</p>
                        </div>

                    </div>
                    {/*Analytics*/}
                </div>

                <div className="bordermode mt-3 space-y-1 rounded-lg border p-2">
                    <h1 className="px-2 text-xl font-bold">Support</h1>
                    {/*Help & Contact*/}
                    <div className="">

                        <p className="px-2">Contact & Support</p>

                        <div className='flex flex-col items-center gap-2 p-1'>

                            <Input type="text" name='name' placeholder="Your Name" value={userReport.name} onChange={HandleChange} />

                            <Input type="email" name='email' placeholder="Your Email" value={userReport.email} onChange={HandleChange} />

                            <Textarea placeholder="Type your message here." type='text' value={userReport.message} onChange={HandleChange} name='message' />

                            <Button disabled={deleting} className='text-md w-full' onClick={SubmitReport}>Send</Button>

                        </div>
                        <p className="text-center text-xs">Send us eamil, and we will respond to your request.</p>
                    </div>
                    {/*Help & Contact*/}
                </div>

                {/*Admin*/}
                <div className="bordermode mt-3 space-y-1 rounded-lg border p-2">
                    {/*Help & Contact*/}
                    <h1 className="px-2 text-xl font-bold">Admin Login</h1>

                    <Button disabled={deleting} className="text-md my-1 w-full" onClick={() => { navigate('/admin') }}>
                        Login as Admin
                    </Button>
                    {/*Help & Contact*/}
                </div>
                {/*Admin*/}



                <div className="bordermode mt-3 space-y-1 rounded-lg border p-2">
                    <h1 className="px-2 text-xl font-bold">Account Deactivation</h1>
                    {/*Delete Account*/}
                    <div className="my-2 flex items-center justify-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button disabled={deleting} className="text-md bordermode h-11 w-full rounded-md border py-2 font-semibold shadow">Delete Account
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
