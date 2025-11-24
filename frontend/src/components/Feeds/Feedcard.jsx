import React from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react'
export default function Feedcard() {
    return (
        <>
            <div className='h-3/5 w-full bg-gray-200 flex justify-center items-center'>
                <div className='h-3/5 w-full bg-red-500 p-1'>
                    <div className='bg-white flex justify-start gap-2 p-1 items-center'>
                        <div className='h-8 w-8 rounded-full border-2 border-pink-500'></div>
                        <p>Username.XYZ</p>
                    </div>
                    <div className='h-100 w-full bg-gray-500 flex justify-center items-center object-cover'>
                        <img src="https://th.bing.com/th/id/R.8a97c68b21bb72d8d29219a30a935f4c?rik=XOUhz40Jc9OcYg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images-6.jpg&ehk=BQoi8QCZQtCfHkXWT0TIAxv1vTtTO1rY7ctKskX6Xfs%3d&risl=&pid=ImgRaw&r=0" alt="User Avatar" className=" h-full w-full" />
                    </div>
                    <div className='h-10 w-full bg-green-200 flex justify-start items-center gap-2 px-1'>
                        <button className='h-8 w-8 bg-white flex justify-center items-center'><Heart size={30} /></button>
                        <button className='h-8 w-8 bg-white flex justify-center items-center'><MessageCircle size={30} /></button>
                        <button className='h-8 w-8 bg-white flex justify-center items-center'><Send size={30} /></button>
                    </div>
                    <div className='h-10 w-full bg-gray-200 flex justify-start items-center p-1 gap-1'>
                        <div className='h-6 w-6 bg-gray-200 rounded-full border border-pink-500'>
                        </div>
                        <p>Nice View! i like that.</p>
                    </div>
                </div>
            </div>
        </>
    )
}