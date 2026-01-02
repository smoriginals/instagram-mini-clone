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
import { useGlobal } from "../../Context/GlobalContext";
import { useEffect } from "react";


export default function SearchIcon() {

    const [query, setQuery] = useState('')
    const { errors, SearchUsers, appUsers, } = useGlobal();


    useEffect(() => {
        if (!query.trim()) {
            SearchUsers(""); // 👈 reset results
            return;
        }

        const delay = setTimeout(() => {
            SearchUsers(query);
        }, 400);

        return () => clearTimeout(delay);
    }, [query]);


    return (
        <>
            <Drawer direction="top"> {/* ⭐ IMPORTANT → Opens from TOP */}
                <DrawerTrigger asChild>
                    <Search className="w-7 h-7 cursor-pointer hover:scale-120 transition-all duration-300 ease-in-out" />
                </DrawerTrigger>

                <DrawerContent className="h-[60vh] p-4 rounded-b-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Search Users</h2>

                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" onClick={() => setQuery("")}>
                                <X />
                            </Button>
                        </DrawerClose>
                    </div>

                    {/* Search Input */}
                    <Input
                        placeholder="Search username..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="mb-4 border border-gray-600"
                    />

                    {/* Results container */}
                    <div className="mt-2 space-y-3 overflow-y-auto h-[70%]">

                        {/* No input */}
                        {!query.trim() && (
                            <p className="text-md text-gray-600 text-center">
                                Type to search...
                            </p>
                        )}

                        {/* Error */}
                        {query.trim() && errors && (
                            <p className="text-sm text-red-500 text-center">
                                {errors}
                            </p>
                        )}

                        {/* Results */}
                        {query.trim() && !errors && appUsers.map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-muted"
                            >
                                <img
                                    src={user?.userProfile}
                                    className="h-10 w-10 rounded-full object-cover"
                                    alt="users"
                                />
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </DrawerContent>
            </Drawer>
        </>
    )
}