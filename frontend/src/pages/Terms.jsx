import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Terms() {
    return (
        <>
            <div className='h-dvh w-dvw bg-gray-900 flex justify-center flex-col items-center gap-2'>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className='font-light font-Instagram text-2xl rounded-full h-12'>Jump into River</Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>

                        <div className='flex h-96 flex-col justify-start gap-2 overflow-y-auto'>


                            <strong>🧾 Terms & Conditions</strong>
                            <hr />
                            <p>
                                Welcome to <b>River (BETA)</b> 🚀
                                <br />
                                River is a social media platform that allows users to create accounts, share content, and interact with others.
                                By accessing or using this application, you agree to follow and be bound by these Terms and Conditions.
                            </p>

                            <strong>🧒 Eligibility</strong>
                            <hr />
                            <p>
                                You must be at least <b>13 years old</b> to use this application.
                                By creating an account, you confirm that all information you provide is accurate, complete, and up to date.
                            </p>

                            <strong>🔐 Account Registration & Responsibility</strong>
                            <hr />
                            <p>
                                Users are responsible for keeping their account credentials secure.
                                Any activity performed under your account is your responsibility.
                                We reserve the right to suspend or terminate accounts that violate these terms.
                            </p>

                            <strong>🖼️ User Content</strong>
                            <hr />
                            <p>
                                Users retain ownership of the content they upload, including images and media.
                                By posting content, you grant <b>River</b> a non-exclusive right to display and distribute your content within the application.
                                You are solely responsible for the content you share.
                            </p>

                            <strong>🚫 Prohibited Activities</strong>
                            <hr />
                            <p>
                                <strong>You must NOT:</strong>
                                <ul className="list-disc pl-5">
                                    <li className="my-0.5">Upload illegal, harmful, or offensive content</li>
                                    <li className="my-0.5">Impersonate other users or entities</li>
                                    <li className="my-0.5">Harass, abuse, or threaten others</li>
                                    <li className="my-0.5">Attempt to hack, exploit, or misuse the platform</li>
                                    <li className="my-0.5">
                                        Violations may result in account suspension or permanent removal
                                    </li>
                                </ul>
                            </p>

                            <strong>👥 Following, Interaction & Privacy</strong>
                            <hr />
                            <p>
                                River allows users to follow others and interact with their content.
                                Some features may depend on follow status or privacy settings.
                                We do not guarantee uninterrupted availability of all features due to technical or platform limitations.
                            </p>

                            <strong>🛑 Account Termination</strong>
                            <hr />
                            <p>
                                We reserve the right to suspend or delete any account that violates these Terms or disrupts the platform’s integrity and community.
                            </p>

                            <strong>🔒 Data & Security</strong>
                            <hr />
                            <p>
                                We take reasonable measures to protect user data and privacy.
                                However, no system is completely secure, and absolute security cannot be guaranteed.
                                By using River, you acknowledge and accept these risks.
                            </p>

                            <strong>🧪 Beta Features Disclaimer</strong>
                            <hr />
                            <p>
                                River is currently in <b>BETA</b>.
                                Some features may be incomplete or unstable.
                                Bugs, downtime, or data loss may occur.
                                By using the app, you agree to help improve it through feedback and testing.
                            </p>

                            <strong>⚠️ Limitation of Liability</strong>
                            <hr />
                            <p>
                                <b>River</b> is provided on an “as-is” basis without warranties of any kind.
                                We are not responsible for any damages, losses, or issues resulting from the use of this application.
                            </p>

                            <strong>🔄 Changes to Terms</strong>
                            <hr />
                            <p>
                                We may update these Terms and Conditions at any time.
                                Continued use of the application after changes means you accept the updated terms.
                            </p>

                            <strong>📧 Contact Information</strong>
                            <hr />
                            <p>
                                For any questions or concerns regarding these Terms, please contact us:
                                <br />
                                <b>Email:</b> acer.aspirexr@outlook.com

                            </p>
                            <br></br>

                            <Accordion

                                collapsible
                                className="w-full"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className='text-md font-semibold text-red-500'>Note For User (Must Read)</AccordionTrigger>
                                    <hr></hr>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <p>
                                            ⚠️ <b>Note:</b> If you have filled in all details correctly but your account is not created or an error appears,
                                            it may be because the <b>email</b> or <b>username</b> already exists.
                                            <br /><br />
                                            🔁 Please double-check the information you entered and try again.
                                            Due to the <b>BETA</b> version of the app, you may be redirected to the
                                            <b>Terms & Conditions</b> page multiple times.
                                            <br /><br />
                                            🙏 Thank you for your patience while we improve the experience.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>

                            </Accordion>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="terms"
                                   
                                />

                                <Label htmlFor="terms" className='text-md font-semibold'>Accept terms and conditions</Label>
                            </div>
                            <AlertDialogFooter className='my-4'>
                                <AlertDialogCancel className='rounded-full'>Cancel</AlertDialogCancel>
                                
                                <AlertDialogAction asChild>
                                    <Button
                                        type="button"
                                        className="rounded-full"
                                        
                                    >
                                        Create
                                    </Button>
                                </AlertDialogAction>

                            </AlertDialogFooter>


                        </div>

                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    )
}