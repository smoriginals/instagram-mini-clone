import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useGlobal } from "../Context/GlobalContext";
import { SignalMedium } from 'lucide-react';
import homel from '../assets/Images/homel.png';
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
            <img src={homel} alt="River Banner" className='absolute h-full w-full' />
            {/* Instagram Logo */}
            <div className="relative w-full max-w-sm rounded-xl p-2">

                <div className='flex flex-row items-center justify-center p-3'>
                    <p className="font-Instagram flex flex-row items-center gap-1 text-4xl font-light text-red-500 ">River<SignalMedium className='animate-pulse' />
                    </p>
                </div>

                <form onSubmit={HandleSubmit} className='flex flex-col gap-4'>
                    <Input required placeholder="Email" name='email' type='email' value={form.email} className="rounded-md px-4 h-12" autoComplete="email" onChange={HandleChange} />
                    <Input required type="password" placeholder="Password" name='password' value={form.password} className="rounded-md px-4 h-12 " autoComplete="current-password" onChange={HandleChange} />

                    <Button type='submit' className="text-md w-full cursor-pointer font-semibold h-12">
                        Log In
                    </Button>
                </form>

                <p className="mt-4 text-right text-sm">
                    <Link to='/' className='font-semibold text-green-500'> Forgot password?</Link>
                </p>

                <div className="bordermode mt-4 w-full max-w-sm rounded-xl border p-4 text-center shadow-lg">
                    <p className="text-sm font-light">
                        Don't have an account?
                        <Link to='/' className="ml-1 cursor-pointer font-semibold text-red-500 hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>

        </div>
    );
}
