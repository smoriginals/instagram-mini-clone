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


export default function Feedcard() {

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
            <div className='h-3/5 w-full flex justify-center items-center'>

                <div className='h-3/5 w-full bg-gray-150 pt-2 px-1.5'>
                    
                    <div className=' flex justify-start gap-2 p-1.5 items-center rounded-t-2xl border-t border-l border-r'>
                        <div className='h-8 w-8 rounded-full border-2 border-pink-500'></div>
                        <p>Username.XYZ</p>
                    </div>


                    <div className="w-full aspect-square border-l border-r px-0.5">
                        <img
                            src="https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-nature-forest-sun-ecology-image_2256183.jpg"
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <div className='h-10 w-full flex justify-between items-center gap-2 px-0.5 border-l border-r'>
                        <div className='flex justify-center items-center gap-1 '>

                            {/*Like Button*/}
                            <div className='flex justify-start items-center flex-row'>
                                <button className='h-8 w-8 flex justify-center items-center' onClick={HandleLike}>
                                    <Heart size={20} />                                
                            </button>
                                <p className='font-medium text-md'>{like}</p>
                            </div>
                            {/*Like Button*/}

                            {/*Comments Button*/}
                            <Drawer>

                                {/* Button to open drawer */}
                                <DrawerTrigger asChild>

                                    <div className='flex justify-start items-center flex-row'>
                                    <button className="h-8 w-8 flex justify-center items-center">
                                        <MessageCircle size={20} />
                                    </button>

                                    <p className='font-medium text-md'>2K</p>
                                    </div>
                                </DrawerTrigger>

                                {/* Drawer Content */}
                                <DrawerContent className="rounded-t-2xl p-4">

                                    {/* Header */}
                                    <DrawerHeader className="flex justify-between items-center">
                                        <p className="text-xl font-bold">Comments</p>

                                    </DrawerHeader>

                                    {/* Comments List */}
                                    <div className="h-[50vh] overflow-y-auto mt-2 space-y-3 px-1">
                                        {comments.map((item) => (
                                            <div key={item.id} className="flex gap-2 items-start">
                                                <div className="h-8 w-8 rounded-full border border-pink-500"></div>

                                                <div>
                                                    <p className="font-semibold text-sm">{item.user}</p>
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
                                    <button className="h-8 w-8 flex justify-center items-center">
                                        <Send size={20} />
                                    </button>
                                </SheetTrigger>

                                <SheetContent side="bottom" className="rounded-t-2xl">
                                    <SheetHeader>
                                        <SheetTitle className="text-2xl font-bold">Share</SheetTitle>
                                        <SheetDescription className='text-sm font-bold'>Select a platform to share</SheetDescription>
                                    </SheetHeader>

                                    <div className="flex items-center justify-center gap-4 pb-8">

                                        <button className="h-20 w-20 rounded-full border-2 flex justify-center items-center">
                                            <Link size={40} />
                                        </button>

                                        <button className="h-20 w-20 rounded-full border-2 flex justify-center items-center">
                                            <MessageSquareMore size={40}/>
                                        </button>

                                        <button className="h-20 w-20 rounded-full border-2 flex justify-center items-center">
                                            <Facebook size={40}/>
                                        </button>

                                        <button className="h-20 w-20 rounded-full border-2 flex justify-center items-center">
                                            <Twitter size={40}/>
                                        </button>

                                    </div>
                                </SheetContent>
                            </Sheet>
                            {/*Share Button*/}
                        </div>

                        {/*Save Button*/}
                        <div>
                            <button className='h-8 w-8 flex justify-center items-center'><Bookmark size={22} /></button>
                            
                        </div>
                        {/*Save Button*/}
                    </div>

                    {/*Show Comments*/}
                    <div className='h-10 w-full flex justify-start items-center p-2 gap-1 rounded-b-2xl border-b border-l border-r'>
                        <div className='h-6 w-6 bg-gray-200 rounded-full border border-pink-500'>
                        </div>
                        <p>Nice View! i like that.</p>
                    </div>
                    {/*Show Comments*/}
                </div>
            </div>
        </>
    )
}