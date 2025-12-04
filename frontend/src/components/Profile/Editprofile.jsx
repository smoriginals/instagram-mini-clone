import React, { useState } from "react";
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
import { useGlobal } from "../../Context/GlobalContext";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Editprofile() {

    const navigate = useNavigate();
    const { user, UpdateUserProfile } = useGlobal();

    const [profileData, setProfileData] = useState({
        _id:user?._id||"",
        name: user?.name || "",
        username: user?.username || "",
        bio: user?.bio || "",
    })

    const UpdateProfile = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({...prev,[name]: value,}));
    };
    //const HandleSaveProfileData = async () => {
    //    //const res = await UpdateUserProfile(profileData);
    //    //if (!res.ok) {
    //    //    toast.error(res.message);
    //    //    return;
    //    //}

    //    //toast.success("Profile Update");
    //    //navigate("/profile");

    //    //UpdateUserProfile({ _id: user?._id, name: profileData.name, username: profileData.username, });
    //    const res = await UpdateUserProfile({
    //        _id: user?._id,               // MUST BE SENT
    //        name: profileData.name,
    //        username: profileData.username
    //    });

    //    if (!res.ok) {
    //        toast.error(res.message);
    //        return;
    //    }

    //    toast.success("Profile Updated");

    //}

    const HandleSaveProfileData = async () => {

        const res = await UpdateUserProfile({
            _id: user?._id,
            name: profileData.name,
            username: profileData.username,
            bio: profileData.bio
        });

        if (!res.ok) {
            toast.error(res.message);
            return;
        }

        toast.success("Profile Updated");
        navigate("/profile");
    };



    return (

        <Dialog>
            <DialogTrigger asChild>
                <button className="text-md rounded-md border border-gray-600 p-2 px-4 font-semibold shadow">
                    Edit Profile
                </button>
            </DialogTrigger>
            <DialogContent className="border border-gray-600" onOpenAutoFocus={(e) => e.preventDefault()} >

                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        <span>Update your profile information, Visit <a href='/dashboard'><u>Dashboard</u></a> for Advance. </span>
                    </DialogDescription>
                </DialogHeader>

                {/* Profile Photo */}
                <div className="flex items-center justify-start gap-4">
                    <img
                        src="https://i.pravatar.cc/150?img=5"
                        alt="Profile"
                        className="h-18 w-18 rounded-full border-2 border-pink-500 object-cover p-0.5"
                    />
                    <input type="file" accept="image/*" onChange={(e) => console.log(e.target.files[0])} className="hidden" id="imgPick" />
                    <label htmlFor="imgPick" className="cursor-pointer rounded-md border border-gray-600 px-2 py-1 font-semibold">Upload Profile Photo</label>

                </div>

                {/* Name */}
                <div className="">
                    <label className="px-2 text-sm font-medium">Name</label>
                    <Input placeholder="Full Name" name="name" value={profileData.name} className='border border-gray-400' onChange={UpdateProfile} />
                </div>

                {/* Username */}
                <div className="">
                    <label className="px-2 text-sm font-medium">Username</label>
                    <Input placeholder="yourusername" name="username" value={profileData.username}  className='border border-gray-400' onChange={UpdateProfile} />
                </div>

                {/* Bio */}
                <div className="">
                    <label className="px-2 text-sm font-medium">Bio</label>
                    <Textarea
                        placeholder="Tell something about yourself..."
                        className="resize-none border border-gray-400"
                        name="bio" value={profileData.bio} onChange={UpdateProfile}
                    />
                </div>

                {/* Gender */}
                {/*<div className="">*/}
                {/*    <label className="text-sm font-medium">Gender</label>*/}
                {/*    <Select>*/}
                {/*        <SelectTrigger>*/}
                {/*            <SelectValue placeholder="Select gender" />*/}
                {/*        </SelectTrigger>*/}
                {/*        <SelectContent className='border'>*/}
                {/*            <SelectItem value="male">Male</SelectItem>*/}
                {/*            <SelectItem value="female">Female</SelectItem>*/}
                {/*            <SelectItem value="other">Other</SelectItem>*/}
                {/*            <SelectItem value="prefer-not">Prefer not to say</SelectItem>*/}
                {/*        </SelectContent>*/}
                {/*    </Select>*/}
                {/*</div>*/}

                {/* Website */}
                {/*<div className="">*/}
                {/*    <label className="px-2 text-sm font-medium">Website</label>*/}
                {/*    <Input placeholder="https://yourwebsite.com" className='border border-gray-400' />*/}
                {/*</div>*/}

                {/* Email */}
                {/*<div className="">*/}
                {/*    <label className="px-2 text-sm font-medium">Email</label>*/}
                {/*    <Input placeholder="your@email.com" className='border border-gray-400' />*/}
                {/*</div>*/}

                <DialogFooter className="mt-2">
                    <DialogClose asChild>
                        <Button variant="outline" className='border border-gray-600 font-bold'>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className='border border-gray-600 font-bold' onClick={HandleSaveProfileData}>Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
