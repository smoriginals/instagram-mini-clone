import React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Editprofile() {

    return (

        <Dialog>
            <DialogTrigger asChild>
                <button className="p-2 px-4 border-gray-600 rounded-md border shadow text-md font-semibold">
                    Edit Profile
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] border border-gray-600" onOpenAutoFocus={(e) => e.preventDefault()} >

                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your profile information and click save.
                    </DialogDescription>
                </DialogHeader>

                {/* Profile Photo */}
                <div className="flex justify-start items-center gap-4">
                    <img
                        src="https://i.pravatar.cc/150?img=5"
                        alt="Profile"
                        className="h-18 w-18 rounded-full object-cover border-2 p-0.5 border-pink-500"
                    />
                    <input type="file" accept="image/*" onChange={(e) => console.log(e.target.files[0])} className="hidden" id="imgPick" />
                    <label htmlFor="imgPick" className="cursor-pointer font-bold p-1.5 rounded-md border border-gray-600">Upload Image</label>

                </div>

                {/* Name */}
                <div className="">
                    <label className="text-sm font-medium px-2">Name</label>
                    <Input placeholder="Full Name" className='border border-gray-400' />
                </div>

                {/* Username */}
                <div className="mt-4">
                    <label className="text-sm font-medium px-2">Username</label>
                    <Input placeholder="yourusername" className='border border-gray-400' />
                </div>

                {/* Bio */}
                <div className="">
                    <label className="text-sm font-medium px-2">Bio</label>
                    <Textarea
                        placeholder="Tell something about yourself..."
                        className="resize-none border border-gray-400"
                    />
                </div>

                {/* Gender */}
                <div className="">
                    <label className="text-sm font-medium ">Gender</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className='border '>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Website */}
                <div className="">
                    <label className="text-sm font-medium px-2">Website</label>
                    <Input placeholder="https://yourwebsite.com" className='border border-gray-400' />
                </div>

                {/* Email */}
                <div className="">
                    <label className="text-sm font-medium px-2">Email</label>
                    <Input placeholder="your@email.com" className='border border-gray-400'/>
                </div>

                <DialogFooter className="mt-2">
                    <DialogClose asChild>
                        <Button variant="outline" className='font-bold border border-gray-600'>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className='border border-gray-600 font-bold'>Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
