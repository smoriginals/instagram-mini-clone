import React from "react";
import { Lock, Shield, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
export default function Admin() {

    const navigate = useNavigate();

    return (
        <>

            <div className="h-dvh flex items-center justify-center flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 gap-4">
                
                {/* Card */}
                <Card className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl">

                    {/* Header */}
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-2">
                            <Shield className="h-12 w-12 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">
                            SM ORIGINALS
                        </CardTitle>
                        <p className="text-gray-300 text-sm">Secure Access Only</p>
                    </CardHeader>

                    {/* Form */}
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm">Email</label>
                            <Input
                                type="email"
                                placeholder="admin@example.com"
                                className="bg-white/200 border-white/30 text-white placeholder-gray-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm">Password</label>
                            <Input
                                type="password"
                                placeholder="Password"
                                className="bg-white/200 border-white/30 text-white placeholder-gray-300"
                            />
                        </div>

                        <Button className="w-full bg-white text-black font-semibold hover:bg-gray-200" onClick={() => { navigate('/smos') }}>
                            <Lock className="mr-2 h-4 w-4" />
                            Login
                        </Button>

                        <p className="text-center text-gray-300 text-sm mt-2">
                            Forgot password? <span className="text-white underline cursor-pointer">Reset</span>
                        </p>
                    </CardContent>
                </Card>

                <div className='px-2 mt-4'>
                    <Settings2 size={30} onClick={() => { navigate('/settings') }} />
                </div>


            </div>
        </>
    );
}
