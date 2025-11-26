import React, { useState } from "react";
import { Search, X } from "lucide-react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"


export default function SearchIcon() {

    const [query, setQuery] = useState("")

    return (
        <>
            <Drawer direction="top"> {/* ⭐ IMPORTANT → Opens from TOP */}
                <DrawerTrigger asChild>
                    <Search className="w-7 h-7 cursor-pointer hover:scale-120 transition-all duration-300 ease-in-out" />
                </DrawerTrigger>

                <DrawerContent className="h-[60vh] p-4 rounded-b-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Search Users</h2>

                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon">
                                <X />
                            </Button>
                        </DrawerClose>
                    </div>

                    {/* Search Input */}
                    <Input
                        placeholder="Search username..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="mb-4"
                    />

                    {/* Results container */}
                    <div className="mt-2 space-y-3 overflow-y-auto h-[70%]">
                        {query.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center">Type to search...</p>
                        ) : (
                            [...Array(10)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                                    <img
                                        src={`https://i.pravatar.cc/150?img=${i + 1}`}
                                        className="h-10 w-10 rounded-full object-cover"
                                        alt=""
                                    />
                                    <div>
                                        <p className="font-semibold">user{i + 1}</p>
                                        <p className="text-xs text-gray-500">@username{i + 1}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}