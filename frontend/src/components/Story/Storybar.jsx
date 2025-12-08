import React from 'react';
import AddStoryIcon from './AddStoryIcon';
import { useGlobal } from '../../Context/GlobalContext';

export default function Storybar() {

    const { OpenStoryDrawer, user } = useGlobal();
    const sampleImage = 'https://i.pravatar.cc/150?img=65';

    return (
        <>
            <nav className="mt-14 flex justify-start items-center bg-gray-600 p-1">

                {/* YOUR STORY */}
                <div className="h-24 w-24 flex flex-col justify-center items-center p-1.5">

                    {/* Avatar Wrapper */}
                    <div className="overflow-hidden flex justify-center items-center rounded-full h-16 w-16 border-5 border-double border-pink-500">
                        <img
                            src={`${user?.userProfile||sampleImage}` }
                            alt="User Avatar"
                            className="h-auto w-auto object-cover rounded-full"
                            onClick={OpenStoryDrawer} />
                    </div>
                    <AddStoryIcon/>
                    <p className="mt-1 text-xs font-bold">Your Story</p>
                </div>

                <div className="flex p-1.5 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-all duration-300 ease-in-out  [scroll-behavior:smooth]">

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((user, index) => (
                        <div key={index} className="flex flex-shrink-0 flex-col items-center justify-start gap-1">
                            <div className="h-16 w-16 overflow-hidden rounded-full border-3 border-pink-500">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                    className="h-auto w-auto object-cover rounded-full"
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