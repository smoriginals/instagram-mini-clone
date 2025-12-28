import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../Context/GlobalContext";
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

            <div className="w-full max-w-sm rounded-xl border border-gray-600 p-6">

                <h1 className="mb-6 text-center text-4xl font-bold">Instagram</h1>
                <Input placeholder="Username or email" name='email' className="mb-3 rounded-full border border-gray-600 px-5" onChange={HandleChange} />
                <Input type="password" placeholder="Password" name='password' className="mb-4 rounded-full border border-gray-600 px-5" onChange={HandleChange} />

                <Button className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600" onClick={HandleSubmit}>
                    Log In
                </Button>

                <p className="mt-4 cursor-pointer text-center text-sm hover:underline">
                    Forgot password?
                </p>
            </div>

            <div className="mt-4 w-full max-w-sm rounded-xl border border-gray-600 p-4 text-center">
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
