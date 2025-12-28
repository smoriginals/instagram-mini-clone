import React from "react";
import { Link,useNavigate } from "react-router-dom";
import Editprofile from "../components/Profile/Editprofile.jsx";
import { useGlobal } from "../Context/GlobalContext.jsx";
import { usePosts } from "../Context/PostContext.jsx";
import userIcon from '../../assets/user.png';

export default function Profilepage() {

    const navigate = useNavigate();
    const { user } = useGlobal();
    const { posts } = usePosts();
    const sampleImage = userIcon;


    const myPosts = posts.filter(
        (post) => post.userId?._id === user?._id
    );


    return (
        <>

            <div className="flex min-h-screen w-full flex-col items-center p-6 py-20">
                {/* Profile Header */}
                <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-gray-600 p-6 shadow-md">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-md">
                        <img
                            src={user?.userProfile||sampleImage }
                            alt="Profile Avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>


                    <h1 className="mt-4 text-xl font-semibold">{user?.name}</h1>
                    <p className="text-sm text-gray-500">{user?.username}</p>


                    <div className="mt-4 flex gap-6 text-center">
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
                <div className="mt-4 w-full max-w-md rounded-2xl border border-gray-600 p-4 shadow">
                    <h2 className="text-lg font-semibold">About</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        {user?.bio}
                    </p>
                </div>


                {/* Posts Grid */}
                <div className="mt-4 grid w-full max-w-md grid-cols-3 gap-2">
                    {/*{[...Array(posts.length)].map((_, i) => (*/}
                    {/*    <div key={i} className="aspect-square rounded-xl border border-gray-600">*/}
                    {/*        <img src={_.userId.userProfile } className='h-auto w-auto object-cover'/>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    {
                        myPosts.map((post) => (
                            <div
                                key={post._id}
                                className="aspect-square overflow-hidden rounded-xl border border-gray-600"
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

                <div className="mt-4 w-full max-w-md cursor-pointer rounded-md border border-gray-600 p-4 text-center shadow hover:bg-gray-200" onClick={() => { navigate('/settings')} }>
                    <button className='text-md cursor-pointer font-bold'>Setting</button>
                </div>

            </div>
        </>
    );
}
