//import React, { } from 'react';
//import { ChevronLeft, Rss, UserRoundCheck, UserRoundPlus } from 'lucide-react';
//import { useNavigate } from 'react-router-dom';
//import userIcon from '../assets/user.png';
//import { Button } from "@/components/ui/button"
//import {
//    Dialog,
//    DialogClose,
//    DialogContent,
//    DialogDescription,
//    DialogFooter,
//    DialogHeader,
//    DialogTitle,
//    DialogTrigger,
//} from "@/components/ui/dialog"
//import { useGlobal } from '../Context/GlobalContext';
//import {
//    Accordion,
//    AccordionContent,
//    AccordionItem,
//    AccordionTrigger,
//} from "@/components/ui/accordion"


//export default function ExploreUsers() {

//    const sampleImage = userIcon;
//    const navigate = useNavigate();
//    const { users, user: loggedIn, FollowUnFollowUsers } = useGlobal();

//    const safeUsers = Array.isArray(users) ? users : [];
//    const safeLoggedIn = loggedIn || {};

//    const safeFollowing = Array.isArray(safeLoggedIn.following) ? safeLoggedIn.following : [];
//    const safeFollowers = Array.isArray(safeLoggedIn.followers) ? safeLoggedIn.followers : [];


//    //const currentUser = safeUsers.filter(u => u._id !== loggedIn._id);
//    const currentUser = safeUsers.filter(
//        u => u?._id && u._id !== safeLoggedIn?._id
//    );



//    return (
//        <>
//            <div className='mt-4 px-2'>
//                <ChevronLeft size={30} onClick={() => { navigate('/home') }} />
//            </div>


//            <h1 className="my-2 px-2 text-4xl font-bold md:px-4">Follow & Explore</h1>
//            <Accordion
//                type="single"
//                collapsible
//                className="w-full px-2 text-gray-500 md:px-4"

//            >
//                <AccordionItem value="item-1">
//                    <AccordionTrigger>Note for Users</AccordionTrigger>
//                    <AccordionContent className=" flex flex-col gap-4 text-sm font-semibold">
//                        <p>Certain features are currently in development. If you encounter any issues, they will be addressed soon.
//                            Share bug reports or improvement suggestions to become a Beta Tester and have your name enrolled as a tester.</p>
//                    </AccordionContent>
//                </AccordionItem>

//            </Accordion>
//            <div className="my-2 flex h-full w-full flex-col gap-2 overflow-y-auto p-2 md:p-4">

//                {
//                    currentUser.map((user) => {

//                        const isFollowing = Array.isArray(safeLoggedIn.following)
//                            ? safeLoggedIn.following.includes(loggedIn._id)
//                            : false;

//                        return (

//                            <div key={user._id} className="bordermode flex h-12 items-center justify-between rounded-full border px-1 md:h-20 md:rounded-md md:px-2">
//                                <div className='flex items-center justify-start gap-1 md:gap-3'>
//                                    <div className='flex h-10 w-10 items-center justify-center rounded-full border md:h-16 md:w-16 md:rounded-md'>
//                                        <img src={user?.userProfile || sampleImage} className='h-9 w-9 rounded-full object-cover' />
//                                    </div>
//                                    <div>
//                                        <p className='text-xl font-bold'>{user?.username}</p>
//                                    </div>
//                                </div>
//                                <div>
//                                    <Dialog>

//                                        <DialogTrigger asChild>
//                                            <Button variant="outline" className='text-md rounded-full md:h-16 md:rounded-md'>Profile View</Button>
//                                        </DialogTrigger>
//                                        <DialogContent className="popover-animate sm:max-w-[425px]">
//                                            <DialogHeader>
//                                                <DialogTitle className='md:text-center'>{user?.name}</DialogTitle>
//                                                <DialogDescription>
//                                                    {user?.bio}
//                                                </DialogDescription>
//                                            </DialogHeader>
//                                            <div className='flex flex-col items-center justify-center gap-4'>
//                                                <div className="flex items-center justify-center">
//                                                    <img src={user?.userProfile || sampleImage} alt='profile picture' className='h-18 w-18 rounded-full border object-cover' />
//                                                </div>
//                                                <div className='text-md flex h-10 items-center justify-evenly font-semibold'>
//                                                    <div className='flex flex-col items-center justify-center p-2'>
//                                                        <Rss />{Array.isArray(user?.post) ? user.posts.length : 0} Posts</div>

