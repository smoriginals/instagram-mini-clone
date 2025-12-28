import React, { useState } from 'react';
import { ChevronRight, Upload, LayoutDashboard, ChevronLeft, RefreshCw, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGlobal } from '../../Context/GlobalContext';
import toast from 'react-hot-toast';
import userIcon from '../../assets/user.png';

export default function UserProfile() {

    const navigate = useNavigate();
    const { user, UpdateUserProfile, UploadProfilePicture } = useGlobal();

    const [hasUploading, setHasUploading] = useState(false);

    const sampleImage = userIcon;

    const [profileData, setProfileData] = useState({
        _id: user?._id || "",
        name: user?.name || "",
        username: user?.username || "",
        bio: user?.bio || "",
        email: user?.email || "",
        password: '',
        confirmPassword: '',

    })

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value, }));
    };

    const HandleSaveProfileData = async () => {

        if (profileData.password) {
            if (profileData.password !== profileData.confirmPassword) {
                toast.error('Password not Match');
                return;
            }
        }

        const payload = { _id: profileData._id };

        if (profileData.name !== user.name) payload.name = profileData.name;
        if (profileData.username !== user.username) payload.username = profileData.username;
        if (profileData.bio !== user.bio) payload.bio = profileData.bio;
        if (profileData.email !== user.email) payload.email = profileData.email;

        if (profileData.password) {
            payload.password = profileData.password;
        }
        if (Object.keys(payload).length === 1) {
            toast.error('No changes detected');
            return;
        }

        const res = await UpdateUserProfile(payload);
        if (!res.ok) {
            toast.error(res.message);
            return;
        }
        toast.success('Profile Updated')
        navigate('/settings');

    };


    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    const HandlePick = (e) => {
        const pickImg = e.target.files[0];
        if (!pickImg) {
            return
        }
        setFile(pickImg);
        setPreview(URL.createObjectURL(pickImg));
    }
    // Remove preview
    const handleRemove = () => {
        URL.revokeObjectURL(preview);
        setFile(null);
        setPreview(null);
    };

    const HandleProfilePictureUpload = async () => {

        if (!file) {
            toast.error('Please Select Image!')
            return;
        }
        setHasUploading(true);

        const res = await UploadProfilePicture(file, user?._id);

        setHasUploading(false);

        if (!res?.success) {
            toast.error(res.message || "Upload failed");
            return;
        }
        handleRemove();
        toast.success("Profile picture updated");
    }

    return (
        <>
            <div className='mt-4 px-2'>
                <ChevronLeft size={30} onClick={() => { navigate('/settings') }} />
            </div>

            <div className='flex h-full w-full flex-col px-2 pt-6'>

                <h1 className="px-2 text-4xl font-bold">Edit Profile</h1>


                <div className="mt-3 space-y-1 rounded-lg border border-gray-600 p-2">

                    <h1 className="px-2 text-xl font-bold">User Profile</h1>

                    {/*User Profile Photo*/}
                    <div className='flex flex-row items-center justify-between p-2'>

                        <img
                            src={preview || user?.userProfile || sampleImage}
                            alt="Profile"
                            className={`h-18 w-18 rounded-full object-contain border border-gray-600`}
                        />

                        <div className='flex flex-col items-end justify-end gap-2'>
                            {/*//Handle Image upload here*/}
                            <input type="file" accept="image/*" onChange={HandlePick} className="hidden" id="imgPick" disabled={hasUploading} />
                            {/*//Handle Image upload here*/}

                            <Label htmlFor="imgPick" className={`bg-gray-800 p-2 text-sm rounded-md border ${hasUploading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}>
                                {hasUploading ? 'Uploading...' : 'Choose..'}
                            </Label>

                            <Button variant='outline' onClick={HandleProfilePictureUpload} disabled={hasUploading}>
                                Save
                            </Button>

                        </div>
                    </div>
                    {/*User Profile Photo*/}


                    {/*Name*/}
                    <div className='p-2'>
                        <p className='text-md p-1 font-bold'>Name</p>
                        <Input type="text" name="name" value={profileData.name} onChange={HandleChange} disabled={hasUploading} placeholder="Name" />
                    </div>
                    {/*Name*/}

                    {/*Username*/}
                    <div className='p-2'>
                        <p className='text-md p-1 font-bold'>Username</p>
                        <Input type="text" name="username" value={profileData.username} onChange={HandleChange} disabled={hasUploading} placeholder="@example.xyz" />
                    </div>
                    {/*Username*/}

                    {/*Bio*/}
                    <div className='p-2'>
                        <p className='text-md p-1 font-bold'>Bio</p>
                        <Textarea type="text" placeholder="We are going to Parish on this Weekend..." name="bio" value={profileData.bio} onChange={HandleChange} disabled={hasUploading} />
                    </div>
                    {/*Bio*/}


                </div>

                <div className="mt-2 space-y-1 rounded-lg border border-gray-600 p-2">
                    <h1 className="px-2 text-xl font-bold">Security</h1>
                    {/*Email Handle*/}
                    <div className='p-2'>
                        <p className='text-md p-1 font-bold'>Email</p>
                        <Input type="text" placeholder="example@email.com" name='email' value={profileData.email} onChange={HandleChange} />
                    </div>
                    {/*Email Handle*/}

                    {/*Password*/}
                    <div className='space-y-2 p-2'>
                        <p className='text-md p-1 font-bold'>Password</p>

                        <Input type="password" name='password' value={profileData.password} onChange={HandleChange} placeholder="Enter Password" disabled={hasUploading} />

                        <Input type="password" name="confirmPassword" value={profileData.confirmPassword} onChange={HandleChange} placeholder="Re-Enter Password" disabled={hasUploading} />
                    </div>
                    {/*Password*/}

                </div>


                <div className='mt-4 flex flex-col gap-2'>

                    <Button type="submit" disabled={hasUploading} onClick={HandleSaveProfileData}>Save Profile</Button>

                    <Button variant="outline" type="button" disabled={hasUploading} onClick={() => { navigate('/settings') }}>
                        Back to Settings
                    </Button>

                    <p className='p-1 text-center text-sm font-light text-gray-400'>Your profile changes are ready to be saved. Let's keep your information up to date.
                    </p>
                </div>
            </div>
        </>
    )
}