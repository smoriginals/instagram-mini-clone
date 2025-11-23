import React from "react";
import { Home, Search, PlusCircle, PlayCircle, User } from "lucide-react";

export default function Bottombar() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t flex justify-around items-center z-50">
            <Home className={`w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out `} />
            <Search className={`w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out `} />
            <PlusCircle className={`w-10 h-10 hover:scale-120 transition-all duration-300 ease-in-out `} />
            <PlayCircle className={`w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out `} />
            <User className={`w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out `} />
        </nav>
    );
}
