import React, {  } from 'react';
import { ChevronLeft, Rss, UserRoundCheck, UserRoundPlus, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import userIcon from '../assets/user.png';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGlobal } from '../Context/GlobalContext';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export default function ExploreUsers() {

    const navigate = useNavigate();
    const sampleImage = userIcon;
    const { users, user:loggedIn, FollowUnFollowUsers } = useGlobal();
    
    const currentUser = users.filter(u => u._id !== loggedIn._id);
   

    return (
        <>
            <div className='mt-4 px-2'>
                <ChevronLeft size={30} onClick={() => { navigate('/home') }} />
            </div>


            <div className="my-2 flex w-full flex-col gap-2 overflow-y-auto px-2">

                <h1 className="px-2 text-4xl font-bold">Follow & Explore</h1>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full px-2 text-gray-500"

                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Note for Users</AccordionTrigger>
                        <AccordionContent className=" flex flex-col gap-4 text-sm font-semibold">
                            <p>Certain features are currently in development. If you encounter any issues, they will be addressed soon.
                                Share bug reports or improvement suggestions to become a Beta Tester and have your name enrolled as a tester.</p>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>


                {
                    currentUser.map((user) => (


                        <div key={user._id} className="flex h-12 items-center justify-between rounded-full border border-gray-600 px-1">
                            <div className='flex items-center justify-start gap-1'>
                                <div className='flex h-10 w-10 items-center justify-center rounded-full border'>
                                    <img src={user?.userProfile||sampleImage} className='h-9 w-9 rounded-full object-contain' />
                                </div>
                                <div>
                                    <p className='text-xl font-bold'>{user?.username}</p>
                                </div>
                            </div>
                            <div>
                                <Dialog>
                                    <form>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className='text-md rounded-full'>Profile View</Button>
                                        </DialogTrigger>
                                        <DialogContent className="popover-animate sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>{user?.name}</DialogTitle>
                                                <DialogDescription>
                                                    {user?.bio}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className='flex flex-col items-center justify-center gap-4'>
                                                <div className="flex items-center justify-center">
                                                    <img src={user?.userProfile||sampleImage} alt='profile picture' className='h-18 w-18 rounded-full border object-contain' />
                                                </div>
                                                <div className='text-md flex h-10 items-center justify-evenly font-semibold'>
                                                    <div className='flex flex-col items-center justify-center p-2'>
                                                        <Rss />{user?.posts?.length} Posts</div>

                                                    <div className='flex flex-col items-center justify-center p-2'><UserRoundCheck />{loggedIn?.following.length} Followers</div>

                                                    <div className='flex flex-col items-center justify-center p-2'><UserRoundPlus />{loggedIn?.followers.length} Follow</div>
                                                </div>
                                            </div>

                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button className='text-md font-bold'>Cancel</Button>
                                                </DialogClose>
                                                <Button onClick={() => FollowUnFollowUsers(user._id)} type="submit" className='text-md bg-blue-500 font-bold text-white'><UserRoundPlus />
                                                    {loggedIn.following.includes(user._id) ? "Following" : "Follow"}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </form>
                                </Dialog>
                            </div>
                        </div>
                    ))

                }

            </div>
        </>
    )
}