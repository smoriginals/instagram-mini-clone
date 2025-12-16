import React, { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";
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
import { useStory } from '../../Context/StoryContext';
import { Loader2 } from 'lucide-react'
export default function StoryIcon() {

    const { user } = useGlobal();
    const { viewStory } = useStory();

    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);

    const sampleImage = 'https://i.pravatar.cc/150?img=65';

    //useEffect(() => {

    //    if (!user?._id) return;

    //    const fetchStory = async () => {
    //        setLoading(true);
    //        const res = await viewStory(user._id);
    //        if (res.success) {
    //            setStories(res.story);
    //        }
    //        setLoading(false);
    //        console.log("image recieve data:",res);
    //    };

    //    fetchStory();

    //}, [user]);


    const [open, setOpen] = useState(false);

    const handleOpen = async (isOpen) => {
        setOpen(isOpen);

        if (isOpen && user?._id && stories.length === 0) {
            setLoading(true);
            const res = await viewStory(user._id);
            console.log("Image recieving:", res)
            if (res.success) {
                setStories(res.story);
            }
            setLoading(false);
        }
    };

    
    //useEffect(() => {
    //    const fill = 0;
    //    setInterval(() => {
    //        console.log("alex", fill)
    //        for (const i = 0; i <= ; fill) {
    //            console.log("data chechk:",fill)
    //        }
    //    },100)

    //},[setOpen])


    return (
        <>
            <Drawer open={open} onOpenChange={handleOpen}>
                <DrawerTrigger asChild>
                    <PlayCircle className="h-7 w-7 transition-all duration-300 ease-in-out hover:scale-120" />
                </DrawerTrigger>

                <DrawerContent>

                    {/* Rounded Progress Bar */}
                    <div className="mt-3 flex w-full justify-center px-6 gap-1 flex-row">
                        {
                            stories.map((story) => {

                                return (
                                    < div key={story._id} className="h-1 w-full overflow-hidden rounded-full bg-white" >
                                        <div className="h-full w-[40%] rounded-full bg-pink-500"></div>
                                    </div>
                                )
                                   
                            })
                        }

                    </div>

                    {/* Username */}
                    <div className="mt-4 flex items-center justify-start gap-2 px-6 text-center">
                        <div className='flex items-center justify-start gap-2'>
                            <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-500'>
                                <img src={`${user?.userProfile || sampleImage}`} alt='User Avatar' className='h-6 w-6 rounded-full object-cover' />
                            </div>
                            <p className="text-lg font-semibold tracking-wide">{user?.name}</p>
                        </div>
                    </div>

                    {/* Story Photo */}
                    <div className="mt-4 flex h-[80vh] w-full justify-center overflow-auto px-6">
                        {/*<img*/}
                        {/*    src="https://i.pravatar.cc/700"*/}
                        {/*    alt="story"*/}
                        {/*    className="h-full w-full rounded-md border border-gray-600 object-cover"*/}
                        {/*/>*/}
                        {loading ? (
                            <Loader2 className='animate-spin' />
                        ) : stories.length > 0 ? (
                            <img
                                src={stories[0].image}
                                alt="story"
                                className="h-full w-full rounded-md border border-gray-600 object-cover"
                            />
                        ) : (
                            <p>No story available</p>
                        )}

                    </div>

                    {/* Close Button */}
                    <DrawerClose className="px-6 py-2">
                        <Button variant="outline" className="w-full border border-gray-600">Close</Button>
                    </DrawerClose>

                </DrawerContent>


            </Drawer>
        </>
    )
}