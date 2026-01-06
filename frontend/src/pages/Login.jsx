import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
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

    const HandleSubmit = async (e) => {
        e.preventDefault();
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
                    <p className="font-Instagram flex flex-row items-center gap-1 text-4xl font-light">River<SignalMedium className='animate-pulse' />
                    </p>
                </div>

                <form  onSubmit={HandleSubmit}>
                    <Input required placeholder="Email" name='email' type='email' value={form.email} className="bordermode mb-3 rounded-full border px-5" autoComplete="email"  onChange={HandleChange} />
                    <Input required type="password" placeholder="Password" name='password' value={form.password} className="bordermode mb-4 rounded-full border px-5" autoComplete="current-password" onChange={HandleChange} />

                    <Button type='submit' className="text-md w-full cursor-pointer font-semibold">
                        Log In
                    </Button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Forgot password? <Link to='/' className='font-semibold text-yellow-500'>Create New Account 😄</Link>
                </p>

            </div>

            <div className="bordermode mt-4 w-full max-w-sm rounded-xl border p-4 text-center shadow-lg">
                <p className="text-sm font-light">
                    Don't have an account?
                    <Link to='/' className="ml-1 cursor-pointer font-semibold text-blue-500 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
