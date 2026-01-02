import React, { useState, useEffect } from 'react';
import { ChevronLeft, Eraser, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../Context/GlobalContext';
import { usePosts } from '../../Context/PostContext';
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
import userIcon from '../../assets/user.png';
//import toast from 'react-hot-toast';

export default function MyPosts() {

    const { user } = useGlobal();

    const navigate = useNavigate();

    const { posts, deletePost, fetchPosts } = usePosts();

    const [deletingId, setDeletingId] = useState(null);

    const sampleImage = userIcon;

    const myPosts = posts.filter(
        (post) => post.userId?._id === user?._id
    );

    const DeletePost = async (postId) => {

        if (!postId || deletingId) {
            return;
        }

        setDeletingId(postId);
        await deletePost(postId);
        setDeletingId(null);
    }

    useEffect(() => {


        if (user?._id) {
            fetchPosts(user._id)
        }
    }, [user?._id, fetchPosts]);

    //followers of current user
    //const followers = user?.followers||[];
    //const following = user?.following || [];

    //const followerPosts = posts.filter(post =>
    //    followers.includes(post.userId?._id)
    //);
    //const followingPosts = posts.filter(post =>
    //    following.includes(post.userId?._id)
    //);


    //const uniqueByUser = (posts) => {
    //    const map = new Map();
    //    posts.forEach(post => {
    //        map.set(post.userId._id, post.userId);
    //    });
    //    return Array.from(map.values());
    //};

    //const followersUsers = uniqueByUser(followerPosts);
    //const followingUsers = uniqueByUser(followingPosts);

    //console.table(followersUsers);
    // followers of current user
    const followers = user?.followers || [];
    const following = user?.following || [];

    // normalize IDs
    const followersIds = followers.map(id => id.toString());
    const followingIds = following.map(id => id.toString());

    // filter posts
    const followerPosts = posts.filter(post =>
        followersIds.includes(post.userId?._id?.toString())
    );

    const followingPosts = posts.filter(post =>
        followingIds.includes(post.userId?._id?.toString())
    );

    // unique users
    const uniqueByUser = (posts) => {
        const map = new Map();
        posts.forEach(post => {
            if (post.userId?._id) {
                map.set(post.userId._id.toString(), post.userId);
            }
        });
        return Array.from(map.values());
    };

    const followersUsers = uniqueByUser(followerPosts);
    const followingUsers = uniqueByUser(followingPosts);

    

    return (
        <>
            <div className='mt-4 px-2'>
                <ChevronLeft size={30} onClick={() => { navigate('/settings') }} />
            </div>

            <div className="flex h-full w-full flex-col gap-2.5 px-2 pt-4 pb-2">

                <h1 className="text-2xl font-bold">MyPosts</h1>

                {/* My Posts */}
                <div className="relative flex flex-wrap gap-1 border border-gray-600 p-1 h-96 overflow-y-auto">
                    {myPosts.length === 0 ? (
                        <p className="mx-auto text-sm text-gray-400">
                            No Posts Found
                        </p>
                    ) : (
                        myPosts.map((post) => (
                            <div
                                key={post._id}
                                className="relative h-27 w-27 overflow-hidden border"
                            >
                                <img
                                    src={post.image}
                                    alt="post"
                                    className="h-full w-fit rounded-md object-contain"
                                />
                                <div className='h-full w-full absolute top-0 left-0 hover:bg-gray-900 opacity-80 flex justify-center items-center'>
                                    <div className='gap-2 text-white hover:opacity-100 opacity-0 h-full w-full flex items-center justify-center'>
                                        <Heart />{post.likes.length}
                                        <MessageCircle />{post.comments.length}
                                    </div>
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Eraser
                                            className="absolute right-0 bottom-0 cursor-pointer p-1 hover:text-red-500"
                                            size={30}
                                        />
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                post and remove it from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="hover:bg-red-500 hover:text-white"
                                                onClick={() => DeletePost(post._id)}
                                                disabled={deletingId === post._id}
                                            >
                                                {deletingId === post._id ? "Deleting..." : "Continue"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))
                    )}
                </div>


                {/*Followers*/}
                <h1 className="text-2xl font-bold">Followers</h1>

                <div className="flex h-28 w-full gap-2 overflow-x-auto border border-gray-600 p-1">
                    {followersUsers.length === 0 ? (
                        <p className="text-sm text-gray-400">No Followers</p>
                    ) : (
                        followersUsers.map((u) => (
                            <div key={u._id} className="relative">
                                <img
                                    src={u.userProfile || sampleImage}
                                    className="h-26 w-26 object-contain border"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 opacity-0 hover:opacity-80">
                                    <p className="text-xs font-semibold text-white text-center">
                                        {u.name}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>



                {/*Followers*/}
                <h1 className="text-2xl font-bold">Followings</h1>

                <div className="flex h-28 w-full gap-2 overflow-x-auto border border-gray-600 p-1">
                    {followingUsers.length === 0 ? (
                        <p className="text-sm text-gray-400">No Followings</p>
                    ) : (
                        followingUsers.map((u) => (
                            <div key={u._id} className="relative">
                                <img
                                    src={u.userProfile || sampleImage}
                                    className="h-26 w-26 object-contain border"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 opacity-0 hover:opacity-80">
                                    <p className="text-xs font-semibold text-white text-center">
                                        {u.name}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>


            </div>


        </>
    )
}