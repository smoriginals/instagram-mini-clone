import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../Context/GlobalContext";
import { SignalMedium } from 'lucide-react';

export default function Login() {

    const navigate = useNavigate();

    const { LoginUser } = useGlobal();

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const HandleChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const HandleSubmit = async () => {

        const res = await LoginUser(form);
       
        if (!res.ok) {
            return;
        }

        navigate("/home"); // move to home after login
    }

    return (
        <div className="flex h-dvh w-full flex-col items-center justify-center p-4">
            {/* Instagram Logo */}

            <div className="bordermode w-full max-w-sm rounded-xl border p-6 shadow-lg">

                <div className='flex flex-row items-center justify-center p-3'>
                    <p className="font-Instagram flex flex-row items-center gap-1 text-4xl font-light">River<SignalMedium className='animate-pulse'/></p>
                </div>

                <Input placeholder="Username or email" name='email' className="bordermode mb-3 rounded-full border px-5" onChange={HandleChange} />
                <Input type="password" placeholder="Password" name='password' className="bordermode mb-4 rounded-full border px-5" onChange={HandleChange} />

                <Button className="text-md w-full cursor-pointer font-semibold" onClick={HandleSubmit}>
                    Log In
                </Button>

                <p className="mt-4 cursor-pointer text-center text-sm hover:underline">
                    Forgot password? Create New Account 😄
                </p>
            </div>

            <div className="bordermode mt-4 w-full max-w-sm rounded-xl border p-4 text-center shadow-lg">
                <p className="text-sm">
                    Don't have an account?
                    <span
                        className="ml-1 cursor-pointer font-bold text-blue-500"
                        onClick={() => navigate("/")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}
