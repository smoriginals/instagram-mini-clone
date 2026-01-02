import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Link, Twitter, Facebook, MessageSquareMore, EllipsisVertical } from 'lucide-react'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { useGlobal } from '../../Context/GlobalContext';
import axios from 'axios';
import API from '../../lib/instance';
import userIcon from '../../assets/user.png';

export default function Feedcard({ post }) {

    // eslint-disable-next-line no-unused-vars
    const { user } = useGlobal();

    const sampleImage = userIcon;

    const getAvatar = () => {

        if (user?._id === post.userId?._id) {
            return user?.userProfile || sampleImage;
        }
        return post.userId?.userProfile || sampleImage;
    };

    const [input, setInput] = useState("");

    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const [comments, setComments] = useState([]);

    const HandleLike = async () => {

        try {

            const res = await API.post(`/api/user/post/${post._id}/like`, { userId: user._id },);
            if (res.data.success) {
                setLike(res.data.liked);
                setLikeCount(res.data.totalLikes)
            }

        } catch (error) {
            console.log("Error:", error.message, error.response?.data || error.message);
        }
    }

    const HandleComments = async () => {
        if (!input.trim()) {
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/api/user/post/${post._id}/comments`, { userId: user._id, text: input })

            if (res.data.success) {
                setComments(res.data.comments);
                setInput("");
            }
        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    }

    useEffect(() => {
        if (!user) return;
        setLike(post.likes?.includes(user?._id));
        setLikeCount(post.likes?.length || 0);
        if (post.comments) {
            setComments(post.comments || [])
        }

    }, [post.likes, user?._id, post.comments])

    return (
        <>

            <div className="w-full">
                <div className="w-full flex flex-col">

                    {/*feed card top user photo*/}
                    <div className='flex h-10 w-full items-center justify-between border-t border-x border-gray-200 px-1'>

                        <div className='flex items-center justify-start gap-1'>
                            <div className='flex h-7 w-7 items-center justify-center rounded-full border border-pink-500'>
                                <img
                                    src={getAvatar()}
                                    alt="User Avatar"
                                    className="h-6 w-6 rounded-full object-contain"
                                />
                            </div>
                            <p>{post.userId?.name}</p>
                        </div>

                        <EllipsisVertical size={20} />
                    </div>
                    {/*feed card top user photo*/}

                    {/*main user feed photo*/}
                    <div className="h-auto w-full border-x border-gray-200 p-1">
                        <img
                            src={post.image}
                            alt="Post Image"
                            className="w-full h-72 object-cover md:h-80"
                        />
                    </div>
                    {/*main user feed photo*/}


                    <div className='flex h-10 w-full items-center justify-between gap-2 border-x border-gray-200 px-1'>
                        <div className='flex h-10 items-center justify-center gap-1'>

                            {/*Like Button*/}
                            <div className='flex flex-row items-center justify-start'>
                                <button className='flex h-8 w-8 items-center justify-center' onClick={HandleLike}>
                                    <Heart size={20} className={like ? "fill-red-500 text-red-500" : ""} />
                                </button>
                                <p className='text-md font-medium'>{likeCount}</p>
                            </div>
                            {/*Like Button*/}

                            {/*Comments Button*/}
                            <Drawer>

                                {/* Button to open drawer */}
                                <DrawerTrigger asChild>

                                    <div className='flex flex-row items-center justify-start'>
                                        <button className="flex h-8 w-8 items-center justify-center">
                                            <MessageCircle size={20} />
                                        </button>

                                        <p className='text-md font-medium'>{comments?.length}</p>
                                    </div>
                                </DrawerTrigger>

                                {/* Drawer Content */}
                                <DrawerContent className="rounded-t-xl p-4">

                                    {/* Header */}
                                    <DrawerHeader className="flex items-center justify-between">
                                        <p className="text-xl font-bold">Comments</p>

                                    </DrawerHeader>


                                    {/* Comments List */}
                                    <div className="mt-2 h-[50vh] space-y-3 overflow-y-auto px-1">
                                        {comments.map((comment) => {
                                            // 1. Check if this specific comment was written by the logged-in user
                                            const isMyComment = user?._id === (comment.user?._id || comment.userId);

                                            // 2. Determine the profile pic: Global state for "me", DB state for "others"
                                            const commentProfilePic = isMyComment
                                                ? (user?.userProfile || sampleImage)
                                                : (comment.user?.userProfile || sampleImage);

                                            return (
                                                <div key={comment._id || Math.random()} className="flex items-start gap-2">
                                                    <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-500'>
                                                        <img
                                                            src={commentProfilePic} // <--- Updated variable
                                                            alt="User Avatar"
                                                            className="h-6 w-6 rounded-full object-cover"
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold">{comment.user?.name || "User"}</p>
                                                        <p className="text-sm text-gray-700">{comment.text}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Input */}
                                    <div className="mt-4 flex items-center gap-2 border-t pt-3">
                                        <Input
                                            placeholder="Add a comment..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            className="flex-1"
                                        />

                                        <Button onClick={HandleComments} className='font-semibold'>
                                            Send
                                        </Button>
                                    </div>

                                </DrawerContent>
                            </Drawer>
                            {/*Comments Button*/}

                            {/*Share Button*/}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button className="flex h-8 w-8 items-center justify-center">
                                        <Send size={20} />
                                    </button>
                                </SheetTrigger>

                                <SheetContent side="bottom" className="m-0 rounded-t-2xl">
                                    <SheetHeader>
                                        <SheetTitle className="text-2xl font-bold">Share</SheetTitle>
                                        <SheetDescription className='text-sm font-bold'>Select a platform to share</SheetDescription>
                                    </SheetHeader>

                                    <div className="mb-10 flex items-center justify-center gap-2">

                                        <button className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                                            <Link size={30} />
                                        </button>

                                        <button className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                                            <MessageSquareMore size={30} />
                                        </button>

                                        <button className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                                            <Facebook size={30} />
                                        </button>

                                        <button className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                                            <Twitter size={30} />
                                        </button>

                                    </div>
                                </SheetContent>
                            </Sheet>
                            {/*Share Button*/}
                        </div>

                        {/*Save Button*/}
                        <div>
                            <button className='flex h-10 w-10 items-center justify-center'><Bookmark size={22} /></button>
                        </div>
                        {/*Save Button*/}

                    </div>

                    {/*Show Context*/}
                    <div className='flex h-10 w-full items-center justify-start gap-1 border-x border-b border-gray-200 px-1'>
                        <div className='flex h-7 w-7 items-center justify-center rounded-full border border-pink-500'>
                            <img
                                src={getAvatar()}
                                alt="User Avatar"
                                className="h-6 w-6 rounded-full object-contain border"
                            />
                        </div>
                        <p>{post.caption}</p>
                    </div>
                    {/*Show Context*/}
                </div>
            </div>
        </>
    )
}