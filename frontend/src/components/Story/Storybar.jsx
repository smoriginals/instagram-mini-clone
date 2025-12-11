import React from 'react';
import AddStoryIcon from './AddStoryIcon';
import { useGlobal } from '../../Context/GlobalContext';

export default function Storybar() {

    const { OpenStoryDrawer, user } = useGlobal();
    const sampleImage = 'https://i.pravatar.cc/150?img=65';

    return (
        <>
            <nav className="mt-14 flex items-center justify-start p-1">

                {/* YOUR STORY */}
                <div className="flex h-24 w-24 flex-col items-center justify-center p-1.5">

                    {/* Avatar Wrapper */}
                    <div className="border-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-double border-pink-500">
                        <img
                            src={`${user?.userProfile||sampleImage}` }
                            alt="User Avatar"
                            className="h-13 w-13 rounded-full object-cover"
                            onClick={OpenStoryDrawer} />
                    </div>
                    <AddStoryIcon/>
                    <p className="mt-1 text-xs font-bold">Your Story</p>
                </div>

                <div className="flex gap-2 overflow-x-auto p-1.5 transition-all duration-300 ease-in-out [scrollbar-width:none] [scroll-behavior:smooth] [&::-webkit-scrollbar]:hidden">

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((user, index) => (
                        <div key={index} className="flex flex-shrink-0 flex-col items-center justify-start gap-1">
                            <div className="border-3 h-16 w-16 overflow-hidden rounded-full border-pink-500">
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