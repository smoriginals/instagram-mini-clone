import React, { useState, useEffect } from "react";
import { User, Trash, ArrowLeft, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useGlobal } from "../../Context/GlobalContext";

import UserTheme from "../Theme/UserTheme";
import { useStory } from "../../Context/StoryContext";

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
import axios from 'axios';
import toast from 'react-hot-toast';
export default function ProfileIcon() {

    const navigate = useNavigate();
    const { user, LogoutUser } = useGlobal();
    const { viewStory } = useStory();

    const [openDrawer, setOpenDrawer] = useState(false);
    const [stories, setStories] = useState([]);
    const [deletingId, setDeletingId] = useState(null);



    const HandleDrawer = () => {
        setOpenDrawer((prev) => !prev); // closes drawer
    }
    const DeleteStory = async(story) => {
        //try {
        //    const res = await axios.delete(`http://localhost:5000/api/user/story/${story._id}`, { data: {userId:user._id}})
        //    if (res.data.success) {
        //        toast.success("Story Deleted");
        //        setStories(prev=>prev.filter(s=>s._id!==story._id))
        //    }
        //} catch (error) {
        //    console.log(error.response?.data || error.message);
        //    toast.error("Failed to delete story");
        //}

        try {
            setDeletingId(story._id);

            const res = await axios.delete(
                `http://localhost:5000/api/user/story/${story._id}`,
                { data: { userId: user._id } }
            );

            if (res.data.success) {
                toast.success("Story Deleted");
                setStories(prev => prev.filter(s => s._id !== story._id));
            }
        } catch (error) {
            toast.error("Failed to delete story");
            console.log(error.response?.data || error.message);
        } finally {
            setDeletingId(null);
        }
            
    }
    const sampleImage = 'https://i.pravatar.cc/150?img=65';


    useEffect(() => {

        if (!user?._id) return;

        const fetchStories = async () => {
            const res = await viewStory(user._id);
            if (res?.story) {
                setStories(res.story);
            }
        };

        fetchStories();
    }, [user?._id, viewStory]);

    if (!user) return null; // prevent crash BEFORE login

    return (
        <>

            <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
                <DrawerTrigger asChild>
                    <User className="h-8 w-8 transition-all duration-300 ease-in-out hover:scale-120" onClick={HandleDrawer} />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="flex flex-row items-center justify-between">
                            <ArrowLeft className='cursor-pointer rounded-full transition-all duration-300 ease-in-out hover:scale-110 active:text-blue-500' onClick={HandleDrawer} />
                            <p className='text-lg font-bold'> Profile</p>
                            <Settings className='cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:text-blue-500' onClick={() => { navigate('/settings') }} />
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="flex h-full w-full flex-col items-center overflow-y-auto p-2">
                        {/* Profile Header */}
                        <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-gray-600 p-6 shadow">
                            <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-3 border-green-500" onClick={() => {navigate('/editprofile') } }>
                                <img
                                    src={user?.userProfile || sampleImage}
                                    alt="Profile Avatar"
                                    className="h-28 w-28 rounded-full object-cover"
                                />
                            </div>


                            <h1 className="mt-4 text-xl font-semibold">{user?.name}</h1>
                            <p className="text-md">{user?.username}</p>


                            <div className="mt-4 flex gap-6 text-center">
                                <div className='cursor-pointer rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-gray-800' onClick={() => {navigate('/myposts')} }>
                                    <p className="text-lg font-bold">120</p>
                                    <p className="text-sm">Posts</p>
                                </div>
                                <div className='cursor-pointer rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-gray-800' onClick={() => { navigate('/myposts') }}>
                                    <p className="text-lg font-bold">2.5k</p>
                                    <p className="text-sm">Followers</p>
                                </div>
                                <div className='cursor-pointer rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-gray-800' onClick={() => { navigate('/myposts') }}>
                                    <p className="text-lg font-bold">180</p>
                                    <p className="text-sm">Following</p>
                                </div>
                            </div>

                        </div>


                        {/* Bio Section */}
                        <div className="mt-4 w-full max-w-md rounded-2xl border border-gray-600 p-4 shadow">
                            <h2 className="text-lg font-semibold">About</h2>
                            <p className="mt-1 text-sm">
                                {user?.bio}
                            </p>
                        </div>

                        {/*Story Highlights*/}
                        <div className="mt-4 w-full max-w-md rounded-2xl border border-gray-600 p-4 shadow">
                            <h2 className="text-md font-semibold">Story Highlights</h2>

                            {stories.length === 0 ? (
                                <p className="mt-2 text-sm text-gray-400">
                                    No stories uploaded yet
                                </p>
                            ) : (
                                <div className="grid w-full grid-cols-3 gap-1 py-2">
                                    {stories.map((story) => (
                                        <div
                                            key={story._id}
                                            className="relative aspect-square overflow-hidden rounded-xl border border-gray-600"
                                        >
                                            <img
                                                src={story.image}
                                                alt="story"
                                                className="h-full w-full object-cover"
                                            />

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Trash className="absolute top-0 right-0 cursor-pointer p-1" fill='red' disabled={deletingId === story._id} />
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your
                                                            story and remove from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction className='transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white' disabled={deletingId === story._id} onClick={() => DeleteStory(story)}>{deletingId === story._id ? "Deleting..." : "Continue"}</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/*Story Highlights*/}


                        {/*Dark/Ligh Mode*/}
                        <div className="mt-4 w-full max-w-md rounded-2xl border border-gray-600 p-4 shadow">
                            <h2 className="text-lg font-semibold">Theme</h2>
                            <UserTheme />
                        </div>
                        {/*Dark/Ligh Mode*/}

                        {/*LogOut Section*/}
                        <div className="mt-4 w-full max-w-md rounded-2xl border border-gray-600 p-4 shadow">

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <h2 className="flex items-center justify-between text-lg font-bold text-red-400 transition-all duration-300 ease-in-out hover:text-red-500">Log Out<LogOut /></h2>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Log Out ?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Logging out will end your current session. You can sign back in anytime to continue.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className='transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white' onClick={() => { LogoutUser(); navigate('/login'); }}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                        {/*LogOut Section*/}

                    </div>

                </DrawerContent>
            </Drawer>
        </>
    )
}
