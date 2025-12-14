import React from "react";
import { Link,useNavigate } from "react-router-dom";
import Editprofile from "../components/Profile/Editprofile.jsx";
import { useGlobal } from "../Context/GlobalContext.jsx";
import { usePosts } from "../Context/PostContext.jsx";
export default function Profilepage() {

    const navigate = useNavigate();
    const { user } = useGlobal();
    const { posts } = usePosts();
    const sampleImage = 'https://i.pravatar.cc/150?img=65';


    const myPosts = posts.filter(
        (post) => post.userId?._id === user?._id
    );


    return (
        <>

            <div className="w-full min-h-screen flex flex-col items-center p-6 py-20">
                {/* Profile Header */}
                <div className="w-full max-w-md shadow-md rounded-2xl p-6 flex flex-col items-center border border-gray-600">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden shadow-md">
                        <img
                            src={user?.userProfile||sampleImage }
                            alt="Profile Avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>


                    <h1 className="mt-4 text-xl font-semibold">{user?.name}</h1>
                    <p className="text-gray-500 text-sm">{user?.username}</p>


                    <div className="flex gap-6 mt-4 text-center">
                        <div>
                            <p className="text-lg font-bold">120</p>
                            <p className="text-xs text-gray-500">Posts</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">2.5k</p>
                            <p className="text-xs text-gray-500">Followers</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">180</p>
                            <p className="text-xs text-gray-500">Following</p>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <Editprofile />
                    </div>
                    
                </div>


                {/* Bio Section */}
                <div className="w-full max-w-md mt-4 p-4 rounded-2xl shadow border border-gray-600">
                    <h2 className="font-semibold text-lg">About</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {user?.bio}
                    </p>
                </div>


                {/* Posts Grid */}
                <div className="w-full max-w-md mt-4 grid grid-cols-3 gap-2">
                    {/*{[...Array(posts.length)].map((_, i) => (*/}
                    {/*    <div key={i} className="aspect-square rounded-xl border border-gray-600">*/}
                    {/*        <img src={_.userId.userProfile } className='h-auto w-auto object-cover'/>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    {
                        myPosts.map((post) => (
                            <div
                                key={post._id}
                                className="aspect-square rounded-xl border border-gray-600 overflow-hidden"
                            >
                                <img
                                    src={post.image}
                                    alt="post"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))
                    }
                </div>

                <div className="border border-gray-600 w-full max-w-md mt-4 p-4 rounded-md shadow text-center cursor-pointer hover:bg-gray-200" onClick={() => { navigate('/settings')} }>
                    <button className='font-bold text-md cursor-pointer'>Setting</button>
                </div>

            </div>
        </>
    );
}
