import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="h-dvh w-full flex flex-col justify-center items-center p-4">
            {/* Instagram Logo */}

            <div className="w-full max-w-sm p-6 rounded-xl border border-gray-600">
                
            <h1 className="text-4xl font-bold mb-6 text-center">Instagram</h1>
                <Input placeholder="Username or email" className="mb-3 px-5 rounded-full border border-gray-600" />
                <Input type="password" placeholder="Password" className="mb-4 px-5 rounded-full border border-gray-600" />

                <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => { navigate('/')} }>
                    Log In
                </Button>

                <p className="text-center text-sm mt-4 cursor-pointer hover:underline">
                    Forgot password?
                </p>
            </div>

            <div className="w-full max-w-sm mt-4 p-4 rounded-xl border border-gray-600 text-center">
                <p className="text-sm">
                    Don't have an account?
                    <span
                        className="text-blue-500 font-bold ml-1 cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}
