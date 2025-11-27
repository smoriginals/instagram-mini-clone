import React from "react";
import ProfileIcon from "./ProfileIcon";
import HomeIcon from "./HomeIcon";
import SearchIcon from "./SearchIcon";
import PostIcon from "./PostIcon";
import StoryIcon from "./StoryIcon";


export default function Bottombar() {

    return (
        <>

            <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white dark:bg-black border-t flex justify-around items-center z-50">

                <HomeIcon />
                <SearchIcon />
                <PostIcon />
                <StoryIcon />
                <ProfileIcon />

            </nav>
        </>
    );
}
