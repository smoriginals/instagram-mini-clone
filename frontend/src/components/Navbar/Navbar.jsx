import React, {} from "react";
import NotificationIcon from "./NotificationIcon";
import MessageIcon from "./MessageIcon";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Bell, MessageCircleHeart, Waves,SignalMedium} from 'lucide-react';

export default function Navbar() {

    return (
        <>
            <nav className="fixed top-0 right-0 left-0 z-50 h-14 bg-white dark:bg-black">
                <div className="flex h-full items-center justify-between border-b border-gray-200 px-2">
                    <p className="font-Instagram flex flex-row items-center gap-1 text-2xl">River<SignalMedium /></p>

                    <div className="flex items-center gap-3">
                        {/* Notifications */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="transition hover:scale-105">
                                    <Bell size={28} />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent className="popover-animate mt-2 w-64 rounded-md border shadow-lg">
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

                            <PopoverContent className="popover-animate mt-2 w-80 rounded-md border shadow-lg">
                                <p className="text-sm">No messages</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </nav>
        </>
    );
}

