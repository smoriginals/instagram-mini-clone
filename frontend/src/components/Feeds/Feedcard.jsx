import React, { useState } from 'react';
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


export default function Feedcard() {

    const sampleImage = 'https://i.pravatar.cc/150?img=65';

    const { user } = useGlobal();
    const [input, setInput] = useState("");
    const [like, setLike] = useState(0);
    const [comments, setComments] = useState([
        { id: 1, user: "alex", text: "Wow nice!" },
        { id: 2, user: "john", text: "Amazing view ❤️" },
        { id: 3, user: "sarah", text: "Love this!!" },
    ]);

    const sendComment = () => {
        if (input.trim() === "") return;

        setComments([...comments, { id: Date.now(), user: "you", text: input }]);
        setInput("");
    };

    const HandleLike = () => {
        setLike(like + 1);
    }


    return (
        <>
            <div className='flex h-1/2 w-full items-center justify-center'>

                <div className='flex h-1/2 w-full flex-col items-center justify-center'>

                    {/*Uncomment this when require better view in PC screebs*/}
                    {/* <div className='flex w-full items-center justify-center'>
                        <div className='flex w-full max-w-[500px] flex-col'>*/}
                    {/*Uncomment this when require better view in PC screebs*/}

                    {/*feed card top user photo*/}
                    <div className='flex h-10 w-full items-center justify-start gap-2 rounded-t-2xl border-l border-r border-t border-gray-600 p-2 pt-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-500'>
                            <img
                                src={`${user?.userProfile || sampleImage}`}
                                alt="User Avatar"
                                className="h-6 w-6 rounded-full object-cover"
                            />
                        </div>
                        <p>{user?.name}</p>
                    </div>
                    {/*feed card top user photo*/}

                    {/*main user feed photo*/}
                    <div className="aspect-square w-full border-l border-r border-gray-600 p-1">
                        <img
                            src="https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-nature-forest-sun-ecology-image_2256183.jpg"
                            alt="User Avatar"
                            className="h-full w-full rounded-sm object-cover"
                        />
                    </div>
                    {/*main user feed photo*/}


                    <div className='flex h-10 w-full items-center justify-between gap-2 border-l border-r border-gray-600 p-1'>
                        <div className='flex h-10 items-center justify-center gap-1'>

                            {/*Like Button*/}
                            <div className='flex flex-row items-center justify-start'>
                                <button className='flex h-8 w-8 items-center justify-center' onClick={HandleLike}>
                                    <Heart size={20} />
                                </button>
                                <p className='text-md font-medium'>{like}</p>
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

                                        <p className='text-md font-medium'>2K</p>
                                    </div>
                                </DrawerTrigger>

                                {/* Drawer Content */}
                                <DrawerContent className="rounded-t-2xl p-4">

                                    {/* Header */}
                                    <DrawerHeader className="flex items-center justify-between">
                                        <p className="text-xl font-bold">Comments</p>

                                    </DrawerHeader>

                                    {/* Comments List */}
                                    <div className="mt-2 h-[50vh] space-y-3 overflow-y-auto px-1">
                                        {comments.map((item) => (
                                            <div key={item.id} className="flex items-start gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-500">
                                                    <img
                                                        src={`${user?.userProfile || sampleImage}`}
                                                        alt="User Avatar"
                                                        className="h-6 w-6 rounded-full object-cover"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold">{user?.name}</p>
                                                    <p className="text-sm text-gray-700">{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input */}
                                    <div className="mt-4 flex items-center gap-2 border-t pt-3">
                                        <Input
                                            placeholder="Add a comment..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            className="flex-1"
                                        />

                                        <Button onClick={sendComment} className='bg-blue-500 font-bold'>
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
                    <div className='flex h-10 w-full items-center justify-start gap-1 rounded-b-2xl border-b border-l border-r border-gray-600 px-2 pb-2'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-500'>
                            <img
                                src={`${user?.userProfile || sampleImage}`}
                                alt="User Avatar"
                                className="h-6 w-6 rounded-full object-cover"
                            />
                        </div>
                        <p>Here is your Caption...</p>
                    </div>
                    {/*Show Comments*/}
                </div>
            </div>
        </>
    )
}