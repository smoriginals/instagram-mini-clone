import React from 'react';
import {SignalMedium } from 'lucide-react'
export default function River() {
    return (
        <>
            <div className='flex h-screen w-screen items-center justify-center'>
                <div className='flex h-64 w-64 items-center justify-center rounded-full border-b-8 border-l-8 border-white'>
                    <h1 className='font-Instagram flex flex-row items-center justify-center pl-6 text-6xl'>River<SignalMedium size={ 60} className='animate-pulse'/></h1>
                </div>
            </div>
        </>
    )
}