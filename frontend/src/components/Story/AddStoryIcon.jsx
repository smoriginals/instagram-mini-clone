//import React, { useRef } from "react";
//import {
//    Drawer,
//    DrawerContent,
//    DrawerClose
//} from "@/components/ui/drawer";
//import { Plus, Camera, Image, X, ArrowUpFromLine } from "lucide-react";
//import { useGlobal } from '../../Context/GlobalContext';
//export default function AddStoryIcon() {

//    const { storyDrawerOpen, OpenStoryDrawer, CloseStoryDrawer } = useGlobal();
//    const sampleImage = 'https://i.pravatar.cc/150?img=65';

//    const cameraRef = useRef(null);
//    const galleryRef = useRef(null);

//    return (
//        <div>
//            <button className="top-27 left-13 absolute flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 opacity-0" onClick={OpenStoryDrawer}>
//                <Plus size={12} color="white" />
//            </button>
//            <Drawer open={storyDrawerOpen} onOpenChange={CloseStoryDrawer}>

//                <DrawerContent className="flex flex-col gap-2 p-1">
//                    <h1 className='p-2 text-center text-xl font-bold'>Add a Story</h1>
//                    <button
//                        onClick={() => cameraRef.current.click()}
//                        className="p-3 border rounded flex justify-center items-center"
//                    >
//                        <Camera size={30} />
//                    </button>

//                    <button
//                        onClick={() => galleryRef.current.click()}
//                        className="p-3 border rounded flex justify-center items-center flex-col overflow-y-auto"
//                    >
//                        <Image size={30} />
//                        <div className='relative h-96 w-full rounded-md mt-4'>
//                            <img src={sampleImage} className='absolute inset-0 rounded-md h-full w-full'/>
//                            <div className='absolute bottom-1 right-1 h-12 w-24 rounded-md opacity-70 flex justify-evenly items-center p-1'>
//                                <X className='h-8 w-8 bg-gray-700 p-2 rounded-md cursor-pointer' fill='white' color='white'/>
//                                <ArrowUpFromLine className='h-8 w-8 bg-gray-700 p-2 rounded-md cursor-pointer' fill='white' color='white'/>
//                            </div>
//                        </div>
//                    </button>

//                    <h1 className='rounded-sm p-4 text-center text-xl font-bold'>Choose</h1>

//                </DrawerContent>
//            </Drawer>

//            {/* Hidden Inputs */}
//            <input
//                ref={cameraRef}
//                type="file"
//                accept="image/*"
//                capture="environment"
//                className="hidden"
//                onChange={(e) => console.log("Camera picked:", e.target.files[0])}
//            />

//            <input
//                ref={galleryRef}
//                type="file"
//                accept="image/*"
//                className="hidden"
//                onChange={(e) => console.log("Gallery picked:", e.target.files[0])}
//            />
//        </div>
//    );
//}

import React, { useRef, useState } from "react";
import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer";
import { Plus, Camera, Image, X, ArrowUpFromLine, Loader2 } from "lucide-react";
import { useGlobal } from '../../Context/GlobalContext';
import { useStory } from "../../Context/StoryContext";

export default function AddStoryIcon() {

    const { storyDrawerOpen, OpenStoryDrawer, CloseStoryDrawer } = useGlobal();
    const { uploadStory } = useStory();
    const cameraRef = useRef(null);
    const galleryRef = useRef(null);

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    // Handle file pick
    const handlePick = (e) => {
        const picked = e.target.files[0];
        if (!picked) return;

        setFile(picked);
        setPreview(URL.createObjectURL(picked));
    };

    // Remove preview
    const handleRemove = () => {
        URL.revokeObjectURL(preview);
        setFile(null);
        setPreview(null);
    };

    // Upload (you’ll connect API later)
    const handleUpload = async () => {
        //const res = await uploadStory(file)
        //if (!res.success) {
        //    setUploading(true);
        //}
        //setUploading(false);
        //handleRemove();
        //CloseStoryDrawer();
        //console.log("Uploading:", file);
        if (!file) return;
        try {
            setUploading(true);
            const res = await uploadStory(file);
            if (!res.success) {
                console.log("upload field");
                return;
            }
            handleRemove();
            CloseStoryDrawer();
        } catch (error) {
            console.log(error)
        }
        finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <button
                className="top-27 left-13 absolute flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 hidden"
                onClick={OpenStoryDrawer}
            >
                <Plus size={12} color="white" />
            </button>

            <Drawer open={storyDrawerOpen} onOpenChange={CloseStoryDrawer}>
                <DrawerContent className="flex flex-col gap-4 p-3">

                    <h1 className="text-center text-xl font-bold">
                        Add a Story
                    </h1>

                    {/* IF NO IMAGE PICKED */}
                    {!preview && (
                        <>
                            <button
                                onClick={() => cameraRef.current.click()}
                                className="p-3 border border-gray-600 rounded flex justify-center items-center"
                            >
                                <Camera size={30} />
                            </button>

                            <button
                                onClick={() => galleryRef.current.click()}
                                className="p-3 border border-gray-600 rounded flex justify-center items-center"
                            >
                                <Image size={30} />
                            </button>

                            <p className='text-center py-2 text-xl font-bold'>Choose</p>
                        </>
                    )}

                    {/* PREVIEW */}
                    {preview && (
                        <div className="relative h-96 w-full rounded-md overflow-hidden">
                            <img
                                src={preview}
                                alt="story-preview"
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute bottom-2 right-2 flex gap-2">
                                <button
                                    onClick={handleRemove}
                                    className="bg-black/60 p-2 rounded-md"
                                    disabled={uploading }>
                                    <X color="white" />
                                </button>

                                <button
                                    onClick={handleUpload}
                                    className="bg-blue-600 p-2 rounded-md" disabled={uploading}
                                >
                                    {uploading?<Loader2 className='animate-spin text-white'/>:<ArrowUpFromLine color="white" />}
                                   
                                </button>
                            </div>
                        </div>
                    )}

                </DrawerContent>
            </Drawer>

            {/* Hidden Inputs */}
            <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePick}
            />

            <input
                ref={galleryRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePick}
            />
        </div>
    );
}


