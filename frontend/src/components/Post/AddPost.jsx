import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
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
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Image, SendHorizontal } from "lucide-react";
import toast from 'react-hot-toast';
import { useGlobal } from "../../Context/GlobalContext"


export default function AddPost() {

    const { AddUserPost } = useGlobal();

    const [Submitted, setSubmitted] = useState(false);

    const [postData, setPostData] = useState({
        title: '',
        image: '',
        caption: '',
    });

    const HandleChange = (e) => {
        const { name, value,files } = e.target;
        setPostData((prev) => ({ ...prev, [name]:name==='image'?files[0]: value }))
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (!postData.postTitle || !postData.postImage || !postData.postCaption) {
            toast.error("All Field Required")
            setSubmitted(false);
            return;
        }

        const res = await AddUserPost(postData);
        if (!res.success) {
            toast.error("Internal server Error");
            setSubmitted(false);
            return;
        }
        toast.success("Your Post has been Published");
        setSubmitted(true);
        console.log(postData);
    }

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    {/*<button variant="outline">Add a Post</button>*/}
                    <button className="flex cursor-pointer items-center gap-3 rounded-lg p-3 font-semibold hover:bg-gray-600"

                    >
                        <Image /> Add a Post
                    </button>
                </DrawerTrigger>

                <DrawerContent>
                    <div className="w-full overflow-y-auto p-4">
                        <form>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend className='text-center font-bold'><p className='text-2xl'>Add New Post</p></FieldLegend>

                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel className='px-1 text-lg font-bold'>
                                                Post Title
                                            </FieldLabel>
                                            <Input
                                                placeholder="#Asia to Russia📍"
                                                className='border border-gray-600'
                                                name='title'
                                                onChange={HandleChange }
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel className='px-1 text-lg font-bold'>
                                                Select Media
                                            </FieldLabel>
                                            <Input placeholder="Add Image or Video" className='aspect-square h-96 w-96 border border-gray-600' type='file' name='image' onChange={HandleChange} />

                                        </Field>
                                        <Field>

                                            <FieldLabel className='px-1 text-lg font-bold'>
                                                Caption
                                            </FieldLabel>

                                            <div className='flex items-center justify-between gap-2 p-1'>
                                                <Input placeholder="Add a Caption for Your Post..." className="resize-none rounded-full border border-gray-600 px-4" name='caption' onChange={HandleChange}
                                                />
                                                <button className='rounded-full border border-gray-600 p-1.5 active:bg-black active:text-white' onClick={HandleSubmit}><SendHorizontal /></button>
                                            </div>

                                        </Field>
                                    </FieldGroup>
                                </FieldSet>

                            </FieldGroup>
                        </form>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}