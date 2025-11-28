import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const navigate = useNavigate();

    return (
        <div className="h-dvh w-full flex flex-col justify-center items-center p-4">


            <div className="w-full max-w-sm p-6 rounded-xl border border-gray-600">
                <h1 className="text-4xl font-bold mb-6 text-center">Instagram</h1>

                <Input placeholder="Email" className="mb-3 rounded-full px-4 border border-gray-600" />
                <Input placeholder="Full Name" className="mb-3 rounded-full px-4 border border-gray-600" />
                <Input placeholder="Username" className="mb-3 rounded-full px-4 border border-gray-600" />
                <Input type="password" placeholder="Password" className="mb-4 rounded-full px-4 border border-gray-600" />

                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white " onClick={() => { navigate('/login') }}>
                    Sign Up
                </Button>

            </div>

            <div className="w-full max-w-sm mt-4 p-4 rounded-xl border border-gray-600 text-center">
                <p className="text-sm">
                    Already have an account?
                    <span
                        className="text-blue-500 font-bold ml-1 cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}
