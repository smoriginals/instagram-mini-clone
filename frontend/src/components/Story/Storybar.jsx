import React, { useState, useRef } from "react"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Plus, Camera, Image, X, ArrowUpFromLine, Loader2 } from "lucide-react";

import { useGlobal } from '../../Context/GlobalContext';

import { useStory } from "../../Context/StoryContext";

import toast from 'react-hot-toast';

export default function Storybar() {

    const { user } = useGlobal();

    const sampleImage = 'https://i.pravatar.cc/150?img=65';

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
      
        //if (!file) return;

        if (!user?._id) {
            toast.error("Please login first");
            return;
        }

        if (!file) {
            toast.error("Please select an image");
            return;
        }

        //if (!user?._id) return;
        try {

            setUploading(true);
            const res = await uploadStory(file);
            setUploading(false);


            if (res.success) {
                handleRemove();
                toast.success('Story Added');
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
       
    };

    return (
        <>
            <nav className="mt-14 flex items-center justify-start p-1">

                {/* YOUR STORY */}
                <div className="flex h-24 w-24 flex-col items-center justify-center p-1.5">

                    {/* Avatar Wrapper */}
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                       
                        <Drawer>

                            <DrawerTrigger asChild>
                                <button className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-pink-500 p-0.5'>
                                    <img src={`${user?.userProfile || sampleImage}`} alt='user profile' className='aspect-square h-14 w-14 rounded-full border border-gray-600 object-cover'
                                    />
                                </button>
                            </DrawerTrigger>

                            <DrawerContent className="flex flex-col gap-2 p-2">
                                <h1 className='text-center text-xl font-bold'>Add Story</h1>

                               
                                    {!preview && (
                                        <>
                                            <button
                                                onClick={() => cameraRef.current.click()}
                                                className="p-2 border border-gray-600 rounded flex justify-center items-center"
                                            >
                                                <Camera size={30} />
                                            </button>

                                            <button
                                                onClick={() => galleryRef.current.click()}
                                                className="p-2 border border-gray-600 rounded flex justify-center items-center"
                                            >
                                                <Image size={30} />
                                            </button>

                                            <p className='py-1 text-center text-xl font-bold'>Choose</p>
                                        </>
                                    )}

                                    {/* PREVIEW */}
                                    {preview && (
                                        <div className="relative h-96 w-full overflow-hidden rounded-md">
                                            <img
                                                src={preview}
                                                alt="story-preview"
                                                className="h-80 w-full rounded-md border border-gray-600 object-contain"
                                            />

                                            <div className="absolute right-2 bottom-2 flex gap-2">
                                                <button
                                                    onClick={handleRemove}
                                                    className="rounded-md bg-black/60 p-2"
                                                    disabled={uploading}>
                                                    <X color="white" />
                                                </button>

                                                <button
                                                    onClick={handleUpload}
                                                    className="rounded-md bg-blue-600 p-2" disabled={uploading}
                                                >
                                                    {uploading ? <Loader2 className='animate-spin text-white' /> : <ArrowUpFromLine color="white" />}

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
                    {/*<AddStoryIcon/>*/}
                    <p className="mt-1 text-xs font-bold">Your Story</p>
                </div>

                <div className="flex gap-2 overflow-x-auto p-1.5 transition-all duration-300 ease-in-out [scrollbar-width:none] [scroll-behavior:smooth] [&::-webkit-scrollbar]:hidden">

                    {[...Array(20)].map((user, index) => (
                        <div key={index} className="flex flex-shrink-0 flex-col items-center justify-start gap-1">
                            <div className="h-16 w-16 overflow-hidden rounded-full border-3 border-pink-500">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                    className="h-auto w-auto rounded-full object-cover"
                                    alt="Story"
                                />
                            </div>
                            <p className="text-xs font-bold">User{index + 1}</p>
                        </div>
                    ))}
                </div>


            </nav>
        </>
    );

}