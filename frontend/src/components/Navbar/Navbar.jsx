import React from "react";  
import NotificationIcon from "./NotificationIcon";
import MessageIcon from "./MessageIcon";
export default function Navbar() {  

    return (  
        <nav className="fixed top-0 right-0 left-0 h-14 bg-white dark:bg-black border-b dark:border-neutral-700 flex justify-between items-center z-50">
            <div className="flex h-14 w-full items-center justify-between bg-white dark:bg-black px-2 border-b dark:border-neutral-700">
                <div className="flex h-10 w-auto items-center justify-center px-2">
                    <p className="text-xl font-bold">Instagram</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <NotificationIcon />
                    <MessageIcon />
                </div>
            </div>
        </nav>

    );  
}

