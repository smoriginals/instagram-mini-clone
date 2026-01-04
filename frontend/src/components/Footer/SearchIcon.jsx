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
import { useStory } from "../../Context/StoryContext";


export default function SearchIcon() {

    const [query, setQuery] = useState('')
    const { errors, SearchUsers, appUsers, } = useGlobal();
    const { stories: myStory } = useStory();

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

    const hasStory = (userId) => {
        return myStory?.some(story => story.userId === userId);
    }
  
    return (
        <>
            <Drawer direction="top"> {/* ⭐ IMPORTANT → Opens from TOP */}
                <DrawerTrigger asChild>
                    <Search size={28} className="h-7 w-7 cursor-pointer transition-all duration-300 ease-in-out hover:scale-120" />
                </DrawerTrigger>

                <DrawerContent className="h-[60vh] rounded-b-2xl p-4">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
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
                        className="mb-4 border bordermode"
                    />

                    {/* Results container */}
                    <div className="mt-2 h-[70%] space-y-3 overflow-y-auto">

                        {/* No input */}
                        {!query.trim() && (
                            <p className="text-md text-center text-gray-600">
                                Type to search...
                            </p>
                        )}

                        {/* Error */}
                        {query.trim() && errors && (
                            <p className="text-center text-sm text-red-500">
                                {errors}
                            </p>
                        )}

                        {/* Results */}
                        {query.trim() && !errors && appUsers.map((user) => (
                            <div
                                key={user._id}
                                className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-muted"
                            >
                                <img
                                    src={user?.userProfile}
                                    className={`h-10 w-10 rounded-full object-cover ${hasStory(user._id) ? "border-2 border-pink-500" : "" }`}
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