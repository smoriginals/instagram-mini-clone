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
import AddPost from "../Post/AddPost";

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

                        {/*<button className="flex items-center font-semibold gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-900"*/}
                        {/*    onClick={() => uploadPhoto.current.click()}*/}
                        {/*>*/}
                        {/*    <Image /> Add a Post*/}
                        {/*</button>*/}

                        <AddPost/>

                        <button className="flex items-center font-semibold gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-600" onClick={OpenStoryDrawer}>
                            <BookOpen  /> Add a Story
                        </button>

                        {/*<button className="flex font-semibold tems-center gap-3 p-3 rounded-lg ">*/}
                        {/*    <PlusCircle /> Post*/}
                        {/*</button>*/}

                    </div>

                    <DrawerClose className="p-4">
                        <Button variant="outline" className="w-full text-xl py-6 font-semibold cursor-pointer border  border-gray-600">Close</Button>
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