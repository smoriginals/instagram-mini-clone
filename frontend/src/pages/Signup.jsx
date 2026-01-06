import React, { useState } from "react";

import { SignalMedium } from 'lucide-react';

import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useGlobal } from "../Context/GlobalContext";

export default function Signup() {

    const navigate = useNavigate();
    const { createUser } = useGlobal();

    const [userData, setUserData] = useState({
        email: '',
        name: '',
        username: '',
        password: ''
    })


    const HandleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const res = await createUser(userData);
        if (!res?.ok) {
            return;
        }
        navigate("/login");
    };



    return (

        <div className="flex h-dvh w-full flex-col items-center justify-center p-4">

            <div className="bordermode w-full max-w-sm rounded-xl border p-6 shadow-lg">
                <div className='flex flex-row items-center justify-center p-3'>
                    <p className="font-Instagram flex flex-row items-center gap-1 text-4xl font-light">River<SignalMedium className='animate-pulse' />
                    </p>
                </div>

                <form onSubmit={HandleSubmit}>

                    {/*Full Name*/}
                    <Input required name='name' value={userData.name} placeholder="Full Name" className="bordermode mb-3 rounded-full border px-4" onChange={HandleChange} />

                    {/*Username*/}
                    <Input required name='username' value={userData.username} placeholder="@Username" className="bordermode mb-3 rounded-full border px-4" onChange={HandleChange} />

                    {/*Email*/}
                    <Input required name='email' type="email" value={userData.email} placeholder="example@email.com" className="bordermode mb-3 rounded-full border px-4" onChange={HandleChange} />

                    {/*Password*/}
                    <Input required name='password' type="password" value={userData.password} placeholder="Password" className="bordermode mb-4 rounded-full border px-4" onChange={HandleChange} />

                    <Button type="submit" className="rounded-full w-full">
                        Create
                    </Button>

                </form>

            </div>

            <div className="bordermode mt-4 w-full max-w-sm rounded-xl border p-4 text-center shadow-lg">
                <p className="text-sm font-light">
                    Already have an account?
                    <Link className="ml-1 cursor-pointer font-semibold text-blue-500 hover:underline" to='/login'>Log in</Link>
                </p>
            </div>
        </div>
    );
}
