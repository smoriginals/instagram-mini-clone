import React, { useState} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
    const [error, setError] = useState("Error Found");

    const HandleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const HandleSubmit = async () => {
        const res = await createUser(userData);

        if (!res.ok) {
            setError(res.message);
            return;
        }

        navigate("/");

        console.log("User Data Submitted:", userData,"Error Checking:", error);
    };


    return (

        <div className="flex h-dvh w-full flex-col items-center justify-center p-4">


            <div className="w-full max-w-sm rounded-xl border border-gray-600 p-6">
                <h1 className="mb-6 text-center text-4xl font-bold">Instagram</h1>
                {/*Email*/}
                <Input name='email' placeholder="Email" className="mb-3 rounded-full border border-gray-600 px-4" onChange={HandleChange} />
                {/*Full Name*/}
                <Input name='name' placeholder="Full Name" className="mb-3 rounded-full border border-gray-600 px-4" onChange={HandleChange} />
                {/*Username*/}
                <Input name='username' placeholder="Username" className="mb-3 rounded-full border border-gray-600 px-4" onChange={HandleChange}/>
                {/*Password*/}
                <Input name='password' type="password" placeholder="Password" className="mb-4 rounded-full border border-gray-600 px-4" onChange={HandleChange}/>
                {/*Submit form*/}
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" onClick={HandleSubmit }>
                    Sign Up
                </Button>

            </div>

            <div className="mt-4 w-full max-w-sm rounded-xl border border-gray-600 p-4 text-center">
                <p className="text-sm">
                    Already have an account?
                    <span
                        className="ml-1 cursor-pointer font-bold text-blue-500"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}
