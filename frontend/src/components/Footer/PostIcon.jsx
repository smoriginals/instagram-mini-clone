import React, { useRef } from "react";
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
import { useGlobal } from "../../Context/GlobalContext";

export default function PostIcon() {

    const { OpenStoryDrawer } = useGlobal();
    const uploadPhoto = useRef(null);

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <PlusCircle className="w-10 h-10 hover:scale-120 transition-all duration-300 ease-in-out" />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-xl font-bold text-center">Create</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-2 px-4 text-lg">

                        <button className="flex items-center font-semibold gap-3 p-3 rounded-lg"
                            onClick={() => uploadPhoto.current.click()}
                        >
                            <Image /> Upload a Photo
                        </button>

                        <button className="flex items-center font-semibold gap-3 p-3 rounded-lg" onClick={OpenStoryDrawer}>
                            <BookOpen  /> Add a Story
                        </button>

                        <button className="flex font-semibold tems-center gap-3 p-3 rounded-lg ">
                            <PlusCircle /> Post
                        </button>

                    </div>

                    <DrawerClose className="p-4">
                        <Button variant="outline" className="w-full text-xl py-6 font-semibold border  border-gray-600">Close</Button>
                    </DrawerClose>

                </DrawerContent>
            </Drawer>
            <input
                ref={uploadPhoto}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => console.log("Gallery picked:", e.target.files[0])}
            />
            
        </>
    )
}