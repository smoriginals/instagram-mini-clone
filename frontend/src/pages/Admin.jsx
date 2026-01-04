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

            <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
                
                {/* Card */}
                <Card className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">

                    {/* Header */}
                    <CardHeader className="text-center">
                        <div className="mb-2 flex justify-center">
                            <Shield className="h-12 w-12 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">
                            SMORIGINALS
                        </CardTitle>
                        <p className="text-sm text-gray-300">Secure Access Only</p>
                    </CardHeader>

                    {/* Form */}
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">Email</label>
                            <Input
                                type="email"
                                placeholder="admin@example.com"
                                className="placeholder-gray-300 border-white/30 bg-white/200 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">Password</label>
                            <Input
                                type="password"
                                placeholder="Password"
                                className="placeholder-gray-300 border-white/30 bg-white/200 text-white"
                            />
                        </div>

                        <Button className="w-full bg-white font-semibold text-black hover:bg-gray-200" onClick={() => { navigate('/smos') }}>
                            <Lock className="mr-2 h-4 w-4" />
                            Login
                        </Button>

                    </CardContent>
                </Card>

                <div className='mt-4 px-2'>
                    <Settings2 size={30} onClick={() => { navigate('/settings') }} />
                </div>


            </div>
        </>
    );
}
