
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


