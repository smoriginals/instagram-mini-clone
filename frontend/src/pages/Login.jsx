import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-50 p-4">
            {/* Instagram Logo */}
            <h1 className="text-4xl font-bold mb-6">Instagnam</h1>

            <div className="w-full max-w-sm bg-white p-6 rounded-xl border border-gray-300">

                <Input placeholder="Username or email" className="mb-3 px-5 rounded-full" />
                <Input type="password" placeholder="Password" className="mb-4 px-5 rounded-full" />

                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Log In
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:underline">
                    Forgot password?
                </p>
            </div>

            <div className="w-full max-w-sm mt-4 bg-white p-4 rounded-xl border border-gray-300 text-center">
                <p className="text-sm">
                    Don't have an account?
                    <span
                        className="text-blue-500 font-medium ml-1 cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}
