import React, { useState, useEffect } from "react"
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
import toast from 'react-hot-toast';
import { Image, SendHorizontal, Loader2 } from "lucide-react";
import { usePosts } from '../../Context/PostContext';
import { useNavigate } from 'react-router-dom';

export default function AddPost() {

    const navigate = useNavigate();
    const { createPost } = usePosts();

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
    }, [preview])

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
        
        if (loading) return;

        if (!postData.title || !postData.image || !postData.caption) {
            toast.error('All Fields are required');
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
                    <button className="bordermode flex cursor-pointer items-center justify-center gap-2 rounded-md border p-2 font-semibold"
                    >
                        <Image /> Add a Post
                    </button>
                </DrawerTrigger>

                <DrawerContent>
                    <div className="w-full overflow-y-auto p-3">
                        <FieldGroup>
                            <FieldSet>
                                <FieldLegend className='text-center font-bold'>
                                    <p className='font-font-semibold text-xl'>Add New Post</p>
                                </FieldLegend>

                                <FieldGroup>
                                    <Field>
                                        <FieldLabel className='px-1 text-lg font-semibold'>
                                            Post Title
                                        </FieldLabel>
                                        <Input
                                            placeholder="Add Title *"
                                            className='bordermode border'
                                            name='title'
                                            onChange={HandleChange}
                                            disabled={loading}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel className='px-1 text-lg font-semibold'>
                                            Select Media
                                        </FieldLabel>

                                        <Input placeholder="Add Image or Video" className='bordermode aspect-square border' type='file' name='image' accept="image/*" onChange={HandleChange}
                                            disabled={loading}
                                        />

                                        <div className='flex flex-col justify-start'>
                                            <p className='py-2 text-lg font-bold'>{loading ? "Do not Close : Uploading..." : "Media Preview"}</p>
                                            <div className='bordermode h-96 rounded-md border'>
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="Preview"
                                                        className="h-full w-full object-contain"
                                                    />
                                                ) : (
                                                    <p className="animate-pulse p-2 text-center text-lg">No image selected</p>

                                                )}
                                            </div>
                                        </div>

                                    </Field>
                                    <Field>

                                        <FieldLabel className='px-1 text-lg font-semibold'>
                                            Caption
                                        </FieldLabel>

                                        <div className='flex items-center justify-between gap-2'>
                                            <Input placeholder="Add Caption *"
                                                className="bordermode resize-none rounded-md border px-4"
                                                name='caption'
                                                onChange={HandleChange}
                                                disabled={loading}
                                            />
                                            <button type="button" className='bordermode rounded-full border p-1.5 active:bg-black active:text-white' onClick={HandleSubmitPost} disabled={loading}>

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