import React, {} from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Bell, MessageCircleHeart,SignalMedium} from 'lucide-react';

export default function Navbar() {

    return (
        <>
            <nav className="fixed top-0 right-0 left-0 z-50 h-14 bg-white shadow-md dark:bg-black">
                <div className="bordermode flex h-full items-center justify-between border-b px-2">
                    <p className="font-Instagram flexrow gap-1 text-2xl">River<SignalMedium className='animate-pulse'/></p>

                    <div className="flex items-center gap-3">
                        {/* Notifications */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="transition hover:scale-105">
                                    <Bell size={28} />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent className="popover-animate bordermode mt-2 w-64 rounded-md border shadow-lg">
                                <p className="text-sm">No notifications</p>
                            </PopoverContent>
                        </Popover>

                        {/* Messages */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="transition hover:scale-105">
                                    <MessageCircleHeart size={28} />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent className="popover-animate bordermode mt-2 w-80 rounded-md border shadow-lg">
                                <p className="text-sm">No messages</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </nav>
        </>
    );
}

