import React from 'react';

export default function Feedcard() {
    return (
        <>
            <div className='h-100 w-full bg-gray-200 flex justify-center items-center'>
                <div>
                    <p>Username</p>
                    <div className='h-100 w-full bg-gray-100'>
                        <p className='text-2xl font-bold'>User Photos</p>
                    </div>
                    <div>
                        likes, comments, share buttons
                    </div>
                    <p>Total like and show any random cooment that done by any user</p>
                </div>
            </div>
        </>
    )
}