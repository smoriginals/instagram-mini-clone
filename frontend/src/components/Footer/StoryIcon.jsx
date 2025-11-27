import React from "react";
import {PlayCircle } from "lucide-react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function StoryIcon() {
    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <PlayCircle className="w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out" />
                </DrawerTrigger>

                <DrawerContent
                    className="fixed w-screen p-0 rounded-none"
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
        </>
    )
}