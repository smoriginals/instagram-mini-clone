import React, { useState,useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Link, Twitter, Facebook, MessageSquareMore } from 'lucide-react'
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


export default function Feedcard({ post }) {

    // eslint-disable-next-line no-unused-vars
    const { user } = useGlobal();

    const sampleImage = 'https://i.pravatar.cc/150?img=65';
    const getAvatar = () => {
        if (user && user._id === post.userId?._id) {
            return user.userProfile || sampleImage;
        }
        return post.userId?.userProfile || sampleImage;
    };

    const [input, setInput] = useState("");

    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const [comments, setComments] = useState([]);

    const sendComment = () => {
        if (input.trim() === "") return;

        setComments([...comments, { id: Date.now(), user: "you", text: input }]);
        setInput("");
    };

    const HandleLike = async () => {
       
        try {

            const res = await axios.post(`http://localhost:5000/api/user/post/${post._id}/like`, { userId: user._id },);
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
            console.log(error.response?.data||error.message)
        }
    }

    useEffect(() => {
        if (!user) return;
        setLike(post.likes?.includes(user?._id));
        setLikeCount(post.likes?.length || 0);
        if (post.comments) {
        setComments(post.comments||[])
        }

    },[post.likes,user?._id,post.comments])

    return (
        <>

            <div className='flex h-1/2 w-full items-center justify-center'>

                <div className='flex h-1/2 w-full flex-col items-center justify-center'>

                    {/*feed card top user photo*/}
                    <div className='flex h-10 w-full items-center justify-start gap-2 rounded-t-2xl border-t border-r border-l border-gray-600 p-2 pt-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-500'>
                            <img
                                src={getAvatar()}
                                alt="User Avatar"
                                className="h-6 w-6 rounded-full object-cover"
                            />
                        </div>
                        <p>{post.userId?.name}</p>
                    </div>
                    {/*feed card top user photo*/}

                    {/*main user feed photo*/}
                    <div className="h-auto w-full border-r border-l border-gray-600 p-1">
                        <img
                            src={post.image || "https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-nature-forest-sun-ecology-image_2256183.jpg"}
                            alt="User Avatar"
                            className="h-auto w-full rounded-sm object-contain"
                        />
                    </div>
                    {/*main user feed photo*/}


                    <div className='flex h-10 w-full items-center justify-between gap-2 border-r border-l border-gray-600 p-1'>
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
                                <DrawerContent className="rounded-t-2xl p-4">

                                    {/* Header */}
                                    <DrawerHeader className="flex items-center justify-between">
                                        <p className="text-xl font-bold">Comments</p>

                                    </DrawerHeader>

                                    {/* Comments List */}
                                    {/*<div className="mt-2 h-[50vh] space-y-3 overflow-y-auto px-1">*/}
                                    {/*    {comments.map((comment) => (*/}
                                    {/*        <div key={comment._id} className="flex items-start gap-2">*/}
                                    {/*            <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-500'>*/}
                                    {/*                <img*/}
                                    {/*                    src={`${comment.user?.userProfile || getAvatar()}`}*/}
                                    {/*                    alt="User Avatar"*/}
                                    {/*                    className="h-6 w-6 rounded-full object-cover"*/}
                                    {/*                />*/}
                                    {/*            </div>*/}

                                    {/*            <div>*/}
                                    {/*                <p className="text-sm font-semibold">{comment.user?.name}</p>*/}
                                    {/*                <p className="text-sm text-gray-700">{comment.text}</p>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    ))}*/}
                                    {/*</div>*/}

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

                                        <Button onClick={HandleComments} className='bg-blue-500 font-bold'>
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

                                <SheetContent side="bottom" className="rounded-t-2xl">
                                    <SheetHeader>
                                        <SheetTitle className="text-2xl font-bold">Share</SheetTitle>
                                        <SheetDescription className='text-sm font-bold'>Select a platform to share</SheetDescription>
                                    </SheetHeader>

                                    <div className="flex items-center justify-center gap-4 pb-8">

                                        <button className="flex h-20 w-20 items-center justify-center rounded-full border-2">
                                            <Link size={40} />
                                        </button>

                                        <button className="flex h-20 w-20 items-center justify-center rounded-full border-2">
                                            <MessageSquareMore size={40} />
                                        </button>

                                        <button className="flex h-20 w-20 items-center justify-center rounded-full border-2">
                                            <Facebook size={40} />
                                        </button>

                                        <button className="flex h-20 w-20 items-center justify-center rounded-full border-2">
                                            <Twitter size={40} />
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

                    {/*Show Comments*/}
                    <div className='flex h-10 w-full items-center justify-start gap-1 rounded-b-2xl border-r border-b border-l border-gray-600 px-2 pb-2'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-500'>
                            <img
                                src={getAvatar()}
                                alt="User Avatar"
                                className="h-6 w-6 rounded-full object-cover"
                            />
                        </div>
                        <p>{post.caption}</p>
                    </div>
                    {/*Show Comments*/}
                </div>
            </div>
        </>
    )
}