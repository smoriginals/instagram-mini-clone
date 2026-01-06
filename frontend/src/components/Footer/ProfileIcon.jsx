import React, { useState, useEffect } from "react";
import { User, Eraser, ArrowLeft, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useGlobal } from "../../Context/GlobalContext";
import { usePosts } from "../../Context/PostContext";
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
import userIcon from '../../assets/user.png';
export default function ProfileIcon() {

    const navigate = useNavigate();
    const { user, LogoutUser } = useGlobal();
    const { stories=[], viewStory, deleteStory, deletingId } = useStory();
    const { posts=[] } = usePosts();
    const [openDrawer, setOpenDrawer] = useState(false);

    

    const HandleDrawer = () => {
        setOpenDrawer((prev) => !prev); // closes drawer
    }
    const DeleteStory = async (storyId) => {
        deleteStory(storyId);
    }

    const safePosts = posts || [];
    const safeStories = stories || [];
    const safeFollowers = user.followers || [];
    const safeFollowing = user.following || [];


    const totalPosts = safePosts.filter((post) =>
        post.userId?._id === user?._id || post.userId === user?._id
    );
    const totalStories = safeStories.filter((story) =>
        story.userId?._id === user?._id || story.userId === user?._id
    );
    const postAndStory = totalPosts.length + totalStories.length;

    const hasStory = (userId) => {
        //return stories?.some(story => story.userId === userId);
        safeStories.some(
            story => story.userId?._id === userId || story.userId === userId
        );
    }

    const sampleImage = userIcon;

    useEffect(() => {

        if (user._id) {
            viewStory(user._id)
        }
    }, [user._id, viewStory]);
    if (!user) return null; // prevent crash BEFORE login



   
    return (
        <>

            <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
                <DrawerTrigger asChild>
                    <User size={28} className="h-8 w-8 transition-all duration-300 ease-in-out hover:scale-120" onClick={HandleDrawer} />
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
                        <div className="bordermode flex w-full max-w-md flex-col items-center rounded-md border p-6 shadow">
                            <div className={`relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full  ${hasStory(user._id) ? "border-3 border-pink-500" : "border-3 border-green-500" }`} onClick={() => { navigate('/editprofile') }}>
                                <img
                                    src={user?.userProfile || sampleImage}
                                    alt="Profile Avatar"
                                    className="h-28 w-28 rounded-full object-cover"
                                />
                            </div>


                            <h1 className="mt-4 text-xl font-semibold">{user?.name}</h1>
                            <p className="text-md">{user?.username}</p>


                            <div className="m-2 flex w-full items-center justify-evenly gap-0.5 rounded-md p-1">

                                <div className='hoverOnItems flex h-full w-full cursor-pointer flex-col items-center justify-center rounded p-2' onClick={() => { navigate('/myposts') }}>
                                    <p className="text-lg font-bold">{postAndStory}</p>
                                    <p className="text-sm">Posts</p>
                                </div>
                                
                                <div className=' hoverOnItems flex h-full w-full cursor-pointer flex-col items-center justify-center rounded p-2' onClick={() => { navigate('/myposts') }}>
                                    <p className="text-lg font-bold">{safeFollowers.length}</p>
                                    <p className="text-sm">Followers</p>
                                </div>

                                <div className='hoverOnItems flex h-full w-full cursor-pointer flex-col items-center justify-center rounded p-2' onClick={() => { navigate('/myposts') }}>
                                    <p className="text-lg font-bold">{safeFollowing.length}</p>
                                    <p className="text-sm">Following</p>
                                </div>
                            </div>

                        </div>


                        {/* Bio Section */}
                        <div className="bordermode mt-4 w-full max-w-md rounded-md border p-4 shadow">
                            <h2 className="text-lg font-semibold">About</h2>
                            <p className="mt-1 text-sm">
                                {user?.bio}
                            </p>
                        </div>

                        {/*Story Highlights*/}
                        <div className="bordermode mt-4 w-full max-w-md rounded-md border p-2.5 shadow">
                            <h2 className="text-md font-semibold">Story Highlights</h2>

                            {safeStories.length === 0 ? (
                                <p className="mt-2 text-sm text-gray-400">
                                    No stories uploaded yet
                                </p>
                            ) : (
                                <div className="mt-2 grid w-full grid-cols-3 gap-2">
                                    {safeStories.map((story) => (
                                        <div
                                            key={story._id}
                                            className="bordermode relative aspect-square overflow-hidden rounded-xl border"
                                        >
                                            <img
                                                src={story.image}
                                                alt="story"
                                                className="h-full w-full object-cover"
                                            />

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Eraser className="absolute top-1 right-1 cursor-pointer p-1 hover:text-red-500" disabled={deletingId === story._id} />
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

                                                        <AlertDialogAction className='transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white' disabled={deletingId === story._id} onClick={() => DeleteStory(story._id)}>{deletingId === story._id ? "Deleting..." : "Continue"}
                                                        </AlertDialogAction>

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
                        <div className="bordermode mt-4 w-full max-w-md rounded-md border p-4 shadow">
                            <h2 className="text-lg font-semibold">Theme</h2>
                            <UserTheme />
                        </div>
                        {/*Dark/Ligh Mode*/}

                        {/*LogOut Section*/}
                        <div className="bordermode mt-4 w-full max-w-md rounded-md border p-4 shadow">

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
