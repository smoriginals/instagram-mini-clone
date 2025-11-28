import React, { } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer";
import Editprofile from "../Profile/Editprofile";

export default function ProfileIcon() {
    const navigate = useNavigate();
    return (
        <>

            <Drawer>
                <DrawerTrigger asChild>
                    <User className="w-8 h-8 hover:scale-120 transition-all duration-300 ease-in-out" />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-center text-xl font-extrabold">Profile</DrawerTitle>
                    </DrawerHeader>

                    <div className="w-full h-full flex flex-col items-center p-6 overflow-y-auto">
                        {/* Profile Header */}
                        <div className="w-full max-w-md shadow rounded-2xl p-6 flex flex-col items-center border border-gray-600">
                            <div className="relative h-32 w-32 rounded-full overflow-hidden shadow-md">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                                    alt="Profile Avatar"
                                    className="h-full w-full object-cover"
                                />
                            </div>


                            <h1 className="mt-4 text-xl font-semibold">John Doe</h1>
                            <p className="text-sm">@johndoe</p>


                            <div className="flex gap-6 mt-4 text-center">
                                <div>
                                    <p className="text-lg font-bold">120</p>
                                    <p className="text-xs ">Posts</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">2.5k</p>
                                    <p className="text-xs ">Followers</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">180</p>
                                    <p className="text-xs ">Following</p>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <Editprofile />
                            </div>

                        </div>


                        {/* Bio Section */}
                        <div className="w-full max-w-md mt-4 p-4 rounded-2xl shadow border border-gray-600">
                            <h2 className="font-semibold text-lg">About</h2>
                            <p className="text-sm mt-1">
                                Web Developer | React | Node.js | UI/UX Enthusiast
                            </p>
                        </div>


                        {/* Posts Grid */}
                        <div className="w-full max-w-md mt-4 grid grid-cols-3 gap-2">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="aspect-square bg-gray-300 border border-gray-600 rounded-xl"></div>
                            ))}
                        </div>

                        <div className="w-full max-w-md mt-4 p-4 rounded-md shadow border border-gray-600 text-center cursor-pointer" onClick={() => { navigate('/settings') }}>
                            <button className='font-bold text-md cursor-pointer'>Setting</button>
                        </div>

                    </div>

                </DrawerContent>
            </Drawer>
        </>
    )
}
