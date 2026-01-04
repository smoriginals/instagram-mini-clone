import React, { useRef } from "react";
import { PlusCircle} from "lucide-react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import AddPost from "../Post/AddPost";

export default function PostIcon() {

    const uploadPhoto = useRef(null);

    return (
        <>
            <Drawer>
                
                <DrawerTrigger asChild>
                    <PlusCircle size={28} className="h-10 w-10 transition-all duration-300 ease-in-out hover:scale-120" />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-center text-xl font-semibold">Create</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-2 px-4 text-lg">

                        <AddPost/>

                    </div>

                    <DrawerClose className="p-4">
                        <Button className="text-md bordermode w-full cursor-pointer border p-2 font-semibold">Close</Button>
                    </DrawerClose>

                </DrawerContent>
            </Drawer>
            <input
                ref={uploadPhoto}
                type="file"
                accept="image/*,video/*,audio/mpeg"
                className="hidden"
                onChange={(e) => console.log("Gallery picked:", e.target.files[0])}
            />
            
        </>
    )
}