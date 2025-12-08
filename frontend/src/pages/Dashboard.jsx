import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Heart,
    MessageCircle,
    Share2,
    ImageIcon,
    Users,
    UserPlus,
    Edit,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera } from "lucide-react";
import { BookmarkIcon, HeartIcon, Send, MessageCircleMore } from "lucide-react"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useGlobal } from "../Context/GlobalContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {

    const { user, UpdateUserProfile, UploadProfilePicture } = useGlobal();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({

        _id: user?._id || '',
        name: user?.name || '',
        username: user?.username || '',
        bio: user?.bio || '',
        email: user?.email || '',
        password: '',
        confirmPassword: ''
    });

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev => ({ ...prev, [name]: value })));
    }

    //const HandleSubmit = async () => {

    //    if (userData.password !== userData.confirmPassword) {
    //        toast.error("Passwords do not match");
    //        return;
    //    }

    //    const paylode = {
    //        _id: userData._id,
    //        name: userData.name,
    //        username: userData.username,
    //        bio: userData.bio,
    //        email: userData.email,
    //    }

    //    if (userData.password.trim().length > 0) {
    //        paylode.password = userData.password;
    //    }

    //    const res = await UpdateUserProfile(paylode);
    //    if (!res.ok) {
    //        toast.error(res.message);
    //        return;
    //    }
    //    toast.success("Profile Updated Successfully");
    //    navigate('/dashboard');
    //}
    const HandleSubmit = async () => {
        if (!userData.name || !userData.username || !userData.email) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const paylode = {
            _id: userData._id,
            name: userData.name,
            username: userData.username,
            bio: userData.bio,
            email: userData.email,
        };

        if (userData.password.trim().length > 0) {
            paylode.password = userData.password;
        }

        const res = await UpdateUserProfile(paylode);
        if (!res.ok) {
            toast.error(res.message);
            return;
        }
        toast.success("Profile Updated Successfully");
        navigate('/dashboard');
    };

    const [hasUploading, setHasUploading] = useState(false);
    const HandleProfilePictureUpload = async (file) => {

        setHasUploading(true);

        const toastId = toast.loading("Uploading Profile Picture...");

        const res = await UploadProfilePicture(file, user?._id);

        if (res.success) {
            setHasUploading(false);
        }

        if (!res.success) {

            toast.error(res.message, { id: toastId });

            return;
        }

        toast.success('Profile Picture Updated', { id: toastId });

    }

    const sampleImage = 'https://i.pravatar.cc/150?img=65';
    return (
        <>
            <div className="w-full p-3 my-4">
                <h1 className='text-4xl font-bold'>Dashboard</h1>

                <Card className="w-full mt-4 mb-6 border border-gray-600 bg-gradient-to-tr from-yellow-300 via-yellow-500 to-yellow-400">

                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            <p className='text-md font-semibold text-black'>Update your profile Picture.</p>
                        </CardDescription>
                        {/*<CardAction>*/}
                        {/*    <button type="file" accept="image/*" id="imgPick"  className='cursor-pointer h-20 w-20 rounded-full border border-gray-600 flex justify-center items-center' onChange={(e) => { HandleProfilePictureUpload(e.target.files[0]) }} disabled={hasUploading} >*/}

                        {/*        <img src={user?.userProfile || sampleImage} alt="user Avatar" className='h-auto w-auto object-cover rounded-full'*/}
                        {/*        />*/}

                        {/*    </button>*/}
                        {/*</CardAction>*/}
                        <CardAction>
                            <label htmlFor="imgPick" className="cursor-pointer h-20 w-20 rounded-full border border-gray-600 flex justify-center items-center">
                                <img src={user?.userProfile || sampleImage} alt="user Avatar" className="h-20 w-20 object-cover rounded-full" />
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="imgPick"
                                className="hidden"
                                onChange={(e) => HandleProfilePictureUpload(e.target.files[0])}
                                disabled={hasUploading}
                            />
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <CardTitle>Lifetime Data</CardTitle>

                        <ToggleGroup type="multiple" variant="outline" spacing={2} size="sm" className='py-2 flex justify-start flex-wrap'>

                            <ToggleGroupItem
                                value="star"
                                aria-label="Toggle star"
                                className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-black border border-gray-600"
                            >
                                <HeartIcon />
                                Likes
                            </ToggleGroupItem>

                            <ToggleGroupItem
                                value="heart"
                                aria-label="Toggle heart"
                                className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-black data-[state=on]:*:[svg]:stroke-black border border-gray-600 "
                            >
                                <Send />
                                Shares
                            </ToggleGroupItem>

                            <ToggleGroupItem
                                value="bookmark"
                                aria-label="Toggle bookmark"
                                className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-black border border-gray-600 "
                            >
                                <BookmarkIcon />
                                Saves
                            </ToggleGroupItem>

                            <ToggleGroupItem
                                value="comment"
                                aria-label="Toggle comment"
                                className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-black border border-gray-600 "
                            >

                                <MessageCircleMore />
                                Comments
                            </ToggleGroupItem>

                        </ToggleGroup>
                    </CardContent>

                </Card>

                <form>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend className='text-xl font-bold mt-4'>Privacy Setting</FieldLegend>
                            {/*<FieldDescription>*/}
                            {/*    All transactions are secure and encrypted*/}
                            {/*</FieldDescription>*/}
                            <FieldGroup>
                                <Field>
                                    <FieldLabel className='text-md font-bold'>
                                        Name
                                    </FieldLabel>
                                    <Input placeholder="Your Name" name='name' value={userData.name} onChange={HandleChange} className='border border-gray-600' />
                                </Field>
                                <Field>
                                    <FieldLabel className='text-md font-bold'>
                                        Username
                                    </FieldLabel>
                                    <Input placeholder="Username" name='username' value={userData.username} onChange={HandleChange} className='border border-gray-600' />
                                </Field>
                                <Field>
                                    <FieldLabel className='text-md font-bold'>
                                        Email
                                    </FieldLabel>
                                    <Input placeholder="example@email.com" name='email' value={userData.email} onChange={HandleChange} className='border border-gray-600' />
                                </Field>
                                <Field>
                                    <FieldLabel className='text-md font-bold'>
                                        Password
                                    </FieldLabel>

                                    <Input placeholder="New Password"
                                        name="password"
                                        type="password"
                                        value={userData.password || ""}
                                        onChange={HandleChange}
                                        className="border border-gray-600"
                                    />

                                    <Input placeholder="Re-Enter Password"
                                        name="confirmPassword"
                                        type="password"
                                        value={userData.confirmPassword || ""}
                                        onChange={HandleChange}
                                        className="border border-gray-600"
                                    />

                                </Field>
                                <Field>
                                    <FieldLabel className='text-md font-bold'>
                                        Bio
                                    </FieldLabel>
                                    <Textarea placeholder="Update your bio..." name='bio' value={userData.bio} onChange={HandleChange} className='border border-gray-600' />
                                </Field>
                            </FieldGroup>

                        </FieldSet>

                        <div className="flex justify-start gap-4 flex-col">
                            <div className='flex justify-between items-center space-x-2'>
                                <Label className='text-xl'>Private Profile</Label>
                                <Switch />
                            </div>
                            <div className='flex justify-between items-center space-x-2'>
                                <Label className='text-xl'>Step-To-Verification</Label>
                                <Switch />
                            </div>
                        </div>

                        <Field orientation="vertical">
                            <Button type="button" className='border border-gray-600' onClick={HandleSubmit}>Submit</Button>
                            <Button variant="outline" type="button" className='border border-gray-600' onClick={() => { navigate('/settings') }}>
                                Back to Settings
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </>
    );
}
