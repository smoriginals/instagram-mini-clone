import React, { useState, useEffect } from "react"
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
import { Image, SendHorizontal, Loader2 } from "lucide-react";
//import toast from 'react-hot-toast';
//import { useGlobal } from "../../Context/GlobalContext"
import { usePosts } from '../../Context/PostContext';
import { useNavigate } from 'react-router-dom';



export default function AddPost() {

    const navigate = useNavigate();
    const { createPost } = usePosts();
    //const { user } = useGlobal();

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [open, setOpen] = useState(false);

    const [postData, setPostData] = useState({
        title: '',
        caption: '',
        image: null,
    });

    //cleanup Preview URL
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview)
            }
        }
    },[preview])

    const HandleChange = (e) => {

        const { name, value, files } = e.target

        if (name === 'image') {
            const file = files[0];
            if (!file) return;

            setPostData(prev => ({ ...prev, image: file }))
            setPreview(URL.createObjectURL(file))
        } else {
            setPostData(prev => ({ ...prev, [name]: value }))
        }
    }

    const HandleSubmitPost = async () => {
        //e.preventDefault();
        if (loading) return;

        if (!postData.title || !postData.image || !postData.caption) {
            return;
        }

        setLoading(true);

        try {

            const res = await createPost(postData.image, postData.title, postData.caption);

            if (res?.success) {
                setOpen(false);
                setPostData({
                    title: '',
                    caption: '',
                    image: null
                })

                setPreview(null);
                setTimeout(() => navigate('/home'), 360);
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
        
    };


    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    {/*<button variant="outline">Add a Post</button>*/}
                    <button className="flex cursor-pointer items-center gap-3 rounded-lg p-3 font-semibold hover:bg-gray-600"

                    >
                        <Image /> Add a Post
                    </button>
                </DrawerTrigger>

                <DrawerContent>
                    <div className="w-full overflow-y-auto p-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldLegend className='text-center font-bold'>
                                    <p className='text-2xl'>Add New Post</p>
                                </FieldLegend>

                                <FieldGroup>
                                    <Field>
                                        <FieldLabel className='px-1 text-lg font-bold'>
                                            Post Title
                                        </FieldLabel>
                                        <Input
                                            placeholder="Post Title..."
                                            className='border border-gray-600'
                                            name='title'
                                            onChange={HandleChange}
                                            disabled={loading}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel className='px-1 text-lg font-bold'>
                                            Select Media
                                        </FieldLabel>

                                        <Input placeholder="Add Image or Video" className='aspect-square border border-gray-600' type='file' name='image' accept="image/*" onChange={HandleChange}
                                            disabled={loading}
                                        />

                                        <div className='flex flex-col justify-start'>
                                            <p className='py-2 text-lg font-bold'>{loading ? "Do not Close : Uploading..." : "Media Preview"}</p>
                                            <div className='h-96 rounded-md bg-gray-300'>
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="Preview"
                                                        className="h-full w-full object-contain"
                                                    />
                                                ) : (
                                                    <p className="text-gray-600 text-lg font-bold p-2">No image selected</p>
                                                )}
                                            </div>
                                        </div>

                                    </Field>
                                    <Field>

                                        <FieldLabel className='px-1 text-lg font-bold'>
                                            Caption
                                        </FieldLabel>

                                        <div className='flex items-center justify-between gap-2 p-1'>
                                            <Input placeholder="Add a Caption for Your Post..."
                                                className="resize-none rounded-full border border-gray-600 px-4"
                                                name='caption' 
                                                onChange={HandleChange} 
                                                disabled={loading}
                                            />
                                            <button type="button" className='rounded-full border border-gray-600 p-1.5 active:bg-black active:text-white ' onClick={HandleSubmitPost} disabled={loading}>

                                                {/*<SendHorizontal />*/}
                                                {loading ? <SendHorizontal className="animate-pulse" /> : <SendHorizontal />}

                                            </button>
                                        </div>

                                    </Field>
                                </FieldGroup>
                            </FieldSet>

                        </FieldGroup>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}