import React from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function MobileNo() {
    return (
        <>
            {/*Enable the bottom component when the OTP has been Sended to User.*/}
            <div className='flex justify-start flex-col gap-2'>

                <div className=''>
                    <p className='text-md font-semibold py-1'>Enter Your Mobile No to Activate</p>
                    <InputOTP maxLength={10}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className='border border-gray-600' />
                            <InputOTPSlot index={1} className='border border-gray-600' />
                            <InputOTPSlot index={2} className='border border-gray-600' />
                            <InputOTPSlot index={3} className='border border-gray-600' />
                            <InputOTPSlot index={4} className='border border-gray-600' />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={5} className='border border-gray-600' />
                            <InputOTPSlot index={6} className='border border-gray-600' />
                            <InputOTPSlot index={7} className='border border-gray-600' />
                            <InputOTPSlot index={8} className='border border-gray-600' />
                            <InputOTPSlot index={9} className='border border-gray-600' />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                {/*Enable the bottom component when the user recieve the OTP.*/}
                <div className='hidden py-1'>
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className='border border-gray-600' />
                            <InputOTPSlot index={1} className='border border-gray-600' />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={2} className='border border-gray-600' />
                            <InputOTPSlot index={3} className='border border-gray-600' />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={4} className='border border-gray-600' />
                            <InputOTPSlot index={5} className='border border-gray-600' />
                        </InputOTPGroup>
                    </InputOTP>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className='text-md font-bold mt-2'>Submit</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

            </div>
        </>
    )
}