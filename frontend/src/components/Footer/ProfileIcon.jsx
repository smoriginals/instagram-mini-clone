import React, { } from "react";
import { User, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import Editprofile from "../Profile/Editprofile";
import { useGlobal } from "../../Context/GlobalContext";
import { usePosts } from "../../Context/PostContext";

export default function ProfileIcon() {
    const navigate = useNavigate();
    const { user } = useGlobal();
    const { posts ,deletePost} = usePosts();
    const sampleImage = 'https://i.pravatar.cc/150?img=65';
    if (!user) return null; // prevent crash BEFORE login

    const myPosts = posts.filter((post) => post.userId?._id === user?._id)


    const DeletePost = (postId)=> {
        deletePost(postId);
    }

    return (
        <>

            <Drawer>
                <DrawerTrigger asChild>
                    <User className="h-8 w-8 transition-all duration-300 ease-in-out hover:scale-120" />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-center text-xl font-extrabold">Profile</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex h-full w-full flex-col items-center overflow-y-auto p-6">
                        {/* Profile Header */}
                        <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-gray-600 p-6 shadow">
                            <div className="relative h-32 w-32 overflow-hidden rounded-full border-6 border-double border-green-600 flex justify-center items-center">
                                <img
                                    src={user?.userProfile || sampleImage}
                                    alt="Profile Avatar"
                                    className="h-28 w-28 object-cover rounded-full"
                                />
                            </div>


                            <h1 className="mt-4 text-xl font-semibold">{user?.name}</h1>
                            <p className="text-sm">{user?.username}</p>


                            <div className="mt-4 flex gap-6 text-center">
                                <div>
                                    <p className="text-lg font-bold">120</p>
                                    <p className="text-xs">Posts</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">2.5k</p>
                                    <p className="text-xs">Followers</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">180</p>
                                    <p className="text-xs">Following</p>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <Editprofile />
                            </div>

                        </div>


                        {/* Bio Section */}
                        <div className="mt-4 w-full max-w-md rounded-2xl border border-gray-600 p-4 shadow">
                            <h2 className="text-lg font-semibold">About</h2>
                            <p className="mt-1 text-sm">
                                {user?.bio}
                            </p>
                        </div>


                        {/* Posts Grid */}
                        <div className="mt-4 grid w-full max-w-md grid-cols-3 gap-2">
                            {/*{[...Array(posts.length)].map((_, i) => (*/}
                            {/*    <div key={i} className="aspect-square rounded-xl border border-gray-600 bg-gray-300"></div>*/}
                            {/*))}*/}
                            {
                                myPosts.map((post) => (
                                    <div
                                        key={post._id}
                                        className="relative aspect-square rounded-xl border border-gray-600 overflow-hidden"
                                    >
                                        <img
                                            src={post.image}
                                            alt="post"
                                            className="h-full w-full object-cover"
                                        />
                                        <Trash className='absolute top-0 right-0 p-1 opacity-70 cursor-pointer' key={post._Id} fill='red' stroke='' onClick={()=>DeletePost(post._id)} />
                                    </div>
                                ))
                            }
                        </div>

                        <div className="mt-4 w-full max-w-md cursor-pointer rounded-md border border-gray-600 p-4 text-center shadow" onClick={() => { navigate('/settings') }}>
                            <button className='text-md cursor-pointer font-bold'>Setting</button>
                        </div>

                    </div>

                </DrawerContent>
            </Drawer>
        </>
    )
}
