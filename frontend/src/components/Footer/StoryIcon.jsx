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
import { useGlobal } from "../../Context/GlobalContext";

export default function StoryIcon() {

    const { user } = useGlobal();

    const sampleImage = 'https://i.pravatar.cc/150?img=65';

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <PlayCircle className="h-7 w-7 transition-all duration-300 ease-in-out hover:scale-120" />
                </DrawerTrigger>

                <DrawerContent
                    className="fixed w-screen rounded-none p-0"
                >
                    
                    {/* Rounded Progress Bar */}
                    <div className="mt-3 flex w-full justify-center">
                        <div className="h-1.5 w-[90%] overflow-hidden rounded-full border border-gray-600 bg-gray-200">
                            <div className="h-full w-[50%] rounded-full bg-gray-400"></div>
                        </div>
                    </div>

                    {/* Username */}
                    <div className="mt-4 flex items-center justify-start gap-2 px-6 text-center">
                        <div className='flex items-center justify-start gap-2'>
                            <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-500'>
                                <img src={`${user?.userProfile || sampleImage}` } alt='User Avatar' className='h-7 w-7 rounded-full object-cover'/>
                            </div>
                            <p className="text-lg font-semibold tracking-wide">{user?.name}</p>
                        </div>
                    </div>

                    {/* Story Photo */}
                    <div className="mt-4 flex h-[80vh] w-full justify-center overflow-auto px-6">
                        <img
                            src="https://i.pravatar.cc/700"
                            alt="story"
                            className="h-full w-full rounded-md border border-gray-600 object-cover"
                        />

                    </div>

                    {/* Close Button */}
                    <DrawerClose className="px-6 py-2">
                        <Button variant="outline" className="w-full border border-gray-600">Close</Button>
                    </DrawerClose>

                </DrawerContent>


            </Drawer>
        </>
    )
}