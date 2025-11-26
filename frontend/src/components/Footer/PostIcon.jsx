import React from "react";
import { Image, BookOpen, PlusCircle} from "lucide-react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function PostIcon() {
    return (
        <>
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
        </>
    )
}