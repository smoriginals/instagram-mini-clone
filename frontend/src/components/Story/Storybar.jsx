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

import { Camera, Image, X, ArrowUpFromLine, Loader2, Users } from "lucide-react";

import { useGlobal } from '../../Context/GlobalContext';

import { useStory } from "../../Context/StoryContext";
import userIcon from '../../assets/user.png';
import { useNavigate } from 'react-router-dom';
export default function Storybar() {

    const { user, users } = useGlobal();
    const sampleImage = userIcon;

    const navigate = useNavigate();

    const { uploadStory, stories } = useStory();
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

        setUploading(true);

        try {
            const res = await uploadStory(file);
            if (res?.success) {
                handleRemove();
            }
        } catch (error) {
            console.log(error.response?.data || error.message)
        } finally {
            setUploading(false);
        }

    };
    const otherUsers = users.filter(u => u._id !== user._id);

    const hasStory = (userId) => {
        return stories?.some(story => story.userId === userId);
    }

    return (
        <>
            <nav className="bordermode mt-14 flex items-center justify-start border-b p-1 shadow-md">

                {/* YOUR STORY */}
                <div className="flex h-24 w-18 flex-col items-center justify-center p-1.5">

                    {/* Avatar Wrapper */}
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">

                        <Drawer>

                            <DrawerTrigger asChild>
                                <button className={`flex h-16 w-16 items-center justify-center rounded-full  ${hasStory(user._id) ? "border-2 border-pink-500" : ""} p-0.5`}>
                                    <img src={`${user?.userProfile || sampleImage}`} title='User Profile Click here to Add Story]' className='bordermode aspect-square h-14 w-14 rounded-full border object-cover'
                                    />
                                </button>
                            </DrawerTrigger>

                            <DrawerContent className="flex flex-col gap-2 p-2">
                                <h1 className='text-center text-xl font-semibold'>Add Story</h1>


                                {!preview && (
                                    <>
                                        <button
                                            onClick={() => cameraRef.current.click()}
                                            className="p-2 border bordermode rounded flex justify-center items-center"
                                        >
                                            <Camera size={30} />
                                        </button>

                                        <button
                                            onClick={() => galleryRef.current.click()}
                                            className="p-2 border bordermode rounded flex justify-center items-center"
                                        >
                                            <Image size={30} />
                                        </button>

                                        <p className='py-1 text-center text-xl font-semibold'>Choose</p>
                                    </>
                                )}

                                {/* PREVIEW */}
                                {preview && (
                                    <div className="relative h-96 w-full overflow-hidden rounded-md">
                                        <img
                                            src={preview}
                                            alt="story-preview"
                                            className="bordermode h-80 w-full rounded-md border object-contain"
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
                                                {uploading ? <ArrowUpFromLine className='animate-pulse text-white' /> : <ArrowUpFromLine color="white" />}

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

                <div className="bg-red-5000 flex gap-2 overflow-x-auto p-1 transition-all duration-300 ease-in-out
                [scrollbar-width:none] [scroll-behavior:smooth] [&::-webkit-scrollbar]:hidden">

                    {/* USERS */}
                    {otherUsers.slice(0, 5).map((user) => (
                        <div
                            key={user._id}
                            className="flex flex-shrink-0 flex-col items-center justify-start gap-1"
                        >
                            <div className={`h-16 w-16 overflow-hidden rounded-full  ${hasStory(user._id) ? "border-2 border-pink-500" : ""} p-0.5`}>
                                <img
                                    src={user.userProfile || sampleImage}
                                    className="bordermode h-full w-full rounded-full border object-cover"
                                    alt={user.username}
                                />
                            </div>

                            <p className="w-16 truncate text-center text-xs font-bold">
                                {user.username}
                            </p>
                        </div>
                    ))}

                    {/* SHOW MORE BUTTON */}
                    {otherUsers.length >= 0 && (
                        <div className='mb-5 flex flex-col items-center justify-center gap-1'>

                            <div className="bordermode flex h-14 w-14 items-center justify-center rounded-full border px-4" onClick={() => navigate('/explore-users')}>
                                <div >
                                    <p className='flex flex-col items-center justify-center'><Users /></p>
                                </div>

                            </div>
                        </div>

                    )}
                </div>



            </nav>
        </>
    );

}