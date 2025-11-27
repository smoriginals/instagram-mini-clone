import React from 'react';
import AddStoryIcon from './AddStoryIcon';
import { useGlobal } from '../../Context/GlobalContext';
export default function Storybar() {

    const { OpenStoryDrawer } = useGlobal();

    return (
        <>
            <nav className="relative top-14 left-0 right-0 flex h-24 w-full items-center">

                {/* YOUR STORY */}
                <div className="relative flex h-24 w-21 flex-col items-center justify-center p-1 px-3 pt-2">

                    {/* Avatar Wrapper */}
                    <div className="relative h-15 w-15 overflow-hidden rounded-full border-2 border-pink-500 bg-white">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                            alt="User Avatar"
                            className="h-full w-full object-cover"
                            onClick={OpenStoryDrawer} />
                    </div>


                    {/*Add Story icon Button Rendered above.*/}
                    <AddStoryIcon/>
                    {/*Add Story icon Button Rendered above.*/}

                    <p className="mt-1 text-xs font-bold">Your Story</p>
                </div>


                {/* STORIES LIST */}
                <div className="scrollbar-none relative flex h-24 w-full items-center gap-4 overflow-x-auto px-1 transition-all duration-300 ease-in-out  [scroll-behavior:smooth]">

                    {/* Stories */}
                    {[1, 2, 3, 4, 5, 6, 7, 8,9,11,12,13,14,15,16,17,18,19,20].map((user, index) => (
                        <div key={index} className="pt-1 flex flex-shrink-0 flex-col items-center">
                            <div className="h-15 w-15 overflow-hidden rounded-full border-2 border-pink-500">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                    className="h-full w-full object-cover"
                                    alt="story"
                                />
                            </div>
                            <p className="text-xs font-bold pt-1">user{index + 1}</p>
                        </div>
                    ))}

                </div>

            </nav>
        </>
    );

}