import React from "react"
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
export default function AddPost() {

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    {/*<button variant="outline">Add a Post</button>*/}
                    <button className="flex items-center font-semibold gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-600"

                    >
                        <Image /> Add a Post
                    </button>
                </DrawerTrigger>

                <DrawerContent>
                    <div className="overflow-y-auto w-full p-4">
                        <form>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend className='font-bold text-center'><p className='text-2xl'>Add New Post</p></FieldLegend>

                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel className='text-lg font-bold px-1'>
                                                Post Title
                                            </FieldLabel>
                                            <Input
                                                placeholder="#Asia to Russia📍"
                                                className='border border-gray-600'
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel className='text-lg font-bold px-1'>
                                                Select Media
                                            </FieldLabel>
                                            <Input placeholder="Add Image or Video" className='h-96 w-96 aspect-square border border-gray-600' type='file' />

                                        </Field>
                                        <Field>

                                            <FieldLabel className='text-lg font-bold px-1'>
                                                Caption
                                            </FieldLabel>

                                            <div className='flex justify-between items-center p-1 gap-2'>
                                                <Input placeholder="Add a Caption for Your Post..." className="resize-none border border-gray-600 rounded-full px-4"
                                                />
                                                <button className='border border-gray-600 p-1.5 rounded-full active:bg-black active:text-white'><SendHorizontal /></button>
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