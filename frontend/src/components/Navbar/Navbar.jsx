import React from "react";  
import { Heart, MessageCircleMore } from "lucide-react";  
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {  

    const navigate = useNavigate();  
    const location = useLocation();  

    const HandleToggele = () => {
        if (location.pathname === '/notifications') {
            // 🔥 Return back to where user came from
            navigate(location.state?.from || -1);
        } else {
            // 🔥 Save current page before moving to notifications
            navigate('/notifications', { state: { from: location.pathname } });
        }
    };

    const HandleMessage = () => {
        if (location.pathname === '/messages') {
            // 🔥 Return back to where user came from
            navigate(location.state?.from || -1);
        } else {
            // 🔥 Save current page before moving to messages
            navigate('/messages', { state: { from: location.pathname } });
        }
    };

    return (  
        <nav className='fixed top-0 right-0 left-0 h-14 bg-white border-b flex justify-between items-center z-50'>  
            <div className='flex h-14 w-full items-center justify-between bg-white px-2 border-b border-gray-300'>  
                <div className='flex h-10 w-auto items-center justify-center px-2'>  
                    <p className='text-xl font-bold'>Instagram</p>  
                </div>  
                <div className='flex items-center justify-center gap-2'>  
                    <div className='flex h-10 w-10 items-center justify-center'>  
                        <Heart size={30} onClick={HandleToggele} />  

                    </div>  
                    <div className='flex h-10 w-10 items-center justify-center'>  
                        <MessageCircleMore size={30} onClick={HandleMessage} />  
                    </div>  
                </div>  
            </div>  
        </nav>  
    );  
}
