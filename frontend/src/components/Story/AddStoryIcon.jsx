import React, { useRef } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerClose
} from "@/components/ui/drawer";
import { Plus, Camera, Image } from "lucide-react";
import { useGlobal } from '../../Context/GlobalContext';
export default function AddStoryIcon() {

    const { storyDrawerOpen, OpenStoryDrawer, CloseStoryDrawer } = useGlobal();

    const cameraRef = useRef(null);
    const galleryRef = useRef(null);

    return (
        <div>
            <button className="top-27 left-13 absolute flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 opacity-0" onClick={OpenStoryDrawer}>
                <Plus size={12} color="white" />
            </button>
            <Drawer open={storyDrawerOpen} onOpenChange={CloseStoryDrawer}>

                <DrawerContent className="flex flex-col gap-2 p-1">
                    <h1 className='p-2 text-center text-xl font-bold'>Add a Story</h1>
                    <button
                        onClick={() => cameraRef.current.click()}
                        className="p-3 border rounded flex justify-center items-center"
                    >
                        <Camera size={30} />
                    </button>

                    <button
                        onClick={() => galleryRef.current.click()}
                        className="p-3 border rounded flex justify-center items-center"
                    >
                        <Image size={30} />
                    </button>

                    <h1 className='rounded-sm p-4 text-center text-xl font-bold'>Choose</h1>

                </DrawerContent>
            </Drawer>

            {/* Hidden Inputs */}
            <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => console.log("Camera picked:", e.target.files[0])}
            />

            <input
                ref={galleryRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => console.log("Gallery picked:", e.target.files[0])}
            />
        </div>
    );
}

