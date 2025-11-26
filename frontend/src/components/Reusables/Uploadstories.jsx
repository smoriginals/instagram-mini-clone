import React, { useRef } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
} from "@/components/ui/drawer";
import { Plus } from "lucide-react";
export default function Uploadstories() {

    const cameraRef = useRef(null);
    const galleryRef = useRef(null);

    return (
        <div>
            <Drawer>
                <DrawerTrigger asChild>
                    <button className="absolute top-13 right-2 h-5 w-5 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center">
                        <Plus size={12} color="white" />
                    </button>
                </DrawerTrigger>

                <DrawerContent className="p-4 flex flex-col gap-3">
                    <h1 className='text-xl font-bold text-center p-2'>Add a Story</h1>
                    <button
                        onClick={() => cameraRef.current.click()}
                        className="p-3 border rounded text-center"
                    >
                        📸 Camera
                    </button>

                    <button
                        onClick={() => galleryRef.current.click()}
                        className="p-3 border rounded text-center"
                    >
                        📁 Gallery
                    </button>
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