//                                                    <div className='flex flex-col items-center justify-center p-2'><UserRoundCheck />
//                                                        {/*{safeFollowers.length}*/}
//                                                        {Array.isArray(user?.followers) ? user.followers.length : 0}
//                                                        Followers
//                                                    </div>

//                                                    <div className='flex flex-col items-center justify-center p-2'><UserRoundPlus />
//                                                        {Array.isArray(user?.following) ? user.following.length : 0}
//                                                        {/*{safeFollowing.length}*/}
//                                                        Follow
//                                                    </div>
//                                                </div>
//                                            </div>

//                                            <DialogFooter className='md:mx-auto'>
//                                                <DialogClose asChild>
//                                                    <Button className='text-md font-bold'>Cancel</Button>
//                                                </DialogClose>

//                                                <Button onClick={() => user?._id && FollowUnFollowUsers(user._id)} type="button" className='text-md bg-blue-500 font-bold text-white'><UserRoundPlus />
//                                                    {/*{safeFollowing.includes(user._id) ? "Following" : "Follow"}*/}
//                                                    {isFollowing ? "Following" : "Follow"}
//                                                </Button>
//                                            </DialogFooter>
//                                        </DialogContent>

//                                    </Dialog>
//                                </div>
//                            </div>
//                        )
//                    })

//                }

//            </div>
//        </>
//    )
//}

import React from "react";
import { ChevronLeft, Rss, UserRoundCheck, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import userIcon from "../assets/user.png";
import { useGlobal } from "../Context/GlobalContext";

export default function ExploreUsers() {
    const navigate = useNavigate();
    const { users, user, FollowUnFollowUsers } = useGlobal();

    const safeUsers = Array.isArray(users) ? users : [];
    const safeFollowing = Array.isArray(user?.following) ? user.following : [];

    const visibleUsers = safeUsers.filter(
        u => u?._id && u._id !== user?._id
    );

    return (
        <>
            <div className="mt-4 px-2">
                <ChevronLeft size={30} onClick={() => navigate("/home")} />
            </div>

            <h1 className="my-2 px-2 text-4xl font-bold">Follow & Explore</h1>

            <Accordion type="single" collapsible className="px-2">
                <AccordionItem value="note">
                    <AccordionTrigger>Note for Users</AccordionTrigger>
                    <AccordionContent>
                        Some features are in development.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="flex flex-col gap-2 p-2">
                {visibleUsers.map(u => {
                    const isFollowing = safeFollowing.includes(u._id);

                    return (
                        <div
                            key={u._id}
                            className="flex items-center justify-between rounded border p-2"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={u.userProfile || userIcon}
                                    className="h-12 w-12 rounded-full border object-cover"
                                />
                                <p className="font-bold">{u.username}</p>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Profile</Button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{u.name}</DialogTitle>
                                        <DialogDescription>{u.bio}</DialogDescription>
                                    </DialogHeader>

                                    <div className="flex justify-evenly font-semibold">
                                        <div><Rss /> {u.posts?.length || 0}</div>
                                        <div><UserRoundCheck /> {u.followers?.length || 0}</div>
                                        <div><UserRoundPlus /> {u.following?.length || 0}</div>
                                    </div>

                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>

                                        <Button
                                            type="button"
                                            onClick={() => FollowUnFollowUsers(u._id)}
                                            className="bg-blue-500 text-white"
                                        >
                                            {isFollowing ? "Following" : "Follow"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

