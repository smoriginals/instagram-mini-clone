import React from 'react';
import { Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
export default function NotificationIcon() {

    const navigate = useNavigate();
    const location = useLocation(); 

    const HandleNotificationPage = () => {
        if (location.pathname === '/notifications') {
            // 🔥 Return back to where user came from
            navigate(location.state?.from || -1);
        } else {
            // 🔥 Save current page before moving to notifications
            navigate('/notifications', { state: { from: location.pathname } });
        }
    };

    return (
        <>
            <div className='flex h-10 w-10 items-center justify-center'>
                <Bell size={28} onClick={HandleNotificationPage} />
            </div> 
        </>
    )
}