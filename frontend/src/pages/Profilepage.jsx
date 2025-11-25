import React from "react";
import { Link } from "react-router-dom";
import Editprofile from "../components/Profile/Editprofile.jsx";
export default function Profilepage() {
    return (
        <>

            <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-6 py-20">
                {/* Profile Header */}
                <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden shadow-md">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                            alt="Profile Avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>


                    <h1 className="mt-4 text-xl font-semibold">John Doe</h1>
                    <p className="text-gray-500 text-sm">@johndoe</p>


                    <div className="flex gap-6 mt-4 text-center">
                        <div>
                            <p className="text-lg font-bold">120</p>
                            <p className="text-xs text-gray-500">Posts</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">2.5k</p>
                            <p className="text-xs text-gray-500">Followers</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">180</p>
                            <p className="text-xs text-gray-500">Following</p>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <Editprofile />
                    </div>
                    
                </div>


                {/* Bio Section */}
                <div className="w-full max-w-md bg-white mt-4 p-4 rounded-2xl shadow">
                    <h2 className="font-semibold text-lg">About</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Web Developer | React | Node.js | UI/UX Enthusiast
                    </p>
                </div>


                {/* Posts Grid */}
                <div className="w-full max-w-md mt-4 grid grid-cols-3 gap-2">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-300 rounded-xl"></div>
                    ))}
                </div>

                <div className="w-full max-w-md bg-white mt-4 p-4 rounded-md shadow text-center cursor-pointer hover:bg-gray-200">
                    <button className='font-bold text-md cursor-pointer'>Log Out</button>
                </div>


            </div>
        </>
    );
}
