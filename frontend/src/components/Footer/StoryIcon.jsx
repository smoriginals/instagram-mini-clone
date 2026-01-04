import React, { useRef, useState,useEffect } from "react";
import { PlayCircle, Loader2, Eye } from "lucide-react";
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
import userIcon from '../../assets/user.png';


export default function StoryIcon() {

    const { user } = useGlobal();
    const { viewStory ,stories:myStory } = useStory();

    const sampleImage = userIcon;

    const STORY_TIMEOUT = 5000; //ms
    const [currentIndex, setCurrentIndex] = useState(0);

    // eslint-disable-next-line no-unused-vars
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    
    const startStory = () => {

        clearTimers();
        setProgress(0);

        intervalRef.current = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 2 : 100));
        }, STORY_TIMEOUT / 50)

        timeoutRef.current = setTimeout(() => {
            nextStory();
        }, STORY_TIMEOUT);
    }


    const nextStory = () => {
        clearTimers();
        
        setCurrentIndex((prev) => {
            if (prev < stories.length - 1) {
                setTimeout(startStory, 50);
                return prev + 1;
            } else {
                handleClose();
                return prev;
            }
        });
    }
    const clearTimers = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    const handleOpen = async (isOpen) => {
        
        setOpen(isOpen);

        if (isOpen && user?._id) {
            setLoading(true);
            const res = await viewStory(user._id);
            console.log("Storys Data:", res);
            if (res.success && res.story.length > 0) {
                setStories(res.story);
                setCurrentIndex(0);
                setProgress(0);
                
            }
            setLoading(false);
        }

        if (!isOpen) {
            handleClose();
        }
    };

    const handleClose = () => {
        clearTimers();
        setOpen(false);
        setStories([]);
        setCurrentIndex(0);
        setProgress(0);
    };

    useEffect(() => {
        if (!open) return;
        if (stories.length === 0) return;

        startStory();

        return () => {
            clearTimers();
        };
    }, [currentIndex, open, stories.length]);


    const hasStory = (userId) => {
        return myStory?.some(story => story.userId === userId);
    }
  

    return (
        <>
            <Drawer open={open} onOpenChange={handleOpen}>
                <DrawerTrigger asChild>
                    <PlayCircle size={28} className="h-7 w-7 transition-all duration-300 ease-in-out hover:scale-120" />
                </DrawerTrigger>

                <DrawerContent>

                    {/* Rounded Progress Bar */}
                    <div className="mt-3 flex w-full flex-row justify-center gap-1 px-3">
                        {
                            stories.map((story,index) => {

                                return (
                                    < div key={story._id} className="h-1 w-full overflow-hidden rounded-full bg-white" >
                                        <div className="h-full rounded-full bg-pink-500"
                                            style={{
                                                width:
                                                    index < currentIndex
                                                        ? "100%"
                                                        : index === currentIndex
                                                            ? `${progress}%`
                                                            : "0%",
                                            }}
                                        ></div>
                                    </div>
                                )
                                   
                            })
                        }

                    </div>

                    {/* Username */}
                    <div className="mt-4 flex items-center justify-start gap-2 px-3 text-center">
                        <div className='flex items-center justify-start gap-2'>
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${hasStory(user._id) ? "border border-pink-500" : "" }`}>
                                <img src={`${user?.userProfile || sampleImage}`} alt='User Avatar' className='h-6 w-6 rounded-full object-cover' />
                            </div>
                            <p className="text-lg font-semibold tracking-wide">{user?.name}</p>
                        </div>
                    </div>

                    {/* Story Photo */}
                    <div className="relative mt-4 flex h-[80vh] w-full justify-center overflow-auto px-3">
                        
                        {loading ? (
                            <Loader2 className='animate-spin' />
                        ) : stories.length > 0 ? (
                            <img
                                src={stories[currentIndex]?.image}
                                alt="story"
                                className="bordermode h-full w-full rounded-md border object-cover p-1"
                            />
                        ) : (
                            <p className='animate-pulse'>No story available</p>
                        )}
                        <div className='bordermode absolute bottom-2 flex h-6 w-14 items-center justify-center gap-2 rounded-full border-b-1 p-0.5'><Eye size={16} /><p className='text-sm'>0</p></div>
                    </div>

                    {/* Close Button */}
                    <DrawerClose className="px-3 py-4">
                        <Button variant="outline" className="bordermode w-full border">Close</Button>
                    </DrawerClose>

                </DrawerContent>


            </Drawer>
        </>
    )
}