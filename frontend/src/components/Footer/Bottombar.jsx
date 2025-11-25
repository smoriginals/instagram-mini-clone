import React, { useState } from "react";
import { Image, BookOpen, PlayCircle, PlusCircle, Home, User, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"


export default function Bottombar() {

    const navigate = useNavigate();
    const [query, setQuery] = useState("")


    return (
        <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t flex justify-around items-center z-50">
            <Home className="w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out" onClick={() => { navigate('/') }} />




            <Drawer direction="top"> {/* ⭐ IMPORTANT → Opens from TOP */}
                <DrawerTrigger asChild>
                    <Search className="w-7 h-7 cursor-pointer hover:scale-120 transition-all duration-300 ease-in-out" />
                </DrawerTrigger>

                <DrawerContent className="h-[60vh] p-4 rounded-b-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Search Users</h2>

                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon">
                                <X />
                            </Button>
                        </DrawerClose>
                    </div>

                    {/* Search Input */}
                    <Input
                        placeholder="Search username..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="mb-4"
                    />

                    {/* Results container */}
                    <div className="mt-2 space-y-3 overflow-y-auto h-[70%]">
                        {query.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center">Type to search...</p>
                        ) : (
                            [...Array(10)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                                    <img
                                        src={`https://i.pravatar.cc/150?img=${i + 1}`}
                                        className="h-10 w-10 rounded-full object-cover"
                                        alt=""
                                    />
                                    <div>
                                        <p className="font-semibold">user{i + 1}</p>
                                        <p className="text-xs text-gray-500">@username{i + 1}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </DrawerContent>
            </Drawer>

            {/*<Search className="w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out" />*/}
            {/*<PlusCircle className="w-10 h-10 hover:scale-120 transition-all duration-300 ease-in-out" />*/}


            <Drawer>
                <DrawerTrigger asChild>
                    <PlusCircle className="w-10 h-10 hover:scale-120 transition-all duration-300 ease-in-out" />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-center">Create</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-4 p-4 text-lg">

                        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                            <Image /> Upload a Photo
                        </button>

                        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                            <BookOpen /> Add a Story
                        </button>

                        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                            <PlusCircle /> Post
                        </button>

                    </div>

                    <DrawerClose className="p-4">
                        <Button variant="outline" className="w-full">Close</Button>
                    </DrawerClose>
                </DrawerContent>
            </Drawer>





            {/*<PlayCircle className="w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out" />*/}
            <Drawer>
                <DrawerTrigger asChild>
                    <PlayCircle className="w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out" />
                </DrawerTrigger>

                <DrawerContent
                    className="fixed w-screen p-0 rounded-none bg-gray-100 text-black"
                >

                    {/* Rounded Progress Bar */}
                    <div className="w-full mt-3 flex justify-center">
                        <div className="w-[90%] h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full w-[50%] bg-gray-400 rounded-full"></div>
                        </div>
                    </div>

                    {/* Username */}
                    <div className="mt-4 text-center flex justify-start items-center gap-2 px-6">
                        <div className='flex justify-start items-center gap-2'>
                            <div className='h-7 w-7 rounded-full bg-amber-100 border border-pink-500 flex'>
                            </div>
                            <p className="text-lg font-semibold tracking-wide">username_here</p>
                        </div>
                    </div>

                    {/* Story Photo */}
                    <div className="mt-4 w-full h-[80vh] flex justify-center px-6">
                        <img
                            src="https://i.pravatar.cc/700"
                            alt="story"
                            className="w-full h-full object-cover rounded-md"
                        />

                    </div>

                    {/* Close Button */}
                    <DrawerClose className="px-6 py-2">
                        <Button variant="outline" className="w-full">Close</Button>
                    </DrawerClose>

                </DrawerContent>


            </Drawer>


            <User className="w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out" onClick={() => { navigate('/profile') }} />
        </nav>
    );
}
