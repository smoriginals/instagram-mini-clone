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
                <Button className="bg-blue-500 text-white font-semibold">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]" onOpenAutoFocus={(e) => e.preventDefault()} >

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
                    <label htmlFor="imgPick" className="cursor-pointer font-bold p-1.5 rounded-md border border-gray-400">Upload Image</label>

                </div>

                {/* Name */}
                <div className="">
                    <label className="text-sm font-medium">Name</label>
                    <Input placeholder="Full Name" />
                </div>

                {/* Username */}
                <div className="mt-4">
                    <label className="text-sm font-medium">Username</label>
                    <Input placeholder="yourusername" />
                </div>

                {/* Bio */}
                <div className="">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea
                        placeholder="Tell something about yourself..."
                        className="resize-none"
                    />
                </div>

                {/* Gender */}
                <div className="">
                    <label className="text-sm font-medium">Gender</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Website */}
                <div className="">
                    <label className="text-sm font-medium">Website</label>
                    <Input placeholder="https://yourwebsite.com" />
                </div>

                {/* Email */}
                <div className="">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="your@email.com" />
                </div>

                <DialogFooter className="mt-2">
                    <DialogClose asChild>
                        <Button variant="outline" className='font-bold'>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className='bg-blue-500 font-bold'>Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}
